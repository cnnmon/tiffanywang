import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import files from '../../../utils/files.json';

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
        // Account for polaroid frame: p-4 (16px) + pb-16 (64px) + caption (~28px) = ~108px vertical
        // horizontal padding: 16px each side = 32px total
        const polaroidPadding = { vertical: 108, horizontal: 32 };
        const maxWidth = window.innerWidth * 0.9 - polaroidPadding.horizontal;
        const maxHeight = window.innerHeight * 0.8 - polaroidPadding.vertical;

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
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="relative flex flex-col max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Title Bar */}
        <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedItem(null)}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600"
            />
            <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600" />
            <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600" />
          </div>
          <div className="text-sm text-gray-600 font-medium flex-1 text-center">
            {selectedItem.id}
          </div>
          <div className="w-20"></div>
        </div>

        {/* Window Content */}
        <div className="bg-white p-6 flex flex-col items-center max-h-[80vh] overflow-auto">
          <div className="flex bg-black relative">
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
          <p className="text-gray-600 text-sm mt-4">{selectedItem.date}</p>
          {selectedItem.link && (
            <button
              onClick={() => {
                window.open(selectedItem.link, '_blank');
              }}
              className="mt-4 flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              <MdOpenInNew className="w-4 h-4" /> Open link
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
