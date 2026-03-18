"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import Link from "next/link";

// Types
interface StatItem {
    id: number;
    value: number;
    suffix: string;
    label: string;
}

interface StatsDict {
    title: string;
    title_suffix: string;
    description_1: string;
    description_2: string;
    items: StatItem[];
    cta: string;
}

// Icons mapping based on index or ID could be used, or passed from dict if structure allowed. 
// For now, we map based on array index since dict items are ordered.
const getIcon = (index: number) => {
    const icons = ["⏳", "🏡", "👩🏾‍🎓", "🎗️", "📜"];
    return icons[index] || "📊";
};

const StatsSection = ({ dict }: { dict: StatsDict }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Parallax background
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-20 px-4 lg:px-2xl overflow-hidden bg-white"
        >
            {/* Parallax Background Elements */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 opacity-30 pointer-events-none"
            >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-70" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-70" />
            </motion.div>

            <div className="relative max-w-7xl lg:max-w-5xl mx-auto z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
                    >
                        {dict.title} <span className="text-orange-600">{dict.title_suffix}</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        <p>{dict.description_1}</p>
                        <p className="font-semibold text-orange-700 mt-2">{dict.description_2}</p>
                    </motion.div>
                </div>

                {/* Update Grid - make it responsive and center last item if odd */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dict.items.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                            className="bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/50 flex flex-col items-center text-center transition-all duration-300 hover:border-orange-200/50 hover:bg-white/90"
                        >
                            <div className="w-16 h-16 mb-4 rounded-2xl bg-orange-100/80 flex items-center justify-center text-3xl shadow-inner">
                                {getIcon(index)}
                            </div>
                            <div className="text-4xl md:text-5xl font-black text-slate-800 mb-2 tracking-tighter">
                                {isInView ? (
                                    <CountUp
                                        end={stat.value}
                                        duration={3}
                                        suffix={stat.suffix}
                                        separator=" "
                                        className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600"
                                    />
                                ) : (
                                    <span className="text-slate-200">0</span>
                                )}
                            </div>
                            <p className="text-slate-600 font-medium text-sm md:text-base leading-snug">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-center mt-16"
                >
                    <Link
                        href="/don"
                        className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105 transform hover:shadow-orange-500/50"
                    >
                        💛 {dict.cta}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default StatsSection;