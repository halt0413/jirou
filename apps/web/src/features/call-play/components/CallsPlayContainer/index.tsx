"use client";

import styles from "./index.module.css";
import { CallSelect } from "../CallSelect";
import { TicketCard } from "../TicketCard";
import { PlayButton } from "../PlayButton";
import { Button } from "@/components/Button";
import { useCallsPlay } from "../../hooks/useCallsPlay";
import { useRedirect } from "@/hooks/useRedirect";

export const CallsPlayPage = () => {
  const { options, selectedId, setSelectedId, lines, playVoice } =
    useCallsPlay();
  const redirect = useRedirect();

  return (
    <div className={styles.page}>
      {/* ヘッダー */}
      <header className={styles.header}>
        コール呼び出し
      </header>

      {/* セレクト */}
      <div>
        <CallSelect
          options={options}
          value={selectedId}
          onChange={setSelectedId}
        />
      </div>

      {/* 食券カード */}
      <TicketCard
        lines={lines}
        shopText="ラーメン二郎 ○○店"
        timeText="11:55"
      />

      {/* 再生ボタン */}
      <PlayButton onClick={playVoice} />

      {/* 下ボタン */}
      <div className={styles.bottomButtons}>
        <Button variant="danger">削除</Button>
        <Button variant="success" onClick={() => redirect("/call-register")}>
          新規登録
        </Button>
      </div>
    </div>
  );
}
