import clsx from 'clsx';
import { Carousel } from 'flowbite-react';

import { Image } from '@components/UI';

import heroImage1 from '@assets/image/hero-image-1.webp';
import heroImage2 from '@assets/image/hero-image-2.webp';
import heroImage3 from '@assets/image/hero-image-3.webp';

const heroImage = [
  {
    id: '01',
    image: heroImage1,
  },
  {
    id: '02',
    image: heroImage2,
  },
  {
    id: '03',
    image: heroImage3,
  },
];

export default function Hero() {
  return (
    <div className={clsx('h-56', 'sm:h-72', 'xl:h-[85vh]', '2xl:h-[50vh]')}>
      <Carousel>
        {heroImage.map((image, index) => (
          <Image src={image.image} alt={`hero-image-${index}`} key={image.id} />
        ))}
      </Carousel>
    </div>
  );
}
