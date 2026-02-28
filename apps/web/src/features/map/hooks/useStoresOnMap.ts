"use client";

import { useCallback, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { fetchStores, type Store } from "@/infrastructure/stores/fetchStores";
import { createGooglePinElement } from "@/infrastructure/mapbox/markers/createGooglePinElement";

export function useStoresOnMap() {
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const clear = useCallback(() => {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
  }, []);

  const loadAndRender = useCallback(
    async (map: mapboxgl.Map) => {
      const stores = await fetchStores();

      clear();

      for (const s of stores) {
        const el = createGooglePinElement();

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([s.lng, s.lat])
          .setPopup(new mapboxgl.Popup({ offset: 12 }).setText(s.name))
          .addTo(map);

        markersRef.current.push(marker);
      }

      return stores.length;
    },
    [clear]
  );

  return { loadAndRender, clear };
}