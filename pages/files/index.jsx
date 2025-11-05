import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import files from '../../utils/files.json';
import { formatTime } from '../../utils/time';
import Modal from './components/Modal';

function File({ item, setSelectedItem, index }) {
  if (item.imageUrl) {
    return (
      <Image
        src={item.thumbnailUrl || item.imageUrl}
        alt={item.name}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        loading={index < 8 ? 'eager' : 'lazy'}
        priority={index < 4}
        className="border object-cover hover:opacity-50 transition duration-50 cursor-pointer"
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
      <p>A file system containing art, WIPs, smaller projects, and writing snippets.</p>
      <AnimatePresence mode="wait">
        <Modal selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      </AnimatePresence>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {files
          .filter((item) => !item.wip)
          .map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.01 }}
              className="relative w-full h-full aspect-square bg-gray-100 p-2"
            >
              <File item={item} setSelectedItem={setSelectedItem} index={index} />
            </motion.div>
          ))}
      </div>
    </div>
  );
}
