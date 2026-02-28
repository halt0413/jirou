"use client";

import styles from "./index.module.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { MapSearchBar } from "../MapSearchBar";

const MapView = dynamic(() => import("../MapView"), { ssr: false });

export const MapPage = () => {
  const [q, setQ] = useState("");

  return (
    <div className={styles.page}>
      <div className={styles.mapLayer}>
        <MapView />
      </div>

      <MapSearchBar
        value={q}
        onChange={setQ}
        onMenuClick={() => console.log("menu")}
        onSearchClick={() => console.log("search", q)}
      />
    </div>
  );
};