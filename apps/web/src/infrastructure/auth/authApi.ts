import type { LoginFormValues } from "@/domain/auth/login";

export type LoginResponse = {
  accessToken: string;
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
