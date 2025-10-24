import Image from 'next/image';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import blogPosts from '../utils/blog.json';
import files from '../utils/files.json';
import { formatTimeAgo } from '../utils/time';

function SelectedItemModal({ selectedItem, setSelectedItem }) {
  if (!selectedItem) {
    return null;
  }

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
      </div>
    </div>
  );
}

export default function Filesys() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <SelectedItemModal selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <div className="grid grid-cols-7 gap-2">
        {blogPosts.map((post, index) => (
          <div key={index} className="text-sm">
            <a href={`/blog/${index}`}>{post.title}</a>
            <p>{formatTimeAgo(post.date)}</p>
          </div>
        ))}
        {files.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedItem(item)}
            className={twMerge('relative w-20 h-20 cursor-pointer hover:opacity-80')}
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={200}
              height={200}
              className="border w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
}
