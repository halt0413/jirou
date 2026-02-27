import styles from "./index.module.css";
import TicketIcon from "@/assets/icons/ticket-icon.svg";
import RefundIcon from "@/assets/icons/refund.svg";
import CoinIcon from "@/assets/icons/coin.svg";
import BillIcon from "@/assets/icons/bill.svg";

export const TicketHeader = () => {
  return (
    <header className={styles.header}>
      <TicketIcon className={styles.ticketIcon} />

      <div className={styles.right}>
        <RefundIcon className={styles.refund} aria-hidden />
        <CoinIcon className={styles.coin} aria-hidden />
        <BillIcon className={styles.bill} aria-hidden />
      </div>
    </header>
  );
};