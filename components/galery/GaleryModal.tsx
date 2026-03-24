"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Media = {
    type: "image" | "video";
    src: string;
};

export function GalleryModal({
    media,
    onClose,
}: {
    media: Media[];
    onClose: () => void;
}) {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % media.length);
    const prev = () =>
        setCurrent((prev) => (prev - 1 + media.length) % media.length);

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">

            {/* CLOSE */}
            <button onClick={onClose} className="absolute top-4 right-4 text-white">
                <X size={32} />
            </button>

            {/* CONTENT */}
            <div className="relative w-[95%] max-w-4xl h-[70vh]">

                {media[current].type === "image" ? (
                    <Image
                        src={media[current].src}
                        alt="gallery"
                        fill
                        className="object-contain"
                    />
                ) : (
                    <video
                        src={media[current].src}
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                    />
                )}
            </div>

            {/* NAV */}
            {media.length > 1 && (
                <>
                    <button onClick={prev} className="absolute left-4 text-white">
                        <ChevronLeft size={40} />
                    </button>

                    <button onClick={next} className="absolute right-4 text-white">
                        <ChevronRight size={40} />
                    </button>
                </>
            )}
        </div>
    );
}