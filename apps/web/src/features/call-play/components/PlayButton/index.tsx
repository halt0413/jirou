import styles from "./index.module.css";

type Props = {
  onClick?: () => void;
};

export const PlayButton = ({ onClick }: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <img
        src="/play.svg"
        alt="再生"
        className={styles.icon}
      />
    </button>
  );
};