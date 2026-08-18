import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import FadeImage from '../../components/FadeImage';
import InlineLinks from '../../components/InlineLinks';
import LazyVideo from '../../components/LazyVideo';
import files from '../../utils/files.json';
import markdownPreloader from '../../utils/markdownPreloader';
import { formatTime } from '../../utils/time';

const getFilename = (item) => item.imageUrl.split('/').pop();

// Renders **bold** and _italic_ markup as elements; unmatched markers pass through as-is
const parseInlineMarkup = (text) =>
  text.split(/(\*\*.*?\*\*|_.*?_)/g).map((seg, i) => {
    if (seg.startsWith('**') && seg.endsWith('**')) return <b key={i}>{seg.slice(2, -2)}</b>;
    if (seg.startsWith('_') && seg.endsWith('_')) return <i key={i}>{seg.slice(1, -1)}</i>;
    return seg;
  });

function BlogPreview({ item, blogLink }) {
  const [preview, setPreview] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const router = useRouter();

  useEffect(() => {
    markdownPreloader.getContentAsync(item.blog).then((text) => {
      const snippet = text
        .split('\n')
        .filter((line) => line.trim() && !/^[#!>]/.test(line))
        .slice(0, 2)
        .join(' ')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[~{}]/g, '');
      setPreview(snippet.length > 140 ? snippet.slice(0, 140) + '...' : snippet);

      const firstImage = text.match(/!\[[^\]]*\]\(([^)]+)\)/);
      setThumbnail(firstImage ? firstImage[1] : '');
    });
  }, [item.blog]);

  return (
    <button
      onClick={() => router.push(blogLink)}
      className="flex items-start gap-3 w-full pt-2 pb-3 text-left hover:opacity-50"
    >
      <span className="flex-1 min-w-0 block">
        <a className="font-bold">{item.id}</a>
        {item.subtitle && <i className="text-[#6a3b7b]"> — {item.subtitle}</i>}
        {preview && <p className="text-gray-600 mt-1 line-clamp-3">{parseInlineMarkup(preview)}</p>}
        <p className="text-gray-500 mt-1">{formatTime(item.date)}</p>
      </span>
      {thumbnail && (
        <span className="relative block w-24 h-24 shrink-0 bg-gray-100">
          <FadeImage
            src={thumbnail}
            alt={item.id}
            fill
            sizes="96px"
            quality={50}
            className="object-cover"
          />
        </span>
      )}
    </button>
  );
}

function File({ item }) {
  if (item.imageUrl) {
    const isVideo = item.imageUrl.endsWith('.mp4');
    const src = item.thumbnailUrl || item.imageUrl;

    const media = isVideo ? (
      <LazyVideo src={src} className="w-full h-full" />
    ) : (
      <FadeImage
        src={src}
        alt={item.id}
        width={item.width}
        height={item.height}
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
          {/* Reserves the media's true aspect ratio (measured into files.json by
              scripts/measure-media.mjs) so masonry columns never shift as items load */}
          <div className="bg-gray-100" style={{ aspectRatio: `${item.width} / ${item.height}` }}>
            {media}
          </div>
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

// Verb shown in the intro sentence → tag used in files.json
const TAGS = [
  ['drawn', 'drawing'],
  ['written', 'writing'],
  ['modeled', 'model'],
  ['programmed', 'program'],
  ['designed', 'design'],
];

const FadeIn = ({ order, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: order * 0.01 }}
  >
    {children}
  </motion.div>
);

export default function Filesys() {
  // One tag at a time; clicking the active tag deselects it (shows everything)
  const [selectedTag, setSelectedTag] = useState(null);

  const toggleTag = (tag) => setSelectedTag((prev) => (prev === tag ? null : tag));

  // Blog entries span full width; runs of media items between them form masonry grids
  const sections = useMemo(() => {
    const result = [];
    let run = [];
    const flushRun = () => {
      if (run.length === 0) return;
      const cols = Array.from({ length: COL_COUNT }, () => []);
      run.forEach((item, i) => cols[i % COL_COUNT].push(item));
      result.push({ type: 'grid', cols });
      run = [];
    };

    files
      .filter(
        (item) =>
          !item.wip && (!selectedTag || item.tags?.includes(selectedTag)),
      )
      .forEach((item) => {
        if (item.blog) {
          flushRun();
          result.push({ type: 'full', item });
        } else {
          run.push(item);
        }
      });
    flushRun();
    return result;
  }, [selectedTag]);

  let order = 0;

  return (
    <div className="space-y-4">
      <p>
        A bunch of miscellaneous stuff I've{' '}
        {TAGS.map(([verb, tag], i) => (
          <span key={tag}>
            <button
              onClick={() => toggleTag(tag)}
              className={twMerge(
                'underline underline-offset-2 decoration-dotted hover:opacity-50',
                selectedTag === tag && 'bg-[#6a3b7b] text-white decoration-solid',
              )}
            >
              {verb}
            </button>
            {i < TAGS.length - 1 ? ', ' : ', etc.'}
          </span>
        ))}
      </p>
      <div className="flex flex-col gap-3">
        {sections.map((section, sectionIndex) =>
          section.type === 'full' ? (
            <FadeIn key={section.item.id} order={order++}>
              <File item={section.item} />
            </FadeIn>
          ) : (
            <div key={`grid-${sectionIndex}`} className="grid grid-cols-2 gap-2">
              {section.cols.map((col, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-3">
                  {col.map((item) => (
                    <FadeIn key={item.id} order={order++}>
                      <File item={item} />
                    </FadeIn>
                  ))}
                </div>
              ))}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
