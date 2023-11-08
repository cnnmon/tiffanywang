import me from '../public/images/me.png'
import Image from 'next/image'
import { FaItchIo } from 'react-icons/fa'

function About() {
  return (
    <>
      <p>
        <img src="/images/me.png" className="w-[200px]" />
        <br />
        I'm a 4th year computer science major at <a href="https://www.berkeley.edu/" target="_blank" className="link">UC Berkeley</a> 🐻. On campus, I teach <a href="https://cs162.org/" target="_blank" className="link">Operating Systems</a> and research human-AI interaction in <a href="https://humancompatible.ai/" target="_blank" className="link">CHAI</a> and <a href="https://bair.berkeley.edu/" target="_blank" className="link">BAIR</a>.
        <br /><br />
        I'm interested in social impact, sustainability, and creative technology. I love dabbling in as many disciplines as possible, learning by experimenting, and building wonderful, colorful experiences.
      </p>
      <p>
        <br />
        <b>✧･ﾟ: *✧･ﾟ:*</b>
        <br /><br />
        I grew up in Cleveland, Ohio and learned to code via Flash games. Later, I exhibited games in Cleveland and New York City and achieved 1M(!!) views on <a href="https://cnnmon.itch.io/" target="_blank" className="link">itch.io</a>. Games remain my favorite form of art, and I still find inspiration in <a href="https://store.steampowered.com/app/206440/To_the_Moon/" target="_blank" className="link">unconventional</a> <a href="https://www.omori-game.com/en" target="_blank" className="link">indie</a> <a href="https://ldjam.com/" target="_blank" className="link">games</a>.
        <br /><br />
        Nowadays, I software engineer. I’ve spent summers and gap semesters at <a href="https://watershed.com/" target="_blank" className="link">Watershed</a>, <a href="https://about.meta.com/realitylabs/" target="_blank" className="link">Facebook Reality Labs</a>, and <a href="https://ramp.com/" target="_blank" className="link">Ramp</a> thinking about product, indulging in pseudo-healthy snacks, and doing 1:1s at SF Costco.
        <br /><br />
        Elsewhere in college, I’ve:
      </p>
      <ul className="list-disc list-inside">
        <li>Made art with <a href="https://www.instagram.com/gag.magazine/" target="_blank" className="link">student-run art magazines</a> and friends 🎨</li>
        <li>Taught CS in no prior experience classrooms:
          <ul className="list-none list-inside ml-12">
            <li><a href="https://cs61a.org/" target="_blank" className="link">CS 61A</a>, Berkeley's introduction to CS</li>
            <li><a href="https://webdesigndecal.github.io/" target="_blank" className="link">Web Design Decal</a>, a student-run course on design & web-making</li>
          </ul>
        </li>
        <li>Led tech at 2 lovely Berkeley student orgs:
          <ul className="list-none list-inside ml-12">
            <li><a href="https://www.calblueprint.org/" target="_blank" className="link">Blueprint</a>, pro-bono tech for non-profits</li>
            <li><a href="https://www.calhacks.io/" target="_blank" className="link">Cal Hacks</a>, Berkeley's flagship collegiate hackathon</li>
          </ul>
        </li>
        
        <li>Joined cool communities:
          <ul className="list-none list-inside ml-12">
            <li><a href="https://eecs.berkeley.edu/resources/undergrads/accel" target="_blank" className="link">Accel Scholars</a></li>
            <li><a href="https://joininteract.com/" target="_blank" className="link">Interact Fellowship</a></li>
            <li><a href="https://neo.com/" target="_blank" className="link">Neo Scholars</a></li>
          </ul>
        </li>
      </ul>
      <p>
        <br />
        <b>✧･ﾟ: *✧･ﾟ:*</b>
        <br /><br />
        I love meeting new people, so please reach out if you'd like to chat or collaborate in any way, shape or form! My email is <b>tiffanywang at berkeley dot edu</b> 📬. 
      </p>
    </>
  )
}

export default About
