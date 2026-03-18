import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { Locale } from "@/lib/i18n";
import MembrePage from "@/components/supporter/Adherer";

export default async function BenevolPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return <MembrePage dict={dict.about} />;
}
