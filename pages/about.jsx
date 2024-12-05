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
          📍 San Francisco, CA
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
        Hi, I'm Tiffany! Hailing from the cornfields of Ohio, I now roam the cafes of San Francisco.
        <br /><br />
        I'm a software engineer building data infrastructure for enterprise sustainability teams @ <Url href="https://watershed.com/">Watershed</Url>. I'm also an artist who makes <Url href="https://cnnmon.itch.io/">silly indie games (1.3m+ plays!)</Url> and experiments with human-AI interaction, creativity, safety (see: <Url href="projects">/projects</Url>).
        <br /><br />
        I love dabbling in as many disciplines as possible, learning by experimenting, and building colorful experiences. I'm also happy to chat or collaborate! Don't hesitate to reach out ˙ᵕ˙
        <br />
      </p>
      <br />
      <p>
        <b>Previously, I...</b>
      </p>
      <ul className="list-disc list-inside">
        <li>Graduated Berkeley! yay</li>
        <li>Co-authored a paper on <Url href="https://tensortrust.ai/paper/">the art of jailbreaking LLMs</Url> at <Url href="https://humancompatible.ai/">CHAI</Url></li>
        <li>'nterned at <Url href="https://about.meta.com/realitylabs/">Facebook Reality Labs</Url> & <Url href="https://ramp.com/">Ramp</Url></li>
        <li>Illustrated for <Url href="https://www.kernelmag.io/">Kernel</Url> and <Url href="https://www.tiktok.com/@gag.magazine/">student-run art magazines</Url></li>
        <li>Taught:
          <ul className="list-none ml-12">
            <li> <Url href="https://cs162.org/">CS 162 Operating Systems</Url> with our favorite bean pintOS</li>
            <li><Url href="https://cs61a.org/">CS 61A Intro to CS</Url>, Berkeley's starter course</li>
            <li><Url href="https://webdesigndecal.github.io/">Web Design Decal</Url>, a course on design & web-making</li>
          </ul>
        </li>
        <li>Led tech at 2 lovely student orgs:
          <ul className="list-none ml-12">
            <li><Url href="https://www.calblueprint.org/">Blueprint</Url>, pro-bono tech for non-profits</li>
            <li><Url href="https://www.calhacks.io/">Cal Hacks</Url>, the world's largest collegiate hackathon</li>
          </ul>
        </li>
        <li>Drew inspiration from wonderful communities:
          <ul className="list-none ml-12">
            <li><Url href="https://eecs.berkeley.edu/resources/undergrads/accel">Accel Scholars</Url></li>
            <li><Url href="https://joininteract.com/">Interact Fellowship</Url></li>
            <li><Url href="https://neo.com/">Neo Scholars</Url></li>
          </ul>
        </li>
        <li>Made educational games with the Cleveland Clinic</li>
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
