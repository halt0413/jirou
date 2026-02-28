"use client";

import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "../LoginForm";
import styles from "./index.module.css";

export const LoginContainer = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.illustrationWrap}>
          <div className={styles.illustration}>
            <Image
              src="/jirou.svg"
              alt="Jirou"
              fill
              priority
              sizes="(max-width: 480px) 70vw, 260px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <LoginForm />

        <Link href="/register" className={styles.link}>
          新規登録はこちら
        </Link>
      </div>
    </div>
  );
};
