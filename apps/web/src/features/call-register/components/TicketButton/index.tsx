import styles from "./index.module.css";

type Props = {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const TicketButton = ({
  children,
  active = false,
  disabled = false,
  onClick,
}: Props) => {
  return (
    <button
      type="button"
      className={`${styles.btn} ${active ? styles.active : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      <img src="/ticket-button.svg" alt="" className={styles.bg} />
      <span className={styles.label}>{children}</span>
    </button>
  );
};
