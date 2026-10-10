import { ImageResponse } from "next/og";
import { site } from "@/data/portfolio";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social-sharing card: the name on paper, with the red margin line. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f5f2ea",
          color: "#1c1a17",
        }}
      >
        <div style={{ width: 96, borderRight: "3px solid #b3301b", display: "flex" }} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 72px 72px 64px",
          }}
        >
          <div style={{ fontSize: 26, letterSpacing: 4, color: "#615b51", display: "flex" }}>
            {`${site.school} / ${site.location}`.toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 104, lineHeight: 1, letterSpacing: -3, display: "flex" }}>
              {site.name}
            </div>
            <div style={{ width: 420, height: 6, background: "#b3301b", marginTop: 28 }} />
            <div style={{ fontSize: 38, marginTop: 36, color: "#3a362f", display: "flex" }}>
              {site.role}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
