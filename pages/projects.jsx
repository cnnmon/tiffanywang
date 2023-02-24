import projects from '../public/projects.json'
import Image from 'next/image'

function Projects() {
  const sections = projects["projects"]

  function Section({ section }) {
    const { title, list } = section
    return (
      <>
        <p><b>{title}</b></p>
        <div className="flex flex-row gap-2 flex-wrap justify-between">
          {list.map((item, index) => {
            const { name, type, description, date, link, image } = item
            return (
              <div key={index} className="flex flex-col w-[300px] md:w-[47%] mb-10">
                <a href={link} target="_blank" className="font-bold">
                  <Image src={image} alt={name} width={500} height={362} className="w-full card mb-5" />
                </a>
                <a href={link} target="_blank" className="font-bold">{name}</a>
                <p><b>{type}</b> {date}</p>
                <p>{description}</p>
              </div>
            )
          })}
        </div>
      </>
    )
  }

  return (
    <>
      <p>✧･ﾟ: *✧･ﾟ:*</p>
      <p>A gallery of projects I've worked on.</p>
      <div className="flex flex-col gap-4 mt-4">
        {sections.map((section, index) => <Section key={index} section={section} />)}
      </div>
    </>
  )
}

export default Projects