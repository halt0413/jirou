"use client";

import styles from "./index.module.css";
import { TicketHeader } from "../TicketHeader";
import { MenuCardPicker } from "../MenuCardPicker";
import { OptionGroup } from "../OptionGroup";
import { TicketingButton } from "../TicketingButton";
import type {
  AburaLevel,
  KarameLevel,
  MenuType,
  NinnikuLevel,
  YasaiLevel,
} from "../../hooks/useCallRegister";

type Props = {
  menu: MenuType | null;
  onMenuChange: (v: MenuType | null) => void;

  ninnikuLevels: readonly NinnikuLevel[];
  yasaiLevels: readonly YasaiLevel[];
  aburaLevels: readonly AburaLevel[];
  karameLevels: readonly KarameLevel[];

  ninniku: NinnikuLevel;
  yasai: YasaiLevel;
  abura: AburaLevel;
  karame: KarameLevel;

  onNinnikuChange: (v: NinnikuLevel) => void;
  onYasaiChange: (v: YasaiLevel) => void;
  onAburaChange: (v: AburaLevel) => void;
  onKarameChange: (v: KarameLevel) => void;

  onIssue: () => void;
  isIssuing?: boolean;
};

export const CallRegisterPage = ({
  menu,
  onMenuChange,
  ninnikuLevels,
  yasaiLevels,
  aburaLevels,
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
  isIssuing = false,
}: Props) => {
  const isLocked = menu === "all-mashi" || menu === "all-mashimashi";
  return (
    <div className={styles.page}>
      <TicketHeader />

      <div className={styles.content}>
        <MenuCardPicker value={menu} onChange={onMenuChange} />

        <OptionGroup
          title="ニンニク"
          options={ninnikuLevels}
          value={ninniku}
          onChange={onNinnikuChange}
          disabled={isLocked}
        />
        <OptionGroup
          title="ヤサイ"
          options={yasaiLevels}
          value={yasai}
          onChange={onYasaiChange}
          disabled={isLocked}
        />
        <OptionGroup
          title="アブラ"
          options={aburaLevels}
          value={abura}
          onChange={onAburaChange}
          disabled={isLocked}
        />
        <OptionGroup
          title="カラメ"
          options={karameLevels}
          value={karame}
          onChange={onKarameChange}
          disabled={isLocked}
        />

        <div className={styles.issueArea}>
          <TicketingButton onClick={onIssue} disabled={isIssuing} />
        </div>
      </div>
    </div>
  );
};
