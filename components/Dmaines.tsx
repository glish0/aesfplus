"use client";

import React, { Activity } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    BookOpen,
    HeartPulse,
    ShieldAlert,
    Brain,
    Apple,
    Sprout,
    Shield,
    Baby,
    Users,
} from "lucide-react";



const domains = [
    {
        icon: HeartPulse,
        title: "Santé communautaire",
        description: "Sensibilisation au paludisme, tuberculose, santé sexuelle et reproductive.",
        image: "/education.jpg",
    },
    {
        icon: BookOpen,
        title: "Éducation",
        description: "Centres préscolaires, distribution de kits scolaires, sensibilisation des parents.",
        image: "/education.jpg",

    },
    {
        icon: Users,
        title: "Autonomisation des jeunes",
        description: "Formations, clubs de jeunes filles, AGR et insertion socio-économique.",
        image: "/education.jpg",

    },
    {
        icon: Shield,
        title: "Protection des populations vulnérables",
        description: "Interventions auprès des communautés Baka et zones isolées.",
        image: "/education.jpg",

    },
    {
        icon: Baby,
        title: "Droits des enfants",
        description: "Journée de l’enfant africain, sensibilisation aux droits et à l’éducation.",
        image: "/education.jpg",

    },

];

export default function DomainsSection() {
    return (
        <section className="-mt-3 relative w-full z-20 py-12 px-6 bg-white rounded-t-3xl shadow-xl">
            <div className="max-w-7xl mx-auto text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Nos domaines d’intervention
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Nous agissons sur plusieurs axes essentiels pour améliorer durablement
                    la vie des communautés.
                </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {domains.map((domain, index) => {
                    const Icon = domain.icon;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="group overflow-hidden border-none rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">

                                {/* IMAGE */}
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={domain.image}
                                        alt={domain.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* overlay */}
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition" />
                                </div>

                                {/* CONTENT */}
                                <CardContent className="p-2 flex flex-col items-center  relative">

                                    {/* Icon floating */}
                                    <div className="-mt-12 mb-4 bg-white p-4 rounded-full shadow-lg group-hover:scale-110 transition">
                                        <Icon className="w-8 h-8 text-[#f5cc10]" />
                                    </div>

                                    <h3 className="text-xl  font-semibold mb-2">
                                        {domain.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm">
                                        {domain.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}