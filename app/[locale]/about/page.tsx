import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { Locale } from "@/lib/i18n";
import AboutContent from "@/components/about/AboutContent";

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return <AboutContent dict={dict.about} />;
}
