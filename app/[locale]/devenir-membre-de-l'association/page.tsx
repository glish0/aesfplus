import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { Locale, isValidLocale } from "@/lib/i18n";
import MembrePage from "@/components/supporter/Adherer";
import { notFound } from "next/navigation";

export default async function BenevolPage({
    params,
}: {
    params: { locale: string }; // ✅ correction
}) {
    const locale = params.locale;

    if (!isValidLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale);

    return <MembrePage dict={dict.about} />;
}