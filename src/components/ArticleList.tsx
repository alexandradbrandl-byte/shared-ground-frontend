import { type Article } from "@/lib/constants";
import ArticleRow from "./ArticleRow";

interface ArticleListProps {
  articles: Article[];
  loading: boolean;
  error: string | null;
  isFiltered: boolean;
  clearFilters: () => void;
}

const SkeletonRow = () => (
  <div className="py-5 pl-4 border-l-[3px] border-border animate-pulse space-y-3">
    <div className="flex gap-2">
      <div className="h-4 w-16 rounded bg-secondary" />
      <div className="h-4 w-20 rounded bg-secondary" />
      <div className="ml-auto h-4 w-20 rounded bg-secondary" />
    </div>
    <div className="h-5 w-3/4 rounded bg-secondary" />
    <div className="h-4 w-full rounded bg-secondary" />
    <div className="h-3 w-24 rounded bg-secondary" />
  </div>
);

const ArticleList = ({ articles, loading, error, isFiltered, clearFilters }: ArticleListProps) => {
  if (loading) {
    return (
      <div className="max-w-[860px] mx-auto px-4 divide-y divide-border">
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[860px] mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="max-w-[860px] mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">No articles match your filters.</p>
        {isFiltered && (
          <button
            onClick={clearFilters}
            className="mt-2 text-sm text-primary hover:underline font-medium"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <main className="max-w-[860px] mx-auto px-4 divide-y divide-border">
      {articles.map((article) => (
        <ArticleRow key={article.id} article={article} />
      ))}
    </main>
  );
};

export default ArticleList;
