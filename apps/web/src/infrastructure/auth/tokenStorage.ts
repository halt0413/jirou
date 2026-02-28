export const setAccessTokenCookie = (token: string) => {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `accessToken=${encodeURIComponent(
    token
  )}; Path=/; SameSite=Lax${secure}`;
};

export const getAccessTokenCookie = () => {
  if (typeof document === "undefined") {
    return null;
  }
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="))
    ?.split("=")[1];

  return value ? decodeURIComponent(value) : null;
};
