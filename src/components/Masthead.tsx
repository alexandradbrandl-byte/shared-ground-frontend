import { type Stats } from "@/lib/constants";
import { format } from "date-fns";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

interface MastheadProps {
  stats?: Stats | null;
}

const NAV_LINKS = [
  { label: "News Feed", to: "/" },
  { label: "Analysis", to: "/analysis" },
  { label: "Über uns", to: "/ueber-uns" },
  { label: "Newsletter", to: "/newsletter" },
];

const Masthead = ({ stats }: MastheadProps) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScraped = stats?.last_scraped
    ? format(new Date(stats.last_scraped), "d MMM yyyy, HH:mm")
    : null;

  return (
    <header className="max-w-[1100px] mx-auto px-4 pt-6 pb-4">
      <div className="flex flex-col items-center gap-3 sm:relative sm:flex sm:flex-row sm:items-center sm:justify-between sm:min-h-[4.5rem] sm:gap-0">

        <div className="text-center sm:absolute sm:inset-0 sm:flex sm:flex-col sm:items-center sm:justify-center pointer-events-none select-none">
          <Link to="/" className="pointer-events-auto">
            <h1 className="font-serif-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity">
              shared ground
            </h1>
          </Link>
          <p className="mt-1 text-sm text-muted-foreground font-sans">
            deine nachrichten. deine perspektive.
          </p>
        </div>

        <div className="flex items-center gap-3 sm:ml-auto sm:flex-col sm:items-end sm:gap-2 relative z-10">
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col gap-1.5 p-1 text-foreground hover:opacity-70 transition-opacity"
              aria-label="Menu öffnen"
            >
              <span className="block w-5 h-0.5 bg-current" />
              <span className="block w-5 h-0.5 bg-current" />
              <span className="block w-5 h-0.5 bg-current" />
            </button>
          </div>

          {location.pathname === "/" && stats && (
            <div className="hidden sm:block text-right text-xs text-muted-foreground uppercase tracking-wider font-sans leading-relaxed">
              <div>{stats.total.toLocaleString()} Artikel</div>
              {lastScraped && <div>Aktualisiert {lastScraped}</div>}
            </div>
          )}
        </div>
      </div>

      <hr className="mt-4 border-border" />

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          <div className="flex justify-between items-center px-6 pt-8 pb-6 border-b border-border">
            <span className="font-serif-display text-2xl font-bold text-foreground">shared ground</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-2xl text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Menu schließen"
            >
              ✕
            </button>
          </div>
          <nav className="flex flex-col px-6 pt-8 gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`font-serif-display text-3xl font-bold transition-opacity ${
                  location.pathname === link.to
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Masthead;
