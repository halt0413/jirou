import styles from "./index.module.css";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "danger" | "success" | "ticketing" | "primary";
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
};

export const Button = ({
  children,
  onClick,
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled = false,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${
        fullWidth ? styles.fullWidth : ""
      } ${className}`}
      type="button"
      disabled={disabled}
    >
      {children}
    </button>
  );
};
