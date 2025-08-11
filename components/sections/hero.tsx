import { Button } from '@/components/ui';
import Image from 'next/image';
import { PiGoogleChromeLogo } from 'react-icons/pi';

export default function Hero () {
  return (
    <section className='w-full py-8 sm:py-24'>
      <div className='flex flex-col-reverse items-center justify-between w-full gap-16 sm:flex-row lg:pt-16'>
        <div className='flex flex-col flex-1 gap-9'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-4xl font-bold text-primary-text-contrast sm:text-6xl'>
              Voice Assistant 
            </h1>
            <p className='text-lg font-medium text-canvas-text'>
              The intelligent voice assistant listens attentively, transforming spoken words into seamless interactions. Designed for natural communication, it bridges speech and technology to deliver instant responses, real-time transcription, and clear synthesized audio. Whether assisting with daily tasks, answering complex questions, or translating on the fly, it adapts to your needs with speed and precision—making every conversation effortless and engaging.
            </p>
          </div>
          <Button
            color='primary'
            variant='solid'
            size='large'
            className='!primary-on-primary w-full sm:w-fit'
          >
            <PiGoogleChromeLogo />
            Install Chrome Extension
          </Button>
        </div>
        <div className='relative flex items-center justify-center flex-1 w-full py-16'>
          <div className='absolute z-0 sm:max-xl:h-[450px]'>
            <img
              src='/assets/images/hero/blob.png'
              alt='Blob background'
              className='object-cover w-full h-full'
            />
          </div>
          <div className='relative z-10 flex justify-center w-full overflow-hidden rounded-lg'>
            <Image
              src='/assets/images/hero/vn.png'
              alt='placeholder'
              width={512}
              height={320}
              className='sm:h-[320px] sm:w-[512px] rounded-l-lg'
            />
          </div>
        </div>
      </div>
    </section>
  );
};
