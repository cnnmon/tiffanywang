import { useRouter } from 'next/router';
import MarkdownFormatter from '../../../components/MarkdownFormatter';
import blogPosts from '../../../utils/blog.json';
import { formatTimeAgo } from '../../../utils/time';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const blog = blogPosts[id];

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  const estTime = Math.round(blog.file.length / 50);
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl">{blog.title}</h1>
        <h2 className="text-gray-500">({estTime < 1 ? '<1' : estTime} min read)</h2>
        <h2 className="text-gray-500">{formatTimeAgo(blog.date)}</h2>
      </div>
      <MarkdownFormatter file={blog.file} />
    </div>
  );
}
