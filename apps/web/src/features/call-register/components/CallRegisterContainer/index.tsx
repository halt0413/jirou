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
          description="刻みニンニクの量です。二郎の代名詞とも言えるトッピングで、パンチが効きます！"
          options={ninnikuLevels}
          value={ninniku}
          onChange={onNinnikuChange}
          disabled={isLocked}
        />
        <OptionGroup
          title="ヤサイ"
          description="もやしとキャベツの量です。「マシ」にすると野菜が山盛りになって出てきます。"
          options={yasaiLevels}
          value={yasai}
          onChange={onYasaiChange}
          disabled={isLocked}
        />
        <OptionGroup
          title="アブラ"
          description="背脂の量です。スープに強烈なコクをプラスしたい場合におすすめです。"
          options={aburaLevels}
          value={abura}
          onChange={onAburaChange}
          disabled={isLocked}
        />
        <OptionGroup
          title="カラメ"
          description="醤油ダレの量（味の濃さ）です。ヤサイを増やして味が薄まりそうな時など、味を濃くしたい場合に選びます。"
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
