import blogPosts from '../../utils/blog.json';

export default function Blog() {
  return (
    <div>
      <h1>Blog</h1>
      {blogPosts.map((post, index) => (
        <div key={index}>
          <a href={`/blog/${index}`}>{post.title}</a>
        </div>
      ))}
    </div>
  );
}
