import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { isValidLocale } from "@/lib/i18n";
import BecomePartner from "@/components/partenaire/BecomePartner";
import { notFound } from "next/navigation";

export default async function BecomePartnerPage({
    params,
}: {
    params: { locale: string }; // ✅ FIX
}) {
    const locale = params.locale;

    if (!isValidLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale);

    return <BecomePartner dict={dict.about} />;
}