import React from 'react';
import styles from './index.module.css';

type Props = {
    title: string;
    value?: React.ReactNode;
};

export const InfoCard = ({ title, value }: Props) => {
    return (
        <div className={styles.card}>
            <div className={styles.title}>{title}</div>
            {value && <div className={styles.value}>{value}</div>}
        </div>
    );
};