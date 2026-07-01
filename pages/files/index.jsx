import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import FadeImage from '../../components/FadeImage';
import InlineLinks from '../../components/InlineLinks';
import LazyVideo from '../../components/LazyVideo';
import files from '../../utils/files.json';
import markdownPreloader from '../../utils/markdownPreloader';
import { formatTime } from '../../utils/time';

const getFilename = (item) => item.imageUrl.split('/').pop();

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

function File({ item }) {
  if (item.imageUrl) {
    const isVideo = item.imageUrl.endsWith('.mp4');
    const src = item.thumbnailUrl || item.imageUrl;

    const media = isVideo ? (
      <LazyVideo src={src} className="w-full" />
    ) : (
      <FadeImage
        src={src}
        alt={item.id}
        width={1000}
        height={1000}
        sizes="(max-width: 672px) 60vw, 400px"
        className="w-full"
      />
    );

    // Clicking opens the external link if there is one, otherwise the raw original file
    return (
      <div>
        <a
          href={item.link || item.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative group block transition-opacity hover:opacity-70 ${item.link ? 'cursor-ne-resize' : 'cursor-zoom-in'}`}
        >
          {media}
          {item.link && (
            <MdOpenInNew className="absolute top-2 right-2 w-4 h-4 text-white drop-shadow opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </a>
        <div className="flex justify-between gap-2 text-gray-500 mt-0.5">
          <p>
            <InlineLinks text={item.id} />
          </p>
          <p className="shrink-0">{item.date}</p>
        </div>
      </div>
    );
  }

  if (item.blog) {
    return <BlogPreview item={item} blogLink={`/files/${item.id}`} />;
  }

  return null;
}

const COL_COUNT = 2;

export default function Filesys() {
  const columns = useMemo(() => {
    const cols = Array.from({ length: COL_COUNT }, () => []);
    files.filter((item) => !item.wip).forEach((item, i) => cols[i % COL_COUNT].push(item));
    return cols;
  }, []);

  return (
    <div className="space-y-4">
      <p>A bunch of other stuff I've drawn, designed, written, coded, and 3D modeled.</p>
      <div className="grid grid-cols-2 gap-2">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-3">
            {col.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (colIndex + index * COL_COUNT) * 0.01 }}
              >
                <File item={item} />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
