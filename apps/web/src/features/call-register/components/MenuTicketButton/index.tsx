import styles from "./index.module.css";

type MenuTicketButtonProps<T extends string> = {
  active: boolean;
  label: string;
  onClick: () => void;
  iconSrc?: string;
  bgSrc?: string;
  value?: T;
};

export const MenuTicketButton = ({
  active,
  label,
  onClick,
  iconSrc = "/jirou.svg",
  bgSrc = "/ticket-button-bg.svg",
}: MenuTicketButtonProps<string>) => {
  return (
    <button
      className={`${styles.btn} ${active ? styles.active : ""}`}
      onClick={onClick}
      type="button"
    >
      <img src={bgSrc} alt="" className={styles.bg} />

      <div className={styles.iconBox}>
        <img src={iconSrc} alt="" className={styles.icon} />
      </div>

      <span className={styles.label}>{label}</span>
    </button>
  );
};