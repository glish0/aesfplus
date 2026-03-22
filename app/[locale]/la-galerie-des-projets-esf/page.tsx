import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { isValidLocale } from "@/lib/i18n";
import GalleryPage from "@/components/galery/page";
import { notFound } from "next/navigation";

export default async function GaleryPage({
    params,
}: {
    params: Promise<{ locale: string }>; // ✅ FIX: params is now a Promise
}) {
    const { locale } = await params; // ✅ FIX: await the params Promise

    if (!isValidLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale);

    return <GalleryPage />;
}