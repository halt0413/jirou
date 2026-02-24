import styles from "./TicketCard.module.css";
import { toHalfWidthKana } from "../lib/toHalfWidthKana";

export type TicketCardProps = {
  dateText?: string;      // "26, -6, -9" みたいなやつ
  serialText?: string;      // "963555"
  lines: string[];          // コールの行
  timeText?: string;        // "11:55"
  shopText?: string;        // "ラーメン二郎 ○○店"
};

export const TicketCard = ({
  dateText = "26, -6, -9",
  serialText = "963555",
  lines,
  timeText = "11:55",
  shopText = "ラーメン二郎 ○○店",
}: TicketCardProps) => {
  return (
    <section className={styles.ticket}>
      <div className={styles.ticketTop}>
        <span>{dateText}</span>
        <span className={styles.serialText}>{serialText}</span>
      </div>

      <div className={styles.ticketBody}>
        {lines.map((t, i) => (
          <p key={`${t}-${i}`}>{toHalfWidthKana(t)}</p>
        ))}
      </div>

      <div className={styles.ticketBottom}>
        <span>{timeText}</span>
        <span className={styles.shopText}>{shopText}</span>
      </div>
    </section>
  );
};