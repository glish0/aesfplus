"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AboutDict } from "@/types";

export default function BecomePartner({ dict }: { dict: AboutDict }) {

    // Variants pour les animations Framer Motion
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center px-4">
            {/* Hero Section avec image de fond et dégradé */}
            <section className="relative w-full min-h-[60vh] flex items-start justify-center pt-20">
                {/* Image de fond */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/pygme2.jpg')" }}
                />
                {/* Dégradé noir de gauche à droite */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

                {/* Texte en haut de la section */}
                <div className="relative z-10 max-w-5xl w-full mx-auto px-4">
                    <motion.div
                        className="text-white max-w-2xl"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">
                            Devenir bénévole
                        </h1>
                        <p className="text-lg md:text-xl leading-relaxed">
                            Espoir Sans Frontière+ (ESF+) est une organisation humanitaire dédiée
                            à l'assistance et à la protection des personnes vulnérables.
                        </p>
                    </motion.div>
                </div>
            </section>


        </div>
    );
}