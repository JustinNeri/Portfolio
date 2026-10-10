import { ImageResponse } from "next/og";
import { site } from "@/data/portfolio";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social-sharing card: the name in off-white on charcoal, with one purple rule. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#151518",
          color: "#ebe9e4",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 4, color: "#a09fa8", display: "flex" }}>
          {`${site.school} / ${site.location}`.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, lineHeight: 1, letterSpacing: -4, display: "flex" }}>
            {site.name}
          </div>
          <div style={{ width: 120, height: 5, background: "#b3a4f5", marginTop: 36 }} />
          <div style={{ fontSize: 36, marginTop: 36, color: "#a09fa8", display: "flex" }}>
            {site.role}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
