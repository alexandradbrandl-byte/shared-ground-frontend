import { useState, useEffect, useMemo, useCallback } from "react";
import { API_BASE, type Article, type Stats } from "@/lib/constants";

export interface Filters {
  selectedTopics: string[];
  selectedSources: string[];
  timeRange: string | null;
  dateFrom: string;
  dateTo: string;
  search: string;
}

const defaultFilters: Filters = {
  selectedTopics: [],
  selectedSources: [],
  timeRange: null,
  dateFrom: "",
  dateTo: "",
  search: "",
};

function dateStrDaysAgo(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
}

export function useArticles(country?: string) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [olderLoaded, setOlderLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      setOlderLoaded(false);
      try {
        const countryParam = country ? `&country=${encodeURIComponent(country)}` : "";
        // No date_from here — backend enforces a 90-day cap automatically
        const limit = country ? 100 : 500;

        const [articlesRes, statsRes] = await Promise.all([
          fetch(`${API_BASE}/api/articles?limit=${limit}${countryParam}${timeParam}`),
          fetch(`${API_BASE}/api/stats`),
        ]);
        if (!articlesRes.ok || !statsRes.ok) throw new Error("Failed to fetch");
        const articlesData = await articlesRes.json();
        const statsData = await statsRes.json();
        setArticles(Array.isArray(articlesData) ? articlesData : []);
        setStats(statsData);
      } catch {
        setError("Couldn't load articles. The server may be waking up — try refreshing.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [country]);

  const loadOlderArticles = useCallback(async () => {
    if (!country || olderLoaded || loadingOlder) return;
    setLoadingOlder(true);
    try {
      const threeWeeksAgo = dateStrDaysAgo(21);
      const threeMonthsAgo = dateStrDaysAgo(90);
      const res = await fetch(
        `${API_BASE}/api/articles?limit=200&country=${encodeURIComponent(country)}&date_from=${threeMonthsAgo}&date_to=${threeWeeksAgo}`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setArticles((prev) => [...prev, ...(Array.isArray(data) ? data : [])]);
      setOlderLoaded(true);
    } catch {
      // silently ignore — user can retry
    } finally {
      setLoadingOlder(false);
    }
  }, [country, olderLoaded, loadingOlder]);

  const sources = useMemo(() => {
    const s = new Set(articles.map((a) => a.source).filter(Boolean));
    return Array.from(s).sort();
  }, [articles]);

  const isFiltered = useMemo(() => {
    return (
      filters.selectedTopics.length > 0 ||
      filters.selectedSources.length > 0 ||
      filters.timeRange !== null ||
      filters.dateFrom !== "" ||
      filters.dateTo !== "" ||
      filters.search !== ""
    );
  }, [filters]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      if (filters.selectedTopics.length > 0) {
        const articleTopics = (article.topics || "").split(",").map((t) => t.trim());
        if (!filters.selectedTopics.some((t) => articleTopics.includes(t))) return false;
      }
      if (filters.selectedSources.length > 0) {
        if (!filters.selectedSources.includes(article.source)) return false;
      }
      const articleDate = new Date(article.published_at || article.scraped_at);
      if (filters.timeRange) {
        const now = new Date();
        const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const today = startOfDay(now);
        switch (filters.timeRange) {
          case "today":
            if (articleDate < today) return false;
            break;
        }
      }
      if (filters.dateFrom) {
        if (articleDate < new Date(filters.dateFrom)) return false;
      }
      if (filters.dateTo) {
        const to = new Date(filters.dateTo);
        to.setDate(to.getDate() + 1);
        if (articleDate >= to) return false;
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const inTitle = (article.title || "").toLowerCase().includes(q);
        const inSummary = (article.summary || "").toLowerCase().includes(q);
        if (!inTitle && !inSummary) return false;
      }
      return true;
    });
  }, [articles, filters]);

  const clearFilters = useCallback(() => setFilters(defaultFilters), []);

  return {
    articles: filteredArticles,
    allArticles: articles,
    stats,
    loading,
    error,
    filters,
    setFilters,
    sources,
    isFiltered,
    clearFilters,
    loadOlderArticles,
    loadingOlder,
    olderLoaded,
    hasOlderAvailable: false, // initial load already covers full 90-day window
  };
}
