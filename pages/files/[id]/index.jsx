import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MarkdownFormatter from '../../../components/MarkdownFormatter';
import files from '../../../utils/files.json';
import { formatTime } from '../../../utils/time';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const item = files.filter((file) => 'blog' in file).find((file) => file.id === id);

  if (!item) {
    return <div>{id} not found</div>;
  }

  const { blog, date } = item;

  // Fetch markdown content for estimated reading time
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!blog) return;
    fetch(blog)
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
      });
  }, [blog]);

  const wordCount = content.trim().split(/\s+/).length;
  const estTime = Math.round(wordCount / 260);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      className="space-y-4"
    >
      <div>
        <h1 className="text-xl">{id}</h1>
        <h2 className="text-gray-500">({estTime < 1 ? '<1' : estTime} min read)</h2>
        <h2 className="text-gray-500">{formatTime(date)}</h2>
      </div>
      <MarkdownFormatter file={blog} />
    </motion.div>
  );
}
