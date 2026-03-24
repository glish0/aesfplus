"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function GalleryModal({
    images,
    onClose,
}: {
    images: string[];
    onClose: () => void;
}) {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % images.length);
    const prev = () =>
        setCurrent((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">

            {/* CLOSE */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white"
            >
                <X size={32} />
            </button>

            {/* IMAGE */}
            <div className="relative w-[90%] max-w-4xl h-[70vh]">
                <Image
                    src={images[current]}
                    alt="gallery"
                    fill
                    className="object-contain"
                />
            </div>

            {/* NAV */}
            <button
                onClick={prev}
                className="absolute left-6 text-white"
            >
                <ChevronLeft size={40} />
            </button>

            <button
                onClick={next}
                className="absolute right-6 text-white"
            >
                <ChevronRight size={40} />
            </button>
        </div>
    );
}