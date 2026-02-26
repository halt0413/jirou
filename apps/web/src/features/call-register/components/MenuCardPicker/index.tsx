import styles from "./index.module.css";

type Props = {
  value: "all-mashi" | "all-mashimashi";
  onChange: (v: Props["value"]) => void;
};

export const MenuCardPicker = ({ value, onChange }: Props) => {
  return (
    <section className={styles.wrap}>
      <button
        className={`${styles.btn} ${value === "all-mashi" ? styles.active : ""}`}
        onClick={() => onChange("all-mashi")}
        type="button"
      >
        <img src="/ticket-button-bg.svg" alt="" className={styles.bg} />
        
        <div className={styles.iconBox}>
          <img src="/jirou.svg" alt="" className={styles.icon} />
        </div>

        <span className={styles.label}>全マシ</span>
      </button>

      <button
        className={`${styles.btn} ${value === "all-mashimashi" ? styles.active : ""}`}
        onClick={() => onChange("all-mashimashi")}
        type="button"
      >
        <img src="/ticket-button-bg.svg" alt="" className={styles.bg} />
        
        <div className={styles.iconBox}>
          <img src="/jirou.svg" alt="" className={styles.icon} />
        </div>

        <span className={styles.label}>全マシマシ</span>
      </button>
    </section>
  );
};