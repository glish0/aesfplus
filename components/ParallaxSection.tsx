'use client'

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

const ParallaxSection = ({
    imgUrl,
    children,
    alt
}: {
    imgUrl: string;
    children: React.ReactNode;
    alt: string
}) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);

    return (
        <section ref={ref} className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <Image src={imgUrl} alt={alt} fill className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="relative z-20 container mx-auto px-4 text-white">
                {children}
            </div>
        </section>
    );
};

export default ParallaxSection;