import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTooltip } from '../hooks/useTooltip';
import Url from './Url';

const linkToIcon = {
  paper: '/icons/article.svg',
  video: '/icons/video.svg',
};

function renderSublabel(sublabel) {
  if (!sublabel) return null;

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(sublabel)) !== null) {
    if (match.index > lastIndex) {
      parts.push(sublabel.slice(lastIndex, match.index));
    }

    parts.push(
      <Url key={`sublabel-link-${match.index}`} href={match[2]}>
        {match[1]}
      </Url>,
    );
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < sublabel.length) {
    parts.push(sublabel.slice(lastIndex));
  }

  return parts.length ? parts : sublabel;
}

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
        <video
          src={image}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="object-cover w-full h-full"
        />
      ) : (
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          loading="lazy"
          priority={false}
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
          <div className="flex-1 space-y-2">
            <div className="flex flex-row justify-between gap-2">
              <h1 className="font-bold text-lg leading-tight text-[#6a3b7b]">{name}</h1>
            </div>
            <div className="space-y-1">
              {renderDescription(
                { name, description, longDescription: item.longDescription },
                variant,
              )}
            </div>
            {sublabel && <p className="text-gray-500">{renderSublabel(sublabel)}</p>}
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
        {sublabel && <p className="text-gray-500">{renderSublabel(sublabel)}</p>}
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
