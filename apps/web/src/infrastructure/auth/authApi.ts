import type { LoginFormValues } from "@/domain/auth/login";
import type { RegisterFormValues } from "@/domain/auth/register";

export type LoginResponse = {
  accessToken: string;
};

export type RegisterResponse = {
  id: string;
  name: string;
  email: string;
};

const getApiBaseUrl = () => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  return base ? base.replace(/\/$/, "") : "";
};

export const loginRequest = async (
  input: LoginFormValues
): Promise<LoginResponse> => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/users/login`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  });

  let data: (LoginResponse & { error?: unknown }) | null = null;
  let rawText = "";
  try {
    rawText = await res.text();
    data = rawText ? (JSON.parse(rawText) as LoginResponse & { error?: unknown }) : null;
  } catch {
    data = null;
  }

  if (!res.ok || !data?.accessToken) {
    const message =
      typeof data?.error === "string"
        ? data.error
        : data?.error
        ? JSON.stringify(data.error)
        : rawText || "ログインに失敗しました";
    throw new Error(message);
  }

  return data;
};

export const registerRequest = async (
  input: RegisterFormValues
): Promise<RegisterResponse> => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/users/register`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  });

  let data: (RegisterResponse & { error?: unknown }) | null = null;
  let rawText = "";
  try {
    rawText = await res.text();
    data = rawText ? (JSON.parse(rawText) as RegisterResponse & { error?: unknown }) : null;
  } catch {
    data = null;
  }

  if (!res.ok || !data?.id) {
    const message =
      typeof data?.error === "string"
        ? data.error
        : data?.error
        ? JSON.stringify(data.error)
        : rawText || "新規登録に失敗しました";
    throw new Error(message);
  }

  return data;
};
