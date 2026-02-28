import React from 'react';
import { ProfileHeader } from '../ProfileHeader';
import { StampCard } from '../StampCard';
import { InfoCard } from '../InfoCard';
import { Button } from '../../../../components/Button';
import { ArrowBigRight } from "lucide-react";
import styles from './index.module.css';

export const ProfileContainer = () => {
    return (
        <div className={styles.container}>
            {/* ヘッダー部分 */}
            <ProfileHeader name="なまえ" message="ひとこと" />

            {/* プロフィール変更ボタン */}
            <div className={styles.buttonWrapper}>
                <Button  variant='success' fullWidth>
                    プロフィール編集
                </Button>
            </div>

            <StampCard />

            {/* カード */}
            <div className={styles.cardsSection}>
                <InfoCard title="今まで食べた数" value="20 杯" />
                <InfoCard title="お気に入りの店舗" value={<span className={styles.redText}>歴史を刻め 下新庄本店</span>} />
                <button className={styles.linkButton}>
                <InfoCard title="ooの口コミを見る" value={<ArrowBigRight/>} />
                </button>
                <button className={styles.linkButton}>
                <InfoCard title="ooのメディアを見る" value={<ArrowBigRight/>} />
                </button>
            </div>
        </div>
    );
};