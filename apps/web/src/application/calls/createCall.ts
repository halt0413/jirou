import type { CallOrder } from "@/domain/calls/call";
import { createCallRequest } from "@/infrastructure/calls/callsApi";

export const createCall = async (input: CallOrder) => {
  return createCallRequest(input);
};
