// import { Hero, OurPlan } from '@/components/sections';
// import {
//   getProducts,
//   getSubscription,
//   getUser,
// } from '@/lib/utils/supabase/queries';
// import { createClient } from '@/lib/utils/supabase/server';
// import { Tables } from '@/types_db';

// // Remove line 10 to 53 when dealing with the real data. Replace <OurPlan /> with the following:
// // <OurPlan user={user} subscription={subscription} products={products ?? []} />

// type Price = Tables<'prices'>;
// type Product = Tables<'products'>;

// interface ProductWithPrices extends Product {
//   prices: Price[];
// }

// const mockedProducts: ProductWithPrices[] = [
//   {
//     id: 'prod_1',
//     name: 'Pro Plan',
//     description: 'A premium plan with all features included',
//     image: '/path-to-image.jpg',
//     metadata: null,
//     active: true,
//     prices: [
//       {
//         id: 'price_monthly',
//         currency: 'USD',
//         interval: 'month',
//         unit_amount: 999,
//         active: true,
//         product_id: 'prod_1',
//         interval_count: 1,
//         trial_period_days: 7,
//         type: 'recurring',
//       },
//       {
//         id: 'price_annual',
//         currency: 'USD',
//         interval: 'year',
//         unit_amount: 19999,
//         active: true,
//         product_id: 'prod_1',
//         interval_count: 1,
//         trial_period_days: 7,
//         type: 'recurring',
//       },
//     ],
//   },
// ];

// export default async function HomePage() {
//   const supabase = await createClient();
//   const [user, subscription, products] = await Promise.all([
//     getUser(supabase),
//     getSubscription(supabase),
//     getProducts(supabase),
//   ]);

//   return (
//     <div className='max-w-screen-xl mx-auto'>
//       <Hero />
//       <OurPlan
//         user={user}
//         subscription={subscription}
//         products={mockedProducts ?? []}
//       />
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { Hero, OurPlan } from '@/components/sections';
import {
  getProducts,
  getSubscription,
  getUser,
} from '@/lib/utils/supabase/queries';
import { createClient } from '@/lib/utils/supabase/server';
import { Tables } from '@/types_db';

import { useRecorder } from '@/hooks/useRecorder';
import { transcribe, speak } from '@/lib/voice';
import { useStreamChat } from '@/hooks/useStreamChat';
import { Button, IconButton } from '@/components/ui';

type Price = Tables<'prices'>;
type Product = Tables<'products'>;

interface ProductWithPrices extends Product {
  prices: Price[];
}

const mockedProducts: ProductWithPrices[] = [
  {
    id: 'prod_1',
    name: 'Pro Plan',
    description: 'A premium plan with all features included',
    image: '/path-to-image.jpg',
    metadata: null,
    active: true,
    prices: [
      {
        id: 'price_monthly',
        currency: 'USD',
        interval: 'month',
        unit_amount: 999,
        active: true,
        product_id: 'prod_1',
        interval_count: 1,
        trial_period_days: 7,
        type: 'recurring',
      },
      {
        id: 'price_annual',
        currency: 'USD',
        interval: 'year',
        unit_amount: 19999,
        active: true,
        product_id: 'prod_1',
        interval_count: 1,
        trial_period_days: 7,
        type: 'recurring',
      },
    ],
  },
];

export default function HomePage() {
  
  const { recording, start, stop } = useRecorder();
  const { messages, streaming, send } = useStreamChat();
  const [input, setInput] = useState('');

  return (
    <div className="max-w-screen-xl mx-auto space-y-8">
      {/* Existing sections */}
      <Hero />
      {/* <OurPlan
        user={null} 
        subscription={null}
        products={mockedProducts ?? []}
      /> */}

      <section className="p-6 border-2 rounded-lg  max-w-screen-xl  mx-auto space-y-8 border-purple-950">
        <h2 className="text-3xl font-semibold">Voice Assistant</h2>

    
        <div className="space-x-2">
          {!recording ? (
            <Button onClick={start} color="primary" size={'small'} variant={'solid'} >  Start Recording </Button>
            // <button onClick={start}>🎙️ Start</button>
          ) : (
            <Button
        
              onClick={async () => {
                const blob = await stop();
                const text = await transcribe(blob, 'whisper-1');
                setInput((t) => (t ? `${t}\n${text}` : text));
              }}
              
              color="primary" size={'small'} variant={'solid'}
                
            >
                    Stop & Transcribe
            </Button>
           
          )}
        </div>

        <div className="space-x-4">
          <input
            className="border  p-2 w-full max-w-xl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or use STT above…"
          />
          <button onClick={() => speak(input)}> Speak</button>
          <button disabled={!input || streaming} onClick={() => send(input)}>
            Send (stream)
          </button>
        </div>

       
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