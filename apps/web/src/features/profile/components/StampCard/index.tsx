"use client";

import Image from "next/image";
import styles from "./index.module.css";

type Props = {
  count?: number;
};

type StampSquareProps = {
  number: number;
  filled: boolean;
};

const TOTAL_STAMPS = 10;

const StampSquare = ({ number, filled }: StampSquareProps) => (
  <div className={styles.stampSquare}>
    {filled ? (
      <Image
        src="/stump.png"
        alt=""
        fill
        sizes="40px"
        className={styles.stampImage}
      />
    ) : (
      <span className={styles.stampNumber}>{number}</span>
    )}
  </div>
);

export const StampCard = ({ count = 0 }: Props) => {
  const stampsRow1 = Array(5).fill(0);
  const filledCount = Math.max(0, count);
  const cardCount = Math.max(1, Math.ceil(filledCount / TOTAL_STAMPS));

  const renderRow = (startNumber: number, offset: number) =>
    stampsRow1.map((_, i) => {
      const number = startNumber + offset + i;
      const filled = number <= filledCount;
      return (
        <StampSquare
          key={`sq-${number}`}
          number={number}
          filled={filled}
        />
      );
    });

  return (
    <div className={styles.wrapper}>
      {Array.from({ length: cardCount }).map((_, cardIndex) => {
        const startNumber = cardIndex * TOTAL_STAMPS + 1;
        return (
          <div key={`card-${cardIndex}`} className={styles.card}>
            <div className={styles.stampArea}>
              <div className={styles.row}>
                {renderRow(startNumber, 0)}
              </div>

              <div className={styles.row}>
                {renderRow(startNumber, 5)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
