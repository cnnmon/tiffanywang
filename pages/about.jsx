import { AiFillFacebook } from 'react-icons/ai';
import { IoSchool } from 'react-icons/io5';
import Footer from '../components/Footer';
import me from '../public/me.png';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import { COLORS } from '../constants';

function Link({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function About() {
  return (
    <>
      <Navbar active="/about" />

      <div className="center">
        <div className="container">
          {/* TITLE TEXT */}
          <div style={{ display: 'flex', paddingTop: 80 }}>
            <div className="me">
              <Image src={me} height={280} width={300} objectFit="cover" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <p>Nice to meet you,</p>
              <br />
              <h2
                style={{ width: '260px', color: COLORS.darkyellow }}
                >I'm Tiffany!</h2>
            </div>
          </div>

          <br />
          <p>✧･ﾟ: *✧･ﾟ:*</p>
          <br />

          {/* BODY */}
          <p>I’m a software engineer, artist, and computer science junior at <Link href="https://www.berkeley.edu/"><IoSchool className="icon" />UC Berkeley</Link>.</p>
          <br />
          <p>Growing up in the not-very-techy 'burbs of Cleveland, Ohio, I was first exposed to coding via Flash games. Besides being free to play (which was awesome), I fell in love with the sheer creativity and the ability to step inside fantasy worlds of your own choosing.</p>
          <br />
          <p>
          An art kid, I began building out games of my own, tinkering with animation, music, writing, and, of course, code. It was unbelievably fun! I loved teaching myself, experimenting with new tools, and sharing my  digital worlds online. 
          </p>
          <br />
          <p>
          Now in college, I share a similar drive to explore software and challenge myself to create really cool things. I'm particularly curious about how we can enable creativity and productivity, make tech for good, increase accessibility, and further digital storytelling. I also love dabbling in creative technology on the side.</p>
          <br />
          <p>That being said: Want to work together in some way (or just want to say hi)? Shoot me an email at <a href="mailto:tiffanywang@berkeley.edu">tiffanywang@berkeley.edu</a>!</p>
          <br />
          <br />
          <p>~</p>
          <br />
          <p>Currently:</p>
          <ul>
            <li>Leading tech and facilitating hacker culture at <Link href="https://calhacks.io/">Cal Hacks</Link></li>
            <li>Developing for non-profits at <Link href="https://calblueprint.org/">Blueprint</Link></li>
            <li>On a mission to make art before I drown in my courseload</li>
          </ul>
          <br />
          <p>Previously:</p>
          <ul>
            <li>Worked on VR at <Link href="https://www.facebook.com/"><AiFillFacebook className="icon" />Meta</Link></li>
            <li>Took a gap to save people money at <Link href="https://ramp.com/">Ramp</Link></li>
            <li>Taught Berkeley's <Link href="https://cs61a.org/">intro to computer science class</Link> and <Link href="http://wdd.io/">Web Design Decal</Link></li>
            <li>Landed interactive exhibits in <Link href="http://clevelandclinicexpressions.org/">Cleveland</Link> (s/o to the Cleveland Clinic) and <Link href="https://www.artandwriting.org/">New York City</Link></li>
            <li>Made a <Link href="https://chrome.google.com/webstore/detail/coffeelings/hcbddpppkcnfjifbcfnhmelpemdoepkk">chrome extension</Link> that was <Link href="https://youtu.be/iXN_THcp408?t=144">boosted by study YouTubers</Link> and accumulated 200k users</li>
            <li>Made a ton of games, digital art, and music</li>
          </ul>
          <br /><br />
          <p>Cool communities I'm a part of:</p>
          <ul>
            <li><Link href="https://eecs.berkeley.edu/resources/undergrads/accel">Accel Scholars</Link></li>
            <li><Link href="https://joininteract.com/">Interact Fellowship</Link></li>
            <li><Link href="https://neo.com/">Neo Scholars</Link></li>
          </ul>
          <br />
          <p>
            ~
            <br /><br />
            When I’m not working, you can usually find me playing strategy games (physical or virtual), sipping Yerba Mate, or tending to fake plants.
            <br /><br />
            <Link href="https://drive.google.com/file/d/1eLelGRhX6h65sQhYiB_LqCli2UL2U-wW/view">Check out my resume here! ↗︎</Link>
          </p>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default About;
