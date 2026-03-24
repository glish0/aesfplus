"use client";

import Image from "next/image";
import { useState } from "react";
import { GalleryModal } from "./GaleryModal";

;
type Media = {
    type: "image" | "video";
    src: string;
};

type Card = {
    title: string;
    subtitle: string;
    media: Media[];
};

const cards: Card[] = [
    {
        title: "Distribution alimentaire",
        subtitle: "+50 familles aidées",
        media: [
            { type: "image", src: "/don2.jpg" },

            { type: "image", src: "/don2.jpg" },
            { type: "image", src: "/don4.jpg" },

            { type: "image", src: "/don6.jpg" },

            { type: "video", src: "/temoignage.mp4" }, // 🎥 vidéo
        ],
    },
    {
        title: "Soutien scolaire",
        subtitle: "70+ enfants accompagnés",
        media: [{ type: "image", src: "/don-au-pygmee-par-espoir-sans-frontiere.jpg" },
        { type: "image", src: "/don5.jpg" },
        { type: "image", src: "/education2.jpg" },
        { type: "image", src: "/education4.jpg" },
        { type: "image", src: "/education5.jpg" }
        ],
    },
    {
        title: "Campagne de santé",
        subtitle: "3 villages couverts",
        media: [{ type: "image", src: "/paludisme/campagne-de-sensibilisation-contre-le-palusidsme2.jpg" }],
    },
    {
        title: "Mobilisation communautaire",
        subtitle: "Actions de sensibilisation",
        media: [{ type: "image", src: "/esf6.jpg" }],
    },
    {
        title: "Protection des enfants",
        subtitle: "Programme de soutien",
        media: [{ type: "image", src: "/enfant.jpg" }],
    },


];

export default function GalleryPage() {
    const [selectedMedia, setSelectedMedia] = useState<Media[] | null>(null);
    const [selectedImages, setSelectedImages] = useState<string[] | null>(null);

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4">

            <div className="text-center max-w-3xl mx-auto mb-12"> <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-medium"> ESF+ en images </span> <h1 className="text-4xl md:text-5xl font-bold mt-4"> Quelques images <span className="text-red-500">sur le terrain</span> </h1> <p className="text-gray-600 mt-4"> Nos actions produisent des résultats concrets. Grâce à votre soutien, pas à pas, nous faisons évoluer les choses face à la pauvreté et aux injustices. <br /> <span className="font-semibold">En voici la preuve !</span> </p> </div>
            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedMedia(card.media)}
                        className="cursor-pointer bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition group"
                    >
                        {/* IMAGE (première image seulement) */}
                        <div className="relative w-full h-56 group overflow-hidden">

                            {/* MEDIA */}
                            {card.media[0].type === "image" ? (
                                <>
                                    <Image
                                        src={card.media[0].src}
                                        alt={card.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition"
                                    />

                                    <div className="absolute bottom-2 left-2 flex -space-x-2"> {card.media.slice(0, 3).map((img, i) => (<div key={i} className="relative w-8 h-8 border-2 border-white rounded-md overflow-hidden"> <Image src={img.src} alt="preview" fill className="object-cover" /> </div>))} {card.media.length > 3 && (<div className="w-8 h-8 bg-black/70 text-white text-xs flex items-center justify-center rounded-md border-2 border-white"> +{card.media.length - 3} </div>)} </div>
                                </>) : (
                                <video
                                    src={card.media[0].src}
                                    className="w-full h-full object-cover"
                                />
                            )}

                            {/* 🎥 BADGE VIDEO */}
                            {card.media.some((m) => m.type === "video") && (
                                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    🎥 vidéo
                                </div>
                            )}

                            {/* 👀 OVERLAY + COUNT */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">

                                <span className="text-white font-semibold text-center">
                                    +{card.media.length} éléments
                                    <br />

                                    <span className="text-sm opacity-80">
                                        {card.media.filter(m => m.type === "image").length} photos
                                        {card.media.some(m => m.type === "video") && (
                                            <> • 🎥 vidéo</>
                                        )}
                                    </span>
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
            {selectedMedia && (
                <GalleryModal
                    media={selectedMedia}
                    onClose={() => setSelectedMedia(null)}
                />
            )}
        </div>
    );
}

