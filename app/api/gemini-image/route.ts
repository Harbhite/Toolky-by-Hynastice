import { NextResponse } from "next/server"

export async function POST(req: Request) {
  return NextResponse.json({ error: "The AI Image Generator feature has been temporarily disabled." }, { status: 503 })
}
