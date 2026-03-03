import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO 3166-1 numeric codes — both "40" and "040" for Austria (TopoJSON varies)
const LIVE_COUNTRIES: Record<string, { name: string; path: string }> = {
  "276": { name: "Deutschland", path: "/de" },
  "40":  { name: "Österreich",  path: "/at" },
  "040": { name: "Österreich",  path: "/at" },
  "756": { name: "Schweiz",     path: "/ch" },
};

interface TooltipState {
  x: number;
  y: number;
  name: string;
  isLive: boolean;
}

const MapPage = () => {
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const handleMouseMove = (
    e: React.MouseEvent,
    geoId: string,
    countryName: string,
    isLive: boolean
  ) => {
    setTooltip({ x: e.clientX, y: e.clientY, name: countryName, isLive });
  };

  const handleMouseLeave = () => setTooltip(null);

  const handleClick = (geoId: string) => {
    const country = LIVE_COUNTRIES[geoId];
    if (country) navigate(country.path);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "1rem", zIndex: 10 }}>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            color: "#f5f5f0",
            letterSpacing: "-0.02em",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          shared ground
        </h1>
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: "0.85rem",
            color: "#6b6b6b",
            marginTop: "0.4rem",
            letterSpacing: "0.06em",
          }}
        >
          feministische nachrichten. weltweit.
        </p>
      </div>

      {/* Map */}
      <div style={{ width: "100%", maxWidth: "1200px", flex: 1, minHeight: 0 }}>
        <ComposableMap
          projection="geoNaturalEarth1"
          style={{ width: "100%", height: "100%" }}
          projectionConfig={{ scale: 160 }}
        >
          <ZoomableGroup center={[10, 20]} zoom={1}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoId = String(geo.id);
                  const liveData = LIVE_COUNTRIES[geoId];
                  const isLive = Boolean(liveData);
                  const countryName = liveData
                    ? liveData.name
                    : (geo.properties?.name || "");

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseMove={(e) =>
                        handleMouseMove(e, geoId, countryName, isLive)
                      }
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(geoId)}
                      style={{
                        default: {
                          fill: isLive ? "#6b21a8" : "#1e1e1e",
                          stroke: "#333",
                          strokeWidth: 0.5,
                          outline: "none",
                          cursor: isLive ? "pointer" : "default",
                          filter: isLive
                            ? "drop-shadow(0 0 6px rgba(107,33,168,0.6))"
                            : "none",
                          transition: "fill 0.15s ease",
                        },
                        hover: {
                          fill: isLive ? "#9333ea" : "#2a2a2a",
                          stroke: isLive ? "#a855f7" : "#444",
                          strokeWidth: isLive ? 1 : 0.5,
                          outline: "none",
                          cursor: isLive ? "pointer" : "default",
                          filter: isLive
                            ? "drop-shadow(0 0 10px rgba(168,85,247,0.8))"
                            : "none",
                          transition: "fill 0.15s ease",
                        },
                        pressed: {
                          fill: isLive ? "#7e22ce" : "#1e1e1e",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "1.5rem", paddingBottom: "1.5rem", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: 10, height: 10, borderRadius: "50%",
              background: "#6b21a8",
              boxShadow: "0 0 6px rgba(107,33,168,0.8)",
            }}
          />
          <span style={{ fontFamily: "sans-serif", fontSize: "0.75rem", color: "#888", letterSpacing: "0.04em" }}>
            verfügbar
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#333" }} />
          <span style={{ fontFamily: "sans-serif", fontSize: "0.75rem", color: "#888", letterSpacing: "0.04em" }}>
            bald verfügbar
          </span>
        </div>
      </div>

      {/* Nav links top right */}
      <div
        style={{
          position: "absolute", top: "1.5rem", right: "1.5rem",
          display: "flex", gap: "1.25rem", zIndex: 20,
        }}
      >
        {[
          { label: "Themen", href: "/themen" },
          { label: "Newsletter", href: "/newsletter" },
          { label: "Über uns", href: "/ueber-uns" },
        ].map((link) => (
          
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "sans-serif", fontSize: "0.75rem",
              color: "#6b6b6b", textDecoration: "none", letterSpacing: "0.04em",
            }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#f5f5f0")}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#6b6b6b")}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x + 14,
            top: tooltip.y - 36,
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: "4px",
            padding: "6px 12px",
            pointerEvents: "none",
            zIndex: 100,
          }}
        >
          <div
            style={{
              fontFamily: "sans-serif", fontSize: "0.8rem",
              color: tooltip.isLive ? "#f5f5f0" : "#888",
              fontWeight: tooltip.isLive ? 600 : 400,
            }}
          >
            {tooltip.name}
          </div>
          {tooltip.name && (
            <div
              style={{
                fontFamily: "sans-serif", fontSize: "0.7rem",
                color: tooltip.isLive ? "#a855f7" : "#555",
                marginTop: "2px",
              }}
            >
              {tooltip.isLive ? "Nachrichten lesen \u2192" : "bald verf\u00FCgbar"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapPage;
