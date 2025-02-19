import projectSections from '../utils/projects.json'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Project({ item, index }) {
  const { name, type, description, date, link, image } = item;

  const handleNoLinkClick = () => {
    if (!link) {
      alert('this is a work in progress — email me if you want a preview!');
      return "";
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
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-full mb-10"
    >
        <motion.a
          href={link || undefined}
          onClick={!link ? handleNoLinkClick : undefined}
          target="_blank"
          className="font-bold"
        >
          <Image src={image} alt={name} width={500} height={370} className="w-full card mb-5 object-cover" />
        </motion.a>
      <a href={link || undefined} onClick={!link ? handleNoLinkClick : undefined} target="_blank" className="font-bold">[{name}]</a>
      <p>{type} / {date}</p>
      <p>{description}</p>
    </motion.div>
    </AnimatePresence>
  )
}

function Section({ section, selectedType }) {
  const { title, list } = section
  const filteredList = selectedType === 'all' ? list : list.filter(item => item.type === selectedType)

  // Don't render section if filtered list is empty
  if (filteredList.length === 0) return null

  return (
    <>
      <p><b>{title}</b></p>
      <div className="flex flex-row gap-2 flex-wrap justify-between">
        {filteredList.map((item, index) => (
          <Project key={index} item={item} />
        ))}
      </div>
    </>
  )
}

function Projects() {
  const [selectedType, setSelectedType] = useState('all')
  
  // Get unique types from all sections
  const allTypes = ['all', ...new Set(projectSections.flatMap(section => 
    section.list.map(item => item.type)
  ))]

  return (
    <>
      <p>My gallery of toys, tools, experiments. Take a look around! I often use Typescript, Python, Next.js, Unity.</p>
      <div className="flex flex-row gap-2 mt-4 mb-4">
        {allTypes.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`${
              selectedType === type 
                ? 'bg-black text-white' 
                : 'bg-orange-200 hover:bg-gray-300'
            }`}
          >
            [{type}]
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {projectSections.map((section, index) => (
          <Section key={index} section={section} selectedType={selectedType} />
        ))}
      </div>
    </>
  )
}

export default Projects