"use client";

import styles from "./index.module.css";
import { useCallback, useState } from "react";
import { useMapboxMap } from "../../hooks/useMapboxMap";
import { useCurrentLocationOnMap } from "../../hooks/useCurrentLocationOnMap";
import { useStoresOnMap } from "../../hooks/useStoresOnMap";
import PostModal from "../PostModalContainer";
import type { Store } from "@/infrastructure/stores/fetchStores";

export default function MapView() {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const { loadAndRender } = useStoresOnMap({
    onPostClick: (store) => setSelectedStore(store),
  });

  const setRef = useCallback((node: HTMLDivElement | null) => {
    setContainer(node);
  }, []);

  const { goToCurrentLocation } = useCurrentLocationOnMap({ zoom: 15 });

  useMapboxMap({
  container,
  style: "mapbox://styles/mapbox/streets-v12",
  center: [135.4983, 34.7039],
  zoom: 10,
  onReady: (map) => {
    const run = async () => {
      if (!map.loaded()) await new Promise<void>((r) => map.once("load", () => r()));

      // 現在地の中心移動＋現在地ピン
      await goToCurrentLocation(map);

      // 店舗ピン表示
      await loadAndRender(map);
    };

    run().catch(console.log);
  },
});

  return (
    <>
      <div ref={setRef} className={styles.map} />;

      {selectedStore && (
        <PostModal
          storeName={selectedStore.name}
          onClose={() => setSelectedStore(null)}
          onPosted={(id) => console.log("posted id:", id)}
        />
      )}
    </>
  )
}