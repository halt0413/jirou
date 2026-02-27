import type { CallOrder } from "@/domain/calls/call";
import { getAccessTokenCookie } from "@/infrastructure/auth/tokenStorage";

type CreateCallResponse = {
  id: number;
  userId: string;
  title: string | null;
  ninniku: number | null;
  yasai: number | null;
  abura: number | null;
  karame: number | null;
};

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
    throw new Error(message);
  }

  if (!data) {
    throw new Error("発券に失敗しました");
  }

  return data;
};
