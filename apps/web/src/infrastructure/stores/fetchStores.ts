export type Store = { id: number; name: string; lat: number; lng: number };

export async function fetchStores(): Promise<Store[]> {
  const res = await fetch("/api/stores", { cache: "no-store" });
  if (!res.ok) throw new Error(`stores fetch failed: ${res.status}`);
  return (await res.json()) as Store[];
}