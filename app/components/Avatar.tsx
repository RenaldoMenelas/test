'use client';

import Image from 'next/image';

interface AvatarProps {
  src: string | null | undefined;
};

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  const defaultSrc = '/assets/placeholder.jpg'; // Path to your default placeholder image
  const imageSrc = src || defaultSrc;

  return (
    <Image
      className='rounded-full'
      height="30"
      width="30"
      alt="Avatar"
      src={imageSrc}
    />
  );
}

export default Avatar;
