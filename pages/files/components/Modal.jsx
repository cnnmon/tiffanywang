import { motion } from 'framer-motion';
import Image from 'next/image';
import { MdClose, MdOpenInNew } from 'react-icons/md';
import Button from './Button';

export default function Modal({ selectedItem, setSelectedItem }) {
  if (!selectedItem) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1]"
      onClick={() => setSelectedItem(null)}
    >
      <div
        className="relative max-h-[80%] max-w-[90%] w-full flex flex-col justify-center items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
          className="overflow-y-scroll flex-1 flex border"
        >
          {selectedItem.pdfUrl ? (
            <iframe
              src={selectedItem.pdfUrl}
              width="640"
              height="850"
              allow="autoplay"
              className="w-full h-full"
            />
          ) : (
            <Image
              src={selectedItem.imageUrl}
              alt={selectedItem.name}
              width={400}
              height={400}
              className="w-full h-full"
            />
          )}
        </motion.div>
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
