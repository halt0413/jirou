import styles from "./index.module.css";

export const TicketHeader = () => {
  return (
    <header className={styles.header}>
      <img src="/ticket-icon.svg" alt="食券" className={styles.ticketIcon} />

      <div className={styles.right}>
        <img src="/refund.svg" alt="" className={styles.refund} />
        <img src="/coin.svg" alt="" className={styles.coin} />
        <img src="/bill.svg" alt="" className={styles.bill} />
      </div>
    </header>
  );
};