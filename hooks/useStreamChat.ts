import { useState } from 'react';
type Msg = { role: 'user'|'assistant'|'system'; content: string };

export function useStreamChat(initial: Msg[] = []) {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [streaming, setStreaming] = useState(false);

  async function send(text: string, model = 'gpt-4o') {
    const next = [...messages, { role: 'user', content: text } as Msg];
    setMessages(next);

    const res = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ messages: next, model }),
    });
    if (!res.body) return;

    setStreaming(true);
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let acc = '';

    while (true) {
      const { value, done } = await reader.read(); if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split('\n')) {
        const m = line.match(/^data:\s*(.*)$/); if (!m) continue;
        if (m[1] === '[DONE]') break;
        try {
          const json = JSON.parse(m[1]);
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) {
            acc += delta;
            setMessages([...next, { role:'assistant', content: acc }]);
          }
        } catch {
          // Ignore JSON parse errors
        }
      }
    }
    setStreaming(false);
  }

  return { messages, streaming, send };
}