export const API_BASE = "https://roundup-briefs-germany.onrender.com";
export interface Article {
  id: number;
  title: string;
  link: string;
  summary: string;
  source: string;
  country: string;
  category: string;
  tags: string;
  topics: string;
  scraped_at: string;
  published_at?: string;
}
export interface Stats {
  total: number;
  lgbtqia_plus: number;
  women: number;
  last_scraped: string;
}
export const TOPICS = [
  { label: "Alle Themen", emoji: "✨" },
  { label: "Reproduktive Rechte", emoji: "🩺" },
  { label: "Lohnlücke & Wirtschaft", emoji: "💰" },
  { label: "LGBTQIA+", emoji: "🏳️‍🌈" },
  { label: "Migration & Asyl", emoji: "🌍" },
  { label: "Menschenrechte", emoji: "⚖️" },
  { label: "Gesundheit & Medizin", emoji: "🏥" },
  { label: "Recht & Politik", emoji: "📜" },
  { label: "Politik & Regierung", emoji: "🏛️" },
  { label: "Kultur & Medien", emoji: "🎭" },
  { label: "Sport", emoji: "⚽" },
  { label: "Gewalt & Sicherheit", emoji: "🛡️" },
  { label: "Arbeit & Wirtschaft", emoji: "💼" },
] as const;
export const TIME_RANGES = [
  { label: "Heute", value: "today" },
] as const;
export const TOPIC_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Reproduktive Rechte":  { bg: "#FFE5EF", text: "#C8003C", border: "#F0ADC8" },
  "Lohnlücke & Wirtschaft": { bg: "#FFF3E0", text: "#E65100", border: "#FFCC80" },
  "LGBTQIA+":             { bg: "#EDE7F6", text: "#4A1FA8", border: "#B39DDB" },
  "Migration & Asyl":     { bg: "#E0F7FA", text: "#006064", border: "#80DEEA" },
  "Menschenrechte":       { bg: "#FFEBEE", text: "#B71C1C", border: "#EF9A9A" },
  "Gesundheit & Medizin": { bg: "#E8F5E9", text: "#1B5E20", border: "#A5D6A7" },
  "Recht & Politik":      { bg: "#F3E5F5", text: "#4A148C", border: "#CE93D8" },
  "Politik & Regierung":  { bg: "#E3F2FD", text: "#0D47A1", border: "#90CAF9" },
  "Kultur & Medien":      { bg: "#FFF8E1", text: "#E65100", border: "#FFD54F" },
  "Sport":                { bg: "#E8F5E9", text: "#2E7D32", border: "#81C784" },
  "Gewalt & Sicherheit":  { bg: "#FFEBEE", text: "#C62828", border: "#EF9A9A" },
  "Arbeit & Wirtschaft":  { bg: "#ECEFF1", text: "#37474F", border: "#B0BEC5" },
};
export const LGBTQIA_SOURCES = new Set([
  "queer.de", "L-MAG",
]);
export const FEMINIST_SOURCES = new Set([
  "EMMA",
]);
export function getSourceBorderColor(source: string): string {
  if (LGBTQIA_SOURCES.has(source)) return "#4A1FA8";
  if (FEMINIST_SOURCES.has(source)) return "#D4006A";
  return "#C8C4BA";
}
