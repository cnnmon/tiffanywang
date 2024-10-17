import artSections from '../utils/art.json'
import Image from 'next/image'

function Section({ section }) {
  const { title, list } = section;

  function autolink(text) {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function(url) {
      const displayUrl = url.replace(/^https?:\/\/www./, '').replace(/\/$/, '');
      return `<a href="${url}" target="_blank" class="underline" rel="noopener noreferrer">${displayUrl}</a>`;
    });
  }

  return (
    <>
      <p>•───────• {title} •───────•</p>
      {list.map((art, index) => (
        <div key={index} className="flex flex-col mb-10 w-[100%]">
          <div className="flex flex-col w-full justify-between gap-2 md:flex-row overflow-x-scroll">
            {art.images.map((image, imgIndex) => 
              <Image
                key={imgIndex}
                src={image}
                alt={art.title}
                height={0}
                width={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
            )}
          </div>
          <p className="font-bold">[<span dangerouslySetInnerHTML={{ __html: autolink(art.title) }} />]</p>
        </div>
      ))}
    </>
  );
}

function Art() {
  return (
    <div className="flex flex-col gap-2">
      {artSections.map((section, index) => <Section key={index} section={section} />)}
    </div>
  )
}

export default Art
