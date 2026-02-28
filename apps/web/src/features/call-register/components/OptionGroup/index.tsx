import styles from "./index.module.css";
import { TicketButton } from "../TicketButton";

type Props<T extends string> = {
  title: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  disabled?: boolean;
};

export const OptionGroup = <T extends string>({
  title,
  options,
  value,
  onChange,
  disabled = false,
}: Props<T>) => {
  return (
    <section className={`${styles.group} ${disabled ? styles.disabled : ""}`}>
      <h3 className={styles.title}>{title}</h3>

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
    </section>
  );
};
