import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { isValidLocale } from "@/lib/i18n";
import AboutContent from "@/components/about/AboutContent";
import { notFound } from "next/navigation";

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>; // ✅ params is a Promise
}) {
    const { locale } = await params; // ✅ await the params

    if (!isValidLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale);

    return <AboutContent dict={dict.about} />;
}