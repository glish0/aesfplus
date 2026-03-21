import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { isValidLocale } from "@/lib/i18n";
import GalleryPage from "@/components/galery/page";
import { notFound } from "next/navigation";

export default async function GaleryPage({
    params,
}: {
    params: { locale: string }; // ✅ FIX
}) {
    const locale = params.locale;

    if (!isValidLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale);

    return <GalleryPage />;
}