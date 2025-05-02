import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ detail: 'Missing id parameter' }, { status: 400 })
  }

  try {
import {
  GoogleGenAI,
} from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.AIzaSyABSu-2JYYuzWraSsmbP8F_Kd0Dik9ZAs8,
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.5-flash-preview-04-17';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `For every word, I want 20 synonyms and antonyms in tabular format`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();
    
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
