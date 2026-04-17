import { ProfileContainer } from '@/features/profile';
import styles from './page.module.css';

export default function ProfilePage() {
    return (
        <main className={styles.page}>
            <ProfileContainer />
        </main>
    );
}
