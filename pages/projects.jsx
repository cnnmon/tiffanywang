import projectSections from '../utils/projects.json'
import Image from 'next/image'

function Section({ section }) {
  const { title, list } = section
  return (
    <>
      <p><b>{title}</b></p>
      <div className="flex flex-row gap-2 flex-wrap justify-between">
        {list.map((item, index) => {
          const { name, type, description, date, link, image } = item;
          const handleNoLinkClick = () => {
            if (!link) {
              alert('this is a work in progress — email me for more information!');
              return "";
            }
          };

          return (
            <div key={index} className="flex flex-col w-full mb-10">
              {/* Conditionally render the href attribute or onClick event based on the presence of link */}
              <a href={link || undefined} onClick={!link ? handleNoLinkClick : undefined} target="_blank" className="font-bold">
                <Image src={image} alt={name} width={500} height={362} className="w-full card mb-5" />
              </a>
              <a href={link || undefined} onClick={!link ? handleNoLinkClick : undefined} target="_blank" className="font-bold">[{name}]</a>
              <p>{type} / {date}</p>
              <p>{description}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

function Projects() {
  return (
    <>
      <p>My gallery of things. Take a look around!</p>
      <div className="flex flex-col gap-4 mt-4">
        {projectSections.map((section, index) => <Section key={index} section={section} />)}
      </div>
    </>
  )
}

export default Projects