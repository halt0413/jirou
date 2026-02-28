"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthButton } from "@/features/auth/components/AuthButton";
import styles from "./index.module.css";
import type { LoginFormValues } from "@/domain/auth/login";
import { loginUser } from "@/application/auth/loginUser";
import { loginResolver } from "@/features/auth/validation/loginFormResolver";
import { useRedirect } from "@/hooks/useRedirect";

export const LoginForm = () => {
  const redirect = useRedirect();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: loginResolver,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setSubmitError(null);
      await loginUser(values);
      redirect("/call-register");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "ログインに失敗しました"
      );
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label} htmlFor="email">
        メールアドレス
      </label>
      <input
        id="email"
        type="email"
        className={styles.input}
        autoComplete="email"
        {...register("email")}
      />
      {errors.email ? (
        <p className={styles.error}>{errors.email.message}</p>
      ) : null}

      <label className={styles.label} htmlFor="password">
        パスワード
      </label>
      <input
        id="password"
        type="password"
        className={styles.input}
        autoComplete="current-password"
        {...register("password")}
      />
      {errors.password ? (
        <p className={styles.error}>{errors.password.message}</p>
      ) : null}

      {submitError ? <p className={styles.error}>{submitError}</p> : null}

      <AuthButton type="submit">
        ログイン
      </AuthButton>
    </form>
  );
};
