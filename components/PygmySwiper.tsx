"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRouter, useParams } from 'next/navigation';

const images = [
    '/pygmee1.jpg',
    '/pygme2.jpg',
    '/pygme3.jpg',
    '/pygme4.jpg',
    '/pygme5.jpg',
];

interface PygmySwiperProps {
    dict: {
        pygmy_swiper: {
            slides: {
                title: string;
                description: string;
            }[];
            donate_button: string;
        };
    };
}

export default function PygmySwiper({ dict }: PygmySwiperProps) {
    const router = useRouter();
    const params = useParams();
    const locale = params.locale as "fr" | "en"; // récupère 'fr' ou 'en'

    const slides = dict.pygmy_swiper.slides.map((slide, index) => ({
        ...slide,
        src: images[index]
    }));

    const handleDonate = () => {
        const path = locale === "fr" ? "/fr/faire-un-don" : "/en/faire-un-don";
        router.push(path);
    };

    return (
        <div className="w-full mx-auto">
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper shadow-2xl h-[500px] sm:h-[600px] w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative w-full h-full bg-gray-900">
                        <div className="relative w-full h-full">
                            <Image
                                src={slide.src}
                                alt={slide.title}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                            <div className="absolute inset-0 bg-black/60"></div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-12 z-10">
                                <h2 className="text-3xl sm:text-5xl font-bold mb-4 drop-shadow-md">{slide.title}</h2>
                                <p className="text-lg sm:text-xl mb-8 max-w-2xl drop-shadow-md">{slide.description}</p>
                                <Button
                                    className="bg-[#f5cc10] hover:bg-[#f5cc10]/90 text-black font-bold py-6 px-8 rounded-full transition-all duration-300 shadow-lg scale-100 hover:scale-105 transform text-lg"
                                    onClick={handleDonate}
                                >
                                    {dict.pygmy_swiper.donate_button}
                                </Button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}