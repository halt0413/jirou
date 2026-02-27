import type { FieldErrors, Resolver } from "react-hook-form";
import type { ZodIssue } from "zod";
import { loginSchema, type LoginFormValues } from "@/domain/auth/login";

const getIssueMessage = (
  field: keyof LoginFormValues,
  issue: ZodIssue
) => {
  if (field === "email") {
    if (issue.code === "too_small") {
      return "メールアドレスを入力してください";
    }
    if ("format" in issue && issue.format === "email") {
      return "メールアドレスの形式で入力してください";
    }
    if ("validation" in issue && issue.validation === "email") {
      return "メールアドレスの形式で入力してください";
    }
  }

  if (field === "password") {
    if (issue.code === "too_small" && issue.minimum === 1) {
      return "パスワードを入力してください";
    }
    if (issue.code === "too_small" && issue.minimum === 6) {
      return "6文字以上で入力してください";
    }
  }

  return "入力内容を確認してください";
};

export const loginResolver: Resolver<LoginFormValues> = async (values) => {
  const result = loginSchema.safeParse(values);
  if (result.success) {
    return { values: result.data, errors: {} };
  }

  const errors: FieldErrors<LoginFormValues> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (typeof field !== "string" || errors[field as keyof LoginFormValues]) {
      continue;
    }
    errors[field as keyof LoginFormValues] = {
      type: issue.code,
      message: getIssueMessage(field as keyof LoginFormValues, issue),
    };
  }

  return { values: {}, errors };
};
