"use client";

import styles from "./index.module.css";
import { useState } from "react";
import { useMapboxMap } from "../../hooks/useMapboxMap";
import PostModal from "../PostModalContainer";
import type { Store } from "@/infrastructure/stores/fetchStores";
import { useMapViewController } from "../../hooks/useMapViewController";

export default function MapView() {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const { container, setRef, isLoading, error, onReady } = useMapViewController({
    zoomCurrentLocation: 13,
    onPostClick: (store) => setSelectedStore(store),
  });

  // マップの初期位置
  useMapboxMap({
    container,
    style: "mapbox://styles/mapbox/streets-v12",
    center: [135.4983, 34.7039],
    zoom: 10,
    onReady,
  });

  return (
    <>
      {/* マップ */}
      <div ref={setRef} className={styles.map} />

      {/* ローディングオーバーレイ */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner} />
          <p className={styles.loadingText}>現在地を取得してマップを準備中…</p>
          {error && <p className={styles.errorText}>{error}</p>}
        </div>
      )}

      {/* 口コミモーダル */}
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