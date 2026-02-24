import Masthead from "@/components/Masthead";
import SiteFooter from "@/components/SiteFooter";

const KEYWORDS = {
  "Frauen & Feminismus": [
    "Frauen", "Frau", "Mädchen", "weiblich", "Feminismus", "feministisch",
    "Gleichstellung", "Gender Pay Gap", "gleicher Lohn", "Lohnlücke",
    "reproduktive Rechte", "Abtreibung", "Schwangerschaft", "Mutterschaft",
    "Frauenrechte", "Sexismus", "Misogynie", "Patriarchat", "Periodenarmut",
    "Menstruation", "Frauengesundheit", "häusliche Gewalt", "geschlechtsspezifische Gewalt",
    "sexuelle Belästigung", "sexueller Übergriff", "Vergewaltigung", "MeToo",
    "Femizid", "Zwangsheirat", "Frauen in Führungspositionen", "gläserne Decke",
    "Elternzeit", "Mutterschutz", "Leihmutterschaft", "reproduktive Gerechtigkeit",
    "körperliche Selbstbestimmung", "Menschenhandel", "Essstörung",
    "Verhütung", "IVF", "Stillen",
  ],
  "LGBTQIA+": [
    "LGBT", "LGBTQ", "LGBTQIA", "queer", "schwul", "lesbisch", "bisexuell",
    "transgender", "trans", "nicht-binär", "nonbinary", "intersexuell", "asexuell",
    "pansexuell", "Pride", "Pride Parade", "Coming Out", "Homo-Ehe", "Trans-Rechte",
    "Ehegleichstellung", "Regenbogen", "Homophobie", "Transphobie", "Biphobie",
    "Konversionstherapie", "geschlechtsangleichend", "Geschlechtsidentität",
    "Pronomen", "Drag Queen", "Queer-Community",
  ],
  "Migration & Asyl": [
    "Migration", "Migrant", "Flüchtling", "Asyl", "Asylsuchende", "geflüchtet",
    "Abschiebung", "Grenze", "Visum", "Staatsbürgerschaft", "Staatenlosigkeit",
    "Abschiebehaft", "Vertreibung", "Diaspora", "Xenophobie", "Menschenhandel",
  ],
  "Menschenrechte": [
    "Menschenrechte", "Bürgerrechte", "Diskriminierung", "Vorurteil",
    "Gleichheit", "Gerechtigkeit", "Unterdrückung", "Verfolgung", "Minderheitenrechte",
    "indigene Rechte", "Rassismus", "Antirassismus", "Protest", "Aktivismus",
    "Zensur", "Pressefreiheit", "Genozid", "Kriegsverbrechen", "Behindertenrechte",
  ],
};

const QUELLEN = {
  "Allgemeine Nachrichten (nach Keywords gefiltert)": [
    "Der Spiegel", "Zeit Online", "Süddeutsche Zeitung", "taz", "Frankfurter Rundschau",
    "Der Standard", "Der Falter", "NZZ", "SRF News", "ARD", "ZDF", "ORF",
    "Deutschlandfunk", "MDR", "WDR", "RBB",
  ],
  "Feministische Publikationen (alle Artikel)": [
    "EMMA", "Missy Magazine",
  ],
  "LGBTQIA+ Publikationen (alle Artikel)": [
    "queer.de", "L-MAG",
  ],
};

const THEMEN_LISTE = [
  { emoji: "🩺", label: "Reproduktive Rechte" },
  { emoji: "💰", label: "Lohnlücke & Wirtschaft" },
  { emoji: "🏳️‍🌈", label: "LGBTQIA+" },
  { emoji: "🌍", label: "Migration & Asyl" },
  { emoji: "⚖️", label: "Menschenrechte" },
  { emoji: "🏥", label: "Gesundheit & Medizin" },
  { emoji: "📜", label: "Recht & Justiz" },
  { emoji: "🏛️", label: "Politik & Gesellschaft" },
  { emoji: "🎭", label: "Kultur & Medien" },
  { emoji: "⚽", label: "Sport" },
  { emoji: "🛡️", label: "Gewalt & Sicherheit" },
  { emoji: "💼", label: "Arbeit & Wirtschaft" },
];

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-4 mt-10 font-sans">
    {children}
  </h2>
);

const UeberUnsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Masthead />

      <main className="max-w-[700px] mx-auto px-4 py-8 font-sans">

        <p className="text-[0.95rem] text-foreground leading-relaxed">
          <strong>shared ground</strong> ist ein unabhängiger Nachrichtenaggregator
          für feministische, queere und LGBTQIA+ Berichterstattung aus dem deutschsprachigen Raum.
          Wir machen Nachrichten sichtbar, die normalerweise untergehen, weil sie keine Headliner sind.
          Artikel werden alle 12 Stunden aus RSS-Feeds bezogen (MEZ). Nur öffentlich zugängliche
          Artikel werden angezeigt — Paywalled-Inhalte erscheinen möglicherweise nicht.
        </p>

        <SectionHeading>Unsere Quellen</SectionHeading>
        {Object.entries(QUELLEN).map(([kategorie, namen]) => (
          <div key={kategorie} className="mb-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
              {kategorie}
            </p>
            <p className="text-[0.9rem] text-foreground leading-relaxed">
              {namen.join(" · ")}
            </p>
          </div>
        ))}

        <p className="text-[0.9rem] text-muted-foreground leading-relaxed mb-6">
          Bei allgemeinen Nachrichtenquellen werden Artikel nur aufgenommen, wenn sie mindestens
          eines der folgenden Keywords in Titel oder Zusammenfassung enthalten.
          Spezialpublikationen (Feminismus, LGBTQIA+) werden vollständig übernommen.
        </p>
