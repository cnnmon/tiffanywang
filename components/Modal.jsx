import { useEffect, useMemo } from 'react';
import files from '../utils/files.json';

export default function Modal({ selectedItem, setSelectedItem }) {
  const imageItems = useMemo(() => files.filter((item) => item.imageUrl && !item.wip), []);

  const currentIndex = useMemo(
    () => imageItems.findIndex((item) => item.id === selectedItem?.id),
    [imageItems, selectedItem],
  );

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setSelectedItem(imageItems[currentIndex - 1]);
      } else if (e.key === 'ArrowRight' && currentIndex < imageItems.length - 1) {
        setSelectedItem(imageItems[currentIndex + 1]);
      } else if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedItem, currentIndex]);

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[10] cursor-zoom-out animate-fade-in"
      onClick={() => setSelectedItem(null)}
    >
      <div className="flex flex-col items-center gap-2" onClick={(e) => e.stopPropagation()}>
        {selectedItem.imageUrl?.endsWith('.mp4') ? (
          <video
            src={selectedItem.imageUrl}
            autoPlay
            muted
            loop
            playsInline
            className="max-w-[90vw] max-h-[85vh]"
          />
        ) : selectedItem.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={selectedItem.imageUrl}
            alt={selectedItem.id}
            className="max-w-[90vw] max-h-[85vh] object-contain"
          />
        ) : null}
        <div className="flex justify-center items-center gap-2 text-white">
          {selectedItem.description ? (
            <p
              className="max-w-md text-center [&_a]:underline [&_a]:text-white hover:[&_a]:text-white"
              dangerouslySetInnerHTML={{ __html: selectedItem.description }}
            />
          ) : (
            <p>{selectedItem.id}</p>
          )}
          <p className="opacity-70">{selectedItem.date}</p>
        </div>
      </div>
    </div>
  );
}
