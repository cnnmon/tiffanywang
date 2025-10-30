import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdClose, MdOpenInNew } from 'react-icons/md';
import Button from './Button';

export default function Modal({ selectedItem, setSelectedItem }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setIsLoading(true);
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

  if (!selectedItem) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2]"
      onClick={() => setSelectedItem(null)}
    >
      <div
        className="relative flex flex-col justify-center items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex border bg-black relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border border-gray-700 border-t-white border-2"></div>
            </div>
          )}
          {selectedItem.pdfUrl ? (
            <iframe
              src={selectedItem.pdfUrl}
              width={100}
              height={1000}
              allow="autoplay"
              className="w-full h-full"
              onLoad={() => setIsLoading(false)}
            />
          ) : imageDimensions.width > 0 ? (
            <Image
              src={selectedItem.imageUrl}
              alt={selectedItem.name}
              width={imageDimensions.width}
              height={imageDimensions.height}
              onLoad={() => setIsLoading(false)}
            />
          ) : null}
        </div>
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
    </div>
  );
}
