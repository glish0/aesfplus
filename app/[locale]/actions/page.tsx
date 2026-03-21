import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { isValidLocale } from "@/lib/i18n";
import ActivitiesPage from "@/components/actions/NosActivite";
import { notFound } from "next/navigation";

export default async function ActionsPage({
    params,
}: {
    params: { locale: string }; // ✅ correct
}) {
    const locale = params.locale;

    if (!isValidLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale);

    return <ActivitiesPage />;
}