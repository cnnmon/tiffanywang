import { motion } from 'framer-motion';
import Image from 'next/image';
import Url from '../components/Url';
import { useTooltip } from '../hooks/useTooltip';
import projectSections from '../utils/projects.json';

const linkToIcon = {
  paper: '/icons/article.svg',
  video: '/icons/video.svg',
};

function Project({ item, showTooltip, hideTooltip }) {
  const { name, description, links, image, sublabel } = item;
  const projectId = `project-${name.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <motion.div key={projectId} id={projectId} className="flex flex-col w-full mb-5">
      <div className="transition-all duration-50">
        <a href={links.main} target="_blank">
          <div className="relative card mb-3 bg-gray-100 h-[200px]">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              loading="lazy"
              priority={false}
              className="object-cover w-full h-full"
            />
          </div>
        </a>
        <div className="flex flex-row justify-between gap-2">
          <a href={links.main} target="_blank" className="font-bold">
            {name}
          </a>
          <div className="flex flex-row gap-2 select-none">
            {Object.keys(links)
              .filter((k) => k !== 'main')
              .map((k) => {
                const iconSrc = linkToIcon[k];
                return (
                  <div
                    key={k}
                    onClick={() => {
                      window.open(links[k], '_blank')?.focus();
                    }}
                    className="cursor-ne-resize text-sm hover:opacity-50"
                    onMouseEnter={() => showTooltip(k)}
                    onMouseLeave={() => hideTooltip()}
                    style={{
                      color: '#6a3b7b',
                    }}
                  >
                    {iconSrc ? (
                      <img
                        src={iconSrc}
                        alt={k}
                        className="w-4 h-4"
                        style={{
                          filter:
                            'invert(23%) sepia(28%) saturate(1766%) hue-rotate(264deg) brightness(56%) contrast(87%)',
                        }}
                      />
                    ) : (
                      k
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        <p>{description}</p>
        <p className="text-gray-500">{sublabel}</p>
      </div>
    </motion.div>
  );
}

function Projects() {
  const { showTooltip, hideTooltip, Tooltip } = useTooltip();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      {Tooltip}
      <p>
        Take a look around! Smaller projects live on my{' '}
        <Url href="https://github.com/cnnmon">GitHub</Url>.
      </p>
      <div>
        {projectSections.map(({ title, list }, sectionIndex) => {
          return (
            <div key={sectionIndex} className="space-y-4">
              <p className="text-gray-500">{title}</p>
              <div className="sm:grid grid-cols-2 gap-4">
                {list.map((item) => (
                  <div key={item.name}>
                    <Project item={item} showTooltip={showTooltip} hideTooltip={hideTooltip} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default Projects;
