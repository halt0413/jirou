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

  const data = (await res.json()) as LoginResponse & { error?: string };

  if (!res.ok) {
    throw new Error(data.error ?? "ログインに失敗しました");
  }

  return data;
};
