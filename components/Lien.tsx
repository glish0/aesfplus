// components/navbar/nav-link.tsx
import Link from "next/link"
import { cn } from "@/lib/utils"

type NavLinkProps = {
  href: string
  label: string
  className?: string
  onClick?: () => void // ✅ Ajout de la prop onClick optionnelle
}

export function NavLink({ href, label, className, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick} // ✅ Transmission de onClick au composant Link
      className={cn(
        "text-sm font-semibold text-gray-800 hover:text-orange-600 transition",
        className
      )}
    >
      {label}
    </Link>
  )
}