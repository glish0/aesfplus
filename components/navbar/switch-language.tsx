
import Link from "next/link"

export function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale: "fr" | "en"
}) {
  const nextLocale = currentLocale === "fr" ? "en" : "fr"

  return (
    <Link
      href={`/${nextLocale}`}
      className="text-sm font-semibold hover:text-orange-600"
    >
      {nextLocale.toUpperCase()}
    </Link>
  )
}
