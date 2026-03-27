"use client";

import { useState } from "react";

import { AboutDict } from "@/types";
import { InlineWidget } from "react-calendly";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';


import {
    Users,
    Target,
    Globe,
    Shield,
    HandHeart,
    Briefcase,
    Percent,
    Star,
    Quote,
    ArrowRight,
    Phone,
    Mail,
    Clock,
    Badge,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import PartnerSection from "./Partenaire";
import { FaFacebookF } from "react-icons/fa";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";

// Interface pour les témoignages
interface Testimonial {
    quote: string;
    author: string;
    title: string;
    company?: string;
    image?: string;
    type: "partner" | "beneficiary";
}

interface Partner {
    id: number;
    name: string;
    logo: string;
    website?: string;
}

export default function BecomePartner({ dict }: { dict: AboutDict }) {
    const [activeLink, setActiveLink] = useState("");
    const [showCalendly, setShowCalendly] = useState(false);
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
    const partners: Partner[] = [
        {
            id: 24,
            name: "MINPROFF",
            logo: "/minprof.png",

        },
        {
            id: 23,
            name: "NDABUCHISEH",
            logo: "/logo-ndabichiseh.jpg",

        },
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

    // Fonction pour le défilement fluide
    const scrollToSection = (sectionId: string) => {
        setActiveLink(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // Liens de navigation
    const navLinks = [
        { id: "pourquoi-entreprise", label: "Pourquoi votre entreprise" },
        { id: "pourquoi-esf", label: "Pourquoi ESF+" },
        { id: "co-construire", label: "Co-construire" },
        { id: "impacts-expertises", label: "Nos impacts" },
        { id: "temoignages", label: "Ils nous font confiance" },
        { id: "contact", label: "Nous contacter" },
    ];

    // Données simulées pour les témoignages (à remplacer par des données réelles)
    const testimonials: Testimonial[] = [
        {
            quote:
                "ESF+ a su comprendre nos enjeux RSE et co-construire un programme sur-mesure. L'impact mesurable sur le terrain et la fierté de nos équipes sont nos plus grandes récompenses.",
            author: "Marie Dupont",
            title: "Directrice RSE",
            company: "Groupe Horizon",
            type: "partner",
        },
        {
            quote:
                "Grâce au soutien de nos partenaires, j'ai pu suivre une formation et créer ma propre activité. Aujourd'hui, je suis indépendante et je forme d'autres femmes.",
            author: "Marie",
            title: "Bénéficiaire du programme 'Autonomisation'",
            type: "beneficiary",
        },
        {
            quote:
                "Ce partenariat va bien au-delà du mécénat financier. L'engagement de leurs collaborateurs à nos côtés a apporté une énergie et des compétences nouvelles à nos équipes terrain.",
            author: "Dr Emmanuel",
            title: "Fondateur",
            company: "NDABUCHISEH",
            type: "partner",
        },
    ];

    // Données pour les statistiques clés
    const keyStats = [
        { value: "10+", label: "Partenaires engagés", icon: Briefcase },
        { value: "5k+", label: "Personnes soutenues en 2025", icon: Users },
        { value: "100%", label: "Projets évalués", icon: Target },
    ];

    // Données pour les garanties
    const guarantees = [
        {
            icon: Target,
            title: "Un impact durable grâce à des expertises techniques",
            description:
                "Notre approche globale lutte contre toutes les causes de la pauvreté : éducation, santé, développement économique, droits des femmes.",
        },
        {
            icon: HandHeart,
            title: "Des projets de qualité grâce à un ancrage local",
            description:
                "Nous travaillons main dans la main avec les communautés, garantissant une compréhension fine des problématiques et des solutions adaptées.",
        },
        {
            icon: Globe,
            title: "Une portée globale et un pouvoir de mobilisation",
            description:
                "Nos actions rassemblent citoyens, influenceurs et décideurs pour interpeller les politiques et obtenir des changements concrets.",
        },
        {
            icon: Shield,
            title: "Un sérieux financier et une rigueur partenariale",
            description:
                "Association reconnue d'utilité publique, nous appliquons des contrôles externes stricts et une Due Diligence pour chaque partenariat.",
        },
    ];

    // Données pour les types d'engagement
    const engagementTypes = [
        { icon: HandHeart, title: "Mécénat financier", description: "Soutenez nos programmes existants ou co-construisez un projet sur-mesure." },
        { icon: Percent, title: "Produits-partage", description: "Reverser une partie de vos ventes à nos actions." },
        { icon: Users, title: "Mécénat de compétences", description: "Mettez l'expertise de vos collaborateurs au service de nos missions." },
        { icon: Star, title: "Soutien plaidoyer", description: "Rejoignez-nous pour interpeller les décideurs politiques." },
    ];

    // Données pour les expertises
    const expertises = [
        {
            title: "Égalité femmes-hommes",
            items: [
                "Défense des droits des femmes",
                "Éducation et empowerment économique",
                "Santé maternelle et reproductive",
            ],
            color: "bg-pink-50 text-pink-700",
            icon: "👩‍⚖️",
        },

        {
            title: "Action humanitaire",
            items: [
                "Eau, hygiéne et assainisement",
                "Aide d'urgence",
                "Protection des personnes vunérable",
                "Distribution des dons",


            ],
            color: "bg-orange-50 text-orange-700",
            icon: "",
        },
    ];

    return (
        <div className="relative min-h-screen flex flex-col items-center bg-white">
            {/* Hero Section avec image de fond et dégradé */}
            <section className="relative w-full min-h-[80vh] flex items-start justify-center pt-20">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/pygme5.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

                <div className="relative z-10 max-w-5xl w-full mx-auto px-4">
                    <motion.div
                        className="text-white max-w-2xl"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <Badge className="mb-4 bg-[#f5cc10]/20 text-[#f5cc10] border-0 px-4 py-2 text-sm">
                            Devenez acteur du changement
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Je deviens <span className="text-[#f5cc10] hover:text-[#f5cc10]/90">Partenaire</span>
                        </h1>
                        <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                            Chez Espoir Sans Frontière+ (ESF+), nous croyons que les plus
                            grands impacts naissent de la collaboration. Notre mission est
                            claire : apporter assistance et protection aux personnes les plus
                            vulnérables, et nous savons que nous ne pouvons pas y parvenir
                            seuls.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Navigation sticky avec les liens vers les sections */}
            <section className="w-full bg-white py-4 shadow-md sticky top-0 z-20 border-b">
                <div className="max-w-5xl mx-auto px-4 overflow-x-auto">
                    <motion.div
                        className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-4"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        {navLinks.map((link) => (
                            <motion.button
                                key={link.id}
                                variants={fadeInUp}
                                onClick={() => scrollToSection(link.id)}
                                className={`px-3 py-2 text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-300 rounded-full ${activeLink === link.id
                                    ? "bg-[#f5cc10] text-white"
                                    : "text-black hover:bg-[#f5cc10] hover:text-blue-600"
                                    }`}
                            >
                                {link.label}
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Section 1 : Pourquoi votre entreprise doit s'engager */}
            <section id="pourquoi-entreprise" className="w-full py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">
                            Pourquoi agir ?
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Le secteur privé, moteur essentiel du développement durable
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Les entreprises ont un rôle crucial à jouer face aux grands défis
                            de notre époque : inégalités, changement climatique, crises
                            humanitaires. Votre engagement est une réponse concrète et
                            valorisante.
                        </p>
                    </motion.div>

                    {/* Statistiques clés */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {keyStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                                    <stat.icon className="w-8 h-8" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Bénéfices pour l'entreprise */}
                    <motion.div
                        className="grid md:grid-cols-2 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={fadeInUp}>
                            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                                <CardContent className="p-8">
                                    <Users className="w-12 h-12 text-[#f5cc10] mb-4" />
                                    <h3 className="text-xl font-bold mb-4">
                                        Fédérer vos parties prenantes
                                    </h3>
                                    <p className="text-gray-600">
                                        L'engagement sociétal répond aux attentes de vos clients,
                                        fournisseurs et collaborateurs. En externe comme en interne,
                                        votre écosystème est fédéré autour d'une cause solidaire,
                                        créant un effet de levier sur l'amélioration des pratiques.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                                <CardContent className="p-8">
                                    <Star className="w-12 h-12 text-blue-600 mb-4" />
                                    <h3 className="text-xl font-bold mb-4">
                                        Être exemplaire et responsable
                                    </h3>
                                    <p className="text-gray-600">
                                        Affirmez votre leadership en matière de RSE. Montrez
                                        l'exemple et inspirez d'autres acteurs économiques à vous
                                        rejoindre dans cette démarche vertueuse, essentielle pour un
                                        avenir durable.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Section 2 : Pourquoi agir avec ESF+ (Garanties) */}
            <section id="pourquoi-esf" className="w-full py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">
                            Nos garanties
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Pourquoi choisir ESF+ comme partenaire ?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Nous sommes l'un des réseaux humanitaires les plus engagés.
                            Chaque année, grâce à nos partenaires, nous soutenons des millions
                            de personnes et luttons contre toutes les formes d'inégalités.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {guarantees.map((guarantee, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <CardContent className="p-8">
                                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 text-blue-600 mb-6">
                                            <guarantee.icon className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">
                                            {guarantee.title}
                                        </h3>
                                        <p className="text-gray-600">{guarantee.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Avantage fiscal 
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-start gap-4">
                                <Percent className="w-12 h-12 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-bold mb-2">
                                        Bénéficiez d'une déduction fiscale
                                    </h3>
                                    <p className="text-blue-100">
                                        Soutenir ESF+ permet à votre entreprise de bénéficier d'une
                                        déduction d'impôt de 60% du montant du don, dans la limite
                                        légale en vigueur.
                                    </p>
                                </div>
                            </div>
                            <Button variant="secondary" className="whitespace-nowrap bg-white text-blue-700 hover:bg-blue-50">
                                En savoir plus <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>*/}
                </div>
            </section>

            {/* Section 3 : Co-construire un partenariat sur-mesure */}
            <section id="co-construire" className="w-full py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">
                            Sur-mesure
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Co-construisons ensemble votre engagement
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Un partenariat unique, adapté à vos enjeux RSE et aux Objectifs de
                            Développement Durable (ODD).
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid lg:grid-cols-2 gap-12"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={fadeInUp}>
                            <h3 className="text-2xl font-bold mb-6">
                                Imaginez un partenariat à impact
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Soutien de projets existants ayant fait leurs preuves",
                                    "Co-construction de projets sur-mesure avec nos équipes",
                                    "Développement de projets autour de vos chaînes de valeur",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <h3 className="text-2xl font-bold mb-6">
                                À travers différents types d'engagement
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {engagementTypes.map((type, index) => (
                                    <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6">
                                            <type.icon className="w-8 h-8 text-blue-600 mb-3" />
                                            <h4 className="font-bold mb-2">{type.title}</h4>
                                            <p className="text-sm text-gray-600">
                                                {type.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Section 4 : Nos expertises et impact */}
            <section id="impacts-expertises" className="w-full py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">
                            Notre action
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Nos expertises répondent aux défis majeurs
                        </h2>
                    </motion.div>

                    {/* Tabs pour les expertises */}
                    <Tabs defaultValue="women" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="women">Égalité femmes-hommes</TabsTrigger>

                            <TabsTrigger value="humanitarian">Action humanitaire</TabsTrigger>
                        </TabsList>
                        {expertises.map((expertise, index) => (
                            <TabsContent key={index} value={["women", "humanitarian"][index]}>
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <span className="text-4xl">{expertise.icon}</span>
                                            <div>
                                                <h3 className="text-xl font-bold mb-4">{expertise.title}</h3>
                                                <ul className="space-y-2">
                                                    {expertise.items.map((item, i) => (
                                                        <li key={i} className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </section>

            <section className="py-16 ">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            Nos Partenaires
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Découvrez les entreprises qui nous font confiance et avec qui nous collaborons
                        </p>
                        <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
                    </motion.div>

                    <div className="relative overflow-hidden">
                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto scrollbar-hide gap-8 py-8 px-4"
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
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none"></div>
                    </div>


                </div>

                <style jsx>{`
                    .scrollbar-hide::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
            </section>

            {/* Section 5 : Témoignages */}
            <section id="temoignages" className="w-full py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">
                            Ils nous font confiance
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Ceux qui s'engagent témoignent
                        </h2>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <CardContent className="p-6">
                                        <Quote className="w-8 h-8 text-blue-300 mb-4" />
                                        <p className="text-gray-700 mb-6 italic">
                                            "{testimonial.quote}"
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                {testimonial.author.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{testimonial.author}</p>
                                                <p className="text-sm text-gray-500">
                                                    {testimonial.title}
                                                    {testimonial.company && `, ${testimonial.company}`}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge className="mt-4 bg-blue-50 text-blue-700 border-0">
                                            {testimonial.type === "partner" ? "Partenaire" : "Bénéficiaire"}
                                        </Badge>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Section 6 : Contact ET carreau d'information (fusionné) */}
            <section id="contact" className="w-full py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        className="grid lg:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        {/* Carreau d'information ESF+ - Version enrichie avec l'équipe */}
                        <motion.div
                            variants={fadeInUp}
                            className="lg:col-span-1 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white hover:shadow-2xl transition-shadow duration-300"
                        >
                            <h2 className="text-2xl font-bold mb-6 border-b border-blue-400 pb-3">
                                Notre équipe à votre écoute
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4 group">
                                    <div className="bg-blue-500 p-3 rounded-full group-hover:bg-blue-400 transition-colors">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-200 mb-1">Téléphone</p>
                                        <a
                                            href="tel:+237123456789"
                                            className="text-lg font-semibold hover:text-blue-200 transition-colors"
                                        >
                                            +237 657 547 585
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4 group">
                                    <div className="bg-blue-500 p-3 rounded-full group-hover:bg-blue-400 transition-colors">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-200 mb-1">Email</p>
                                        <a
                                            href="mailto:contact@esfplus.org"
                                            className="text-lg font-semibold hover:text-blue-200 transition-colors break-all"
                                        >
                                            contact@esfplus.org
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-500 p-3 rounded-full">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-200 mb-1">Horaires</p>
                                        <p className="font-medium">Lun - Ven : 9h00 - 18h00</p>
                                    </div>
                                </div>

                            </div>
                        </motion.div>

                        {/* Formulaire de contact ou message de mise en relation */}
                        <motion.div variants={fadeInUp} className="lg:col-span-2">
                            <Card className="border-0 shadow-lg h-full">
                                <CardContent className="p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        Prêt à passer à l'action ?
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Discutons de la manière dont nous pouvons construire ensemble
                                        un partenariat à fort impact, aligné avec vos valeurs et vos
                                        objectifs RSE.
                                    </p>
                                    <div className="space-y-4">


                                        <Button
                                            onClick={() => setShowCalendly(true)}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
                                        >
                                            Réservez un appel gratuit de 30 min
                                        </Button>
                                        <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg">
                                            <a
                                                href="https://wa.me/237657547585?text=Bonjour%20je%20souhaite%20discuter%20d'un%20partenariat%20avec%20ESF+"
                                                target="_blank"
                                            >
                                                Discuter sur WhatsApp
                                            </a>
                                        </Button>
                                        {/*  <Button variant="outline" className="w-full py-6 text-lg">
                                            Télécharger notre brochure partenaires
                                        </Button> */}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-6 text-center">
                                        Ou contactez-nous directement par téléphone ou email.
                                        Nous vous répondrons sous 48h.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {showCalendly && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

                    <div className="bg-white rounded-xl w-full max-w-4xl h-[80vh] relative shadow-2xl">

                        {/* Bouton fermer */}
                        <button
                            onClick={() => setShowCalendly(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
                        >
                            ✕
                        </button>

                        {/* Calendly */}
                        <InlineWidget
                            url="https://calendly.com/mpeckbeltrude/30min"
                            styles={{ height: "100%" }}
                        />
                    </div>

                </div>
            )}
        </div>

    );
}