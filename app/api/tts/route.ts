import { NextRequest } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const { text, voice = 'alloy', format = 'mp3' } = await req.json();

  
  const model = 'gpt-4o-mini-tts';

  const speech = await openai.audio.speech.create({
    model,
    voice,        
    input: text,
  });

  const arrayBuffer = await speech.arrayBuffer();
  return new Response(Buffer.from(arrayBuffer), {
    headers: {
      'Content-Type': format === 'wav' ? 'audio/wav' : 'audio/mpeg',
      'Cache-Control': 'no-store',
    },
  });
}