"use client";

import { useForm } from "react-hook-form";
import { AuthButton } from "@/features/auth/components/AuthButton";
import styles from "./index.module.css";
import type { LoginFormValues } from "@/domain/auth/login";
import { loginResolver } from "@/features/auth/validation/loginFormResolver";

export const RegisterForm = () => {
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

  const onSubmit = async (values: LoginFormValues) => {
    console.log("register", values);
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
        autoComplete="new-password"
        {...register("password")}
      />
      {errors.password ? (
        <p className={styles.error}>{errors.password.message}</p>
      ) : null}

      <AuthButton type="submit">新規登録</AuthButton>
    </form>
  );
};
