import { NextResponse } from "next/server";
import { fetchStoresProxy } from "@/infrastructure/stores/fetchStoresProxy";

export const runtime = "edge";

export async function GET() {
  try {
    const { status, text } = await fetchStoresProxy();
    return new NextResponse(text, {
      status,
      headers: { "content-type": "application/json" },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}