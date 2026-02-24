import styles from "./PlayButton.module.css";
import PlayIcon from "../assets/Play.svg";
import Image from "next/image";

type Props = {
  onClick?: () => void;
};

export const PlayButton = ({ onClick }: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <Image src={PlayIcon} alt="再生" width={28} height={28} />
    </button>
  );
};