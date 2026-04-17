import "server-only";
import { createBearerToken } from "@/infrastructure/token/createBearerToken";

export async function fetchStoresProxy() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) throw new Error("Missing NEXT_PUBLIC_API_BASE_URL");

  const url = new URL("/stores", base).toString();
  const secret = process.env.JWT_SECRET;
  const token = secret ? await createBearerToken() : null;

  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store",
  });

  const text = await res.text();
  return { status: res.status, text };
}
