import { NextResponse } from "next/server";
import { createPostProxy } from "@/infrastructure/posts/createPostProxy";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const input = (await req.json()) as {
      storeName: string;
      score: number;
      comment?: string | null;
      imageKey?: string | null;
    };

    const { status, text } = await createPostProxy(input);

    return new NextResponse(text, {
      status,
      headers: { "content-type": "application/json" },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}