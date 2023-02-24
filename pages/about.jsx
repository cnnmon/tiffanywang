import me from '../public/images/me.png'
import Image from 'next/image';
import { FaItchIo } from 'react-icons/fa';

function About() {
  return (
    <>
      <Image src={me} alt="me" className="max-w-[250px] mb-5" />
      <p>
        <b>a little about me!</b>
        <br /><br />
        In a past life, I was an indie game dev. Growing up in the not-very-techy 'burbs of Cleveland, Ohio, I was first exposed to coding via Flash games. I started drawing up games of my own, doing everything from art to music to code; I frequented game jams, featured in two exhibitions, and published on my <a href="https://cnnmon.itch.io/" target="_blank" className="link">itch.io</a> <FaItchIo className="clear-left inline" />.
        <br /><br />
        Life looks very different in an undergrad CS degree but my background has shaped my approach. I love dabbling in as many skills as possible, learning by experimenting, and building wonderful, colorful experiences.
      </p>
      <p>
        <br />
        <b>now</b>
        <br /><br />
        I'm a 3rd year undergraduate CS major at <a href="https://www.berkeley.edu/" target="_blank" className="link">UC Berkeley</a> 🐻.
        <br /><br />
        I'm curious about socially impactful tech, broadly ML/AI applications, and creative technology.
        <br /><br />
        This summer, I'll be interning as a software engineer at <a href="https://watershed.com/" target="_blank" className="link">Watershed</a> 🌍, a climate tech startup helping companies decarbonize.
      </p>
      <p>
        <br />
        <b>previously</b>
        <br /><br />
      </p>
      <ul className="list-disc list-inside">
          <li>Indulged many ideas (see /projects)</li>
          <li>Interned SWE at <a href="https://about.meta.com/realitylabs/" target="_blank" className="link">Meta (Reality Labs)</a> and <a href="https://ramp.com/" target="_blank" className="link">Ramp</a>
          </li>
          <li>Led tech at 2 lovely Berkeley student orgs:
            <ul className="list-none list-inside ml-12">
              <li><a href="https://www.calblueprint.org/" target="_blank" className="link">Blueprint</a> 💻, tech for non-profits</li>
              <li><a href="https://www.calhacks.io/" target="_blank" className="link">Cal Hacks</a> 🐻, Berkeley's collegiate hackathon</li>
            </ul>
          </li>
          <li>Taught the <a href="https://cs61a.org/" target="_blank" className="link">intro CS class</a> and <a href="http://wdd.io/" target="_blank" className="link">Web Design Decal</a></li>
          <li>Joined some cool communities:
            <ul className="list-none list-inside ml-12">
              <li><a href="https://eecs.berkeley.edu/resources/undergrads/accel" target="_blank" className="link">Accel Scholars</a></li>
              <li><a href="https://joininteract.com/" target="_blank" className="link">Interact Fellowship</a></li>
              <li><a href="https://neo.com/" target="_blank" className="link">Neo Scholars</a></li>
            </ul>
          </li>
        </ul>

    </>
  )
}

export default About
