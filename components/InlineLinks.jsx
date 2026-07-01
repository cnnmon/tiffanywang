import Url from './Url';

/* Renders text with markdown-style [label](url) links */
export default function InlineLinks({ text }) {
  if (!text) return null;

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <Url key={`link-${match.index}`} href={match[2]}>
        {match[1]}
      </Url>,
    );
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length ? parts : text;
}
