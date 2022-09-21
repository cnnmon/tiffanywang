import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { COLORS } from '../constants';
import { getProject } from '../projects';
import sparkles_g from '../public/sparkles_g.svg';
import sparkles_r from '../public/sparkles_r.svg';
import sparkles_y from '../public/sparkles_y.svg';

function Home() {
  const [timer, setTimer] = useState(0);
  const attributes = ['student', 'developer', 'artist', 'game dev', 'tea enthusiast'];
  const colors = ['red', 'orange', 'yellow', 'lightgreen', 'green'];
  const greetings = ['hi', 'hello', 'howdy', 'yo'];
  
  useEffect(() => {
    const interval = setTimeout(() => {
      setTimer(timer + 1);
    }, 1500);
    return () => { clearTimeout(interval); }
  }, [timer]);

  const greeting = useMemo(() => {
    const random = Math.floor(Math.random() * greetings.length);
    return greetings[random];
  }, []);

  return (
    <>
      <Navbar active="/" />
      
      <div style={{ minHeight: '60vh', paddingTop: 50 }} className="center">
        <div className="container">
          {/* TITLE TEXT */}
          <h1 style={{ wordBreak: 'break-word' }}>
            {greeting}, i'm{' '}
            
            {/* GREEN SPARKLE */}
            <Image src={sparkles_g} />

            <br />
            {[..."tiffany wang"].map((letter, i) => (
              <span key={i} style={{
                color: COLORS[colors[i % colors.length]],
              }}>{letter}</span>
            ))}
          </h1>

          {/* YELLOW SPARKLE */}
          <div style={{
            position: 'absolute',
            marginLeft: 380,
          }}>
            <Image src={sparkles_y} />
          </div>

          {/* DESCRIPTION */}
          <p>
            a <b>{attributes[timer % attributes.length]}</b>
            <br />
            building to spark joy :)
          </p>
          <br />
          
          {/* RED SPARKLE */}
          <Image src={sparkles_r} />
        </div>
      </div>

      <div className="center">
        <div className="container">
          <h2 style={{ color: COLORS.red }}>featured</h2>
          <p>what i've been up to recently</p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Card data={getProject('ezcv')} imageOnly />
            <Card data={getProject('coffee')} imageOnly />
            <Card data={getProject('gm')} imageOnly />
            <Card data={getProject('boba')} imageOnly />
            <Card data={getProject('cardio')} imageOnly />
          </div>
          <p>
            <Link href="/work">see all projects ↗︎</Link>
          </p>
        </div>
      </div>

      <br /><br />

      <Footer />
    </>
  );
}

export default Home;
