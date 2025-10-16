import Image from 'next/image';
import { useEffect, useState } from 'react';
import { shopItems } from '../utils/constants';
import { getDateHourSeed, shuffleWithSeed, storageUtils } from '../utils/shop';

function Shop() {
  const [availableItems, setAvailableItems] = useState([]);
  const [nextDropIn, setNextDropIn] = useState(3600);
  const [money, setMoney] = useState(500);
  const [purchasedIds, setPurchasedIds] = useState([]);

  const getRandomItems = () => {
    const seed = getDateHourSeed();
    const shuffled = shuffleWithSeed(shopItems, seed);
    return shuffled.slice(0, 5);
  };

  const getSecondsUntilNextHour = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return (60 - minutes) * 60 - seconds;
  };

  const isPurchased = (item) => {
    return purchasedIds.includes(item.id);
  };

  useEffect(() => {
    setMoney(storageUtils.getMoney());
    setPurchasedIds(storageUtils.getPurchasedIds());
    setAvailableItems(getRandomItems());
    setNextDropIn(getSecondsUntilNextHour());

    const countdownInterval = setInterval(() => {
      setNextDropIn((prev) => {
        if (prev <= 1) {
          setAvailableItems(getRandomItems());
          return getSecondsUntilNextHour();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  const handleResetGame = () => {
    if (confirm('Are you sure you want to reset? This will clear all your money and items!')) {
      storageUtils.clearAll();
      setMoney(500);
      setPurchasedIds([]);
      setAvailableItems(getRandomItems());
      setNextDropIn(getSecondsUntilNextHour());
    }
  };

  const handlePurchase = (item) => {
    if (money >= item.price && !isPurchased(item)) {
      const newMoney = money - item.price;
      setMoney(newMoney);
      setPurchasedIds((prev) => [...prev, item.id]);
      storageUtils.setMoney(newMoney);
      storageUtils.setPurchasedIds([...purchasedIds, item.id]);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const inventoryItems = purchasedIds
    .map((id) => shopItems.find((item) => item.id === id))
    .filter((item) => item !== undefined);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <div className="text-center mb-6 pb-4 border-b">
        <p className="font-bold mb-2">You have: {money} NP</p>
        <p className="text-gray-600">
          New items drop every hour • Next drop in: {formatTime(nextDropIn)}
        </p>
        <button onClick={handleResetGame} className="text-gray-400 underline mt-1">
          Reset
        </button>
      </div>

      {inventoryItems.length > 0 && (
        <div className="mb-8">
          <h2 className="font-bold mb-4 pb-2 border-b">Your Inventory:</h2>
          <div className="grid grid-cols-3 gap-4">
            {inventoryItems.map((item) => (
              <div key={item.id} className="text-center">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={150}
                  height={150}
                  className="border"
                />
                <p className="text-sm mt-2">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="font-bold mb-4 pb-2 border-b">Shop Front:</h2>
      <div className="grid grid-cols-4 gap-4">
        {availableItems.map((item, index) => {
          const purchased = isPurchased(item);
          return (
            <div key={index} className="text-center">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={200}
                height={200}
                className="border"
              />
              <p className="font-bold text-sm mt-2">{item.name}</p>
              <p className="text-xs">1 in stock</p>
              <p className="text-sm mt-1">Cost: {item.price} NP</p>
              <button
                onClick={() => handlePurchase(item)}
                disabled={money < item.price || purchased}
                className={`mt-2 px-3 py-1 text-sm border ${
                  purchased
                    ? 'opacity-50 cursor-not-allowed'
                    : money >= item.price
                      ? 'hover:bg-gray-100'
                      : 'opacity-50 cursor-not-allowed'
                }`}
              >
                {purchased ? 'Sold' : 'Buy'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Shop;
