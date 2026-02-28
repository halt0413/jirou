import type { RegisterFormValues } from "@/domain/auth/register";
import { registerRequest, type RegisterResponse } from "@/infrastructure/auth/authApi";

export const registerUser = async (
  input: RegisterFormValues
): Promise<RegisterResponse> => {
  return registerRequest(input);
};
