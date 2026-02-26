"use client";

import styles from "./index.module.css";
import { useMemo, useState } from "react";
import { TicketHeader } from "../TicketHeader";
import { MenuCardPicker } from "../MenuCardPicker";
import { OptionGroup } from "../OptionGroup";
import { TicketingButton } from "../TicketingButton";

const CALL_LEVELS = ["抜き", "少なめ", "普通", "マシ", "マシマシ"] as const;
type CallLevel = (typeof CALL_LEVELS)[number];

const KARAME_LEVELS = ["なし", "カラメ", "カラカラ"] as const;
type KarameLevel = (typeof KARAME_LEVELS)[number];

export const CallRegisterPage = () => {
  const [menu, setMenu] = useState<"all-mashi" | "all-mashimashi">("all-mashi");
  const [ninniku, setNinniku] = useState<CallLevel>("普通");
  const [yasai, setYasai] = useState<CallLevel>("普通");
  const [abura, setAbura] = useState<CallLevel>("普通");
  const [karame, setKarame] = useState<KarameLevel>("なし");

  const summary = useMemo(() => {
    const lines = [
      `ニンニク ${ninniku}`,
      `ヤサイ ${yasai}`,
      `アブラ ${abura}`,
      `カラメ ${karame}`,
    ];
    const title = menu === "all-mashi" ? "全マシ" : "全マシマシ";
    return { title, lines };
  }, [menu, ninniku, yasai, abura, karame]);

  return (
    <div className={styles.page}>
      <TicketHeader />

      <div className={styles.content}>
        <MenuCardPicker value={menu} onChange={setMenu} />

        <OptionGroup title="ニンニク" options={CALL_LEVELS} value={ninniku} onChange={setNinniku} />
        <OptionGroup title="ヤサイ" options={CALL_LEVELS} value={yasai} onChange={setYasai} />
        <OptionGroup title="アブラ" options={CALL_LEVELS} value={abura} onChange={setAbura} />

        <OptionGroup title="カラメ" options={KARAME_LEVELS} value={karame} onChange={setKarame} />

        <div className={styles.issueArea}>
          <TicketingButton onClick={() => console.log("issue", summary)} />
        </div>
      </div>
    </div>
  );
};