import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import MarkdownFormatter from '../components/MarkdownFormatter';
import Url from '../components/Url';

const SECTIONS = {
  experience: [
    {
      date: '2026-Present',
      role: 'Graduate Research Assistant, MIT Media Lab',
      org: 'Cyborg Psychology',
      href: 'https://www.media.mit.edu/groups/cyborg-psychology/overview/',
    },
    // { date: '2026', role: 'Resident', org: 'Stochastic Labs', href: 'https://stochasticlabs.org/' },
    {
      date: '2025-2026',
      role: 'Research Engineer',
      org: 'Midjourney',
      href: 'https://www.midjourney.com/',
    },
    { date: '2026', role: 'Software Engineer', org: 'Watershed', href: 'https://watershed.com/' },
    {
      date: '2024',
      role: 'Undergraduate Researcher',
      org: 'UC Berkeley CHAI',
      href: 'https://humancompatible.ai/',
    },
    {
      date: '2024',
      role: 'Software Engineering Intern',
      org: 'Watershed',
      href: 'https://watershed.com/',
    },
    {
      date: '2023',
      role: 'Software Engineering Intern',
      org: 'Meta Reality Labs',
      href: 'https://about.meta.com/realitylabs/',
    },
    { date: '2022', role: 'Software Engineering Intern', org: 'Ramp', href: 'https://ramp.com/' },
  ],
  teaching: [
    { role: 'CS 162: Operating Systems', href: 'https://cs162.org/' },
    'CS 161: Computer Architecture',
    'CS 163: Computer Networks',
    'CS 164: Algorithms',
    'CS 165: Machine Learning',
  ],
};

function SectionItem({ item }) {
  const { date, role, org, href } = typeof item === 'string' ? { role: item } : item;
  const roleNode = href && !org ? <Url href={href}>{role}</Url> : role;
  const orgNode = org ? href ? <Url href={href}>{org}</Url> : org : null;

  return (
    <p>
      {date && (
        <>
          <span className="text-[#6a3b7b] tabular-nums sm:inline-block sm:w-[8.5rem]">
            {date}
          </span>{' '}
        </>
      )}
      {roleNode}
      {orgNode && <>, {orgNode}</>}
    </p>
  );
}

function About() {
  const containerRef = useRef(null);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <div ref={containerRef} className="h-40 w-40 overflow-hidden cursor-crosshair">
          <Image
            src={'/me/me_1.png'}
            alt="tiffanywang"
            width={200}
            height={200}
            priority
            title="me"
            className="h-40 w-40 object-cover object-center pointer-events-none"
          />
        </div>
        <p>📍 {'Cambridge, MA'}</p>
      </div>
      <MarkdownFormatter file="/text/about.md" />
      {/* <div className="flex flex-col gap-4">
        {Object.entries(SECTIONS).map(([header, items]) => (
          <div key={header}>
            <p className="font-bold">{header}</p>
            {items.map((item, i) => (
              <SectionItem key={`${header}-${i}`} item={item} />
            ))}
          </div>
        ))}
      </div> */}
    </motion.div>
  );
}

export default About;
