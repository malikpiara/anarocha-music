import Image from 'next/image';
import profilePic from '@/public/ana.jpg';

export default function Header() {
  return (
    <div className='grid max-w-lg grid-cols-1 justify-items-center'>
      <Image
        src={profilePic}
        placeholder='blur'
        className='rounded-full self-center mb-10'
        alt='Ana Rocha'
        width='180'
        height='180'
      />
      <div className='grid grid-cols-1 gap-2 text-center'>
        <h1 className='text-3xl font-medium text-center tracking-tighter text-[#0348B6]'>
          Ana Rocha
        </h1>
        <p className='text-slate-500 font-medium text-2xl leading-normal tracking-tight'>
          Singer, lyricist and composer with German and Portuguese roots.
        </p>
      </div>
    </div>
  );
}
