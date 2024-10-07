import Image from 'next/image';
import profilePic from '@/public/ana.jpg';

export default function Header() {
  return (
    <div className='w-full flex flex-col'>
      <Image
        src={profilePic}
        placeholder='blur'
        className='rounded-full self-center mb-10'
        alt='Ana Rocha'
        width='200'
        height='200'
      />
      <h1 className='text-3xl font-semibold text-center'>Ana Rocha</h1>
      <p className='text-slate-500 italic font-medium text-xl mt-1  self-center '>
        Singer, lyricist and composer with German and Portuguese roots.
      </p>
    </div>
  );
}
