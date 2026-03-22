import ActivitiesPage from "@/components/actions/NosActivite";
import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function ActionsPage({
    params,
}: {
    params: Promise<{ locale: string }>; // ✅ params is a Promise
}) {
    const { locale } = await params; // ✅ await the params

    if (!isValidLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale);

    return <ActivitiesPage />;
}