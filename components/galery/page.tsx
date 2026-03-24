"use client";

import Image from "next/image";
import { useState } from "react";
import { GalleryModal } from "./GaleryModal";

type Card = {
    title: string;
    subtitle: string;
    image: string[];
};

const cards: Card[] = [
    {
        title: "Distribution alimentaire",
        subtitle: "+50 familles aidées",
        image: ["/don2.jpg", "/don1.jpg"],
    },
    {
        title: "Soutien scolaire",
        subtitle: "70+ enfants accompagnés",
        image: ["/don-au-pygmee-par-espoir-sans-frontiere.jpg"],
    },
    {
        title: "Campagne de santé",
        subtitle: "3 villages couverts",
        image: ["/paludisme/campagne-de-sensibilisation-contre-le-palusidsme2.jpg"],
    },
    {
        title: "Mobilisation communautaire",
        subtitle: "Actions de sensibilisation",
        image: ["/esf6.jpg"],
    },
    {
        title: "Protection des enfants",
        subtitle: "Programme de soutien",
        image: ["/enfant.jpg"],
    },


];

export default function GalleryPage() {
    const [selectedImages, setSelectedImages] = useState<string[] | null>(null);

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4">

            <div className="text-center max-w-3xl mx-auto mb-12"> <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-medium"> ESF+ en images </span> <h1 className="text-4xl md:text-5xl font-bold mt-4"> Quelques images <span className="text-red-500">sur le terrain</span> </h1> <p className="text-gray-600 mt-4"> Nos actions produisent des résultats concrets. Grâce à votre soutien, pas à pas, nous faisons évoluer les choses face à la pauvreté et aux injustices. <br /> <span className="font-semibold">En voici la preuve !</span> </p> </div>
            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedImages(card.image)}
                        className="cursor-pointer bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition group"
                    >
                        {/* IMAGE (première image seulement) */}
                        <div className="relative w-full h-56">
                            <Image
                                src={card.image[0]}
                                alt={card.title}
                                fill
                                className="object-cover group-hover:scale-105 transition"
                            />
                            <div className="absolute bottom-2 left-2 flex -space-x-2">
                                {card.image.slice(0, 3).map((img, i) => (
                                    <div key={i} className="relative w-8 h-8 border-2 border-white rounded-md overflow-hidden">
                                        <Image
                                            src={img}
                                            alt="preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}

                                {card.image.length > 3 && (
                                    <div className="w-8 h-8 bg-black/70 text-white text-xs flex items-center justify-center rounded-md border-2 border-white">
                                        +{card.image.length - 3}
                                    </div>
                                )}
                            </div>

                            {/* overlay + count */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                <span className="text-white font-semibold">
                                    +{card.image.length} photos
                                </span>
                            </div>
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

            {/* MODAL */}
            {selectedImages && (
                <GalleryModal
                    images={selectedImages}
                    onClose={() => setSelectedImages(null)}
                />
            )}
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