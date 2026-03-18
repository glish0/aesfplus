import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { Locale } from "@/lib/i18n";

import VolunteerPage from "@/components/supporter/DevenirBenevol";

export default async function BenevolPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return <VolunteerPage dict={dict.about} />;
}
