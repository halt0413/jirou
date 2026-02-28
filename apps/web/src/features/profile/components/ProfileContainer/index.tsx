 "use client";

import { ProfileHeader } from '../ProfileHeader';
import { StampCard } from '../StampCard';
import { InfoCard } from '../InfoCard';
import { Button } from '../../../../components/Button';
import { ArrowBigRight } from "lucide-react";
import styles from './index.module.css';
import { useProfile } from "../../hooks/useProfile";

export const ProfileContainer = () => {
    const { profile } = useProfile();
    const name = profile?.name ?? "名前";
    const favoriteStore = profile?.store ?? "未設定";
    const reviewCount = profile?.review ?? 0;
    return (
        <div className={styles.container}>
            {/* ヘッダー部分 */}
            <ProfileHeader name={name} message="二郎さいこーー！" />

            {/* プロフィール変更ボタン */}
            <div className={styles.buttonWrapper}>
                <Button  variant='success' fullWidth>
                    プロフィール編集
                </Button>
            </div>

            <StampCard count={reviewCount} />

            {/* カード */}
            <div className={styles.cardsSection}>
                <InfoCard title="今までの投稿数" value={`${reviewCount} 件`} />
                <InfoCard
                    title="お気に入りの店舗"
                    value={<span className={styles.redText}>{favoriteStore}</span>}
                />
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
