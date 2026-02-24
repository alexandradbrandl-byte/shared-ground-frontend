import { Link } from "react-router-dom";
import Masthead from "@/components/Masthead";
import SiteFooter from "@/components/SiteFooter";

const THEMEN = [
  {
    emoji: "♀️",
    label: "Frauen & Feminismus",
    beschreibung: "Gleichstellung, Lohnlücke, reproduktive Rechte, Frauengesundheit, häusliche Gewalt, Femizid, körperliche Selbstbestimmung und mehr.",
    keywords: ["Frauen", "Frau", "Feminismus", "Gleichstellung", "Lohnlücke", "reproduktive Rechte", "Abtreibung", "Frauenrechte", "Sexismus", "Misogynie", "Patriarchat", "Periodenarmut", "Frauengesundheit", "häusliche Gewalt", "sexuelle Belästigung", "Femizid", "Elternzeit", "körperliche Selbstbestimmung", "Verhütung", "IVF"],
  },
  {
    emoji: "🏳️‍🌈",
    label: "LGBTQIA+",
    beschreibung: "Queer-Rechte, Trans-Sichtbarkeit, Homophobie, Pride, Coming Out, Gleichstellung und gesellschaftliche Akzeptanz.",
    keywords: ["LGBT", "queer", "schwul", "lesbisch", "bisexuell", "transgender", "trans", "nicht-binär", "intersexuell", "asexuell", "Pride", "Coming Out", "Homo-Ehe", "Trans-Rechte", "Homophobie", "Transphobie", "Pronomen", "Drag Queen", "Diskriminierung", "Gleichheit", "Gerechtigkeit", "Aktivismus"],
  },
];

const ThemenPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Masthead />
      <main className="max-w-[1100px] mx-auto px-4 py-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-8 font-sans">
          Themen
        </h2>
        <p className="text-[0.95rem] text-muted-foreground font-sans mb-10 max-w-[600px]">
          Shared Ground bündelt Nachrichten aus zwei Themenbereichen. Klicke auf ein Thema um direkt zum gefilterten Feed zu gelangen.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {THEMEN.map((thema) => (
            <Link
              key={thema.label}
              to={`/?topic=${encodeURIComponent(thema.label)}`}
              className="group block border border-border rounded-sm p-6 hover:border-foreground transition-colors bg-background"
            >
              <div className="text-4xl mb-4">{thema.emoji}</div>
              <h3 className="font-serif-display text-xl font-semibold text-foreground mb-3 group-hover:underline underline-offset-2">
                {thema.label}
              </h3>
              <p className="text-[0.85rem] text-muted-foreground font-sans leading-relaxed mb-4">
                {thema.beschreibung}
              </p>
              <p className="text-[0.75rem] text-muted-foreground font-sans leading-relaxed">
                {thema.keywords.join(" · ")}
              </p>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ThemenPage;
