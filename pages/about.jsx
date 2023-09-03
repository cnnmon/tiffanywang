import me from '../public/images/me.png'
import Image from 'next/image'
import { FaItchIo } from 'react-icons/fa'

function About() {
  return (
    <>
      <p>
        <img src="/images/me.png" className="w-[200px]" />
        <br />
        I'm a 4th year CS major at <a href="https://www.berkeley.edu/" target="_blank" className="link">UC Berkeley</a> 🐻. On campus, I teach <a href="https://cs162.org/" target="_blank" className="link">Operating Systems</a>. I also research AI jailbreaks at Stuart Russell's lab in <a href="https://humancompatible.ai/" target="_blank" className="link">CHAI</a>.
        <br /><br />
        I'm curious about socially impactful tech, AI safety and interpretability, and creative technology.
      </p>
      <p>
        <br />
        <b>✧･ﾟ: *✧･ﾟ:*</b>
        <br /><br />
        In a past life, I was an indie game dev. Growing up in Cleveland, OH, I was first exposed to coding via Flash dress-up games. I drew up games of my own, frequented game jams, featured in two exhibitions, and published on <a href="https://cnnmon.itch.io/" target="_blank" className="link">itch.io</a> <FaItchIo className="clear-left inline" />.
        <br /><br />
        Life looks very different in undergrad but my background has shaped my approach. I love dabbling in as many skills as possible, learning by experimenting, and building wonderful, colorful experiences.
      </p>
      <p>
        <br />
        <b>previously</b>
        <br /><br />
      </p>
      <ul className="list-disc list-inside">
        <li>Indulged many ideas (see /projects)</li>
        <li>Did software engineering stints at:
          <ul className="list-none list-inside ml-12">
            <li><a href="https://watershed.com/" target="_blank" className="link">Watershed</a>, Infrastructure & Reporting</li>
            <li><a href="https://about.meta.com/realitylabs/" target="_blank" className="link">Facebook Reality Labs</a>, New User Experience</li>
            <li><a href="https://ramp.com/" target="_blank" className="link">Ramp</a>, Spend Management</li>
          </ul>
        </li>
        <li>Led tech at 2 lovely Berkeley student orgs:
          <ul className="list-none list-inside ml-12">
            <li><a href="https://www.calblueprint.org/" target="_blank" className="link">Blueprint</a>, tech for non-profits</li>
            <li><a href="https://www.calhacks.io/" target="_blank" className="link">Cal Hacks</a>, Berkeley's flagship collegiate hackathon</li>
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
