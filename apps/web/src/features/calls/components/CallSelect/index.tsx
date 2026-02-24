import styles from "./index.module.css";

type CallOption = { id: string; label: string; };

type Props = {
  options: CallOption[];
  value: string;
  onChange: (id: string) => void;
};

export const CallSelect = ({ options, value, onChange }: Props) => {
  return (
    <div className={styles.wrapper}>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};