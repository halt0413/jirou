import { getProfileRequest } from "@/infrastructure/profile/profileApi";

export const getProfile = async () => {
  return getProfileRequest();
};
