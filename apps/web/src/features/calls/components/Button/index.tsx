import styles from "./index.module.css";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "danger" | "success" | "primary";
  fullWidth?: boolean;
};

export const Button = ({
  children,
  onClick,
  variant = "primary",
  fullWidth = false,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${
        fullWidth ? styles.fullWidth : ""
      }`}
    >
      {children}
    </button>
  );
};