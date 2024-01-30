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
          📍 Home
        </>
      )
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p>{getProfileSection()}</p>
      <br />
      <p>
        <b>About me</b>
        <br /><br />
        Hi! I'm Tiffany!
        <br /><br />
        Hailing from the cornfields (jk) of Cleveland, OH, I'm now a 4th year CS major at UC Berkeley. Here on campus, you can find me teaching <Url href="https://cs162.org/">Operating Systems</Url> and researching <Url href="https://arxiv.org/abs/2311.01011">human-compatible AI</Url> in <Url href="https://humancompatible.ai/">CHAI</Url>/<Url href="https://bair.berkeley.edu/">BAIR</Url>.
        <br /><br />
        I software engineer. I've spent summers and gap semesters at <Url href="https://watershed.com/">Watershed</Url> on carbon accounting & infrastructure; <Url href="https://about.meta.com/realitylabs/">Facebook Reality Labs</Url> on VR headset onboarding; <Url href="https://ramp.com/">Ramp</Url> on corporate card spend management.
        <br /><br />
        I make games. In fact, I learned to code by making Flash dress-up games. I have <Url href="https://www.scriptype.com/2020/05/19/self-taught-digital-artist-and-video-game-designer-receives-national-recognition/">exhibited games in NYC</Url> and achieved 1M plays on <Url href="https://cnnmon.itch.io/">itch.io</Url>. Supplementally, I try to draw, write, 3D model, make music, etc. I primarily post art on <Url href="https://twitter.com/cnnmonie">@cnnmonie</Url>.
        <br /><br />
        I care about social impact & creative technology. I love dabbling in as many disciplines as possible, learning by experimenting, and building colorful experiences. I also love collaborations!
        <br />
      </p>
      <br />
      <p>
        <b>Previously, I...</b>
      </p>
      <ul className="list-disc list-inside">
        <li>Illustrated for <Url href="https://www.tiktok.com/@gag.magazine/">student-run art magazines</Url></li>
        <li>Taught CS in no prior experience classrooms:
          <ul className="list-none ml-12">
            <li><Url href="https://cs61a.org/">CS 61A</Url>, Berkeley's introduction to CS</li>
            <li><Url href="https://webdesigndecal.github.io/">Web Design Decal</Url>, a student-run course on design & web-making</li>
          </ul>
        </li>
        <li>Led tech at 2 lovely Berkeley student orgs:
          <ul className="list-none ml-12">
            <li><Url href="https://www.calblueprint.org/">Blueprint</Url>, pro-bono tech for non-profits</li>
            <li><Url href="https://www.calhacks.io/">Cal Hacks</Url>, our flagship collegiate hackathon</li>
          </ul>
        </li>
        <li>Drew inspiration from cool communities:
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
        Want to reach out? Feel free to email me at <b>tiffanywang at berkeley dot edu</b> 📬. 
      </p>
    </div>
  )
}

export default About
