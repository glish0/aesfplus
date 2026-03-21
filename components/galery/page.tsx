"use client";

import Image from "next/image";

type Card = {
    title: string;
    subtitle: string;
    image: string;
};

const cards: Card[] = [
    {
        title: "Distribution alimentaire",
        subtitle: "+50 familles aidées",
        image: "/don2.jpg",
    },
    {
        title: "Soutien scolaire",
        subtitle: "70+ enfants accompagnés",
        image: "/don-au-pygmee-par-espoir-sans-frontiere.jpg",
    },
    {
        title: "Campagne de santé",
        subtitle: "3 villages couverts",
        image: "/paludisme/campagne-de-sensibilisation-contre-le-palusidsme2.jpg",
    },
    {
        title: "Mobilisation communautaire",
        subtitle: "Actions de sensibilisation",
        image: "/esf6.jpg",
    },
    {
        title: "Protection des enfants",
        subtitle: "Programme de soutien",
        image: "/enfant.jpg",
    },


];

export default function GalleryPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4">
            {/* HEADER */}
            <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-medium">
                    ESF+ en images
                </span>

                <h1 className="text-4xl md:text-5xl font-bold mt-4">
                    Quelques images <span className="text-red-500">sur le terrain</span>
                </h1>

                <p className="text-gray-600 mt-4">
                    Nos actions produisent des résultats concrets. Grâce à votre soutien,
                    pas à pas, nous faisons évoluer les choses face à la pauvreté et aux
                    injustices.
                    <br />
                    <span className="font-semibold">En voici la preuve !</span>
                </p>
            </div>

            {/* FILTERS
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {[
                    "Toutes les actions",
                    "Aide humanitaire",
                    "Éducation",
                    "Sensibilisation",
                    "Communauté",

                ].map((item, i) => (
                    <button
                        key={i}
                        className={`px-4 py-2 rounded-full border text-sm ${i === 0
                            ? "bg-red-500 text-white"
                            : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div> */}

            {/* GALLERY GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition"
                    >
                        <div className="relative w-full h-56">
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="p-4">
                            <h3 className="font-semibold text-lg">{card.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {card.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* STATS */}
            <div className="mt-16 bg-white shadow-md rounded-2xl p-6 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <Stat label="Personnes aidées" value="+900" />
                <Stat label="Projets réalisés" value="15" />
                <Stat label="Bénévoles engagés" value="+10" />
                <Stat label="Régions couvertes" value="1" />
            </div>
        </div>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-2xl font-bold text-red-500">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    );
}