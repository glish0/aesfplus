// components/navbar/mobile-menu.tsx
"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { NavLabels } from "../NavActions"
import { NavLink } from "../Lien"


type MobileMenuProps = {
  labels: Pick<
    NavLabels,
    "fights" | "act" | "victories" | "donor"
  >
}

export function MobileMenu({ labels }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu className="h-6 w-6" />
      </SheetTrigger>

      <SheetContent side="right" className="space-y-6 pt-10">
        <NavLink href="#" label={labels.fights} />
        <NavLink href="#" label={labels.act} />
        <NavLink href="#" label={labels.victories} />
        <NavLink href="#" label={labels.donor} />
      </SheetContent>
    </Sheet>
  )
}
