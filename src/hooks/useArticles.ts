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

export function useArticles(country?: string) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const countryParam = country ? `&country=${country}` : "";
        const [articlesRes, statsRes] = await Promise.all([
          fetch(`${API_BASE}/api/articles?limit=500${countryParam}`),
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
  };
}
