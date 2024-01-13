import { useState } from 'react';
import Image from 'next/image';
import Url from '../components/Url';

function About() {
  const [isHovering, setIsHovering] = useState(false);
  const onHover = () => setIsHovering(true);
  const onLeave = () => setIsHovering(false);

  const getProfileSection = () => {
    if (isHovering) {
      return (
        <>
          <Image src='/images/frog.jpg' className="mb-2" width={300} height={195} onMouseLeave={onLeave} />
          ❓ My friend's frog that apparently bears resemblance to me
        </>
      )
    } else {
      return (
        <>
          <Image src='/images/me.png' className="mb-2" width={300} height={195} onMouseEnter={onHover} />
          📍 <Url href="https://www.1951coffee.com/">1951 Coffee, Berkeley</Url> (my Matcha latte go-to)
        </>
      )
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p>{getProfileSection()}</p>
      <br />
      <p>
        <b>who i am</b>
        <br />
        I was born and raised in Cleveland, OH.
        <br />
        I am a soon-expired (4th year) CS major at Berkeley.
        <br />
        I teach <Url href="https://cs162.org/">Operating Systems</Url>.
        <br />
        I <Url href="https://arxiv.org/abs/2311.01011">research human-compatible AI</Url> in <Url href="https://humancompatible.ai/">CHAI</Url> / <Url href="https://bair.berkeley.edu/">BAIR</Url>.
        <br /><br />
        I software engineer. Ive spent summers and gap semesters at:
      </p>
      <ul className="list-disc list-inside">
        <li><Url href="https://watershed.com/">Watershed</Url> on carbon accounting & infrastructure</li>
        <li><Url href="https://about.meta.com/realitylabs/">Facebook Reality Labs</Url> on Oculus onboarding</li>
        <li><Url href="https://ramp.com/">Ramp</Url> on corporate card spend management</li>
      </ul>
      <p>
        I'm passionate about social impact and creative technology. I love dabbling in as many disciplines as possible, learning by experimenting, and building colorful experiences.
        <br /><br />
        I learned to code by making Flash dress-up games. Later, I <Url href="https://www.scriptype.com/2020/05/19/self-taught-digital-artist-and-video-game-designer-receives-national-recognition/">exhibited games in NYC</Url> and achieved 1M(!!) views on <Url href="https://cnnmon.itch.io/">itch.io</Url>. Indie games remain a favorite form of art, and I make more with great fervor. Supplementally, I try to draw, write, 3D model, make music, etc.
        <br />
      </p>
      <br />
      <p>
        <b>elsewhere, i ...</b>
      </p>
      <ul className="list-disc list-inside">
        <li>Make art with <Url href="https://www.tiktok.com/@gag.magazine/">student-run art magazines</Url> and friends</li>
        <li>Taught CS in no prior experience classrooms:
          <ul className="list-none ml-12">
            <li><Url href="https://cs61a.org/">CS 61A</Url>, Berkeley's introduction to CS</li>
            <li><Url href="https://webdesigndecal.github.io/">Web Design Decal</Url>, a student-run course on design & web-making</li>
          </ul>
        </li>
        <li>Led tech at 2 lovely Berkeley student orgs:
          <ul className="list-none ml-12">
            <li><Url href="https://www.calblueprint.org/">Blueprint</Url>, pro-bono tech for non-profits</li>
            <li><Url href="https://www.calhacks.io/">Cal Hacks</Url>, Berkeley's flagship collegiate hackathon</li>
          </ul>
        </li>
        <li>Get inspired by cool communities:
          <ul className="list-none ml-12">
            <li><Url href="https://eecs.berkeley.edu/resources/undergrads/accel">Accel Scholars</Url></li>
            <li><Url href="https://joininteract.com/">Interact Fellowship</Url></li>
            <li><Url href="https://neo.com/">Neo Scholars</Url></li>
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
