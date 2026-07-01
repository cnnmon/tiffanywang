import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTooltip } from '../hooks/useTooltip';
import FadeImage from './FadeImage';
import InlineLinks from './InlineLinks';
import LazyVideo from './LazyVideo';

const linkToIcon = {
  paper: '/icons/article.svg',
  video: '/icons/video.svg',
};

const purpleIconFilter =
  'invert(23%) sepia(28%) saturate(1766%) hue-rotate(264deg) brightness(56%) contrast(87%)';
const tiffanyName = 'Tiffany Wang';

function normalizeLinks(links) {
  if (Array.isArray(links)) {
    return links
      .filter((link) => link && link.href)
      .map((link, index) => ({
        href: link.href,
        label: link.label || (index === 0 ? 'main' : 'link'),
        kind: link.kind || link.label?.toLowerCase() || (index === 0 ? 'main' : 'link'),
      }));
  }

  if (!links || typeof links !== 'object') {
    return [];
  }

  const entries = Object.entries(links);
  const sorted = entries.sort(([a], [b]) => (a === 'main' ? -1 : b === 'main' ? 1 : 0));

  return sorted.map(([kind, href], index) => ({
    href,
    label: kind === 'main' ? 'main' : kind,
    kind,
    index,
  }));
}

function renderDescription(item, variant) {
  if (
    variant === 'toys' &&
    Array.isArray(item.longDescription) &&
    item.longDescription.length > 0
  ) {
    return (
      <>
        {item.description && <p>{item.description}</p>}
        {item.longDescription.map((paragraph, idx) => (
          <p key={`${item.name}-long-${idx}`}>{paragraph}</p>
        ))}
      </>
    );
  }

  return <p>{item.description}</p>;
}

