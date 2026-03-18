// components/navbar/nav-actions.tsx
import { Button } from "@/components/ui/button"

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
  return (
    <div className="flex gap-3">
      <Button variant="outline">{labels.inform}</Button>
      <Button className="bg-[#f5cc10] font-bold  uppercase">{labels.donate}</Button>
    </div>
  )
}
