import Link from "next/link";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

interface FooterProps {
    dict: {
        footer: {
            description: string;
            quick_links: string;
            contact: string;
            follow_us: string;
            rights: string;
        };
        nav: {
            home: string;
            about: string;
            donate: string;
        };
    };
}

export function Footer({ dict }: FooterProps) {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand & Description */}
                <div className="col-span-1 md:col-span-1">
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
                    <p className="text-sm leading-relaxed opacity-80">
                        {dict.footer.description}
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-semibold mb-4">{dict.footer.quick_links}</h4>
                    <ul className="space-y-2">
                        <li><Link href="/" className="hover:text-orange-400 transition-colors">{dict.nav.home}</Link></li>
                        <li><Link href="/about" className="hover:text-orange-400 transition-colors">{dict.nav.about}</Link></li>
                        <li><Link href="/don" className="hover:text-orange-400 transition-colors">{dict.nav.donate}</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-semibold mb-4">{dict.footer.contact}</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                            <span>Mokolo 3, Bertoua, Cameroun<br />BP 511</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                            <span>+237 6 99 99 99 99</span> {/* Dedicated placeholder */}
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                            <a href="mailto:contact.esfplus@gmail.com" className="hover:text-white">contact.esfplus@gmail.com</a>
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h4 className="text-white font-semibold mb-4">{dict.footer.follow_us}</h4>
                    <div className="flex gap-4">
                        <a
                            href="https://web.facebook.com/profile.php?id=61558649237326"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
                            aria-label="Facebook"
                        >
                            <Facebook className="w-5 h-5" />
                        </a>
                        {/* Add more social icons here needed */}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm opacity-60">
                <p>&copy; {new Date().getFullYear()} Espoir Sans Frontière+. {dict.footer.rights}</p>
            </div>
        </footer>
    );
}
