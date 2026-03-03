import { Link } from "react-router-dom";
import Masthead from "@/components/Masthead";
import FilterBar from "@/components/FilterBar";
import ArticleGrid from "@/components/ArticleGrid";
import SiteFooter from "@/components/SiteFooter";
import ScrollButton from "@/components/ScrollButton";
import { useArticles } from "@/hooks/useArticles";

interface FeedPageProps {
  country: string;
  countryName: string;
}

const FeedPage = ({ country, countryName }: FeedPageProps) => {
  const {
    articles,
    stats,
    loading,
    error,
    filters,
    setFilters,
    sources,
    isFiltered,
    clearFilters,
  } = useArticles(country);

  return (
    <div className="min-h-screen bg-background">
      <Masthead stats={stats} />

      {/* Breadcrumb */}
      <div className="max-w-[1100px] mx-auto px-4 pt-2 pb-1">
        <p className="text-xs text-muted-foreground font-sans">
          <Link to="/" className="hover:text-foreground transition-colors">
            &#8592; Weltkarte
          </Link>
          <span className="mx-1">/</span>
          <span className="text-foreground font-medium">{countryName}</span>
        </p>
      </div>

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        sources={sources}
        articleCount={articles.length}
        isFiltered={isFiltered}
        clearFilters={clearFilters}
      />

      <div className="pt-4 pb-8">
        <ArticleGrid
          articles={articles}
          loading={loading}
          error={error}
          isFiltered={isFiltered}
          clearFilters={clearFilters}
        />
      </div>

      <SiteFooter />
      <ScrollButton />
    </div>
  );
};

export default FeedPage;
