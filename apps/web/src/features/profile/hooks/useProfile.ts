"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/application/profile/getProfile";
import type { ProfileResponse } from "@/infrastructure/profile/profileApi";

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const data = await getProfile();
      if (!cancelled) {
        setProfile(data);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { profile };
};
