'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../../components/Button';
import { getAccessTokenCookie } from '../../../../infrastructure/auth/tokenStorage';
import styles from './index.module.css';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    user: {
        name: string;
        store?: string | null;
    };
};

export const ProfileEditModal = ({ isOpen, onClose, user }: Props) => {
    const router = useRouter();
    const [editName, setEditName] = useState(user.name);
    const [editStore, setEditStore] = useState(user.store || '');

    // isOpen が false の時は何も表示しない
    if (!isOpen) return null;

    const handleSave = async () => {
        const token = getAccessTokenCookie();
        if (!token) {
            alert("ログインしていません");
            return;
        }

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8787';
            
            const res = await fetch(`${API_URL}/users/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    name: editName, 
                    store: editStore 
                })
            });

            if (res.ok) {
                alert("プロフィールを更新しました！");
                onClose(); // 保存成功したらモーダルを閉じる
                router.refresh(); 
            } else {
                alert("更新に失敗しました");
            }
        } catch (error) {
            console.error(error);
            alert("エラーが発生しました");
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>プロフィール編集</h2>
                
                <div className={styles.inputGroup}>
                    <label className={styles.label}>名前</label>
                    <input 
                        type="text" 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroupLast}>
                    <label className={styles.label}>お気に入りの店舗</label>
                    <input 
                        type="text" 
                        value={editStore}
                        onChange={(e) => setEditStore(e.target.value)}
                        className={styles.input}
                        placeholder="例: 歴史を刻め 下新庄本店"
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <Button fullWidth variant="danger" onClick={onClose}>
                        戻る
                    </Button>
                    <Button fullWidth variant="primary" onClick={handleSave}>
                        保存する
                    </Button>
                </div>
            </div>
        </div>
    );
};