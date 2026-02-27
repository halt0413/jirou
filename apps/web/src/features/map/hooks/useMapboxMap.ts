"use client";

import { useEffect, useRef } from "react";
import { initMapbox } from "@/infrastructure/mapbox/mapboxClient";
import { createMap } from "@/infrastructure/mapbox/createMap";
import { addDefaultControls } from "@/infrastructure/mapbox/addControls";

type Options = {
  container: HTMLDivElement | null;
  center: [number, number];
  zoom: number;
  style: string;
};

export const useMapboxMap = ({ container, center, zoom, style }: Options) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!container) return;
    if (mapRef.current) return;

    initMapbox(process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "");

    const map = createMap({ container, center, zoom, style });
    addDefaultControls(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [container, center, zoom, style]);

  return { mapRef };
};