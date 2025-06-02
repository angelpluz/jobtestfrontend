// app/assignment1/page.tsx
'use client';

import React, { useState, useRef, RefObject } from 'react';

type Item = {
  type: 'Fruit' | 'Vegetable';
  name: string;
};

const initialData: Item[] = [
  { type: 'Fruit', name: 'Apple' },
  { type: 'Vegetable', name: 'Broccoli' },
  { type: 'Vegetable', name: 'Mushroom' },
  { type: 'Fruit', name: 'Banana' },
  { type: 'Vegetable', name: 'Tomato' },
  { type: 'Fruit', name: 'Orange' },
  { type: 'Fruit', name: 'Mango' },
  { type: 'Fruit', name: 'Pineapple' },
  { type: 'Vegetable', name: 'Cucumber' },
  { type: 'Fruit', name: 'Watermelon' },
  { type: 'Vegetable', name: 'Carrot' },
];

export default function Assignment1() {
  const [mainList, setMainList] = useState<Item[]>(initialData);
  const [fruitList, setFruitList] = useState<Item[]>([]);
  const [vegList, setVegList] = useState<Item[]>([]);
  const timers = useRef<Record<string, NodeJS.Timeout>>({});
  const mainRef = useRef<HTMLTableCellElement>(null);
  const flyRef = useRef<HTMLDivElement>(null);
  const fruitRef = useRef<HTMLTableCellElement>(null);
  const vegRef = useRef<HTMLTableCellElement>(null);

  const [flyItem, setFlyItem] = useState<{
    name: string;
    top: number;
    left: number;
    dx: number;
    dy: number;
  } | null>(null);

  const handleFlyBack = (item: Item, fromRef: RefObject<HTMLTableCellElement>) => {
    const fromBox = fromRef.current?.querySelector(`#item-${item.name}`) as HTMLElement | null;
    const toBox = mainRef.current?.querySelector(`#target-main`) as HTMLElement | null;
    if (!fromBox || !toBox) return;

    const fromRect = fromBox.getBoundingClientRect();
    const toRect = toBox.getBoundingClientRect();

    setFlyItem({
      name: item.name,
      top: fromRect.top,
      left: fromRect.left,
      dx: toRect.left - fromRect.left,
      dy: toRect.top - fromRect.top,
    });

    setTimeout(() => {
      setFlyItem(null);
      setMainList(prev => [...prev, item]);
    }, 500);
  };

  const moveToTypeList = (item: Item, index: number) => {
    setMainList(prev => {
      const newList = [...prev];
      newList.splice(index, 1);
      return newList;
    });

    const setList = item.type === 'Fruit' ? setFruitList : setVegList;
    const getList = item.type === 'Fruit' ? fruitList : vegList;
    setList([...getList, item]);

    timers.current[item.name] = setTimeout(() => {
      const fromRef: RefObject<HTMLTableCellElement> = item.type === 'Fruit' ? fruitRef as RefObject<HTMLTableCellElement> : vegRef as RefObject<HTMLTableCellElement>;
      if (item.type === 'Fruit')
        setFruitList(prev => prev.filter(i => i.name !== item.name));
      else
        setVegList(prev => prev.filter(i => i.name !== item.name));
      handleFlyBack(item, fromRef);
    }, 5000);
  };

  const returnToMain = (item: Item, type: 'Fruit' | 'Vegetable') => {
    clearTimeout(timers.current[item.name]);
    if (type === 'Fruit') setFruitList(prev => prev.filter(i => i.name !== item.name));
    else setVegList(prev => prev.filter(i => i.name !== item.name));
    setMainList(prev => [...prev, item]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">
      <h1 className="text-2xl font-bold text-center mb-8">🥗 Auto Delete Todo List (with Animation)</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-gray-800 text-lg border-r border-gray-300">📋 Main List</th>
              <th className="px-4 py-2 text-red-600 text-lg border-r border-gray-300">🍎 Fruits</th>
              <th className="px-4 py-2 text-green-600 text-lg">🥦 Vegetables</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-top w-1/3 border-r border-t border-gray-300 p-4" ref={mainRef}>
                <div id="target-main" className="h-0"></div>
                {mainList.map((item, i) => (
                  <button
                    key={item.name}
                    id={`item-${item.name}`}
                    onClick={() => moveToTypeList(item, i)}
                    className="w-full p-3 mb-3 rounded-xl bg-white shadow hover:bg-gray-100 text-left"
                  >
                    {item.name}
                  </button>
                ))}
              </td>
              <td className="align-top w-1/3 border-r border-t border-gray-300 p-4" ref={fruitRef}>
                {fruitList.map(item => (
                  <button
                    key={item.name}
                    id={`item-${item.name}`}
                    onClick={() => returnToMain(item, 'Fruit')}
                    className="w-full p-3 mb-3 rounded-xl bg-red-100 hover:bg-red-200 text-left"
                  >
                    {item.name}
                  </button>
                ))}
              </td>
              <td className="align-top w-1/3 border-t border-gray-300 p-4" ref={vegRef}>
                {vegList.map(item => (
                  <button
                    key={item.name}
                    id={`item-${item.name}`}
                    onClick={() => returnToMain(item, 'Vegetable')}
                    className="w-full p-3 mb-3 rounded-xl bg-green-100 hover:bg-green-200 text-left"
                  >
                    {item.name}
                  </button>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Fly item animation */}
      {flyItem && (
        <div
          ref={flyRef}
          className="fixed z-50 bg-yellow-200 text-black px-4 py-2 rounded shadow"
          style={{
            top: flyItem.top,
            left: flyItem.left,
            transform: `translate(${flyItem.dx}px, ${flyItem.dy}px)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {flyItem.name} 🏃‍♂️
        </div>
      )}
    </div>
  );
}