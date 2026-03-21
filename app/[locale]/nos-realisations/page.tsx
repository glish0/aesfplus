import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { isValidLocale } from "@/lib/i18n";
import NosRealisations from "@/components/realisation/NosRealisation";
import { notFound } from "next/navigation";

export default async function NosRealisationsPage({
    params,
}: {
    params: { locale: string }; // ✅ correct
}) {
    const locale = params.locale;

    if (!isValidLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale);

    return <NosRealisations dict={dict.about} />;
}