import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { Locale } from "@/lib/i18n";
import BecomePartner from "@/components/partenaire/BecomePartner";

export default async function BecomePartnerPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return <BecomePartner dict={dict.about} />;
}