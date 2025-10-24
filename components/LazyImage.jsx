import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const LazyImage = ({ src, alt, width, height, className = '', priority = false, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={twMerge(`relative overflow-hidden w-full`, className)}>
      {/* Loading skeleton/placeholder */}
      {!isLoaded && isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-300"
          style={{ width, height }}
        />
      )}

      {/* Actual image */}
      {(isInView || priority) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isLoaded ? 1 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
          className="w-full h-full"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            onLoad={handleLoad}
            onError={handleError}
            priority={priority}
            className={twMerge(
              'w-full object-cover overflow-hidden bg-red-500',
              hasError && 'opacity-50',
            )}
            {...props}
          />
        </motion.div>
      )}

      {/* Error state */}
      {hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-orange-50 text-gray-600 text-sm font-mono border border-orange-200"
        >
          ✧ image failed to load ✧
        </motion.div>
      )}
    </div>
  );
};

export default LazyImage;
