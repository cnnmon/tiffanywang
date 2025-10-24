import Image from 'next/image';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { getDateHourSeed, shuffleWithSeed, storageUtils } from '../utils/shop';
import shopItems from '../utils/shop.json';

function SelectedItemModal({ selectedItem, setSelectedItem, money, isPurchased, handlePurchase }) {
  if (!selectedItem) {
    return null;
  }

  const purchased = isPurchased(selectedItem);
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1]"
      onClick={() => setSelectedItem(null)}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full mx-4 space-y-4 h-[80%] relative overflow-y-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute w-full bg-white p-6 rounded-t-lg flex justify-between items-start">
          <h2 className="text-xl font-bold">{selectedItem.name}</h2>
          <button
            onClick={() => setSelectedItem(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-scroll flex flex-col h-full gap-4 p-6 pt-20 pb-40">
          <Image
            src={selectedItem.imageUrl}
            alt={selectedItem.name}
            width={400}
            height={400}
            className="border w-fit object-cover h-full max-h-[70%]"
          />
          <div>
            <p className="text-gray-700">{selectedItem.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Rarity:</span>
                <span className="capitalize">{selectedItem.stats.rarity}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Power:</span>
                <span>{selectedItem.stats.power}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Speed:</span>
                <span>{selectedItem.stats.speed}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Price:</span>
                <span>{selectedItem.price} fishcoin</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 bg-white p-6 w-full">
          <button
            onClick={() => {
              handlePurchase(selectedItem);
              setSelectedItem(null);
            }}
            disabled={money < selectedItem.price || purchased}
            className={twMerge(
              'w-full border-2 py-2 rounded-full transition-colors',
              purchased
                ? 'bg-gray-300 cursor-not-allowed'
                : money >= selectedItem.price
                  ? 'hover:bg-gray-100'
                  : 'bg-gray-300 cursor-not-allowed',
            )}
          >
            {purchased ? 'sold' : money >= selectedItem.price ? 'buy' : 'not enough fishcoin'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  const [availableItems, setAvailableItems] = useState([]);
  const [money, setMoney] = useState(500);
  const [purchasedIds, setPurchasedIds] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setMoney(storageUtils.getMoney());
    setPurchasedIds(storageUtils.getPurchasedIds());
    setAvailableItems(getRandomItems());
  }, []);

  const getRandomItems = () => {
    const seed = getDateHourSeed();
    const shuffled = shuffleWithSeed(shopItems, seed);
    return shuffled;
  };

  const isPurchased = (item) => {
    return purchasedIds.includes(item.id);
  };

  const handlePurchase = (item) => {
    if (money >= item.price && !isPurchased(item)) {
      const newMoney = money - item.price;
      setMoney(newMoney);
      setPurchasedIds((prev) => [...prev, item.id]);
      storageUtils.setMoney(newMoney);
      storageUtils.setPurchasedIds([...purchasedIds, item.id]);

      setPurchaseAnimation(item);
      setTimeout(() => {
        setPurchaseAnimation(null);
      }, 1500);
    }
  };

  const inventoryItems = purchasedIds
    .map((id) => shopItems.find((item) => item.id === id))
    .filter((item) => item !== undefined);

  return (
    <>
      <SelectedItemModal
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        money={money}
        isPurchased={isPurchased}
        handlePurchase={handlePurchase}
      />

      <div className="max-w-5xl mx-auto space-y-4">
        <div className="text-center">
          <p>
            you have <i>{money} fishcoin</i>. spend wisely.
          </p>
        </div>

        {inventoryItems.length > 0 && (
          <div>
            <div className="flex overflow-x-auto gap-2">
              {inventoryItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="text-center cursor-pointer hover:opacity-80 transition-opacity"
                >
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

        <div className="grid grid-cols-7 gap-2">
          {availableItems.map((item, index) => {
            const purchased = isPurchased(item);
            return (
              <div
                key={index}
                onClick={() => setSelectedItem(item)}
                className={twMerge(
                  'relative w-20 h-20 cursor-pointer hover:opacity-80',
                  purchased && 'grayscale',
                )}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="border w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
