"use client";

import Link from "next/link";
import { LoginForm } from "../LoginForm";
import styles from "./index.module.css";

const IllustrationPlaceholder = () => {
  return (
    //後からsvgに差し替える
    <div className={styles.illustration} aria-hidden="true">
      ILLUSTRATION
    </div>
  );
};

export const LoginContainer = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.illustrationWrap}>
          <IllustrationPlaceholder />
        </div>

        <LoginForm />

        <Link href="/register" className={styles.link}>
          新規登録はこちら
        </Link>
      </div>
    </div>
  );
};
