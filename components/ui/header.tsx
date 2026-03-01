import Image from 'next/image';
import profilePic from '@/public/ana.jpg';

export default function Header() {
  return (
    <div className='flex flex-col items-center'>
      <div
        className='rounded-full overflow-hidden mb-10'
        style={{
          border: '1.5px solid rgba(209,176,249,0.15)',
          boxShadow: '0 0 80px rgba(209,176,249,0.08)',
        }}
      >
        <Image
          src={profilePic}
          placeholder='blur'
          className='rounded-full'
          alt='Ana Rocha'
          width={160}
          height={160}
          priority
        />
      </div>
      <div className='text-center space-y-4'>
        <h1
          className='font-heading text-lavender tracking-tight'
          style={{ fontSize: 42, fontWeight: 500 }}
        >
          Ana Rocha
        </h1>
        <p
          className='leading-relaxed max-w-xs mx-auto'
          style={{
            fontSize: 17,
            fontWeight: 300,
            color: 'rgba(237,232,244,0.45)',
          }}
        >
          Singer, lyricist and composer
          <br />
          with German and Portuguese roots.
        </p>
      </div>
    </div>
  );
}
