import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/Footer"
import { isValidLocale, Locale } from "@/lib/i18n"
import { getDictionary } from "@/lib/dictionnaries/dictionnaries"
import { notFound } from "next/navigation"


type Props = {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = params.locale as Locale

  if (!isValidLocale(locale)) {
    notFound()
  }

  const dict = await getDictionary(locale)

  return (
    <html lang={locale}>
      <body>
        <Navbar locale={locale} />
        {children}
        <Footer dict={dict} />
      </body>
    </html>
  )
}