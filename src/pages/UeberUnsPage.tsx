import Masthead from "@/components/Masthead";
import SiteFooter from "@/components/SiteFooter";

const QUELLEN = {
  "Allgemeine Nachrichten (nach Keywords gefiltert)": [
    "Der Spiegel", "Zeit Online", "Süddeutsche Zeitung", "taz",
    "Frankfurter Rundschau", "Der Standard", "Der Falter", "NZZ",
    "SRF News", "ARD", "ZDF", "ORF", "Deutschlandfunk", "MDR", "WDR", "RBB",
  ],
  "Feministische Publikationen (alle Artikel)": ["EMMA", "Missy Magazine"],
  "LGBTQIA+ Publikationen (alle Artikel)": ["queer.de", "L-MAG"],
};

const KEYWORDS = {
  "Frauen & Feminismus": [
    "Frauen", "Frau", "Feminismus", "Gleichstellung", "Lohnlücke",
    "reproduktive Rechte", "Abtreibung", "Frauenrechte", "Sexismus",
    "Misogynie", "Patriarchat", "Periodenarmut", "Frauengesundheit",
    "häusliche Gewalt", "sexuelle Belästigung", "Femizid", "Elternzeit",
    "körperliche Selbstbestimmung", "Verhütung", "IVF",
  ],
  "LGBTQIA+": [
    "LGBT", "queer", "schwul", "lesbisch", "bisexuell", "transgender",
    "trans", "nicht-binär", "intersexuell", "asexuell", "Pride",
    "Coming Out", "Homo-Ehe", "Trans-Rechte", "Homophobie", "Transphobie",
    "Pronomen", "Drag Queen", "Diskriminierung", "Gleichheit",
    "Gerechtigkeit", "Aktivismus",
  ],
};

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
          für feministische, queere und LGBTQIA+ Berichterstattung aus dem
          deutschsprachigen Raum. Wir machen Nachrichten sichtbar, die
          normalerweise untergehen. Artikel werden alle 12 Stunden aus
          RSS-Feeds bezogen.
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

        <SectionHeading>Keywords</SectionHeading>
        <p className="text-[0.9rem] text-muted-foreground leading-relaxed mb-6">
          Allgemeine Nachrichtenquellen werden nur aufgenommen wenn sie
          mindestens eines dieser Keywords enthalten.
        </p>
        {Object.entries(KEYWORDS).map(([kategorie, woerter]) => (
          <div key={kategorie} className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
              {kategorie}
            </p>
            <p className="text-[0.8rem] text-muted-foreground leading-relaxed">
              {woerter.join(", ")}
            </p>
          </div>
        ))}

        <SectionHeading>Kontakt</SectionHeading>
        <p className="text-[0.9rem] text-muted-foreground leading-relaxed">
          Fragen, Feedback oder Quellenvorschlaege?
          <a href="mailto:alexandra.d.brandl@gmail.com" className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"> Schreib uns.</a>
        </p>

        <p className="mt-12 text-xs text-muted-foreground border-t border-border pt-4">
          shared ground · Aktualisierung alle 12 Stunden · Unabhängig & kostenlos
        </p>

      </main>
      <SiteFooter />
    </div>
  );
};

export default UeberUnsPage;
