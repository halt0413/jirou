import type { LoginFormValues } from "@/domain/auth/login";
import { loginRequest, type LoginResponse } from "@/infrastructure/auth/authApi";

export const loginUser = async (
  input: LoginFormValues
): Promise<LoginResponse> => {
  return loginRequest(input);
};
