import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { Locale } from "@/lib/i18n";

import NosRealisations from "@/components/realisation/NosRealisation";

export default async function NosRealisationsPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return <NosRealisations dict={dict.about} />;
}