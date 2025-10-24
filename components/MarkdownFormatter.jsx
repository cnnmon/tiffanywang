import { useEffect, useState } from 'react';
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
    let currentSectionKey = null;

    const processLine = (line, key) => {
      // Bold text
      const boldRegex = /\*\*(.*?)\*\*/g;
      // Links [text](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

      let parts = [line];

      // Process bold
      parts = parts.flatMap((part) => {
        if (typeof part === 'string') {
          const segments = [];
          let lastIndex = 0;
          let match;
          const regex = new RegExp(boldRegex);

          while ((match = regex.exec(part)) !== null) {
            if (match.index > lastIndex) {
              segments.push(part.substring(lastIndex, match.index));
            }
            segments.push(<b key={`b-${key}-${match.index}`}>{match[1]}</b>);
            lastIndex = regex.lastIndex;
          }

          if (lastIndex < part.length) {
            segments.push(part.substring(lastIndex));
          }

          return segments.length > 0 ? segments : [part];
        }
        return [part];
      });

      // Process links
      parts = parts.flatMap((part, idx) => {
        if (typeof part === 'string') {
          const segments = [];
          let lastIndex = 0;
          let match;
          const regex = new RegExp(linkRegex);

          while ((match = regex.exec(part)) !== null) {
            if (match.index > lastIndex) {
              segments.push(part.substring(lastIndex, match.index));
            }
            segments.push(
              <Url key={`url-${key}-${idx}-${match.index}`} href={match[2]}>
                {match[1]}
              </Url>,
            );
            lastIndex = regex.lastIndex;
          }

          if (lastIndex < part.length) {
            segments.push(part.substring(lastIndex));
          }

          return segments.length > 0 ? segments : [part];
        }
        return [part];
      });

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

    const flushSection = () => {
      if (currentSection.length > 0) {
        elements.push(
          <div key={`section-${currentSectionKey}`} className="space-y-4">
            {currentSection}
          </div>,
        );
        currentSection = [];
        currentSectionKey = null;
      }
    };

    lines.forEach((line, index) => {
      // Check for headers
      const headerMatch = line.match(/^(#{1,2})\s+(.+)$/);
      if (headerMatch) {
        flushList();
        flushSection();
        currentSectionKey = index;
        const level = headerMatch[1].length;
        const content = headerMatch[2];
        const HeaderTag = level === 1 ? 'h1' : 'h2';
        currentSection.push(<HeaderTag key={`h-${index}`}>{content}</HeaderTag>);
        return;
      }

      if (line.trim() === '') {
        flushList();
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
    flushSection();
    return elements;
  };

  if (!content) return null;
  return <div className="flex flex-col">{formatMarkdown(content)}</div>;
}

export default MarkdownFormatter;
