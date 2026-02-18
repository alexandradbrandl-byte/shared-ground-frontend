import { format } from "date-fns";
import { type Article, TOPIC_COLORS, getSourceBorderColor } from "@/lib/constants";

interface ArticleRowProps {
  article: Article;
}

const ArticleRow = ({ article }: ArticleRowProps) => {
  const borderColor = getSourceBorderColor(article.source);
  const topics = (article.topics || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const dateStr = article.scraped_at
    ? format(new Date(article.scraped_at), "d MMM yyyy")
    : "";

  return (
    <article
      className="py-5 pl-4 transition-colors hover:bg-surface-hover"
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      {/* Top row: source, topics, date */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="inline-block px-2 py-0.5 rounded text-[0.68rem] font-semibold uppercase tracking-wider bg-secondary text-muted-foreground">
          {article.source}
        </span>
        {topics.map((topic) => {
          const tc = TOPIC_COLORS[topic];
          return (
            <span
              key={topic}
              className="inline-block px-2 py-0.5 rounded text-[0.68rem] font-medium"
              style={
                tc
                  ? {
                      backgroundColor: tc.bg,
                      color: tc.text,
                      border: `1px solid ${tc.border}`,
                    }
                  : undefined
              }
            >
              {topic}
            </span>
          );
        })}
        <span className="ml-auto text-[0.7rem] text-muted-foreground whitespace-nowrap">
          {dateStr}
        </span>
      </div>

      {/* Headline */}
      <h2 className="font-serif-display text-lg font-bold leading-snug text-foreground hover:text-primary transition-colors">
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          {article.title}
        </a>
      </h2>

      {/* Summary */}
      {article.summary && (
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {article.summary}
        </p>
      )}

      {/* Read more */}
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 text-xs text-muted-foreground hover:underline"
      >
        Read full article →
      </a>
    </article>
  );
};

export default ArticleRow;
