export type Store = { id: number; name: string; lat: number; lng: number };

export async function fetchStores(): Promise<Store[]> {
  const res = await fetch("/api/stores", { cache: "no-store" });
  const text = await res.text();

  if (!res.ok) {
    if (text) {
      let message: string | null = null;

      try {
        const data = JSON.parse(text) as { error?: string; message?: string };
        message = data?.error || data?.message || null;
      } catch {
        message = null;
      }

      throw new Error(message || text);
    }

    throw new Error(`stores fetch failed: ${res.status}`);
  }

  if (!text) return [];
  return JSON.parse(text) as Store[];
}
