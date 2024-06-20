'use client';

import Image from 'next/image';

/*interface AvatarProps{
  src: string | null | undefined;
};
*/

const Avatar = () => {
  return (
    <Image
      className='rounded-full'
      height="30"
      width="30"
      alt="Avatar"
      src="/assets/placeholder.jpg"
    />
  );
}

export default Avatar;