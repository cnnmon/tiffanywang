import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import Modal from '../../components/Modal';
import files from '../../utils/files.json';
import markdownPreloader from '../../utils/markdownPreloader';
import { formatTime } from '../../utils/time';

function BlogPreview({ item, blogLink }) {
  const [preview, setPreview] = useState('');
  const router = useRouter();

  useEffect(() => {
    markdownPreloader.getContentAsync(item.blog).then((text) => {
      const snippet = text
        .split('\n')
        .filter((line) => line.trim() && !line.startsWith('#') && !line.startsWith('!'))
        .slice(0, 2)
        .join(' ')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[~{}]/g, '');
      setPreview(snippet.length > 140 ? snippet.slice(0, 140) + '...' : snippet);
    });
  }, [item.blog]);

  return (
    <button
      onClick={() => router.push(blogLink)}
      className="block bg-gradient-to-b from-[#c6bae3] to-transparent p-3 h-full text-left hover:opacity-50"
    >
      <a className="font-bold">{item.id}</a>
      {preview && <p className="text-gray-600 mt-1 line-clamp-3">{preview}</p>}
      <p className="text-gray-500 mt-1">{formatTime(item.date)}</p>
    </button>
  );
}

function File({ item, setSelectedItem }) {
  if (item.imageUrl) {
    const isVideo = item.imageUrl.endsWith('.mp4');
    const src = item.thumbnailUrl || item.imageUrl;
    const handleClick = (e) => {
      e.stopPropagation();
      if (item.link) {
        window.open(item.link, '_blank');
      } else {
        setSelectedItem(item);
      }
    };

    const media = isVideo ? (
      <video src={src} autoPlay muted loop playsInline preload="none" className="w-full" />
    ) : (
      <Image src={src} alt={item.id} width={300} height={300} className="w-full" />
    );

    return (
      <div
        className={`relative group transition-opacity ${item.link ? 'cursor-ne-resize hover:opacity-70' : 'cursor-zoom-in'}`}
        onClick={handleClick}
      >
        {media}
        {item.link && (
          <MdOpenInNew className="absolute top-2 right-2 w-4 h-4 text-white drop-shadow opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    );
  }

  if (item.blog) {
    const blogLink = `/files/${item.id}`;
    return <BlogPreview item={item} blogLink={blogLink} />;
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

const COL_COUNT = 2;

export default function Filesys() {
  const [selectedItem, setSelectedItem] = useState(null);

  const columns = useMemo(() => {
    const cols = Array.from({ length: COL_COUNT }, () => []);
    files.filter((item) => !item.wip).forEach((item, i) => cols[i % COL_COUNT].push(item));
    return cols;
  }, []);

  return (
    <div className="space-y-4">
      {selectedItem && <Modal selectedItem={selectedItem} setSelectedItem={setSelectedItem} />}
      <p>A file system containing art, WIPs, smaller projects, and writing snippets.</p>
      <div className="grid grid-cols-2 gap-2">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-2">
            {col.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (colIndex + index * COL_COUNT) * 0.01 }}
              >
                <File item={item} setSelectedItem={setSelectedItem} />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
