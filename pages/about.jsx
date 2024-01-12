import { useState } from 'react';
import Image from 'next/image';

function About() {
  const [isHovering, setIsHovering] = useState(false);
  const onHover = () => setIsHovering(true);
  const onLeave = () => setIsHovering(false);

  return (
    <div className="flex flex-col gap-2">
      {isHovering ? (
        <p>
          <Image src={`/images/frog.jpg`} className="mb-2" width={300} height={195} onMouseLeave={onLeave} />
          ❓ My friend's frog that apparently bears resemblance to me
        </p>
      ) : (
        <p>
          <Image src={`/images/me.png`} className="mb-2" width={300} height={195} onMouseEnter={onHover} />
          📍 <a href="https://www.1951coffee.com/" target="_blank" className="link">1951 Coffee, Berkeley</a> (my Matcha latte go-to)
        </p>
      )}

      <br />
      <h2>who i am</h2>
      <p>
        I was born and raised in Cleveland, OH.
        <br />
        I am a soon-expired (4th year) CS major at Berkeley.
        <br />
        I teach <a href="https://cs162.org/" target="_blank" className="link">Operating Systems</a>.
        <br />
        I <a href="https://arxiv.org/abs/2311.01011" target="_blank" className="link">research human-compatible AI</a> in <a href="https://humancompatible.ai/" target="_blank" className="link">CHAI</a> / <a href="https://bair.berkeley.edu/" target="_blank" className="link">BAIR</a>.
        <br /><br />
        Professionally, I software engineer. I’ve spent summers and gap semesters at:
        <ul className="list-disc list-inside">
          <li><a href="https://watershed.com/" target="_blank" className="link">Watershed</a> on carbon accounting, reporting, and infrastructure</li>
          <li><a href="https://about.meta.com/realitylabs/" target="_blank" className="link">Facebook Reality Labs</a> on Oculus onboarding</li>
          <li><a href="https://ramp.com/" target="_blank" className="link">Ramp</a> on corporate card spend management</li>
        </ul>
        <br />
        I'm passionate about social impact and creative technology. I love dabbling in as many disciplines as possible, learning by experimenting, and building colorful experiences.
        <br /><br />
        Growing up near Cleveland, I learned to code by making Flash dress-up games. Later, I <a href="https://www.scriptype.com/2020/05/19/self-taught-digital-artist-and-video-game-designer-receives-national-recognition/" target="_blank" className="link">exhibited games in NYC</a> and achieved 1M(!!) views on <a href="https://cnnmon.itch.io/" target="_blank" className="link">itch.io</a>. Indie games remain a favorite form of art, and I make more with great fervor. Supplementally, I try to draw, write, 3D model, make music, etc.
        <br />
      </p>
      <br />
      <h2>elsewhere, i ...</h2>
      <ul className="list-disc list-inside">
        <li>Make art with <a href="https://www.tiktok.com/@gag.magazine/" target="_blank" className="link">student-run art magazines</a> and friends</li>
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
        <li>Give thanks to cool communities:
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
        Do reach out if you'd like to collaborate! My email is <b>tiffanywang at berkeley dot edu</b> 📬. 
      </p>
    </div>
  )
}

export default About
