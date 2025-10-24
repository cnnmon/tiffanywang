import { useRouter } from 'next/router';
import MarkdownFormatter from '../../../components/MarkdownFormatter';
import blogPosts from '../../../utils/blog.json';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const blog = blogPosts[id];

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <MarkdownFormatter file={blog.file} />
    </div>
  );
}
