"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AboutDict } from "@/types";

import { Button } from "@/components/ui/button";


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
    GraduationCap,
    CheckCircle,
    Calendar,
    MapPin,
    ImageIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

// Interface pour les témoignages
interface Testimonial {
    quote: string;
    author: string;
    title: string;
    company?: string;
    image?: string;
    type: "partner" | "beneficiary";
}

export default function NosRealisations({ dict }: { dict: AboutDict }) {
    const [activeLink, setActiveLink] = useState("");

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
        { id: "f2d", label: "Femme de Demain" },
        { id: "pygme", label: "Santé chez les Pygmées" },
    ];





    return (
        <div className="relative min-h-screen flex flex-col items-center bg-white">
            {/* Hero Section avec image de fond et dégradé */}
            <section className="relative w-full min-h-[80vh] flex items-start justify-center pt-20">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/don-au-pygmee-par-espoir-sans-frontiere.jpg')" }}
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
                            Nos <span className="text-[#f5cc10] hover:text-[#f5cc10]/90">Réalisations</span>
                        </h1>
                        <p className="text-lg md:text-xl leading-relaxed text-gray-200">
                            Nos actions génèrent des résultats concrets. Grâce à votre engagement, pas à pas, nous faisons évoluer les choses face à la pauvreté et aux injustices.
                            Chaque initiative compte, chaque progrès est une victoire partagée.
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
            <section id="f2d" className="w-full py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    {/* En-tête */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <Badge className="mb-4 bg-purple-100 text-purple-700 border-0">
                            Femme de Demain
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Lancement du Club F2D à Bertoua
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Découvrez l'histoire et les premiers pas du club "Femme de Demain"
                            à MOKOLO 3, un projet ambitieux pour l'autonomisation des jeunes filles.
                        </p>
                    </motion.div>

                    {/* Section principale avec texte et image */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-12 items-start mb-16"
                    >
                        {/* Contenu texte */}
                        <motion.div variants={fadeInUp} className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-purple-600">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Calendar className="w-6 h-6 text-purple-600" />
                                    Le lancement officiel
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Le programme F2D a officiellement lancé en Mai 2025. Elle a débuté avec une enquête et
                                    identification des jeunes filles pour le club sur le terrain, dans les environs de MOKOLO 3.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    L'objectif de cette enquête était d'identifier les jeunes filles âgées de 13 à 30 ans du
                                    quartier Mokolo 3, qui sont intéressées à rejoindre le club "Femme de demain" et qui
                                    répondent aux critères de sélection. A la suite de cette enquête, nous avons eu au total plus
                                    d'une dizaine de filles enregistrées.
                                </p>
                            </div>

                            <div className="bg-purple-50 rounded-2xl shadow-lg p-8 border border-purple-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Users className="w-6 h-6 text-purple-600" />
                                    Première prise de contact
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    A la suite, nous avons eu une première prise de contact avec ces filles dans les locaux d'ESF+.
                                    Elle avait pour objectif de présenter le projet, pour qu'elles puissent avoir toutes les
                                    informations nécessaires et pour qu'elles puissent officiellement adhérer dans le club afin
                                    que les activités puissent officiellement démarrer.
                                </p>

                                {/* Statistiques */}
                                <div className="mt-6 flex items-center gap-4 bg-white rounded-xl p-4">
                                    <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                                        07
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Lancements du Club F2D de Bertoua</p>
                                        <p className="text-sm text-gray-600">07 filles participantes</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Image */}
                        <motion.div variants={fadeInUp} className="sticky top-24">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/contact-f2d.jpg"
                                    alt="Lancement du Club Femme de Demain à Bertoua"
                                    width={600}
                                    height={800}
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                    <p className="text-white text-sm">
                                        Atelier de formation - Lancement du Club F2D
                                    </p>
                                </div>
                            </div>

                            {/* Badge d'information supplémentaire */}
                            <div className="mt-4 bg-white rounded-lg shadow-md p-4 flex items-center gap-3">
                                <div className="bg-green-100 rounded-full p-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold text-gray-900">+10 filles enregistrées</span> lors de la phase d'enquête
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Section Atelier de formation */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-purple-600"
                    >
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <div className="bg-purple-100 rounded-full p-4">
                                <GraduationCap className="w-8 h-8 text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    ATELIER DE FORMATION
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Dans le cadre du lancement, un atelier de formation a été organisé pour préparer
                                    ces jeunes filles à leur nouveau rôle au sein du club. Cet atelier a couvert des
                                    thématiques essentielles comme le leadership, l'autonomisation et le développement
                                    personnel, posant ainsi les bases solides pour le succès futur du programme.
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                                        Leadership
                                    </span>
                                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                                        Autonomisation
                                    </span>
                                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                                        Développement personnel
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section id="pygme" className="w-full py-10 border bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    {/* En-tête */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-0">
                            Sensibilisation & Santé
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Mission au Village Pygmées de Kolbikon
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Sensibilisation des communautés sur la santé sexuelle et reproductive
                            des adolescents et jeunes
                        </p>
                    </motion.div>

                    {/* Section principale avec deux images */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-8 mb-12"
                    >
                        {/* Première image - Grand format */}
                        <motion.div variants={fadeInUp} className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl group">
                            <Image
                                src="/sante-pygme2.jpg"
                                alt="Sensibilisation au village Pygmées de Kolbikon"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <p className="text-white text-sm font-medium bg-emerald-600/80 inline-block px-3 py-1 rounded-full backdrop-blur-sm">
                                    Village Pygmées de Kolbikon
                                </p>
                            </div>
                        </motion.div>

                        {/* Deuxième image - Grand format */}
                        <motion.div variants={fadeInUp} className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl group">
                            <Image
                                src="/sante-chez-pygme.jpg"
                                alt="Échange avec les adolescents et jeunes"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <p className="text-white text-sm font-medium bg-emerald-600/80 inline-block px-3 py-1 rounded-full backdrop-blur-sm">
                                    Sensibilisation participative
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Bouton Galerie - Centré */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex justify-center mb-16"
                    >
                        <Link href="/fr/la-galerie-des-projets-esf">
                            <Button
                                size="lg"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                <ImageIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                Voir plus de photos de la mission
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Contenu texte en trois colonnes */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8 mb-16"
                    >
                        {/* Objectif Général */}
                        <motion.div variants={fadeInUp} className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl shadow-lg p-8 border border-emerald-100 col-span-3 md:col-span-1">
                            <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-6">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Objectif Général</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Vulgariser et mettre en valeur les différentes méthodes contraceptives, en
                                amenant des adolescents/jeunes à plus de connaissance sur les services de
                                santé sexuelle et reproductive.
                            </p>
                        </motion.div>

                        {/* Objectifs Spécifiques - Partie 1 */}
                        <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
                            <div className="bg-emerald-100 text-emerald-700 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                                <span className="font-bold text-lg">1</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Objectif Spécifique 1</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Sensibilisation d'au moins <span className="font-bold text-emerald-600">150 adolescents/jeunes</span> sur l'accès aux
                                services de santé sexuelle et reproductive et la disponibilité des
                                produits contraceptifs.
                            </p>
                            <div className="mt-4 bg-emerald-50 rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                    <span className="text-sm font-medium text-emerald-700">150+</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Objectifs Spécifiques - Partie 2 */}
                        <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
                            <div className="bg-emerald-100 text-emerald-700 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                                <span className="font-bold text-lg">2</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Objectif Spécifique 2</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Sensibiliser les adolescents/jeunes sur la disponibilité et la
                                fréquentation des <span className="font-bold text-emerald-600">USRA-J</span>.
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg">
                                <MapPin className="w-4 h-4" />
                                <span>Unités de Santé Reproductive pour Adolescents et Jeunes</span>
                            </div>
                        </motion.div>

                        {/* Objectifs Spécifiques - Partie 3 */}
                        <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 md:col-start-2">
                            <div className="bg-emerald-100 text-emerald-700 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                                <span className="font-bold text-lg">3</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Objectif Spécifique 3</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Valoriser auprès des adolescents/jeunes les différentes méthodes
                                contraceptives.
                            </p>

                            {/* Méthodes contraceptives - Tags */}
                            <div className="mt-6">
                                <p className="text-sm font-medium text-gray-500 mb-3">Méthodes présentées :</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                                        Préservatifs
                                    </span>
                                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                                        Pilules
                                    </span>
                                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                                        Implants
                                    </span>
                                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                                        Injectables
                                    </span>
                                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                                        DIU
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Section récapitulative avec statistiques */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-emerald-600 rounded-3xl shadow-xl p-8 md:p-12 text-white"
                    >
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">150+</div>
                                <p className="text-emerald-100">Adolescents/jeunes sensibilisés</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">1</div>
                                <p className="text-emerald-100">Village Pygmées visité</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">3</div>
                                <p className="text-emerald-100">Objectifs spécifiques atteints</p>
                            </div>
                        </div>

                        {/* Deuxième bouton Galerie (optionnel) */}
                        <div className="flex justify-center mt-8">
                            <Link href="/fr/la-galerie-des-projets-esf">
                                <Button
                                    variant="outline"
                                    className="bg-transparent border-white text-white hover:bg-white hover:text-emerald-600 rounded-full px-6 py-2"
                                >
                                    <ImageIcon className="w-4 h-4 mr-2" />
                                    Explorer la galerie complète
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}