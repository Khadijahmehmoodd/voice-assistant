
'use client';

import { useState } from 'react';
import { Hero} from '@/components/sections';
import { useRecorder } from '@/hooks/useRecorder';
import { transcribe, speak } from '@/lib/voice';
import { useStreamChat } from '@/hooks/useStreamChat';
import { Button } from '@/components/ui';



export default function HomePage() {
  
  const { recording, start, stop } = useRecorder();
  const { messages, streaming, send } = useStreamChat();
  const [input, setInput] = useState('');

  return (
    <div className="max-w-screen-xl mx-auto space-y-8">
   
      <Hero />
     

      <section className="p-6 border-2 rounded-lg pb-20  max-w-screen-xl  mx-auto space-y-8 border-purple-950">
        <h2 className="text-3xl font-semibold">Voice Assistant</h2>

    
        <div className="space-x-2">
          {!recording ? (
            <Button onClick={start} color="alert" size={'small'} variant={'solid'} >  Start Recording </Button>
           
          ) : (
            <Button
        
              onClick={async () => {
                const blob = await stop();
                const text = await transcribe(blob, 'whisper-1');
                setInput((t) => (t ? `${t}\n${text}` : text));
              }}
              
              color="alert" size={'small'} variant={'surface'}
                
            >
                    Stop & Transcribe
            </Button>
           
          )}
        </div>
        <div className="flex items-center gap-2">
  <input
    className="border p-2 flex-grow max-w-xl"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Type or use STT above…"
  />

  <Button
    onClick={() => speak(input)}
    color="primary"
    size="small"
    variant="soft"
  >
    Speak
  </Button>

  <Button
    disabled={!input || streaming}
    onClick={() => send(input)}
    color="primary"
    size="small"
    variant="outline"
  >
    Send (Stream)
  </Button>
</div>

        {/* <div className="space-x-2">
          <input
            className="borde p-2 w-20px max-w-xl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or use STT above…"
          />
          
          <Button onClick={() => speak(input)} color="alert" size={'small'} variant={'ghost'}> Speak</Button>
          <Button disabled={!input || streaming} onClick={() => send(input)}
            color="primary" size={'small'} variant={'solid'}>
            Send
          </Button>
        </div> */}

       
        <div className="max-w-2xl space-y-2">
          {messages.map((m, i) => (
            <div key={i}>
              <b>{m.role}:</b> {m.content}
            </div>
          ))}
          {streaming && <div>…streaming</div>}
        </div>
      </section>
    </div>
  );
}