import type { LoginFormValues } from "@/domain/auth/login";
import { loginRequest, type LoginResponse } from "@/infrastructure/auth/authApi";
import { setAccessTokenCookie } from "@/infrastructure/auth/tokenStorage";

export const loginUser = async (
  input: LoginFormValues
): Promise<LoginResponse> => {
  const result = await loginRequest(input);
  setAccessTokenCookie(result.accessToken);
  return result;
};
