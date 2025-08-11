import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {

  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  
  const model = (form.get('model') as string) || 'whisper-1';

  const transcript = await openai.audio.transcriptions.create({
    file,
    model, 
    response_format: 'json',
  });

  return NextResponse.json({ text: transcript.text });
}