import { useEffect, useState } from 'react'
import { AiFillLinkedin, AiFillGithub, AiOutlineTwitter } from 'react-icons/ai'
import { FaItchIo } from 'react-icons/fa'

const words = {
  drinks: ['yakult', 'chrysanthemum tea', 'Yerba Mate', 'La Croix', 'Cholula hot sauce'],
  hobbies: ['hosting game nights', 'singing my heart out at karaoke', 'cooking upscaled instant noodles', 'talking about the idea of going to the gym']
}
const drinksEmoji = ['🍓', '🧃', '🌿', '🍊', '🌶️']
const greeting = 'hi, i\'m tiffany!'

function Home() {
  // generate initial state for words dictionary
  const initialWordsState = Object.fromEntries(Object.keys(words).map(key => [key, 0]))
  const [wordsState, setWordsState] = useState(initialWordsState)

  useEffect(() => {
    // set drink to random
    const randomDrinkIndex = Math.floor(Math.random() * words.drinks.length)
    const randomHobbyIndex = Math.floor(Math.random() * words.hobbies.length)
    setWordsState({ ...wordsState, drinks: randomDrinkIndex, hobbies: randomHobbyIndex })
  }, [])
  
  let greetingCharacters = []
  for (let i = 0; i < greeting.length; i++) {
    const char = greeting[i]
    greetingCharacters.push(char == ' ' ? '\u00A0' : char)
  }

  function incrementWords(key) {
    const index = wordsState[key]
    const length = words[key].length
    const nextIndex = (index + 1) % length
    setWordsState({...wordsState, [key]: nextIndex})
  }

  function PlayLink({ type }) {
    return (
      <a className="link" onClick={() => incrementWords(type)}>
        {words[type][wordsState[type]]}
      </a>
    )
  }

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
        <PlayLink type="drinks" />
        {' '}{drinksEmoji[wordsState['drinks']]}.
        <br /><br />
        I’m currently based in the sunny city of Berkeley, CA ☀️ where I study computer science.
        When I'm not doing ML problem sets, I enjoy beverages, experimenting with digital creative tools, and <PlayLink type="hobbies" />.
        <br /><br />
        Reach out anytime at tiffanywang at berkeley dot edu.
        <br /><br />
      </p>
      <p className="flex flex-row gap-4 text-xl">
        <a href="https://www.linkedin.com/in/wtiffany/" target="_blank" rel="noreferrer"><AiFillLinkedin className="clear-left inline icon-link" alt="linkedin" /></a>
        <a href="https://github.com/cnnmon" target="_blank" rel="noreferrer"><AiFillGithub className="clear-left inline icon-link" alt="github" /></a>
        <a href="https://cnnmon.itch.io/" target="_blank" rel="noreferrer"><FaItchIo className="clear-left inline icon-link" alt="itch.io" /></a>
        <a href="https://twitter.com/cnnmonsugar" target="_blank" rel="noreferrer"><AiOutlineTwitter className="clear-left inline icon-link" alt="twitter" /></a>
      </p>
    </>
  )
}

export default Home
