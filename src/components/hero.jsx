import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className='mt-[60px]'>
      <div className="z-50 bg-cover bg-center h-screen flex items-center text-white bg bg-blue-100">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">Making a Deal is a breeze </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-800">Hello from this side</p>
          <button className="bg-blue-500 text-white py-2 px-6 rounded-full text-lg md:text-xl font-semibold">
            <Link to='/products'>Get Started</Link>
          </button>
        </div>
      </div>
      <div className='z-100'>
        {/* <CarouselSection></CarouselSection> */}
      </div>
    </div>

  );
};

export default HeroSection;
