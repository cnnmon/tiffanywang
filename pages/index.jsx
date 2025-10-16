import Image from 'next/image';
import { useState } from 'react';
import MarkdownFormatter from '../components/MarkdownFormatter';

const drinks = [
  'grape soda 🍇',
  'pink spindrift 🍋',
  'sun moon lake black tea ☀️',
  'oat matcha latte 🍵',
  'buldak ramen sauce packets 🌶️',
];

function Home() {
  const [drinkIndex, setDrinkIndex] = useState(0);

  const handleDrinkClick = () => {
    setDrinkIndex((drinkIndex + 1) % drinks.length);
  };

  return (
    <div className="flex flex-col gap-4">
      <Image
        src="/deco/3d.png"
        alt="me in 3d"
        width={100}
        height={100}
        title="i'll make this a gif once i find the blender file again"
        className="pointer-events-none"
      />
      <div>
        <p>
          Hello, welcome to my web-home! Go ahead, grab yourself something to drink. I have a cooler
          full of{' '}
          <a className="select-none" onClick={handleDrinkClick}>
            {drinks[drinkIndex]}
          </a>
          .
        </p>
      </div>
      <MarkdownFormatter file="/text/home.md" />
    </div>
  );
}

export default Home;
