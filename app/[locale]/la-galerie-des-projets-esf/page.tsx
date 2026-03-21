import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { Locale } from "@/lib/i18n";
import BecomePartner from "@/components/partenaire/BecomePartner";
import GalleryPage from "@/components/galery/page";

export default async function GaleryPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return <GalleryPage />;
}