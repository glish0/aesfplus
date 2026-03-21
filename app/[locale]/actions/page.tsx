import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { Locale } from "@/lib/i18n";
import BecomePartner from "@/components/partenaire/BecomePartner";
import ActivitiesPage from "@/components/actions/NosActivite";

export default async function ActionsPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return <ActivitiesPage />;
}