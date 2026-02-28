import { getAccessTokenCookie } from "@/infrastructure/auth/tokenStorage";
import { getUserIdFromToken } from "@/infrastructure/auth/tokenPayload";

export type ProfileResponse = {
  name: string;
  store: string | null;
  review: number | null;
};

const getApiBaseUrl = () => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  return base ? base.replace(/\/$/, "") : "";
};

export const getProfileRequest = async (): Promise<ProfileResponse> => {
  const baseUrl = getApiBaseUrl();
  const token = getAccessTokenCookie();
  const userId = token ? getUserIdFromToken(token) : null;

  if (!userId) {
    throw new Error("ユーザー情報が取得できません");
  }

  const url = `${baseUrl}/users/${userId}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const rawText = await res.text();
  const contentType = res.headers.get("content-type") ?? "";

  if (!res.ok) {
    throw new Error(rawText || `取得に失敗しました (${res.status})`);
  }

  if (!rawText) {
    throw new Error("取得に失敗しました");
  }

  if (!contentType.includes("application/json")) {
    throw new Error("取得に失敗しました");
  }

  return JSON.parse(rawText) as ProfileResponse;
};
