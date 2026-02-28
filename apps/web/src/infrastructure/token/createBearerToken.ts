import "server-only";
import { SignJWT } from "jose";

export async function createBearerToken() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET");

  const key = new TextEncoder().encode(secret);

  return await new SignJWT({})
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .setSubject("web")
    .sign(key);
}