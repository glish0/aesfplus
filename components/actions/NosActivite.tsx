"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
    HeartPulse,
    Users,
    BookOpen,
    Shield,
    Baby,
    Activity,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";

export default function ActivitiesPage() {
    const [activeSection, setActiveSection] = useState("");
    const router = useRouter();
    const params = useParams();
    const locale = params.locale as "fr" | "en"; // récupère 'fr' ou 'en'

    const handleDonate = () => {
        const path = locale === "fr" ? "/fr/faire-un-don" : "/en/faire-un-don";
        router.push(path);
    };


    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    const stagger = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };

    const scrollTo = (id: string) => {
        setActiveSection(id);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    // 🔥 DOMAINES D’ACTION (important)
    const domains = [
        {
            icon: HeartPulse,
            title: "Santé communautaire",
            desc: "Sensibilisation au paludisme, tuberculose, santé sexuelle et reproductive.",
        },
        {
            icon: BookOpen,
            title: "Éducation",
            desc: "Centres préscolaires, distribution de kits scolaires, sensibilisation des parents.",
        },
        {
            icon: Users,
            title: "Autonomisation des jeunes",
            desc: "Formations, clubs de jeunes filles, AGR et insertion socio-économique.",
        },
        {
            icon: Shield,
            title: "Protection des populations vulnérables",
            desc: "Interventions auprès des communautés Baka et zones isolées.",
        },
        {
            icon: Baby,
            title: "Droits des enfants",
            desc: "Journée de l’enfant africain, sensibilisation aux droits et à l’éducation.",
        },
        {
            icon: Activity,
            title: "Renforcement des capacités",
            desc: "Formations, leadership, état civil, productivité.",
        },
    ];

    // 🔥 ACTIVITÉS (timeline)
    const activities = [
        {
            date: "2024",
            title: "Projet JASRAC",
            desc: "Sensibilisation des jeunes sur la santé sexuelle et reproductive dans le district de Doumé.",
        },
        {
            date: "Mars 2024",
            title: "Mission d’urgence Baka",
            desc: "Intervention terrain : tuberculose, eau potable, sensibilisation sanitaire.",
        },
        {
            date: "Avril 2024",
            title: "Campagne Paludisme",
            desc: "210 personnes sensibilisées à Mokolo 3.",
        },
        {
            date: "Juin 2024",
            title: "Journée de l’enfant africain",
            desc: "Sensibilisation sur l’éducation et les droits des enfants.",
        },
        {
            date: "Août 2024",
            title: "Distribution kits scolaires",
            desc: "Soutien aux enfants Baka avec la fondation MTN.",
        },
        {
            date: "Octobre 2024",
            title: "Octobre Rose",
            desc: "Sensibilisation au cancer du sein.",
        },
        {
            date: "2025",
            title: "Programme F2D",
            desc: "Autonomisation des jeunes filles (formations + activités génératrices de revenus).",
        },
        {
            date: "2026",
            title: "Youth Empowerment",
            desc: "Formation leadership et insertion des jeunes.",
        },
    ];

    return (
        <div className="bg-white">

            {/* HERO */}
            <section className="relative h-[80vh] flex items-center">
                <div className="absolute inset-0 bg-[url('/esf3.jpg')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-black/70" />

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-white">
                    <h1 className="text-5xl font-bold mb-6">
                        Nos <span className="text-yellow-400">Activités</span>
                    </h1>
                    <p className="text-lg text-gray-200 max-w-2xl">
                        Depuis plusieurs années, Espoir Sans Frontière+ agit sur le terrain
                        pour améliorer les conditions de vie des populations vulnérables.
                    </p>
                </div>
            </section>

            {/* NAV */}
            <section className="sticky top-0 bg-white shadow z-20 py-4">
                <div className="flex justify-center gap-4">
                    {["domaines", "timeline"].map((id) => (
                        <button
                            key={id}
                            onClick={() => scrollTo(id)}
                            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-yellow-400"
                        >
                            {id}
                        </button>
                    ))}
                </div>
            </section>

            {/* DOMAINES */}
            <section id="domaines" className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Nos domaines d’intervention
                    </h2>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        className="grid md:grid-cols-3 gap-6"
                    >
                        {domains.map((item, i) => (
                            <motion.div key={i} variants={fadeInUp}>
                                <Card className="hover:shadow-xl transition">
                                    <CardContent className="p-6">
                                        <item.icon className="w-10 h-10 text-yellow-500 mb-4" />
                                        <h3 className="font-bold mb-2">{item.title}</h3>
                                        <p className="text-gray-600 text-sm">{item.desc}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* TIMELINE */}
            <section id="timeline" className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Nos actions sur le terrain
                    </h2>

                    <div className="space-y-6">
                        {activities.map((act, i) => (
                            <div
                                key={i}
                                className="border-l-4 border-yellow-400 pl-6"
                            >
                                <p className="text-sm text-gray-500">{act.date}</p>
                                <h3 className="font-bold text-lg">{act.title}</h3>
                                <p className="text-gray-600">{act.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-yellow-400 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Engagez-vous avec nous
                </h2>
                <p className="mb-6">
                    Ensemble, nous pouvons transformer des vies et bâtir un avenir meilleur.
                </p>
                <button onClick={handleDonate} className="bg-black cursor-pointer text-white px-6 py-3 rounded-lg">
                    Devenir partenaire
                </button>
            </section>
        </div>
    );
}