"use client";

import Image from "next/image";
import styles from './index.module.css';

type Props = {
    count?: number;
};

const TOTAL_STAMPS = 10;

export const StampCard = ({ count = 0 }: Props) => {
    const stampsRow1 = Array(5).fill(0);
    const stampsRow2 = Array(5).fill(0);
    const filledCount = Math.max(0, count);
    const cardCount = Math.max(1, Math.ceil(filledCount / TOTAL_STAMPS));

    return (
        <div className={styles.wrapper}>
            {Array.from({ length: cardCount }).map((_, cardIndex) => {
                const startNumber = cardIndex * TOTAL_STAMPS + 1;
                return (
                    <div key={`card-${cardIndex}`} className={styles.card}>
                        <div className={styles.stampArea}>
                            <div className={styles.row}>
                                {stampsRow1.map((_, i) => {
                                    const number = startNumber + i;
                                    const filled = number <= filledCount;
                                    return (
                                        <div key={`r1-${cardIndex}-${i}`} className={styles.stampSquare}>
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
                                })}
                            </div>

                            <div className={styles.row}>
                                {stampsRow2.map((_, i) => {
                                    const number = startNumber + 5 + i;
                                    const filled = number <= filledCount;
                                    return (
                                        <div key={`r2-${cardIndex}-${i}`} className={styles.stampSquare}>
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
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
