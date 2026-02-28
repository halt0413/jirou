'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Home, MoreHorizontal } from 'lucide-react';
import styles from './index.module.css';

export const BottomNav = () => {
    const pathname = usePathname();

    const showRoutes = [
        '/map', 
        '/profile', 
        '/call-register', 
        '/call-play'
    ];

    // 現在のページが showRoutes に含まれていなければ表示しない
    if (!showRoutes.includes(pathname)) {
        return null;
    }

    // 遷移先の項目を定義
    const navItems = [
        { name: 'マップ', href: '/map', icon: Map },
        { name: 'ホーム', href: '/profile', icon: Home },
        { name: 'コール', href: '/call-play', icon: MoreHorizontal }, 
    ];

    return (
        <nav className={styles.bottomNav}>
        {navItems.map((item) => {
            const Icon = item.icon;
            // パスと href が一致しているか
            const isActive = pathname === item.href;

            return (
            <Link key={item.name} href={item.href} className={styles.navItem}>
                {/* isActive が true の場合のみアクティブのクラスを付与 */}
                <Icon
                size={isActive ? 30 : 24}
                strokeWidth={2}
                className={isActive ? styles.activeColor : styles.inactiveColor}
                />
                <span className={`${styles.text} ${isActive ? styles.activeColor : styles.inactiveColor}`}>
                {item.name}
                </span>
            </Link>
            );
        })}
        </nav>
    );
};