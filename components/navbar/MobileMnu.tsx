// components/navbar/mobile-menu.tsx
"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { Menu } from "lucide-react"
import { NavLabels } from "../NavActions"
import { NavLink } from "../Lien"

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
      href: "/faire-un-don",
      image: "/esf1.jpg",
      description: "Soutenez nos actions",
    },
    {
      label: "Devenir bénévole",
      href: "/devenir-un-benevol",
      image: "/esf8.jpg",
      description: "Rejoignez notre équipe",
    },
    {
      label: "Je deviens Partenaire",
      href: "/devenir-partenaire",
      image: "/esf8.jpg",
      description: "Travaillez avec nous",
    }
  ],
  victories: [
    {
      label: "Nos réalisations",
      href: "/nos-realisations",
      image: "/esf2.jpg",
      description: "Découvrez notre impact",
    },
    {
      label: "Témoignages",
      href: "/testimonials",
      image: "/esf6.jpg",
      description: "Ils parlent de nous",
    },
  ],

}

export function MobileMenu({ labels }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu className="h-6 w-6" />
      </SheetTrigger>

      <SheetContent side="right" className="pt-10">
        <Accordion type="single" collapsible className="w-full">
          {/* Accordion pour Fights */}
          <AccordionItem value="fights">
            <AccordionTrigger className="text-sm font-medium px-2">
              {labels.fights}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col space-y-2 pl-4 pt-2">
              {accordionItems.fights.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  className="text-sm py-2 px-2 hover:bg-accent rounded-md w-full"
                />
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Accordion pour Act */}
          <AccordionItem value="act">
            <AccordionTrigger className="text-sm font-medium px-2">
              {labels.act}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col space-y-2 pl-4 pt-2">
              {accordionItems.act.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  className="text-sm py-2 px-2 hover:bg-accent rounded-md w-full"
                />
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Accordion pour Victories */}
          <AccordionItem value="victories">
            <AccordionTrigger className="text-sm font-medium px-2">
              {labels.victories}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col space-y-2 pl-4 pt-2">
              {accordionItems.victories.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  className="text-sm py-2 px-2 hover:bg-accent rounded-md w-full"
                />
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Accordion pour Donor */}

        </Accordion>
      </SheetContent>
    </Sheet>
  )
}