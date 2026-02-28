"use client";

import { useCallback, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { fetchStores, type Store } from "@/infrastructure/stores/fetchStores";
import { createGooglePinElement } from "@/infrastructure/mapbox/markers/createGooglePinElement";

type Options = {
  onPostClick?: (store: Store) => void;
};

export function useStoresOnMap(options: Options = {}) {
  const { onPostClick } = options;

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

        // PopupのDOMを作る
        const popupEl = document.createElement("div");
        popupEl.style.display = "flex";
        popupEl.style.flexDirection = "column";
        popupEl.style.gap = "8px";

        const title = document.createElement("div");
        title.textContent = s.name;
        title.style.fontWeight = "700";

        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "口コミを投稿";
        btn.style.padding = "8px 10px";
        btn.style.borderRadius = "10px";
        btn.style.border = "1px solid #ddd";
        btn.style.cursor = "pointer";

        btn.onclick = () => onPostClick?.(s);

        popupEl.appendChild(title);
        popupEl.appendChild(btn);

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([s.lng, s.lat])
          .setPopup(new mapboxgl.Popup({ offset: 12 }).setDOMContent(popupEl)) // ✅ DOM popup
          .addTo(map);

        markersRef.current.push(marker);
      }

      return stores.length;
    },
    [clear, onPostClick]
  );

  return { loadAndRender, clear };
}