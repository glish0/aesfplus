// components/navbar/nav-link.tsx
import Link from "next/link"
import { cn } from "@/lib/utils"

type NavLinkProps = {
  href: string
  label: string
  className?: string
}

export function NavLink({ href, label, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-semibold text-gray-800 hover:text-orange-600 transition",
        className
      )}
    >
      {label}
    </Link>
  )
}
