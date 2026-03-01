import { useState } from "react";
import styles from "./index.module.css";
import { TicketButton } from "../TicketButton";
import { Info } from "lucide-react";

type Props<T extends string> = {
  title: string;
  description?: string; //説明
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  disabled?: boolean;
};

export const OptionGroup = <T extends string>({
  title,
  description,
  options,
  value,
  onChange,
  disabled = false,
}: Props<T>) => {
  const [showInfo, setShowInfo] = useState(false); //モーダル開閉
  return (
    <section className={`${styles.group} ${disabled ? styles.disabled : ""}`}>
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>{title}</h3>
        {description && (
          <button
            type="button"
            className={styles.infoButton}
            onClick={() => setShowInfo(true)}
            aria-label={`${title}の説明を見る`}
          >
            <Info size={20} color="#666" />
          </button>
        )}
      </div>

      <div className={styles.grid}>
        {options.map((opt) => (
          <TicketButton
            key={opt}
            active={opt === value}
            disabled={disabled}
            onClick={() => onChange(opt)}
          >
            {opt}
          </TicketButton>
        ))}
      </div>

      {showInfo && (
        <div className={styles.modalOverlay} onClick={() => setShowInfo(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h4 className={styles.modalTitle}>{title}とは？</h4>
            <p className={styles.modalDesc}>{description}</p>
            <button className={styles.modalClose} onClick={() => setShowInfo(false)}>
              閉じる
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
