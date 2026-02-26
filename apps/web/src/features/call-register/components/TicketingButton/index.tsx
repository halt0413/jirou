import styles from "./index.module.css";

export const TicketingButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className={styles.wrap}>
        <button className={styles.btn} onClick={onClick} type="button">
            発券
        </button>
    </div>
  );
};