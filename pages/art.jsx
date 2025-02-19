import artSections from '../utils/art.json'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Section({ section }) {
  const { list } = section;

  function autolink(text) {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function(url) {
      const displayUrl = url.replace(/^https?:\/\/www./, '').replace(/\/$/, '');
      return `<a href="${url}" target="_blank" class="underline" rel="noopener noreferrer">${displayUrl}</a>`;
    });
  }

  return (
    <>
      {list.map((art, index) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.5 }}
          className="flex flex-col mb-10 w-[100%]"
        >
          <div className="flex w-full justify-between gap-2 flex-col mb-4">
            <AnimatePresence>
              {art.images.map((image, imgIndex) => (
                <motion.div
                  key={imgIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={image}
                    alt={art.title}
                    height={500}
                    width={500}
                    className="w-full h-auto"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <p><b>[<span dangerouslySetInnerHTML={{ __html: autolink(art.title) }} />]</b></p>
          <p>{art.description}</p>
        </motion.div>
      ))}
    </>
  );
}

function Art() {
  const allTypes = artSections.map(section => section.title)
  const [selectedType, setSelectedType] = useState(allTypes[0])

  return (
    <div className="flex flex-col gap-2">
      <p>I dabble in all digital art — 2d, 3d, static, moving. I use Procreate, Blender, After Effects.</p>
      <div className="flex flex-row gap-2 mt-2 mb-4">
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
      {artSections.map((section, index) => {
        if (selectedType === 'all' || selectedType === section.title) {
          return <Section key={index} section={section} />
        }
        return null
      })}
    </div>
  )
}

export default Art
