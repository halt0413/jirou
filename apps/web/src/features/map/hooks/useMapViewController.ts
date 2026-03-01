"use client";

import { useCallback, useRef, useState } from "react";
import type mapboxgl from "mapbox-gl";
import type { Store } from "@/infrastructure/stores/fetchStores";
import { useCurrentLocationOnMap } from "./useCurrentLocationOnMap";
import { useStoresOnMap } from "./useStoresOnMap";

type Args = {
  zoomCurrentLocation: number;
  onPostClick: (store: Store) => void;
};

export function useMapViewController({ zoomCurrentLocation, onPostClick }: Args) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const didRunRef = useRef(false);

  const { loadAndRender } = useStoresOnMap({ onPostClick });
  const { goToCurrentLocation } = useCurrentLocationOnMap({ zoom: zoomCurrentLocation });

  const setRef = useCallback((node: HTMLDivElement | null) => {
    setContainer(node);
  }, []);

  const onReady = useCallback(
    (map: mapboxgl.Map) => {
      if (didRunRef.current) return;
      didRunRef.current = true;

      const run = async () => {
        setIsLoading(true);
        setError(null);

        try {
          if (!map.loaded()) {
            await new Promise<void>((r) => map.once("load", () => r()));
          }

          // 日本語化
          applyJapaneseLabels(map);
          // 簡略化
          hideRoadLabels(map);
          hideRoadShields(map);

          await goToCurrentLocation(map);
          await loadAndRender(map);
        } catch (e) {
          console.error(e);
          setError(e instanceof Error ? e.message : "読み込みに失敗しました");
        } finally {
          setIsLoading(false);
        }
      };

      run().catch(console.error);
    },
    [goToCurrentLocation, loadAndRender],
  );

  return {
    container,
    setRef,
    isLoading,
    error,
    onReady,
  };
}

// 日本語化関数
function applyJapaneseLabels(map: mapboxgl.Map) {
  const layers = map.getStyle().layers;
  layers?.forEach((layer) => {
    if (layer.type !== "symbol") return;

    const layout = layer.layout;
    if (!layout) return;

    const textField = (layout as Record<string, unknown>)["text-field"];
    if (!textField) return;

    map.setLayoutProperty(layer.id, "text-field", ["coalesce", ["get", "name_ja"], ["get", "name"]]);
  });
}

// 道路名をmapboxから消す
function hideRoadLabels(map: mapboxgl.Map) {
  const layers = map.getStyle().layers ?? [];

  for (const layer of layers) {
    // 道路名ラベルだけ対象（symbolレイヤー）
    if (
      layer.type === "symbol" &&
      layer.id.includes("road-label")
    ) {
      map.setLayoutProperty(layer.id, "visibility", "none");
    }
  }
}

// 路線番号をmapboxから消す
function hideRoadShields(map: mapboxgl.Map) {
  const layers = map.getStyle().layers ?? [];

  for (const layer of layers) {
    // ルート番号の “シールド” 系をまとめて消す
    if (
      layer.type === "symbol" &&
      (layer.id.includes("road-shield") ||
        layer.id.includes("road-number") ||
        layer.id.includes("route") ||
        layer.id.includes("shield"))
    ) {
      map.setLayoutProperty(layer.id, "visibility", "none");
    }
  }
}