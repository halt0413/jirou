import styles from "./index.module.css";
import { Button } from "@/components/Button";

export const TicketingButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className={styles.wrap}>
        <Button onClick={onClick} variant="ticketing" >
            発券
        </Button>
    </div>
  );
};