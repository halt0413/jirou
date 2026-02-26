import styles from "./index.module.css";

type Props = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  form?: string;
  onClick?: () => void;
};

export const AuthButton = ({
  children,
  type = "button",
  disabled = false,
  form,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      className={styles.button}
      disabled={disabled}
      form={form}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
