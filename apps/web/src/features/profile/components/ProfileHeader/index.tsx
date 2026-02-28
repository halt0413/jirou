import React from 'react';
import styles from './index.module.css';

// 名前とメッセージを型定義
type Props = {
    name?: string;
    message?: string;
};

export const ProfileHeader = ({ name = "名前", message = "ひとこと" }: Props) => {
    return (
        <div className={styles.header}>
        <div className={styles.avatar}></div>
        <div className={styles.profileInfo}>
            <h1 className={styles.name}>{name}</h1>
            <p className={styles.message}>{message}</p>
        </div>
        </div>
    );
};