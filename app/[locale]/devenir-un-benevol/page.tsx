import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { isValidLocale } from "@/lib/i18n";
import VolunteerPage from "@/components/supporter/DevenirBenevol";
import { notFound } from "next/navigation";

export default async function BenevolPage({
    params,
}: {
    params: { locale: string }; // ✅ FIX
}) {
    const locale = params.locale;

    if (!isValidLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale);

    return <VolunteerPage dict={dict.about} />;
}