"use client";

import { useMemo, useState } from "react";

export const CALL_LEVELS = ["抜き", "少なめ", "普通", "マシ", "マシマシ"] as const;
export type CallLevel = (typeof CALL_LEVELS)[number];

export const KARAME_LEVELS = ["なし", "カラメ", "カラカラ"] as const;
export type KarameLevel = (typeof KARAME_LEVELS)[number];

export type MenuType = "all-mashi" | "all-mashimashi";

export type CallSummary = {
  title: string;
  lines: string[];
};

export const useCallRegister = () => {
  const [menu, setMenu] = useState<MenuType>("all-mashi");
  const [ninniku, setNinniku] = useState<CallLevel>("普通");
  const [yasai, setYasai] = useState<CallLevel>("普通");
  const [abura, setAbura] = useState<CallLevel>("普通");
  const [karame, setKarame] = useState<KarameLevel>("なし");

  const summary: CallSummary = useMemo(() => {
    const lines = [
      `ニンニク ${ninniku}`,
      `ヤサイ ${yasai}`,
      `アブラ ${abura}`,
      `カラメ ${karame}`,
    ];
    const title = menu === "all-mashi" ? "全マシ" : "全マシマシ";
    return { title, lines };
  }, [menu, ninniku, yasai, abura, karame]);

  const issueTicket = () => {
    console.log("issue", summary);
  };

  return {
    // state
    menu,
    ninniku,
    yasai,
    abura,
    karame,

    // constants
    CALL_LEVELS,
    KARAME_LEVELS,

    // derived
    summary,

    // actions
    setMenu,
    setNinniku,
    setYasai,
    setAbura,
    setKarame,
    issueTicket,
  };
};