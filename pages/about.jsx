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
          ❓ Do I look like my friend's frog?
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
        Hailing from the cornfields of Cleveland, I have now found a new home for myself within the parks and matcha cafes of San Francisco. I'm a software engineer, artist, researcher, and game developer.
        <br /><br />
        Professionally, I've spent summers and gap semesters at <Url href="https://watershed.com/">Watershed</Url> on carbon accounting & infrastructure; <Url href="https://about.meta.com/realitylabs/">Facebook Reality Labs</Url> on VR headset onboarding; <Url href="https://ramp.com/">Ramp</Url> on corporate card spend management.
        <br /><br />
        On the side, I make experimental web and mobile games. I've <Url href="https://www.scriptype.com/2020/05/19/self-taught-digital-artist-and-video-game-designer-receives-national-recognition/">exhibited for interactive media</Url> in Cleveland & New York City and achieved 1.2 million plays online via <Url href="https://cnnmon.itch.io/">itch.io</Url>. I also draw, write, animate, 3D model, etc. For my art, check out <Url href="https://twitter.com/cnnmonie">@cnnmonie</Url>.
        <br /><br />
        I love dabbling in as many disciplines as possible, learning by experimenting, and building colorful experiences. I'm also happy to chat or collaborate! Reach out ˙ᵕ˙
        <br />
      </p>
      <br />
      <p>
        <b>Previously, I...</b>
      </p>
      <ul className="list-disc list-inside">
        <li>Graduated Berkeley! yay</li>
        <li>Researched <Url href="https://humancompatible.ai/">human-compatible AI</Url> at <Url href="https://humancompatible.ai/">CHAI</Url>/<Url href="https://bair.berkeley.edu/">BAIR</Url> advised by Prof. Stuart Russell</li>
        <li>Taught people <Url href="https://cs162.org/">how to code up their own operating system</Url></li>
        <li>Illustrated for <Url href="https://www.tiktok.com/@gag.magazine/">student-run art magazines</Url></li>
        <li>Taught CS in no prior experience classrooms:
          <ul className="list-none ml-12">
            <li><Url href="https://cs61a.org/">CS 61A</Url>, Berkeley's intro to CS</li>
            <li><Url href="https://webdesigndecal.github.io/">Web Design Decal</Url>, a course on design & web-making</li>
          </ul>
        </li>
        <li>Led tech at 2 lovely Berkeley student orgs:
          <ul className="list-none ml-12">
            <li><Url href="https://www.calblueprint.org/">Blueprint</Url>, pro-bono tech for non-profits</li>
            <li><Url href="https://www.calhacks.io/">Cal Hacks</Url>, the world's largest collegiate hackathon</li>
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
