import { useRef, useState } from 'react';
export function useRecorder() {
  const rec = useRef<MediaRecorder|null>(null);
  const chunks = useRef<BlobPart[]>([]);
  const [recording, setRecording] = useState(false);

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    chunks.current = [];
    mr.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
    mr.onstop = () => stream.getTracks().forEach(t => t.stop());
    mr.start();
    rec.current = mr;
    setRecording(true);
  }
  async function stop(): Promise<Blob> {
    return new Promise((resolve) => {
      if (!rec.current) throw new Error('not recording');
      rec.current.onstop = () => {
        setRecording(false);
        resolve(new Blob(chunks.current, { type: 'audio/webm' }));
      };
      rec.current.stop();
    });
  }
  return { recording, start, stop };
}