import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

/* Autoplaying loop video that only starts downloading near the viewport, then fades in */
export default function LazyVideo({ src, className, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={visible ? src : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      onLoadedData={() => setLoaded(true)}
      className={twMerge(
        'transition-opacity duration-500',
        loaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
      {...props}
    />
  );
}
