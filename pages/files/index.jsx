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
        src={item.imageUrl}
        alt={item.name}
        width={200}
        height={200}
        className="border w-full h-full object-cover hover:opacity-50 transition duration-50"
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
        <a href={blogLink}>{item.name}</a>
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
          {' '}
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
    <>
      <AnimatePresence mode="wait">
        <Modal selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      </AnimatePresence>
      <div className="flex flex-wrap">
        {files.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.01, ease: 'easeOut' }}
            className="relative w-[118px] h-[118px] cursor-pointer"
          >
            <File item={item} setSelectedItem={setSelectedItem} />
          </motion.div>
        ))}
      </div>
    </>
  );
}
