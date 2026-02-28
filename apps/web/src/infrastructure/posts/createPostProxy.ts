import "server-only";
import { getAccessTokenFromCookie } from "@/infrastructure/token/getAccessTokenFromCookie";

export type CreatePostInput = {
  storeName: string;
  score: number;
  comment?: string | null;
  imageKey?: string | null;
};

export async function createPostProxy(input: CreatePostInput) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) throw new Error("Missing NEXT_PUBLIC_API_BASE_URL");

  const url = new URL("/posts", base).toString();

  // Cookie取得
  const accessToken = await getAccessTokenFromCookie();

  if (!accessToken) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  const text = await res.text();
  return { status: res.status, text };
}