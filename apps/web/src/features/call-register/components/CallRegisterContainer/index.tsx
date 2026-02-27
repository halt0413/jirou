"use client";

import styles from "./index.module.css";
import { TicketHeader } from "../TicketHeader";
import { MenuCardPicker } from "../MenuCardPicker";
import { OptionGroup } from "../OptionGroup";
import { TicketingButton } from "../TicketingButton";
import type { CallLevel, KarameLevel, MenuType } from "../../hooks/useCallRegister";

type Props = {
  menu: MenuType;
  onMenuChange: (v: MenuType) => void;

  callLevels: readonly CallLevel[];
  karameLevels: readonly KarameLevel[];

  ninniku: CallLevel;
  yasai: CallLevel;
  abura: CallLevel;
  karame: KarameLevel;

  onNinnikuChange: (v: CallLevel) => void;
  onYasaiChange: (v: CallLevel) => void;
  onAburaChange: (v: CallLevel) => void;
  onKarameChange: (v: KarameLevel) => void;

  onIssue: () => void;
};

export const CallRegisterPage = ({
  menu,
  onMenuChange,
  callLevels,
  karameLevels,
  ninniku,
  yasai,
  abura,
  karame,
  onNinnikuChange,
  onYasaiChange,
  onAburaChange,
  onKarameChange,
  onIssue,
}: Props) => {
  console.log("callLevels PAGE", callLevels);
  return (
    <div className={styles.page}>
      <TicketHeader />

      <div className={styles.content}>
        <MenuCardPicker value={menu} onChange={onMenuChange} />

        <OptionGroup title="ニンニク" options={callLevels} value={ninniku} onChange={onNinnikuChange} />
        <OptionGroup title="ヤサイ" options={callLevels} value={yasai} onChange={onYasaiChange} />
        <OptionGroup title="アブラ" options={callLevels} value={abura} onChange={onAburaChange} />
        <OptionGroup title="カラメ" options={karameLevels} value={karame} onChange={onKarameChange} />

        <div className={styles.issueArea}>
          <TicketingButton onClick={onIssue} />
        </div>
      </div>
    </div>
  );
};