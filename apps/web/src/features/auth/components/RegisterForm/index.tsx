"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthButton } from "@/features/auth/components/AuthButton";
import styles from "./index.module.css";
import type { RegisterFormValues } from "@/domain/auth/register";
import { registerResolver } from "@/features/auth/validation/registerFormResolver";
import { registerUser } from "@/application/auth/registerUser";
import { useRedirect } from "@/hooks/useRedirect";

export const RegisterForm = () => {
  const redirect = useRedirect();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: registerResolver,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setSubmitError(null);
      await registerUser(values);
      redirect("/login");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "新規登録に失敗しました"
      );
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label} htmlFor="name">
        名前
      </label>
      <input
        id="name"
        type="text"
        className={styles.input}
        autoComplete="name"
        {...register("name")}
      />
      {errors.name ? <p className={styles.error}>{errors.name.message}</p> : null}

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

      {submitError ? <p className={styles.error}>{submitError}</p> : null}

      <AuthButton type="submit">新規登録</AuthButton>
    </form>
  );
};
