import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
        input: { prompt },
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json({ detail: error.detail }, { status: response.status })
    }

    const prediction = await response.json()
    return NextResponse.json(prediction)
  } catch (error) {
    console.error('Error in generate-image API route:', error)
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 })
  }
}

