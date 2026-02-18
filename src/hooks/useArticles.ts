import { useState, useEffect, useMemo, useCallback } from "react";
import { API_BASE, type Article, type Stats } from "@/lib/constants";

export interface Filters {
  selectedTopics: string[];
  timeRange: string | null;
  dateFrom: string;
  dateTo: string;
  search: string;
  source: string;
}

const defaultFilters: Filters = {
  selectedTopics: [],
  timeRange: null,
  dateFrom: "",
  dateTo: "",
  search: "",
  source: "",
};

export function useArticles() {
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
        const [articlesRes, statsRes] = await Promise.all([
          fetch(`${API_BASE}/api/articles?limit=500`),
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
  }, []);

  const sources = useMemo(() => {
    const s = new Set(articles.map((a) => a.source).filter(Boolean));
    return Array.from(s).sort();
  }, [articles]);

  const isFiltered = useMemo(() => {
    return (
      filters.selectedTopics.length > 0 ||
      filters.timeRange !== null ||
      filters.dateFrom !== "" ||
      filters.dateTo !== "" ||
      filters.search !== "" ||
      filters.source !== ""
    );
  }, [filters]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Topic filter (OR logic)
      if (filters.selectedTopics.length > 0) {
        const articleTopics = (article.topics || "")
          .split(",")
          .map((t) => t.trim());
        const match = filters.selectedTopics.some((t) => articleTopics.includes(t));
        if (!match) return false;
      }

      // Time range filter
      if (filters.timeRange) {
        const scraped = new Date(article.scraped_at);
        const now = new Date();
        const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const today = startOfDay(now);

        switch (filters.timeRange) {
          case "today":
            if (scraped < today) return false;
            break;
          case "this_week": {
            const day = now.getDay();
            const monday = new Date(today);
            monday.setDate(today.getDate() - ((day + 6) % 7));
            if (scraped < monday) return false;
            break;
          }
          case "last_week": {
            const day = now.getDay();
            const thisMonday = new Date(today);
            thisMonday.setDate(today.getDate() - ((day + 6) % 7));
            const lastMonday = new Date(thisMonday);
            lastMonday.setDate(thisMonday.getDate() - 7);
            if (scraped < lastMonday || scraped >= thisMonday) return false;
            break;
          }
          case "last_month": {
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            if (scraped < monthAgo) return false;
            break;
          }
          case "last_year": {
            const yearAgo = new Date(today);
            yearAgo.setFullYear(yearAgo.getFullYear() - 1);
            if (scraped < yearAgo) return false;
            break;
          }
        }
      }

      // Custom date range
      if (filters.dateFrom) {
        const from = new Date(filters.dateFrom);
        if (new Date(article.scraped_at) < from) return false;
      }
      if (filters.dateTo) {
        const to = new Date(filters.dateTo);
        to.setDate(to.getDate() + 1);
        if (new Date(article.scraped_at) >= to) return false;
      }

      // Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const inTitle = (article.title || "").toLowerCase().includes(q);
        const inSummary = (article.summary || "").toLowerCase().includes(q);
        if (!inTitle && !inSummary) return false;
      }

      // Source
      if (filters.source && article.source !== filters.source) return false;

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
