import { useEffect, useMemo, useState } from "react";
import { getCalls } from "@/application/calls/getCalls";
import type { CallResponse } from "@/infrastructure/calls/callsApi";
import { speakCallLines } from "@/infrastructure/voicevox/voicevoxClient";

const mapLevelLabel = (value: number | string | null | undefined) => {
  if (value === null || value === undefined) {
    return "";
  }
  const normalized = Number(value);
  if (Number.isNaN(normalized)) {
    return "";
  }
  switch (normalized) {
    case 0:
      return "少なめ";
    case 1:
      return "マシ";
    case 2:
      return "マシマシ";
    case 3:
      return "なし";
    default:
      return "";
  }
};

const formatLine = (label: string, valueLabel: string) =>
  valueLabel ? `${label} ${valueLabel}` : label;

const buildMenuLine = (call: CallResponse) => {
  if (call.masimasi === 1) {
    return "全マシマシ";
  }
  if (call.masi === 1) {
    return "全マシ";
  }
  return "";
};

const buildLines = (call: CallResponse) => {
  const menuLine = buildMenuLine(call);
  if (menuLine) {
    return [menuLine];
  }
  return [
    formatLine("ニンニク", mapLevelLabel(call.ninniku)),
    formatLine("ヤサイ", mapLevelLabel(call.yasai)),
    formatLine("アブラ", mapLevelLabel(call.abura)),
    formatLine("カラメ", mapLevelLabel(call.karame)),
  ];
};

export const useCallsPlay = () => {
  const [calls, setCalls] = useState<CallResponse[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const data = await getCalls();
      if (cancelled) {
        return;
      }
      const sorted = [...data].sort(
        (a, b) => Number(b.id) - Number(a.id)
      );
      setCalls(sorted);
      if (sorted.length > 0) {
        setSelectedId(String(sorted[0].id));
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedCall = useMemo(
    () => calls.find((call) => String(call.id) === selectedId) ?? null,
    [calls, selectedId]
  );

  const options = useMemo(
    () =>
      calls.map((call) => ({
        id: String(call.id),
        label: call.title ?? `コール ${call.id}`,
      })),
    [calls]
  );

  const lines = selectedCall ? buildLines(selectedCall) : [];
  const playVoice = async () => {
    if (!selectedCall) {
      return;
    }
    const text = `${lines.join("、")}でお願いします。`;
    await speakCallLines(text);
  };

  return {
    calls,
    options,
    selectedId,
    setSelectedId,
    lines,
    selectedCall,
    playVoice,
  };
};
