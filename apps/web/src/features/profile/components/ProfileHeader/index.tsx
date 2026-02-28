import React from 'react';
import Image from "next/image";
import styles from './index.module.css';

// 名前とメッセージを型定義
type Props = {
    name?: string;
    message?: string;
};

export const ProfileHeader = ({ name = "名前", message = "ひとこと" }: Props) => {
    return (
        <div className={styles.header}>
        <div className={styles.avatar}>
            <Image
                src="/jirou.svg"
                alt="Jirou"
                fill
                sizes="64px"
                style={{ objectFit: "contain" }}
            />
        </div>
        <div className={styles.profileInfo}>
            <h1 className={styles.name}>{name}</h1>
            <p className={styles.message}>{message}</p>
        </div>
        </div>
    );
};
