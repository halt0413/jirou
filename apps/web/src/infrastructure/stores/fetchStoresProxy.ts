import "server-only";
import { createBearerToken } from "@/infrastructure/token/createBearerToken";

export async function fetchStoresProxy() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) throw new Error("Missing NEXT_PUBLIC_API_BASE_URL");

  const url = new URL("/stores", base).toString();
  const token = await createBearerToken();

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const text = await res.text();
  return { status: res.status, text };
}