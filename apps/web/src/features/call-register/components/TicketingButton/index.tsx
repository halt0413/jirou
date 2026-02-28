import styles from "./index.module.css";
import { Button } from "@/components/Button";

export const TicketingButton = ({
  onClick,
  disabled = false,
}: {
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <div className={styles.wrap}>
        <Button onClick={onClick} variant="ticketing" disabled={disabled}>
            発券
        </Button>
    </div>
  );
};
