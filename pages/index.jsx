import { useEffect, useState } from 'react'

const words = {
  drinks: ['yakult', 'chrysanthemum tea', 'Yerba Mate', 'La Croix', 'Cholula hot sauce'],
  hobbies: ['hosting board game nights', 'singing my heart out at karaoke', 'cooking the spiciest soups known to man', 'talking about the idea of going to the gym']
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
      <a className="link play" onClick={() => incrementWords(type)}>
        {words[type][wordsState[type]]}
      </a>
    )
  }

  return (
    <>
      <h1 className="font-outline-1 pt-10 pb-5 text-center">
        <span className="wave">
          {greetingCharacters.map((letter, index) => (<span key={index}>{letter}</span>))}
        </span>
      </h1>
      <br />
      <p>
        <b>Welcome to my corner of the galaxy ⋆⭒˚.⋆.</b> Go ahead, grab yourself something to drink. Very conveniently, I have a cooler full of{' '}
        <PlayLink type="drinks" />
        {' '}{drinksEmoji[wordsState['drinks']]}.
        <br /><br />
        I'm a developer, artist, and toy-maker. I study CS at Berkeley. I like fizzy beverages, digital creative tools, and <PlayLink type="hobbies" />.
        <br /><br />
        Reach out anytime at tiffanywang at berkeley dot edu.
        <br /><br />
        Else, find me at: <a href="https://www.linkedin.com/in/wtiffany/" target="_blank" rel="noreferrer" className="link">Linkedin</a>, <a href="https://github.com/cnnmon" target="_blank" rel="noreferrer" className="link">GitHub</a>, <a href="https://cnnmon.itch.io/" target="_blank" rel="noreferrer" className="link">itch.io</a>, <a href="https://twitter.com/cnnmonsugar" target="_blank" rel="noreferrer" className="link">Twitter</a>
        <br />
      </p>
    </>
  )
}

export default Home
