import { useEffect, useState } from 'react'
import { AiFillLinkedin, AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';
import { FaItchIo } from 'react-icons/fa';

function Home() {
  const drinksEmoji = ['🍓', '🧃', '🌿', '🍊', '🌶️']
  const drinks = ['yakult', 'chrysanthemum tea', 'Yerba Mate', 'La Croix', 'Cholula hot sauce']
  const [drinkIndex, setDrinkIndex] = useState(0)
  const greeting = 'hi, i\'m tiffany!'
  
  let greetingCharacters = []
  for (let i = 0; i < greeting.length; i++) {
    const char = greeting[i]
    greetingCharacters.push(char == ' ' ? '\u00A0' : char)
  }

  useEffect(() => {
    setDrinkIndex(Math.floor(Math.random() * drinks.length))
  }, [])

  return (
    <>
      <h1 className="font-outline-1 text-center my-8">
        <span className="wave">
          {greetingCharacters.map((letter, index) => (<span key={index}>{letter}</span>))}
        </span>
      </h1>
      <p>
        Welcome to my web-home!
        <br /><br/>
        Go ahead, grab yourself something to drink. I have a fridge full of{' '}
        <a className="link" onClick={() => setDrinkIndex((drinkIndex + 1) % drinks.length)}>
          {drinks[drinkIndex]}
        </a>
        {' '}{drinksEmoji[drinkIndex]}.
        <br /><br />
        I’m currently in sunny <a href="https://www.berkeley.edu/" target="_blank" className="link">Berkeley</a> ☀️ where I study computer science as a 3rd year. Outside doing ML problem sets, I enjoy experimenting with digital creative tools 🎨, talking about the idea of going to the gym, and hosting game nights.
        <br /><br />
        Reach out anytime at <a href="mailto:tiffanywang@berkeley.edu" target="_blank" className="link">tiffanywang at berkeley dot edu</a>.
        <br /><br />
      </p>
      <p className="flex flex-row gap-4 text-xl">
        <a href="https://www.linkedin.com/in/wtiffany/" target="_blank" rel="noreferrer"><AiFillLinkedin className="clear-left inline" alt="linkedin" /></a>
        <a href="https://github.com/cnnmon" target="_blank" rel="noreferrer"><AiFillGithub className="clear-left inline" alt="github" /></a>
        <a href="https://cnnmon.itch.io/" target="_blank" rel="noreferrer"><FaItchIo className="clear-left inline" alt="itch.io" /></a>
        <a href="https://twitter.com/cnnmonsugar" target="_blank" rel="noreferrer"><AiOutlineTwitter className="clear-left inline" alt="twitter" /></a>
      </p>
    </>
  )
}

export default Home