function AuthorsLine({ authorsText }) {
  const measureRef = useRef(null);
  const [isOverTwoLines, setIsOverTwoLines] = useState(false);

  const authors = authorsText
    .split(/,\s*/)
    .map((author) => author.trim())
    .filter(Boolean);
  const tiffanyIndex = authors.findIndex((author) => author === tiffanyName);
  const middleAuthorsAfterTiffany = tiffanyIndex >= 0 ? authors.slice(tiffanyIndex + 1, -1) : [];
  const canAbbreviate = middleAuthorsAfterTiffany.length > 0;

  useEffect(() => {
    const measure = () => {
      const el = measureRef.current;
      if (!el) return;
      const lineHeight = Number.parseFloat(window.getComputedStyle(el).lineHeight);
      if (!lineHeight || Number.isNaN(lineHeight)) {
        setIsOverTwoLines(false);
        return;
      }
      setIsOverTwoLines(el.scrollHeight > lineHeight * 2 + 1);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [authorsText]);

  const shouldAbbreviate = canAbbreviate && isOverTwoLines;
  const visibleAuthors = shouldAbbreviate ? authors.slice(0, tiffanyIndex + 1) : authors;
  const lastAuthor = authors[authors.length - 1];
  const showLastAuthor = shouldAbbreviate && lastAuthor !== tiffanyName;

  return (
    <span className="relative inline-block w-full">
      <span
        ref={measureRef}
        className="absolute invisible pointer-events-none w-full"
        aria-hidden="true"
      >
        {authors.join(', ')}
      </span>
      {visibleAuthors.map((author, idx) => (
        <span key={`${author}-${idx}`}>
          {author === tiffanyName ? <b>{author}</b> : author}
          {idx < visibleAuthors.length - 1 ? ', ' : ''}
        </span>
      ))}
      {shouldAbbreviate && <span>, et al.</span>}
      {showLastAuthor && <span>, {lastAuthor}</span>}
    </span>
  );
}

function Project({ item, showTooltip, hideTooltip, variant }) {
  const { name, description, links, image, sublabel } = item;
  const projectId = `project-${name.replace(/\s+/g, '-').toLowerCase()}`;
  const isResearch = variant === 'research';
  const isVideo = image.endsWith('.mp4');
  const normalizedLinks = normalizeLinks(links);
  const [mainLink, ...extraLinks] = normalizedLinks;
  const hasMainLink = Boolean(mainLink?.href);

  const preview = (
    <div
      className={
        isResearch
          ? 'relative bg-gray-100 w-full h-[180px] sm:w-[220px] sm:h-[150px]'
          : 'relative card mb-3 bg-gray-100 h-[200px]'
      }
    >
      {isVideo ? (
        <LazyVideo src={image} className="object-cover w-full h-full" />
      ) : (
        <FadeImage
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          loading="lazy"
          className="object-cover w-full h-full"
        />
      )}
    </div>
  );

  const extraLinkElements = extraLinks.map((link) => {
    const iconSrc = linkToIcon[link.kind];
    return (
      <div
        key={`${projectId}-${link.label}-${link.href}`}
        onClick={() => {
          window.open(link.href, '_blank')?.focus();
        }}
        className="cursor-ne-resize text-sm hover:opacity-50"
        onMouseEnter={() => showTooltip(link.kind)}
        onMouseLeave={() => hideTooltip()}
        style={{ color: '#6a3b7b' }}
      >
        {iconSrc ? (
          <img
            src={iconSrc}
            alt={link.kind}
            className="w-4 h-4"
            style={{
              filter:
                'invert(23%) sepia(28%) saturate(1766%) hue-rotate(264deg) brightness(56%) contrast(87%)',
            }}
          />
        ) : (
          link.label
        )}
      </div>
    );
  });

  if (isResearch) {
    return (
      <motion.div key={projectId} id={projectId} className="flex flex-col w-full mb-8">
        <div className="transition-all duration-50 flex flex-col sm:flex-row gap-4">
          <div className="shrink-0">{preview}</div>
          <div className="flex-1 space-y-1">
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-lg leading-tight text-[#6a3b7b]">{name}</h1>
              {item.authors && (
                <p className="text-gray-500 text-sm">
                  <AuthorsLine authorsText={item.authors} />
                </p>
              )}
            </div>
            <div className="space-y-1">
              {renderDescription(
                { name, description, longDescription: item.longDescription },
                variant,
              )}
            </div>
            {sublabel && (
              <p className="text-sm">
                <InlineLinks text={sublabel} />
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div key={projectId} id={projectId} className="flex flex-col w-full mb-5">
      <div className="transition-all duration-50">
        {hasMainLink ? (
          <a href={mainLink.href} target="_blank" rel="noopener noreferrer">
            {preview}
          </a>
        ) : (
          preview
        )}
        <div className="flex flex-row justify-between gap-2">
          {hasMainLink ? (
            <a href={mainLink.href} target="_blank" rel="noopener noreferrer" className="font-bold">
              {name}
            </a>
          ) : (
            <p className="font-bold text-[#6a3b7b]">{name}</p>
          )}
          <div className="flex flex-row gap-2 select-none">{extraLinkElements}</div>
        </div>
        {renderDescription({ name, description, longDescription: item.longDescription }, variant)}
        {sublabel && (
          <p className="text-gray-500">
            <InlineLinks text={sublabel} />
          </p>
        )}
      </div>
    </motion.div>
  );
}

function ProjectSections({ sections, intro, variant = 'all' }) {
  const { showTooltip, hideTooltip, Tooltip } = useTooltip();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      {Tooltip}
      {intro && <p>{intro}</p>}
      <div>
        {sections.map(({ title, list }, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <p className="text-gray-500">{title}</p>
            <div className={variant === 'research' ? 'flex flex-col' : 'sm:grid grid-cols-2 gap-4'}>
              {list.map((item) => (
                <div key={item.name}>
                  <Project
                    item={item}
                    showTooltip={showTooltip}
                    hideTooltip={hideTooltip}
                    variant={variant}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default ProjectSections;
