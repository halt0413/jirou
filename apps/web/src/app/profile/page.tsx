import { cookies } from 'next/headers';
import { ProfileContainer } from '@/features/profile';

// バックエンドのURL
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8787';

async function getProfileData() {
    // Cookieから accessToken を取得
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) return null;

    try {
        // APIから自分のプロフィール情報を取得
        const res = await fetch(`${API_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store' // 常に最新のプロフィールを取得
        });
        
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("プロフィール取得エラー:", error);
        return null;
    }
}

export default async function ProfilePage() {
    // APIからデータを取得する
    const user = await getProfileData();

    if (!user) {
        // 未ログイン時の表示
        return <div className="p-8 text-center">ログインしてください</div>;
    }
    return (
        <ProfileContainer user={user}/>
    );
}