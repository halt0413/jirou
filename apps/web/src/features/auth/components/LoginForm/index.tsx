"use client";

import type { FieldErrors, Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import { AuthButton } from "@/features/auth/components/AuthButton";
import styles from "./index.module.css";
import { loginSchema, type LoginFormValues } from "../../types";

export const LoginForm = () => {
  const resolver: Resolver<LoginFormValues> = async (values) => {
    const result = loginSchema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors: FieldErrors<LoginFormValues> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (!field || errors[field as keyof LoginFormValues]) {
        continue;
      }
      errors[field as keyof LoginFormValues] = {
        type: issue.code,
        message: issue.message,
      };
    }

    return { values: {}, errors };
  };

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
    resolver,
  });

  const onSubmit = (values: LoginFormValues) => {
    console.log("login", values);
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

      <AuthButton type="submit">
        ログイン
      </AuthButton>
    </form>
  );
};
