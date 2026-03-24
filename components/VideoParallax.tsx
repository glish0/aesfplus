"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

export default function VideoTestimonialParallax() {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleVideo = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">

            {/* VIDEO */}
            <div className="absolute inset-0">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover scale-110"
                    loop
                    muted={false} // 🔊 important si tu veux du son
                    playsInline
                >
                    <source src="/temoignage.mp4" type="video/mp4" />
                </video>

                {/* overlay */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="max-w-xl mb-8 text-lg"
                >
                    Séance
                </motion.p>

                {/* BUTTON PLAY / PAUSE */}
                <motion.button
                    onClick={toggleVideo}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="bg-[#f5cc10] text-black p-6 rounded-full shadow-xl flex items-center justify-center"
                >
                    {isPlaying ? (
                        <Pause className="w-8 h-8" />
                    ) : (
                        <Play className="w-8 h-8 ml-1" />
                    )}
                </motion.button>
            </div>
        </section>
    );
}