export async function transcribe(blob: Blob, model = 'whisper-1') {
  const fd = new FormData();
  fd.append('file', blob, 'audio.webm');
  fd.append('model', model);
  const r = await fetch('/api/stt', { method: 'POST', body: fd });
  const j = await r.json(); return j.text as string;
}

export async function speak(text: string, voice = 'alloy', format = 'mp3') {
  const r = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify({ text, voice, format }),
  });
  const buf = await r.arrayBuffer();
  const url = URL.createObjectURL(new Blob([buf], { type: format === 'wav' ? 'audio/wav' : 'audio/mpeg' }));
  const audio = new Audio(url); audio.play();
  return () => { audio.pause(); URL.revokeObjectURL(url); };
}