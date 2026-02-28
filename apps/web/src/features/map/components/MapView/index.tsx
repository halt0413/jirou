"use client";

import styles from "./index.module.css";
import { useCallback, useState } from "react";
import { useMapboxMap } from "../../hooks/useMapboxMap";

export default function MapView() {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    setContainer(node);
  }, []);

  useMapboxMap({
    container,
    style: "mapbox://styles/mapbox/streets-v12",
    center: [135.4983, 34.7039],
    zoom: 14,
  });

  return <div ref={setRef} className={styles.map} />;
}