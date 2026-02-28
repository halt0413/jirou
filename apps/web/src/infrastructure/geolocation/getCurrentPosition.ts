export type GeoPoint = { lat: number; lng: number };

export function getCurrentPosition(
  opts: PositionOptions = { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
): Promise<GeoPoint> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("geolocation not available"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      opts
    );
  });
}