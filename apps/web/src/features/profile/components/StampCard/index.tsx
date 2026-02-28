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
  const totalPages = Math.max(1, Math.ceil(filledCount / TOTAL_STAMPS));
  const currentPage = totalPages;
  const pageStart = (currentPage - 1) * TOTAL_STAMPS + 1;
  const filledInPage = Math.min(
    TOTAL_STAMPS,
    Math.max(0, filledCount - (currentPage - 1) * TOTAL_STAMPS)
  );

  const renderRow = (startNumber: number, offset: number) =>
    stampsRow1.map((_, i) => {
      const number = startNumber + offset + i;
      const filled = number < startNumber + filledInPage;
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
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.title}>投稿数スタンプ</span>
          <span className={styles.pageIndicator}>
            {currentPage}/{totalPages}
          </span>
        </div>
        <div className={styles.stampArea}>
          <div className={styles.row}>
            {renderRow(pageStart, 0)}
          </div>

          <div className={styles.row}>
            {renderRow(pageStart, 5)}
          </div>
        </div>
      </div>
    </div>
  );
};
