'use client'


import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"

export type NavLabels = {
  fights: string
  act: string
  victories: string
  inform: string
  donate: string
  donor: string
  slogan: string
}
type NavActionsProps = {
  labels: Pick<NavLabels, "inform" | "donate">
}

export function NavActions({ labels }: NavActionsProps) {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as "fr" | "en"; // récupère 'fr' ou 'en'

  const handleDonate = () => {
    const path = locale === "fr" ? "/fr/faire-un-don" : "/en/faire-un-don";
    router.push(path);
  };

  return (
    <div className="flex gap-3">
      <Button variant="outline">{labels.inform}</Button>
      <Button onClick={handleDonate} className="bg-[#f5cc10] font-bold  uppercase">{labels.donate}</Button>
    </div>
  )
}
