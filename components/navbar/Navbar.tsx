import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/navbar/switch-language";
import { NavDropdown } from "@/components/navbar/Dropdown";
import { MobileMenu } from "@/components/navbar/MobileMnu";
import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { NavActions } from "@/components/NavActions";
import Link from "next/link";
import { Facebook } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";

export async function Navbar({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center gap-3">
          <Image
            src="/logo.png"
            alt="logo"
            width={48}
            height={48}
            className="border"
          />
          {/*  <span className="hidden sm:block text-sm border font-semibold">
            {dict.nav.slogan}
          </span> */}
        </Link>

        {/* Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href={'/fr/'} className="font-medium text-gray-700 hover:text-black transition">{dict.nav.home}</Link>
          <NavDropdown
            label={dict.nav.fights}
            locale={locale}
            items={[
              {
                label: "Lutte contre la pauvreté",
                href: "/fights/poverty",
                image: "/pygme3.jpg",
                description: "Aider les familles en difficulté",
              },
              {
                label: "Accès à l'éducation",
                href: "/fights/education",
                image: "/pygmy.jpg",
                description: "Scolarisation des enfants",
              },
            ]}
          />

          <NavDropdown
            label={dict.nav.act}
            locale={locale}
            items={[
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
            ]}
          />

          <NavDropdown
            label={dict.nav.victories}
            locale={locale}
            items={[
              {
                label: "Nos réalisations",
                href: "/victories",
                image: "/esf2.jpg",
                description: "Découvrez notre impact",
              },
              {
                label: "Témoignages",
                href: "/testimonials",
                image: "/esf6.jpg",
                description: "Ils parlent de nous",
              },
            ]}
          />
        </nav>

        <div className="hidden lg:flex lg:flex-col items-center gap-4 ">
          <div className="flex justify-end gap-4">
            <Link
              href="https://web.facebook.com/profile.php?id=61558649237326"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF className="h-4 w-4 text-blue-600 hover:opacity-80 transition" />
            </Link>
            <LanguageSwitcher currentLocale={locale} />
          </div>
          <div className=" border-t pt-2">
            <NavActions labels={dict.nav} />
          </div>
        </div>

        <MobileMenu labels={dict.nav} />
      </div>
    </header>
  );
}
