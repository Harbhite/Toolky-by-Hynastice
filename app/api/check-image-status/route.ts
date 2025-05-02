import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ detail: 'Missing id parameter' }, { status: 400 })
  }

  try {
    const response = await fetch('https://api.x.ai/grok/v1/chat', { // Replace with actual Grok API endpoint
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.XAI_API_KEY}`, // Use xAI API key
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: "Your question or prompt here", // Adjust based on Grok API requirements
    model: "grok-3" // Specify model if required
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
