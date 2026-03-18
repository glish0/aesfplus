"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AboutDict } from "@/types";

export default function VolunteerPage({ dict }: { dict: AboutDict }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        motivation: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(form);
        alert("Merci pour votre engagement 💛 Nous vous contacterons !");
    };

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
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16">

            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/pygme2.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Contenu */}
            <div className="relative z-10 max-w-5xl w-full space-y-10">

                {/* HEADER */}
                <motion.div
                    className="text-center text-white"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                        Devenir bénévole
                    </h1>

                    <p className="text-lg max-w-2xl mx-auto leading-relaxed">
                        Espoir Sans Frontière+ (ESF+) est une organisation humanitaire dédiée
                        à l'assistance et à la protection des personnes vulnérables.
                        En rejoignant notre équipe, vous contribuez directement à améliorer
                        des vies et à bâtir un avenir plus solidaire.
                    </p>
                </motion.div>

                {/* SECTION IMPACT */}
                <motion.div
                    className="grid md:grid-cols-3 gap-6 text-white text-center"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    {[
                        { value: "+500", label: "Personnes aidées" },
                        { value: "+20", label: "Projets réalisés" },
                        { value: "+50", label: "Bénévoles actifs" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="bg-white/10 backdrop-blur-md p-6 rounded-lg"
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                        >
                            <h3 className="text-2xl font-bold">{item.value}</h3>
                            <p>{item.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* FORMULAIRE */}
                <motion.div
                    className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto w-full"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Rejoignez-nous 💛
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <motion.input
                            type="text"
                            name="name"
                            placeholder="Nom complet"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded"
                            required
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                        />

                        <motion.input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full p-3 border rounded"
                            required
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                        />

                        <motion.input
                            type="text"
                            name="phone"
                            placeholder="Téléphone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full p-3 border rounded"
                            required
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
                        />

                        <motion.textarea
                            name="motivation"
                            placeholder="Pourquoi souhaitez-vous devenir bénévole ?"
                            value={form.motivation}
                            onChange={handleChange}
                            className="w-full p-3 border rounded h-32"
                            required
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0, transition: { delay: 0.4 } }}
                        />

                        <motion.button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-3 rounded font-bold text-lg hover:bg-orange-400 transition"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Je deviens bénévole
                        </motion.button>
                    </form>
                </motion.div>

            </div>
        </div>
    );
}