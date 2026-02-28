import mapboxgl from "mapbox-gl";

export function addDefaultControls(map: mapboxgl.Map) {
  map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
}