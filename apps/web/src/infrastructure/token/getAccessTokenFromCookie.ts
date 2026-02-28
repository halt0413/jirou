import "server-only";
import { cookies } from "next/headers";

export async function getAccessTokenFromCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value ?? null;
}