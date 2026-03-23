

import StatsSection from "@/components/NumberSection";
import PygmySwiper from "@/components/PygmySwiper";
import { getDictionary } from "@/lib/dictionnaries/dictionnaries";
import { Locale } from "@/lib/i18n";

import NewsletterSection from "@/components/NewsletterSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnerSection from "@/components/partenaire/Partenaire";
import DomainsSection from "@/components/Dmaines";
import VideoTestimonialParallax from "@/components/VideoParallax";

export default async function Home({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;

  const dict = await getDictionary(locale);

  return (
    <div className="flex w-full flex-col items-center justify-center min-h-screen ">
      <main className="flex flex-col items-center sm:items-start w-full">
        <PygmySwiper dict={dict} />
        <DomainsSection />
        <StatsSection dict={dict.stats} />
        <PartnerSection />
        <TestimonialsSection dict={dict.testimonials} />
        <VideoTestimonialParallax />
        <NewsletterSection dict={dict.newsletter} />
      </main>
    </div>
  );
}
