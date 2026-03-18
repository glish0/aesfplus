'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AboutDict } from "@/types";
import ParallaxSection from "../ParallaxSection";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

// Fade In Text Component
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
        >
            {children}
        </motion.div>
    );
};

export default function AboutContent({ dict }: { dict: AboutDict }) {
    return (
        <div className="min-h-screen bg-slate-50 overflow-x-hidden font-sans">
            <ScrollProgress />

            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 bg-white">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h1 className="text-4xl md:text-6xl font-black text-center mb-6 text-slate-900 uppercase tracking-tight">
                            {dict.hero.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-center text-orange-600 font-semibold mb-12">
                            {dict.hero.subtitle}
                        </p>
                        <div className="max-w-4xl mx-auto space-y-6 text-lg text-slate-700 leading-relaxed text-center">
                            <p>{dict.hero.description_1}</p>
                            <p>{dict.hero.description_2}</p>
                            <p>{dict.hero.description_3}</p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* History Section - Parallax */}
            <ParallaxSection imgUrl="/esf3.jpg" alt="History Background">
                <FadeIn>
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8">{dict.history.title}</h2>
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                            <p className="text-lg md:text-xl mb-6">{dict.history.content}</p>
                            <p className="text-sm md:text-base font-mono opacity-80 border-t border-white/30 pt-4 mt-4 inline-block">
                                {dict.history.details}
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </ParallaxSection>

            {/* Vision Section - Parallax */}
            <ParallaxSection imgUrl="/pygmy.jpg" alt="Vision Background">
                <FadeIn>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8">{dict.vision.title}</h2>
                        <blockquote className="text-2xl md:text-3xl font-light italic mb-8 relative">
                            <span className="text-6xl absolute -top-8 -left-8 opacity-30">"</span>
                            {dict.vision.quote}
                            <span className="text-6xl absolute -bottom-12 -right-8 opacity-30">"</span>
                        </blockquote>
                        <p className="text-lg leading-relaxed">{dict.vision.description}</p>
                    </div>
                </FadeIn>
            </ParallaxSection>

            {/* Mission Section */}
            <section className="py-20 bg-slate-100">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-slate-900">
                            {dict.mission.title}
                        </h2>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-8">
                        {dict.mission.list.map((item, i) => (
                            <FadeIn key={i} delay={i * 0.2}>
                                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full border-t-8 border-orange-500">
                                    <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-2xl">
                                        {i === 0 ? "🛡️" : i === 1 ? "🚀" : "🌱"}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-slate-800">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Objectives Section - Parallax */}
            <ParallaxSection imgUrl="/pygme4.jpg" alt="Objectives Background">
                <FadeIn>
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">{dict.objectives.title}</h2>

                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Global */}
                            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                                <h3 className="text-2xl font-bold mb-4 text-orange-400 border-b border-orange-400 pb-2 inline-block">
                                    {dict.objectives.global.title}
                                </h3>
                                <p className="text-lg leading-relaxed">
                                    {dict.objectives.global.description}
                                </p>
                            </div>

                            {/* Specific */}
                            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                                <h3 className="text-2xl font-bold mb-4 text-orange-400 border-b border-orange-400 pb-2 inline-block">
                                    {dict.objectives.specific.title}
                                </h3>
                                <ul className="space-y-3">
                                    {dict.objectives.specific.list.map((obj, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-orange-400 mt-1">✓</span>
                                            <span className="text-sm md:text-base">{obj}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </ParallaxSection>

        </div>
    );
}
