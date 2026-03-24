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
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();
    const locale = params.locale as "fr" | "en"; // récupère 'fr' ou 'en'

    const handleDonate = () => {
        const path = locale === "fr" ? "/fr/faire-un-don" : "/en/faire-un-don";
        router.push(path);
    };
    const handlePartner = () => {
        const path = locale === "fr" ? "/fr/devenir-partenaire" : "/en/devenir-partenaire";
        router.push(path);
    };

    const handleVolunteer = () => {
        const path =
            locale === "fr"
                ? "/fr/devenir-benevole"
                : "/en/devenir-benevole";
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
            details:
                "Nous organisons des campagnes de sensibilisation dans les communautés rurales et urbaines, distribuons des moustiquaires imprégnées, et accompagnons les populations vers les structures de santé. Nous mettons un accent particulier sur la prévention des maladies et l’éducation sanitaire afin de réduire les risques et sauver des vies.",
        },
        {
            icon: BookOpen,
            title: "Éducation",
            desc: "Centres préscolaires, distribution de kits scolaires, sensibilisation des parents.",
            details:
                "Nous facilitons l’accès à l’éducation pour les enfants issus de milieux défavorisés en créant des centres d’apprentissage, en fournissant du matériel scolaire et en sensibilisant les parents à l’importance de la scolarisation. Notre objectif est de garantir à chaque enfant une chance d’apprendre et de construire son avenir.",
        },
        {
            icon: Users,
            title: "Autonomisation des jeunes",
            desc: "Formations, clubs de jeunes filles, AGR et insertion socio-économique.",
            details:
                "Nous formons les jeunes, notamment les filles, à des activités génératrices de revenus (AGR) telles que la fabrication de savon ou d’autres compétences pratiques. Nous accompagnons leur insertion professionnelle afin de favoriser leur indépendance financière et leur participation active au développement de leur communauté.",
        },
        {
            icon: Shield,
            title: "Protection des populations vulnérables",
            desc: "Interventions auprès des communautés Baka et zones isolées.",
            details:
                "Nous intervenons dans les zones reculées et auprès des communautés marginalisées comme les Baka, en apportant un soutien social, éducatif et sanitaire. Nous œuvrons pour réduire les inégalités et garantir un accès équitable aux services essentiels.",
        },
        {
            icon: Baby,
            title: "Droits des enfants",
            desc: "Journée de l’enfant africain, sensibilisation aux droits et à l’éducation.",
            details:
                "Nous sensibilisons les communautés aux droits fondamentaux des enfants à travers des campagnes, des événements et des programmes éducatifs. Nous luttons contre l’abandon scolaire, les violences et toute forme d’exploitation afin d’assurer un environnement sûr et protecteur pour chaque enfant.",
        },
    ];

    const activities = [
        {
            date: "25 Avril",
            title: "Journée Internationale de lutte contre le Paludisme",
            desc: "Chaque année, nous organisons des campagnes de sensibilisation et de distribution de moustiquaires imprégnées dans les communautés vulnérables.",
            why: "Le paludisme reste l’une des premières causes de mortalité dans nos zones d’intervention. Informer et prévenir permet de sauver des vies.",
            impact: "Des centaines de familles protégées et une réduction des cas dans les villages ciblés.",
        },
        {
            date: "Octobre",
            title: "Octobre Rose – Lutte contre le cancer du sein",
            desc: "Nous menons des campagnes de sensibilisation, de dépistage et d’accompagnement des femmes.",
            why: "Le manque d’information et de dépistage précoce entraîne des décès évitables.",
            impact: "Des femmes sensibilisées, accompagnées et orientées vers des soins adaptés.",
        },
        {
            date: "16 Juin",
            title: "Journée de l’Enfant Africain",
            desc: "Organisation d’activités éducatives, distribution de kits scolaires et sensibilisation aux droits de l’enfant.",
            why: "Beaucoup d’enfants n’ont pas accès à l’éducation ni à leurs droits fondamentaux.",
            impact: "Des enfants soutenus, motivés et réinsérés dans le système éducatif.",
        },
        {
            date: "Toute l’année",
            title: "Programme F2D (Formation & Développement Durable)",
            desc: "Formation des jeunes Baka du cluster de Mayos à des activités génératrices de revenus comme la fabrication de savon liquide et mentholé.",
            why: "L’autonomisation économique est essentielle pour sortir durablement de la pauvreté.",
            impact: "Des jeunes formés, capables de générer leurs propres revenus et soutenir leurs familles.",
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
                        Nos <span className="text-yellow-400">Domaines et Activités</span>
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
                    {["domaines", "Evénement"].map((id) => (
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
                                        {open && (
                                            <p className="text-gray-500 text-sm mt-2">{item.details}</p>
                                        )}

                                        <button
                                            onClick={() => setOpen(!open)}
                                            className="text-[#f5cc10] text-sm mt-2"
                                        >
                                            {open ? "Réduire" : "En savoir plus"}
                                        </button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            <section className="py-8">
                <div className="max-w-4xl mx-auto">

                    <div className="bg-gradient-to-r from-[#f5cc10] to-yellow-300 rounded-3xl p-10  shadow-xl relative overflow-hidden">

                        {/* Glow */}
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

                        <div className="relative z-10">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-black">
                                Devenez bénévole
                            </h2>

                            <p className="text-gray-800 max-w-xl  mb-6">
                                Vous souhaitez vous engager concrètement sur le terrain ?
                                Rejoignez notre équipe de bénévoles et participez activement
                                à l’amélioration des conditions de vie des communautés.
                            </p>

                            <button
                                onClick={handleVolunteer}
                                className="bg-black text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
                            >
                                Rejoindre comme bénévole
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            <section id="Evénement" className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4">

                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
                        Nos campagnes annuelles
                    </h2>

                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Chaque année, nous organisons des actions concrètes pour améliorer la vie
                        des communautés. Ces événements ont un impact direct et durable sur le terrain.
                    </p>

                    <div className="space-y-10">
                        {activities.map((act, i) => (
                            <div
                                key={i}
                                className="relative border-l-4 border-[#f5cc10] pl-6 group"
                            >
                                {/* Dot */}
                                <div className="absolute -left-[10px] top-2 w-4 h-4 bg-[#f5cc10] rounded-full" />

                                <p className="text-sm text-gray-500">{act.date}</p>

                                <h3 className="font-bold text-xl mt-1">{act.title}</h3>

                                <p className="text-gray-600 mt-2">{act.desc}</p>

                                {/* WHY */}
                                <p className="text-sm text-gray-500 mt-2 italic">
                                    🎯 Pourquoi : {act.why}
                                </p>

                                {/* IMPACT */}
                                <p className="text-sm text-green-600 mt-1">
                                    💥 Impact : {act.impact}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-16 text-center">
                        <h3 className="text-2xl font-semibold mb-4">
                            Soutenez notre prochaine campagne
                        </h3>

                        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                            Votre don permet de financer ces actions vitales et d’apporter un
                            changement réel dans la vie des populations.
                        </p>

                        <button onClick={handleDonate} className="bg-[#f5cc10] hover:bg-[#f5cc10]/90 text-black font-bold py-4 px-8 rounded-full shadow-lg transition hover:scale-105">
                            Faire un don maintenant
                        </button>
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
                <button onClick={handlePartner} className="bg-black cursor-pointer text-white px-6 py-3 rounded-lg">
                    Devenir partenaire
                </button>
            </section>
        </div>
    );
}