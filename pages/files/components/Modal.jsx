import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { MdChevronLeft, MdChevronRight, MdClose, MdOpenInNew } from 'react-icons/md';
import files from '../../../utils/files.json';
import Button from './Button';

export default function Modal({ selectedItem, setSelectedItem }) {
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const imageItems = useMemo(() => files.filter((item) => item.imageUrl && !item.wip), []);

  const currentIndex = useMemo(
    () => imageItems.findIndex((item) => item.id === selectedItem?.id),
    [imageItems, selectedItem],
  );

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setSelectedItem(imageItems[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (currentIndex < imageItems.length - 1) {
      setSelectedItem(imageItems[currentIndex + 1]);
    }
  };

  useEffect(() => {
    if (selectedItem?.imageUrl) {
      const img = new window.Image();
      img.onload = () => {
        const maxWidth = window.innerWidth * 0.9;
        const maxHeight = window.innerHeight * 0.85;

        let width = img.naturalWidth;
        let height = img.naturalHeight;

        const widthRatio = maxWidth / width;
        const heightRatio = maxHeight / height;
        const scale = Math.min(widthRatio, heightRatio, 1);

        setImageDimensions({
          width: Math.floor(width * scale),
          height: Math.floor(height * scale),
        });
      };
      img.src = selectedItem.imageUrl;
    }
  }, [selectedItem]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };

    if (selectedItem) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedItem, currentIndex]);

  if (!selectedItem) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2]"
      onClick={() => setSelectedItem(null)}
    >
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition z-10"
          aria-label="Previous image"
        >
          <MdChevronLeft className="w-8 h-8" />
        </button>
      )}

      {currentIndex < imageItems.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition z-10"
          aria-label="Next image"
        >
          <MdChevronRight className="w-8 h-8" />
        </button>
      )}

      <div
        className="relative flex flex-col justify-center items-center max-w-2xl gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex border bg-black relative">
          {selectedItem.pdfUrl ? (
            <iframe
              src={selectedItem.pdfUrl}
              width={1000}
              height={1000}
              allow="autoplay"
              className="w-[50vw] h-[50vh]"
            />
          ) : imageDimensions.width > 0 ? (
            <Image
              src={selectedItem.imageUrl}
              alt={selectedItem.name}
              width={imageDimensions.width}
              height={imageDimensions.height}
            />
          ) : null}
        </div>
        <p className="text-white text-sm">
          {selectedItem.id} {selectedItem.date}
        </p>
        <div className="flex gap-2">
          <Button onClick={() => setSelectedItem(null)}>
            <MdClose className="w-4 h-4 hover:text-gray-700" /> Close
          </Button>
          {selectedItem.link && (
            <Button
              onClick={() => {
                window.open(selectedItem.link, '_blank');
              }}
            >
              <MdOpenInNew className="w-4 h-4 hover:text-gray-700" /> Open link
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
