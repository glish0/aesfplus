// components/navbar/mobile-menu.tsx
"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { Menu, Heart, ChevronRight } from "lucide-react"
import { NavLabels } from "../NavActions"
import { NavLink } from "../Lien"
import Link from "next/link"
import { cn } from "@/lib/utils"

type MobileMenuProps = {
  labels: Pick<
    NavLabels,
    "fights" | "act" | "victories" | "donor"
  >
}

// Données pour les liens - à remplacer par vos vraies données
const accordionItems = {
  fights: [
    { href: "/fights/ongoing", label: "Combats en cours" },
    { href: "/fights/upcoming", label: "Prochains combats" },
    { href: "/fights/past", label: "Combats passés" },
  ],
  act: [
    {
      label: "Faire un don",
      href: "/fr/faire-un-don",
      image: "/esf1.jpg",
      description: "Soutenez nos actions",
    },
    {
      label: "Devenir bénévole",
      href: "/fr/devenir-un-benevol",
      image: "/esf8.jpg",
      description: "Rejoignez notre équipe",
    },
    {
      label: "Je deviens Partenaire",
      href: "/fr/devenir-partenaire",
      image: "/esf8.jpg",
      description: "Travaillez avec nous",
    }
  ],
  victories: [
    {
      label: "Nos réalisations",
      href: "/fr/nos-realisations",
      image: "/esf2.jpg",
      description: "Découvrez notre impact",
    },
    {
      label: "La galerie",
      href: "/fr/la-galerie-des-projets-esf",
      image: "/esf6.jpg",
      description: "ESF+ en images",
    },
  ],
}

export function MobileMenu({ labels }: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden">
        <Menu className="h-6 w-6 transition-transform hover:scale-110" />
      </SheetTrigger>

      <SheetContent side="right" className="w-[85vw] sm:w-[350px] p-0">
        <div className="flex flex-col h-full">
          {/* Header avec bouton don */}
          <div className="p-6 border-b border-gray-100">
            <Link
              href="/fr/faire-un-don"
              onClick={handleLinkClick}
              className="group relative w-full bg-[#f5cc10] hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Faire un don</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <Accordion type="single" collapsible className="w-full px-4 py-2">
              {/* Accueil */}
              <Link
                href="/fr"
                onClick={handleLinkClick}
                className="flex items-center py-3 px-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                Accueil
              </Link>

              {/* Actions */}
              <Link
                href="/fr/actions"
                onClick={handleLinkClick}
                className="flex items-center py-3 px-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                Actions
              </Link>

              {/* Accordion pour Act */}
              <AccordionItem value="act" className="border-b-0">
                <AccordionTrigger className="text-base font-medium py-3 px-2 hover:no-underline hover:text-red-600 [&[data-state=open]]:text-red-600">
                  {labels.act}
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  <div className="flex flex-col space-y-1 pl-4">
                    {accordionItems.act.map((item) => (
                      <NavLink
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        onClick={handleLinkClick}
                        className="text-sm py-2.5 px-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Accordion pour Victories */}
              <AccordionItem value="victories" className="border-b-0">
                <AccordionTrigger className="text-base font-medium py-3 px-2 hover:no-underline hover:text-red-600 [&[data-state=open]]:text-red-600">
                  {labels.victories}
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  <div className="flex flex-col space-y-1 pl-4">
                    {accordionItems.victories.map((item) => (
                      <NavLink
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        onClick={handleLinkClick}
                        className="text-sm py-2.5 px-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </nav>

          {/* Footer optionnel */}
          <div className="p-6 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400">
              Ensemble, construisons un avenir meilleur
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}