import type { CallOrder } from "@/domain/calls/call";
import { getAccessTokenCookie } from "@/infrastructure/auth/tokenStorage";
import { getUserIdFromToken } from "@/infrastructure/auth/tokenPayload";

type CreateCallResponse = {
  id: number;
  userId: string;
  title: string | null;
  ninniku: number | null;
  yasai: number | null;
  abura: number | null;
  karame: number | null;
  masi: number | null;
  masimasi: number | null;
};

export type CallResponse = CreateCallResponse;

const getApiBaseUrl = () => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  return base ? base.replace(/\/$/, "") : "";
};

export const createCallRequest = async (
  input: CallOrder
): Promise<CreateCallResponse> => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/calls`;
  const token = getAccessTokenCookie();

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(input),
  });

  let data: (CreateCallResponse & { error?: unknown }) | null = null;
  let rawText = "";
  try {
    rawText = await res.text();
    data = rawText ? (JSON.parse(rawText) as CreateCallResponse & { error?: unknown }) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message =
      typeof data?.error === "string"
        ? data.error
        : data?.error
        ? JSON.stringify(data.error)
        : rawText || "発券に失敗しました";
    console.error("createCallRequest error", {
      status: res.status,
      message,
      rawText,
    });
    throw new Error(message);
  }

  if (!data) {
    throw new Error("発券に失敗しました");
  }

  return data;
};

export const getCallsRequest = async (): Promise<CallResponse[]> => {
  const baseUrl = getApiBaseUrl();
  const token = getAccessTokenCookie();
  const userId = token ? getUserIdFromToken(token) : null;

  if (!userId) {
    throw new Error("ユーザー情報が取得できません");
  }

  const url = `${baseUrl}/calls/${userId}`;

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
    return [];
  }

  if (!contentType.includes("application/json")) {
    throw new Error("取得に失敗しました");
  }

  try {
    const data = JSON.parse(rawText) as CallResponse[] | CallResponse;
    return Array.isArray(data) ? data : [data];
  } catch {
    throw new Error("取得に失敗しました");
  }
};
