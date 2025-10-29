import { AnimatePresence, motion } from 'framer-motion';
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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5 }}
        className="flex flex-col w-full mb-10"
      >
        <motion.a
          href={link || undefined}
          onClick={!link ? handleNoLinkClick : undefined}
          target="_blank"
        >
          <img src={image} alt={name} className="card mb-5 object-cover h-400 w-400" />
        </motion.a>
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
    </AnimatePresence>
  );
}

function Projects() {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div className="space-y-4">
      <p>
        Take a look around! Smaller projects live on my{' '}
        <Url href="https://github.com/cnnmon">GitHub</Url>.
      </p>
      <div>
        {projectSections.map(({ title, list }, index) => {
          const filteredList = list.filter(
            (item) => selectedType === null || item.type.split(' ').includes(selectedType),
          );

          if (filteredList.length === 0) {
            return null;
          }

          return (
            <div key={index} className="space-y-4">
              <p className="text-gray-500">{title}</p>
              <div className="sm:grid grid-cols-2 gap-4">
                {filteredList.map((item, index) => (
                  <div key={index}>
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
    </div>
  );
}

export default Projects;
