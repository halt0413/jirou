"use client";

import styles from "./CallsPlayContainer.module.css";
import { useState } from "react";
import { CallSelect } from "./CallSelect";
import { TicketCard } from "./TicketCard";
import { PlayButton } from "./PlayButton";
import { Button } from "@/shared/ui/Button";

export const CallsPlayPage = () => {
  const [selectedId, setSelectedId] = useState("1");

  return (
    <div className={styles.page}>
      {/* ヘッダー */}
      <header className={styles.header}>
        コール呼び出し
      </header>

      {/* セレクト */}
      <div>
        <CallSelect
          options={[{ id: "1", label: "全マシ" }]}
          value={selectedId}
          onChange={setSelectedId}
        />
      </div>

      {/* 食券カード */}
      <TicketCard
        lines={["ニンニク マシ", "ヤサイ マシ", "アブラ マシ", "カラメ"]}
        shopText="ラーメン二郎 ○○店"
        timeText="11:55"
      />

      {/* 再生ボタン */}
      <PlayButton onClick={() => console.log("play")} />

      {/* 下ボタン */}
      <div className={styles.bottomButtons}>
        <Button variant="danger">削除</Button>
        <Button variant="success">新規登録</Button>
      </div>
    </div>
  );
}