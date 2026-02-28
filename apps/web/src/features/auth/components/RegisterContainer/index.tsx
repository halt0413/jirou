"use client";

import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "../RegisterForm";
import styles from "./index.module.css";

export const RegisterContainer = () => {
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

        <RegisterForm />

        <Link href="/login" className={styles.link}>
          ログインはこちら
        </Link>
      </div>
    </div>
  );
};
