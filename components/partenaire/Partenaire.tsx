'use client'


import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface Partner {
    id: number;
    name: string;
    logo: string;
    website?: string;
}

const PartnerSection: React.FC = () => {
    const partners: Partner[] = [
        {
            id: 2,
            name: "MINSANTE",
            logo: "/minsante.png",

        },
        {
            id: 3,
            name: "MINAS",
            logo: "/minas.png",

        },
        {
            id: 4,
            name: "FESADE",
            logo: "/fesade.jpg",

        },

    ];

    const scrollRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;
        let scrollPosition = 0;

        const autoScroll = () => {
            if (!scrollContainer) return;

            scrollPosition += 1;

            if (scrollPosition >= scrollContainer.scrollWidth / 2) {
                scrollPosition = 0;
            }

            scrollContainer.scrollLeft = scrollPosition;
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        const startAutoScroll = () => {
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        const stopAutoScroll = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };

        startAutoScroll();

        scrollContainer.addEventListener('mouseenter', stopAutoScroll);
        scrollContainer.addEventListener('mouseleave', startAutoScroll);

        return () => {
            stopAutoScroll();
            scrollContainer.removeEventListener('mouseenter', stopAutoScroll);
            scrollContainer.removeEventListener('mouseleave', startAutoScroll);
        };
    }, []);

    return (
        <section className="relative w-full py-12 px-4 lg:px-xl overflow-hidden bg-white">
            <div className="w-full mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Nos Partenaires
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Découvrez les entreprises qui nous font confiance et avec qui nous collaborons
                    </p>
                    <div className="w-18 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
                </motion.div>

                <div className="relative overflow-hidden">
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto scrollbar-hide gap-8 py-4 px-4"
                        style={{
                            scrollBehavior: 'smooth',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {/* Dupliquer les partenaires pour un effet infini */}
                        {[...partners, ...partners].map((partner, index) => (
                            <motion.div
                                key={`${partner.id}-${index}`}
                                whileHover={{ scale: 1.05 }}
                                className="flex-none"
                            >
                                <a
                                    href={partner.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group"
                                >
                                    <div className="bg-white rounded-xl shadow-lg p-2 w-48 h-28 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:shadow-indigo-100 border-2 border-transparent group-hover:border-indigo-200">
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                    <p className="text-center mt-3 text-gray-600 font-medium group-hover:text-indigo-600 transition-colors">
                                        {partner.name}
                                    </p>
                                </a>
                            </motion.div>
                        ))}
                    </div>

                    {/* Effets de gradient sur les côtés */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none"></div>
                </div>


            </div>

            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    );
};

export default PartnerSection;