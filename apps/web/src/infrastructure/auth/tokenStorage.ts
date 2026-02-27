export const setAccessTokenCookie = (token: string) => {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `accessToken=${encodeURIComponent(
    token
  )}; Path=/; SameSite=Lax${secure}`;
};
