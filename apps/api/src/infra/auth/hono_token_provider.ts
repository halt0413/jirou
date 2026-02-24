import { sign } from "hono/jwt";
import type { TokenProvider } from "../../domain/users/user.token_provider";

export class HonoTokenProvider implements TokenProvider {
  constructor(private secret: string) {}

  async generate(userId: string): Promise<string> {
    return await sign(
      {
        sub: userId,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1時間
      },
      this.secret
    );
  }
}