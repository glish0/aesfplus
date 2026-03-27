"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";

interface NewsletterDict {
    title: string;
    description: string;
    placeholder: string;
    button: string;
    subtext: string;
}

export default function NewsletterSection({ dict }: { dict: NewsletterDict }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            await subscribeToNewsletter(email);
            alert("Inscription réussie !");
            setEmail("");
        } catch (err) {
            alert("Erreur lors de l'inscription");
        }
    };

    return (
        <section id="contact" className="py-20 w-full px-4 bg-slate-900 border-t border-slate-800 overflow-hidden relative">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F79600]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#F79600]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-700 shadow-2xl text-center"
                >
                    <div className="w-16 h-16 bg-[#f5cc10]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-500">
                        <Send className="w-8 h-8" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {dict.title}
                    </h2>
                    <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                        {dict.description}
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder={dict.placeholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 px-6 py-4 rounded-full bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                            required
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 rounded-full bg-[#f5cc10] hover:bg-[#f5cc10]/30 text-white font-bold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/20"
                        >
                            {dict.button}
                        </button>
                    </form>

                    <p className="text-slate-500 text-sm mt-6">
                        {dict.subtext}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
