import { format } from "date-fns";
import { type Article, getSourceBorderColor } from "@/lib/constants";

interface ArticleCardProps {
  article: Article;
}

const MAX_VISIBLE_TAGS = 3;

const ArticleCard = ({ article }: ArticleCardProps) => {
  const stripColor = getSourceBorderColor(article.source);
  const topics = (article.topics || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const dateStr = article.scraped_at
    ? format(new Date(article.scraped_at), "d MMM yyyy")
    : "";

  const visibleTopics = topics.slice(0, MAX_VISIBLE_TAGS);
  const extraCount = topics.length - MAX_VISIBLE_TAGS;

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-card border border-border rounded-sm overflow-hidden transition-all duration-150 hover:bg-surface-hover hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
      style={{
        boxShadow: "var(--tile-shadow)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--tile-shadow-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--tile-shadow)";
      }}
    >
      {/* Accent strip */}
      <div className="h-[3px] w-full" style={{ backgroundColor: stripColor }} />

      <div className="p-5 flex flex-col gap-3">
        {/* Meta row */}
        <div className="flex items-center justify-between">
          <span className="inline-block px-2 py-0.5 rounded-sm text-[0.68rem] font-semibold uppercase tracking-wider bg-secondary text-muted-foreground">
            {article.source}
          </span>
          <span className="text-[0.7rem] text-muted-foreground whitespace-nowrap">
            {dateStr}
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-serif-display text-[1.2rem] font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h2>

        {/* Summary */}
        {article.summary && (
          <p className="text-[0.85rem] text-muted-foreground line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
        )}

        {/* Topic tags */}
        {topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleTopics.map((topic) => (
              <span
                key={topic}
                className="inline-block px-2 py-0.5 text-[0.65rem] font-medium border border-border bg-background text-foreground rounded-none"
              >
                {topic}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="inline-block px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
                +{extraCount}
              </span>
            )}
          </div>
        )}

        {/* Read more */}
        <span className="text-xs text-muted-foreground group-hover:underline mt-auto">
          Read full article →
        </span>
      </div>
    </a>
  );
};

export default ArticleCard;
