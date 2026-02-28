"use client";

import { useCallback, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { createCurrentLocationMarkerElement } from "@/infrastructure/mapbox/markers/createCurrentLocationMarkerElement";
import { getCurrentPosition } from "@/infrastructure/geolocation/getCurrentPosition";

type Options = { zoom?: number };

export function useCurrentLocationOnMap(options: Options = {}) {
  const { zoom = 15 } = options;
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const placeOrMoveUserMarker = useCallback(
    (map: mapboxgl.Map, lng: number, lat: number) => {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLngLat([lng, lat]);
        return;
      }

      const el = createCurrentLocationMarkerElement();
      userMarkerRef.current = new mapboxgl.Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(map);
    },
    []
  );

  const goToCurrentLocation = useCallback(
    async (map: mapboxgl.Map) => {
      try {
        const { lat, lng } = await getCurrentPosition();

        // 初回はjumpTo推奨
        map.jumpTo({ center: [lng, lat], zoom });

        placeOrMoveUserMarker(map, lng, lat);
      } catch (e: unknown) {
        if (e instanceof GeolocationPositionError) {
          console.log("[geo] error", e.code, e.message);
        } else if (e instanceof Error) {
          console.log("[geo] error", e.message);
        } else {
          console.log("[geo] unknown error", e);
        }
      }
    },
    [placeOrMoveUserMarker, zoom]
  );

  return { goToCurrentLocation };
}