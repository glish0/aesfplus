import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { isValidLocale } from "@/lib/i18n";
import VolunteerPage from "@/components/supporter/DevenirBenevol";
import { notFound } from "next/navigation";

export default async function BenevolPage({
    params,
}: {
    params: Promise<{ locale: string }>; // ✅ params is a Promise
}) {
    const { locale } = await params; // ✅ await the params

    if (!isValidLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale);

    return <VolunteerPage dict={dict.about} />;
}