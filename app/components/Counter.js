"use client";
import React, { useState } from 'react';
import Button from './Button';
import { useCart } from '../hooks/useCart';

const Counter = ({item}) => {

    const { addToCart } = useCart();
    const [counter, setCounter] = useState(1);

    const increment = () => {
        if (counter < item.quantity) setCounter(counter + 1);
    };

    const decrement = () => {
        if (counter > 1) setCounter(counter - 1);
    };

    const handleAdd = () => {
      addToCart({item, counter})
      setCounter(1);
    };

  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <div className='felx items-center gap-2 text-xl font-bold'>
        <Button handleClick={decrement}>-</Button>
        <span className='text-gray-700 p-3'>{counter}</span>
        <Button handleClick={increment}>+</Button>
      </div>
      <div className='flex justify-center items-center'>
        <Button handleClick={handleAdd}>Agregar</Button>
      </div>
    </div>
  )
}; export default Counter;
