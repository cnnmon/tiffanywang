import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import files from '../../utils/files.json';
import { formatTime } from '../../utils/time';
import Modal from './components/Modal';

function File({ item, setSelectedItem }) {
  if (item.imageUrl) {
    return (
      <Image
        src={item.thumbnailUrl || item.imageUrl}
        alt={item.name}
        fill
        className="border object-cover hover:opacity-50 transition duration-50 cursor-pointer h-full w-full"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedItem(item);
        }}
      />
    );
  }

  if (item.blog) {
    const blogLink = `/files/${item.id}`;
    return (
      <div>
        <a href={blogLink}>{item.id}</a>
        <p className="text-gray-500 text-sm">{formatTime(item.date)}</p>
      </div>
    );
  }

  if (item.link) {
    return (
      <div>
        <a href={item.link} target="_blank">
          {item.name}
        </a>
        <p className="text-gray-500 text-sm">
          <MdOpenInNew className="w-4 h-4 hover:text-gray-700" />
        </p>
      </div>
    );
  }

  return <p>{JSON.stringify(item)}</p>;
}

export default function Filesys() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        <Modal selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      </AnimatePresence>
      <p>A file system containing art, WIPs, smaller projects, and writing snippets.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {files
          .filter((item) => !item.wip)
          .map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.01 }}
              className="relative aspect-square h-full w-full"
            >
              <File item={item} setSelectedItem={setSelectedItem} />
            </motion.div>
          ))}
      </div>
    </div>
  );
}
