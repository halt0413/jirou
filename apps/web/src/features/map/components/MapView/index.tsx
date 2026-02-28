"use client";

import styles from "./index.module.css";
import { useCallback, useState } from "react";
import { useMapboxMap } from "../../hooks/useMapboxMap";
import { useCurrentLocationOnMap } from "../../hooks/useCurrentLocationOnMap";

export default function MapView() {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    setContainer(node);
  }, []);

  const { goToCurrentLocation } = useCurrentLocationOnMap({ zoom: 15 });

  useMapboxMap({
    container,
    style: "mapbox://styles/mapbox/streets-v12",
    center: [135.4983, 34.7039],
    zoom: 14,
    onReady: (map) => {
      // map style読み込み後に実行（より確実）
      if (map.loaded()) goToCurrentLocation(map);
      else map.once("load", () => goToCurrentLocation(map));
    },
  });

  return <div ref={setRef} className={styles.map} />;
}