import mapboxgl from "mapbox-gl";

type CreateMapOptions = {
  container: HTMLDivElement;
  center: [number, number];
  zoom: number;
  style: string;
};

export function createMap({ container, center, zoom, style }: CreateMapOptions) {
  return new mapboxgl.Map({ container, center, zoom, style });
}