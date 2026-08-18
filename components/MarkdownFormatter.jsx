import { useEffect, useState } from 'react';
import FadeImage from '../components/FadeImage';
import WaveText from '../components/WaveText';
import markdownPreloader from '../utils/markdownPreloader';
import Url from './Url';

function MarkdownFormatter({ file }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Try to get preloaded content first, fallback to fetch if needed
    const preloadedContent = markdownPreloader.getContent(file);
    if (preloadedContent) {
      setContent(preloadedContent);
    } else {
      // Fallback to async loading if not preloaded
      markdownPreloader.getContentAsync(file).then(setContent);
    }
  }, [file]);

  const formatMarkdown = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let listItems = [];
    let inList = false;
    let currentSection = [];

    // Splits string parts on regex matches and replaces each match with render(match)
    const applyRegex = (parts, regex, render) =>
      parts.flatMap((part) => {
        if (typeof part !== 'string') return [part];

        const segments = [];
        let lastIndex = 0;
        let match;
        const re = new RegExp(regex);

        while ((match = re.exec(part)) !== null) {
          if (match.index > lastIndex) {
            segments.push(part.substring(lastIndex, match.index));
          }
          segments.push(render(match));
          lastIndex = re.lastIndex;
        }

        if (lastIndex < part.length) {
          segments.push(part.substring(lastIndex));
        }

        return segments.length > 0 ? segments : [part];
      });

    const processLine = (line, key) => {
      let parts = [line];

      // Images ![alt](url) (before links since syntax is similar)
      parts = applyRegex(parts, /!\[([^\]]*)\]\(([^)]+)\)/g, (match) => (
        <span key={`img-${key}-${match.index}`} className="block relative w-full">
          <FadeImage
            src={match[2]}
            alt={match[1]}
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, 800px"
            className="max-w-full h-auto"
          />
        </span>
      ));

      // Bold **text**
      parts = applyRegex(parts, /\*\*(.*?)\*\*/g, (match) => (
        <b key={`b-${key}-${match.index}`}>{match[1]}</b>
      ));

      // Wavy text {text}
      parts = applyRegex(parts, /{(.*?)}/g, (match) => (
        <WaveText
          key={`w-${key}-${match.index}`}
          text={match[1]}
          className="text-2xl text-[#6a3b7b]"
          gradient={false}
        />
      ));

      // Strikethrough ~~text~~
      parts = applyRegex(parts, /~~(.*?)~~/g, (match) => (
        <s key={`s-${key}-${match.index}`}>{match[1]}</s>
      ));

      // Links [text](url)
      parts = applyRegex(parts, /\[([^\]]+)\]\(([^)]+)\)/g, (match) => (
        <Url key={`url-${key}-${match.index}`} href={match[2]}>
          {match[1]}
        </Url>
      ));

      // Italics _text_ (after links so underscores in urls are untouched)
      parts = applyRegex(parts, /_(.*?)_/g, (match) => (
        <i key={`i-${key}-${match.index}`}>{match[1]}</i>
      ));

      return parts;
    };

    const flushList = () => {
      if (listItems.length > 0) {
        currentSection.push(
          <ul
            key={`list-${elements.length}-${currentSection.length}`}
            className="list-disc list-inside"
          >
            {listItems}
          </ul>,
        );
        listItems = [];
      }
      inList = false;
    };

    const flushSection = (key) => {
      if (currentSection.length > 0) {
        elements.push(<div key={key}>{currentSection}</div>);
        currentSection = [];
      }
    };

    lines.forEach((line, index) => {
      // Check for blank lines - they separate sections
      if (line.trim() === '') {
        flushList();
        flushSection(index);
        return;
      }

      // Check for headers
      const headerMatch = line.match(/^(#{1,3})\s+(.+)$/);
      if (headerMatch) {
        flushList();
        flushSection(index);
        const level = headerMatch[1].length;
        const content = headerMatch[2];
        const HeaderTag = level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3';
        const className =
          level === 1
            ? 'text-4xl font-bold'
            : level === 2
              ? 'text-2xl font-bold'
              : 'text-xl font-bold';
        currentSection.push(
          <HeaderTag key={`h-${index}`} className={className}>
            {content}
          </HeaderTag>,
        );
        return;
      }

      // Captions "> text" — muted, centered, sits tight under the previous line (e.g. an image)
      const captionMatch = line.match(/^>\s+(.+)$/);
      if (captionMatch) {
        flushList();
        currentSection.push(
          <p key={`cap-${index}`} className="mt-2 text-center italic text-neutral-500">
            {processLine(captionMatch[1], `cap-${index}`)}
          </p>,
        );
        return;
      }

      // List items with nesting
      const listMatch = line.match(/^(\s*)- (.+)$/);
      if (listMatch) {
        const indent = listMatch[1].length;
        const content = listMatch[2];
        const level = Math.floor(indent / 2);

        if (!inList) {
          inList = true;
        }

        const processedContent = processLine(content, `li-${index}`);

        if (level > 0) {
          listItems.push(
            <ul key={`nested-${index}`} className="list-none ml-12">
              <li>{processedContent}</li>
            </ul>,
          );
        } else {
          listItems.push(<li key={`li-${index}`}>{processedContent}</li>);
        }
        return;
      }

      flushList();

      const processedLine = processLine(line, `p-${index}`);
      currentSection.push(<p key={`p-${index}`}>{processedLine}</p>);
    });

    flushList();
    flushSection(lines.length);
    return elements;
  };

  if (!content) return null;
  return <div className="flex flex-col space-y-4">{formatMarkdown(content)}</div>;
}

export default MarkdownFormatter;
