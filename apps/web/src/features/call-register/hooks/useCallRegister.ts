"use client";

import { useMemo, useState } from "react";
import { useRedirect } from "@/hooks/useRedirect";
import { createCall } from "@/application/calls/createCall";
import type { CallOrder } from "@/domain/calls/call";

export const NINNIKU_LEVELS = ["なし", "少なめ", "普通", "マシ", "マシマシ"] as const;
export type NinnikuLevel = (typeof NINNIKU_LEVELS)[number];

export const YASAI_LEVELS = ["少なめ", "普通", "マシ", "マシマシ"] as const;
export type YasaiLevel = (typeof YASAI_LEVELS)[number];

export const ABURA_LEVELS = ["なし", "普通", "マシ", "マシマシ"] as const;
export type AburaLevel = (typeof ABURA_LEVELS)[number];

export const KARAME_LEVELS = ["普通", "マシ", "マシマシ"] as const;
export type KarameLevel = (typeof KARAME_LEVELS)[number];

export type MenuType = "all-mashi" | "all-mashimashi";

export type CallSummary = {
  title: string;
  lines: string[];
};

const LEVEL_TO_VALUE: Record<string, number | null> = {
  "少なめ": 0,
  "普通": null,
  "マシ": 1,
  "マシマシ": 2,
  "なし": 3,
};

const mapLevelToValue = (level: string): number | null => {
  if (!(level in LEVEL_TO_VALUE)) {
    throw new Error(`未対応のレベル: ${level}`);
  }
  return LEVEL_TO_VALUE[level];
};

export const useCallRegister = () => {
  const redirect = useRedirect();
  const [menu, setMenu] = useState<MenuType | null>(null);
  const [ninniku, setNinniku] = useState<NinnikuLevel>("普通");
  const [yasai, setYasai] = useState<YasaiLevel>("普通");
  const [abura, setAbura] = useState<AburaLevel>("普通");
  const [karame, setKarame] = useState<KarameLevel>("なし");

  const summary: CallSummary = useMemo(() => {
    const lines = [
      `ニンニク ${ninniku}`,
      `ヤサイ ${yasai}`,
      `アブラ ${abura}`,
      `カラメ ${karame}`,
    ];
    const title =
      menu === "all-mashi"
        ? "全マシ"
        : menu === "all-mashimashi"
        ? "全マシマシ"
        : "カスタム";
    return { title, lines };
  }, [menu, ninniku, yasai, abura, karame]);

  const issueTicket = async () => {
    console.log("issue", summary);
    const payload: CallOrder = {
      title: summary.title,
      ninniku: mapLevelToValue(ninniku),
      yasai: mapLevelToValue(yasai),
      abura: mapLevelToValue(abura),
      karame: mapLevelToValue(karame),
    };

    await createCall(payload);
    redirect("/call-play");
  };

  return {
    // state
    menu,
    ninniku,
    yasai,
    abura,
    karame,

    // constants
    NINNIKU_LEVELS,
    YASAI_LEVELS,
    ABURA_LEVELS,
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
