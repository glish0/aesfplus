import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { isValidLocale } from "@/lib/i18n";
import NosRealisations from "@/components/realisation/NosRealisation";
import { notFound } from "next/navigation";

export default async function NosRealisationsPage({
    params,
}: {
    params: Promise<{ locale: string }>; // 👈 Change: params is a Promise
}) {
    const { locale } = await params; // 👈 Change: await the params

    if (!isValidLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale);

    return <NosRealisations dict={dict.about} />;
}