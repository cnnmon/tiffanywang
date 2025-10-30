import { useRouter } from 'next/router';
import MarkdownFormatter from '../../../components/MarkdownFormatter';
import files from '../../../utils/files.json';
import markdownPreloader from '../../../utils/markdownPreloader';
import { formatTime } from '../../../utils/time';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const item = files.filter((file) => 'blog' in file).find((file) => file.id === id);

  if (!item) {
    return <div>File not found</div>;
  }

  const { blog, name, date } = item;
  const content = markdownPreloader.getContent(blog);
  const wordCount = content.trim().split(/\s+/).length;
  const estTime = Math.round(wordCount / 260);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl">{name}</h1>
        <h2 className="text-gray-500">({estTime < 1 ? '<1' : estTime} min read)</h2>
        <h2 className="text-gray-500">{formatTime(date)}</h2>
      </div>
      <MarkdownFormatter file={blog} />
    </div>
  );
}
