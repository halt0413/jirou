import styles from "./index.module.css";
import { MenuTicketButton } from "../MenuTicketButton";


type Value = "all-mashi" | "all-mashimashi";

type Props = {
  value: Value | null;
  onChange: (v: Value | null) => void;
};

const ITEMS: { value: Value; label: string }[] = [
  { value: "all-mashi", label: "全マシ" },
  { value: "all-mashimashi", label: "全マシマシ" },
];

export const MenuCardPicker = ({ value, onChange }: Props) => {
  return (
    <section className={styles.wrap}>
      {ITEMS.map((item) => (
        <MenuTicketButton
          key={item.value}
          active={value === item.value}
          label={item.label}
          onClick={() =>
            onChange(value === item.value ? null : item.value)
          }
        />
      ))}
    </section>
  );
};
