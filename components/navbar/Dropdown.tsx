"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Locale } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";

type Item = {
  label: string;
  href: string; // chemin relatif, exemple: "/faire-un-don"
  image: string;
  description?: string;
};

export function NavDropdown({
  label,
  items,
  locale
}: {
  label: string;
  items: Item[];
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = (href: string) => {
    // Préfixe automatique avec la locale
    const path = `/${locale}${href.startsWith("/") ? href : "/" + href}`;
    router.push(path);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button className="font-medium text-gray-700 hover:text-black transition">
        {label}
      </button>

      {/* Mega Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="absolute left-1/2 -translate-x-1/2 mt-4 w-[600px] rounded-xl shadow-xl p-2 grid grid-cols-2 gap-4 bg-white border"
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className="rounded-md overflow-hidden"
              >
                <button
                  onClick={() => handleClick(item.href)}
                  className="group flex items-start gap-4 p-2 hover:bg-gray-100 transition rounded w-full text-left"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>

                  {/* Texte */}
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-black">
                      {item.label}
                    </p>
                    {item.description && (
                      <p className="text-sm text-gray-500">{item.description}</p>
                    )}
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}