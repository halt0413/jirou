"use client";

import { useCallback, useRef } from "react";
import mapboxgl from "mapbox-gl";

type Options = {
  zoom?: number;
};

export function useCurrentLocationOnMap(options: Options = {}) {
  const { zoom = 15 } = options;

  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const placeOrMoveUserMarker = useCallback((map: mapboxgl.Map, lng: number, lat: number) => {
    if (userMarkerRef.current) {
      userMarkerRef.current.setLngLat([lng, lat]);
      return;
    }

    const el = document.createElement("div");
    el.style.width = "20px";
    el.style.height = "20px";
    el.style.borderRadius = "50%";
    el.style.background = "yellow";
    el.style.border = "3px solid black";
    el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
    el.style.transform = "translate(-50%, -50%)";

    userMarkerRef.current = new mapboxgl.Marker({ element: el })
      .setLngLat([lng, lat])
      .addTo(map);
  }, []);

  const goToCurrentLocation = useCallback(
    (map: mapboxgl.Map) => {
      if (!("geolocation" in navigator)) {
        console.log("[geo] geolocation not available");
        return;
      }

      console.log("[geo] requesting...");

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lng = pos.coords.longitude;
          const lat = pos.coords.latitude;

          console.log("[geo] success", { lat, lng });

          map.flyTo({ center: [lng, lat], zoom, essential: true });
          placeOrMoveUserMarker(map, lng, lat);
        },
        (err) => {
          console.log("[geo] error", err.code, err.message);
        },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
      );
    },
    [placeOrMoveUserMarker, zoom]
  );

  return { goToCurrentLocation };
}