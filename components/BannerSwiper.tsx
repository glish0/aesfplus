'use client';

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Slide {
  title: string;
  description: string;
}

interface DonationSwiperProps {
  slides: Slide[];
  slogan: string;
  donateButton: string;
}

export const DonationSwiper: React.FC<DonationSwiperProps> = ({
  slides,
  slogan,
  donateButton
}) => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* Slogan */}
      <motion.h1
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {slogan}
      </motion.h1>

      {/* Swiper */}
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation
        spaceBetween={50}
        slidesPerView={1}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Image */}
              <motion.img
                src={`/images/slide${index + 1}.jpg`}
                alt={slide.title}
                className="w-full md:w-1/2 rounded-lg shadow-lg object-cover"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              />

              {/* Texte + bouton */}
              <motion.div
                className="w-full md:w-1/2 flex flex-col items-start"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                <p className="mb-6 text-gray-700">{slide.description}</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
                  {donateButton}
                </button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
