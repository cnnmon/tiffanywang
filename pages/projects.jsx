import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Url from '../components/Url';
import projectSections from '../utils/projects.json';

function Project({ item, selectedType, setSelectedType }) {
  const { name, type, description, link, image, award } = item;

  const handleNoLinkClick = () => {
    if (!link) {
      alert('this is a work in progress — email me if you want a preview!');
      return '';
    }
  };

  const projectId = `project-${name.replace(/\s+/g, '-').toLowerCase()}`;
  const isSelected = selectedType === null || type.split(' ').includes(selectedType);
  const tags = type.split(' ');

  return (
    <motion.div key={projectId} id={projectId} className="flex flex-col w-full mb-10">
      <div
        className="transition-all duration-50"
        style={{
          opacity: !isSelected ? 0.3 : 1,
          filter: !isSelected ? 'saturate(20%)' : 'none',
        }}
      >
        <a href={link || undefined} onClick={!link ? handleNoLinkClick : undefined} target="_blank">
          <div className="relative card mb-5 bg-gray-100 h-[200px]">
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
          <a
            href={link || undefined}
            onClick={!link ? handleNoLinkClick : undefined}
            target="_blank"
            className="font-bold"
          >
            {name}
          </a>
          <div className="flex flex-row gap-2 select-none">
            {tags.map((t) => (
              <div
                onClick={() => {
                  if (selectedType === t) {
                    setSelectedType(null);
                  } else {
                    setSelectedType(t);
                  }
                }}
                className={twMerge(
                  'cursor-pointer text-sm',
                  selectedType && selectedType !== t && 'opacity-40',
                )}
                style={{
                  color: '#6a3b7b',
                }}
              >
                [{t}]
              </div>
            ))}
          </div>
        </div>
        <p>{description}</p>
        <p className="text-gray-500">{award}</p>
      </div>
    </motion.div>
  );
}

function Projects() {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
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
                    <Project
                      item={item}
                      selectedType={selectedType}
                      setSelectedType={setSelectedType}
                    />
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
