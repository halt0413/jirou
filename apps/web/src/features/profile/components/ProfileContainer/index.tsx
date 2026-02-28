'use client';

import React, { useState } from 'react';
import { ProfileHeader } from '../ProfileHeader';
import { StampCard } from '../StampCard';
import { InfoCard } from '../InfoCard';
import { Button } from '../../../../components/Button';
import { ArrowBigRight } from "lucide-react";
import styles from './index.module.css';
import { ProfileEditModal } from '../ProfileEditModal';

type ProfileProps = {
    user: {
        name: string;
        store?: string | null;
        review?: number | null;
    }
};

export const ProfileContainer = ({ user }: ProfileProps) => {

    const [isEditing, setIsEditing] = useState(false);
    return (
        <div className={styles.container}>
            {/* ヘッダー部分 */}
            <ProfileHeader name={user.name} message="ひとこと" />

            {/* プロフィール変更ボタン */}
            <div className={styles.buttonWrapper}>
                <Button  variant='success' fullWidth onClick={() => setIsEditing(true)}>
                    プロフィール編集
                </Button>
            </div>

            <StampCard />

            {/* カード */}
            <div className={styles.cardsSection}>
                <InfoCard title="今まで食べた数" value={`${user.review || 0} 杯`} />
                <InfoCard title="お気に入りの店舗" value={<span className={styles.redText}>{user.store || "未設定"}</span>} />
                <button className={styles.linkButton}>
                <InfoCard title={`${user.name}の口コミを見る`} value={<ArrowBigRight/>} />
                </button>
                <button className={styles.linkButton}>
                <InfoCard title={`${user.name}のメディアを見る`} value={<ArrowBigRight/>} />
                </button>
            </div>

            {/* モーダル */}
            <ProfileEditModal 
                isOpen={isEditing} 
                onClose={() => setIsEditing(false)} 
                user={user}
            />
        </div>
    );
};