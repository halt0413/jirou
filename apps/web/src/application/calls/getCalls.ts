import { getCallsRequest, type CallResponse } from "@/infrastructure/calls/callsApi";

export const getCalls = async (): Promise<CallResponse[]> => {
  return getCallsRequest();
};
