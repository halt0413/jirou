import styles from "./index.module.css";

export const TicketHeader = () => {
  return (
    <header className={styles.header}>
      <img src="/icons/ticket-icon.svg" alt="" className={styles.ticketIcon} />

      <div className={styles.right}>
        <img src="/icons/refund.svg" alt="" className={styles.refund} aria-hidden />
        <img src="/icons/coin.svg" alt="" className={styles.coin} aria-hidden />
        <img src="/icons/bill.svg" alt="" className={styles.bill} aria-hidden />
      </div>
    </header>
  );
};