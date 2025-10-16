import { AnimatePresence, motion } from 'framer-motion';
import LazyImage from '../components/LazyImage';
import Url from '../components/Url';
import projectSections from '../utils/projects.json';

function Project({ item }) {
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
          className="w-full"
        >
          <LazyImage
            src={image}
            alt={name}
            width={500}
            height={300}
            className="card mb-5 object-cover w-full"
          />
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
            {type.split(', ').map((t) => (
              <div className="bg-gray-300 px-2 rounded-full">{t}</div>
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
  return (
    <div className="space-y-4">
      <p>
        Take a look around! Smaller projects live on my{' '}
        <Url href="https://github.com/cnnmon">GitHub</Url>.
      </p>
      <div>
        {projectSections.map(({ title, list }, index) => (
          <div key={index} className="space-y-4">
            <p>
              <b>{title}</b>
            </p>
            <div className="sm:grid grid-cols-2 gap-4">
              {list.map((item, index) => (
                <div key={index}>
                  <Project item={item} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
