import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Url from '../components/Url';
import projectSections from '../utils/projects.json';

function Project({ item, selectedType, setSelectedType, index }) {
  const { name, type, description, link, image, award } = item;

  const handleNoLinkClick = () => {
    if (!link) {
      alert('this is a work in progress — email me if you want a preview!');
      return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-full mb-10"
    >
      <a href={link || undefined} onClick={!link ? handleNoLinkClick : undefined} target="_blank">
        <div className="relative card mb-5 bg-gray-100 h-[200px]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            loading={index < 4 ? 'eager' : 'lazy'}
            priority={index < 2}
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
        <div className="flex flex-row gap-2">
          {type.split(' ').map((t) => (
            <div
              onClick={() => {
                if (selectedType === t) {
                  setSelectedType(null);
                } else {
                  setSelectedType(t);
                }
              }}
              className={twMerge(
                'cursor-pointer hover:opacity-50 bg-[#6a3b7b] text-white px-2 text-sm rounded-full',
                selectedType === t && 'opacity-50 bg-gray-800',
              )}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
      <p>{description}</p>
      <p className="text-gray-500">{award}</p>
    </motion.div>
  );
}

function Projects() {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <p>
        Take a look around! Smaller projects live on my{' '}
        <Url href="https://github.com/cnnmon">GitHub</Url>.
      </p>
      <div>
        {projectSections.map(({ title, list }, sectionIndex) => {
          const filteredList = list.filter(
            (item) => selectedType === null || item.type.split(' ').includes(selectedType),
          );

          if (filteredList.length === 0) {
            return null;
          }

          return (
            <div key={sectionIndex} className="space-y-4">
              <p className="text-gray-500">{title}</p>
              <div className="sm:grid grid-cols-2 gap-4">
                {filteredList.map((item, index) => (
                  <div key={index}>
                    <Project
                      item={item}
                      selectedType={selectedType}
                      setSelectedType={setSelectedType}
                      index={sectionIndex * list.length + index}
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
