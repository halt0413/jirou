export const getUserIdFromToken = (token: string) => {
  try {
    const payload = token.split(".")[1];
    if (!payload) {
      return null;
    }
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    const data = JSON.parse(json) as { sub?: string };
    return data.sub ?? null;
  } catch {
    return null;
  }
};
