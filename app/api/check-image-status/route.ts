import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ detail: 'Missing id parameter' }, { status: 400 })
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.xai-3BAkMwrpU7c9QJAwJImOy3kXJh2qUzDedTZZS68ICE2NKE6epmxGq8gIU8GQFwjNnNUuGxFL5HKqiNH0}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens,
        temperature: 0.7,
      }),
    })
    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json({ detail: error.detail }, { status: response.status })
    }

    const prediction = await response.json()
    return NextResponse.json(prediction)
  } catch (error) {
    console.error('Error in check-image-status API route:', error)
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 })
  }
}
