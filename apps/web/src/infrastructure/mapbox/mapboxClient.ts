import mapboxgl from "mapbox-gl";

export function initMapbox(token: string) {
  const t = token.replaceAll('"', "").trim();
  if (!t) throw new Error("NEXT_PUBLIC_MAPBOX_TOKEN is missing");
  mapboxgl.accessToken = t;
}