import React from 'react';
import styles from './index.module.css';

export const StampCard = () => {
    const stampsRow1 = Array(7).fill(0);
    const stampsRow2 = Array(7).fill(0);

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                {/* タイトル */}
                <h2 className={styles.title}>スタンプ</h2>

                <div className={styles.stampArea}>
                    {/* スタンプ〇部分 */}
                    <div className={styles.row}>
                        {stampsRow1.map((_, i) => (
                        <div key={`r1-${i}`} className={styles.stampCircle} />
                        ))}
                    </div>

                    {/* 線 */}
                    <hr className={styles.divider} />

                    <div className={styles.row}>
                        {stampsRow2.map((_, i) => (
                        <div key={`r2-${i}`} className={styles.stampCircle} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};