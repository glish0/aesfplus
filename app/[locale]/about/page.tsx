import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { isValidLocale } from "@/lib/i18n";
import AboutContent from "@/components/about/AboutContent";
import { notFound } from "next/navigation";

export default async function AboutPage({
    params,
}: {
    params: { locale: string }; // ✅ FIX
}) {
    const locale = params.locale;

    if (!isValidLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale);

    return <AboutContent dict={dict.about} />;
}