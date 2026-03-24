"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface TestimonialItem {
    id: number;
    name: string;
    role: string;
    quote: string;
    image: string;
}

interface TestimonialsDict {
    title: string;
    subtitle: string;
    cta: string;
    items: TestimonialItem[];
}

export default function TestimonialsSection({ dict }: { dict: TestimonialsDict }) {
    const router = useRouter();
    const params = useParams();
    const locale = params.locale as "fr" | "en"; // récupère 'fr' ou 'en'

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const handleDonate = () => {
        const path = locale === "fr" ? "/fr/faire-un-don" : "/en/faire-un-don";
        router.push(path);
    };

    return (
        <section className="py-24 px-4 bg-white px-4 lg:px-2xl overflow-hidden relative">
            {/* Subtle Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-100 rounded-full blur-[80px]" />
                <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[60px]" />
            </div>

            <div className="container flex flex-col justify-center items-center mx-auto max-w-6xl relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        {dict.title}
                    </h2>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        {dict.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {dict.items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{
                                y: -10,
                                scale: 1.02,
                                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                            }}
                            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all duration-300 flex flex-col h-full group"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 ring-2 ring-orange-100 group-hover:ring-orange-400 transition-all">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors">{item.name}</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">{item.role}</p>
                                </div>
                            </div>

                            <div className="flex-grow relative">
                                <Quote className="absolute -top-2 -left-2 w-6 h-6 text-orange-200 opacity-50 transform -scale-x-100" />
                                <p className="text-slate-600 italic leading-relaxed relative z-10 pl-2">
                                    "{item.quote}"
                                </p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <div className="flex justify-end">
                                    <span className="text- text-sm font-medium">Lire plus &rarr;</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-center"
                >
                    <div
                        onClick={handleDonate}
                        className="inline-flex items-center cursor-pointer justify-center bg-[#f5cc10] hover:bg-orange-700 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg shadow-orange-600/30 transition-all duration-300 hover:scale-105 transform"
                    >
                        {dict.cta}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
