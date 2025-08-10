import Url from '../components/Url'
import { useState, useEffect } from 'react'

const words = {
  drinks: ['yakult 🍓', 'grape soda 🍇', 'oat matcha lattes 🍵', 'mango milk tea 🥭', 'Cholula hot sauce 🌶️'],
  hobbies: ['host social deduction board game nights 🎲', 'sing my heart out at karaoke 🎤', 'brew the spiciest soups known to man 🍲', 'talk about the idea of going to the gym 💪']
}

function WaveText({ text }) {
  return (
    <span className="wave">
      {text.split('').map((letter, index) => (<span key={index}>{letter == ' ' ? '\u00A0' : letter}</span>))}
    </span>
  )
}

function Home() {
  const [drinkIdx, setDrinkIdx] = useState(0)
  const [hobbyIdx, setHobbyIdx] = useState(0)

  useEffect(() => {
    setDrinkIdx(Math.floor(Math.random() * words.drinks.length))
    setHobbyIdx(Math.floor(Math.random() * words.hobbies.length))
  }, [])

  return (
    <div className="flex flex-col text-lg select-none">
      <p>
        <WaveText text="welcome to my web home" />!
        {" "}im tiffany. go ahead, grab yourself a drink; my cooler stocks infinite amounts of <a className="link play" onClick={() => setDrinkIdx((prev) => (prev + 1) % words.drinks.length)}>{words.drinks[drinkIdx]}</a>.
      </p>
      
      <br />
      <p>im based in sunny san francisco, where i:</p>
      <p>¹work on <Url href="https://mj-storytelling.github.io/">ai-supported creative tools</Url></p>
      <p>²make experimental <Url href="/projects">indie games</Url></p>
      <p>³<a className="link play" onClick={() => setHobbyIdx((prev) => (prev + 1) % words.hobbies.length)}>{words.hobbies[hobbyIdx]}</a></p>

      <br />
      <p>
        find me at
        {" {"}<span className="mx-1">
          <Url href="https://www.linkedin.com/in/wtiffany/">linkedin</Url>{", "}
          <Url href="https://github.com/cnnmon">github</Url>{", "}
          <Url href="https://cnnmon.itch.io/">itch.io</Url>{", "}
          <Url href="https://twitter.com/cnnmonie">twitter</Url>{", "}
          <Url href="https://scholar.google.com/citations?hl=en&user=p8hhfi4AAAAJ">gscholar</Url>
        </span>
        {"}"}
        {" "}. ݁₊ ⊹ . ݁ ⟡ ݁ . ⊹ ₊ ݁.
      </p>
    </div>
  )
}

export default Home
