import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/Footer"
import { isValidLocale, Locale } from "@/lib/i18n"
import { getDictionary } from "@/lib/dictionnaries/dictionnaries"
import { notFound } from "next/navigation"

type Props = {
  children: React.ReactNode
  params: Promise<{  // 👈 Change: params is now a Promise
    locale: string
  }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params  // 👈 Change: await the params
  const validatedLocale = locale as Locale

  if (!isValidLocale(validatedLocale)) {
    notFound()
  }

  const dict = await getDictionary(validatedLocale)

  return (
    <html lang={validatedLocale}>
      <body>
        <Navbar locale={validatedLocale} />
        {children}
        <Footer dict={dict} />
      </body>
    </html>
  )
}