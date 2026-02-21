import { type Stats } from "@/lib/constants";
import { format } from "date-fns";
import ThemeToggle from "./ThemeToggle";

interface MastheadProps {
  stats: Stats | null;
  showAbout: boolean;
  onAboutToggle: () => void;
}

const Masthead = ({ stats, showAbout, onAboutToggle }: MastheadProps) => {
  const lastScraped = stats?.last_scraped
    ? format(new Date(stats.last_scraped), "d MMM yyyy, HH:mm")
    : null;

  return (
    <header className="max-w-[1100px] mx-auto px-4 pt-6 pb-4">
      <div className="flex flex-col items-center gap-3 sm:relative sm:flex sm:flex-row sm:items-center sm:justify-between sm:min-h-[4.5rem] sm:gap-0">

        {/* Titel */}
        <div className="text-center sm:absolute sm:inset-0 sm:flex sm:flex-col sm:items-center sm:justify-center pointer-events-none select-none">
          <h1 className="font-serif-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            shared ground
          </h1>
          <p className="mt-1 text-sm text-muted-foreground font-sans">
            deine nachrichten. deine perspektive.
          </p>
        </div>

        {/* Steuerung */}
        <div className="flex items-center gap-3 sm:ml-auto sm:flex-col sm:items-end sm:gap-2 relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={onAboutToggle}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-sans"
            >
              {showAbout ? "← zurück" : "über uns"}
            </button>
            <ThemeToggle />
          </div>
          {!showAbout && stats && (
            <div className="hidden sm:block text-right text-xs text-muted-foreground uppercase tracking-wider font-sans leading-relaxed">
              <div>{stats.total.toLocaleString()} Artikel</div>
              {lastScraped && <div>Aktualisiert {lastScraped}</div>}
            </div>
          )}
        </div>
      </div>

      <hr className="mt-4 border-border" />
    </header>
  );
};

export default Masthead;
