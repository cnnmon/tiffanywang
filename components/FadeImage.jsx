import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

/* next/image that fades in smoothly once loaded.
   quality defaults to 90: the site is mostly flat-color illustration,
   where the optimizer's default 75 visibly softens edges */
export default function FadeImage({ className, quality = 90, ...props }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Catch images that finished loading before hydration (e.g. from cache)
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <Image
      ref={ref}
      quality={quality}
      {...props}
      onLoad={() => setLoaded(true)}
      className={twMerge(
        'transition-opacity duration-500',
        loaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
    />
  );
}
