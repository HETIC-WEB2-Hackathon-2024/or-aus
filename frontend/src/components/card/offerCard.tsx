import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Heart } from "lucide-react"

interface OfferCardProps {
  title: string;
  subtitle: string;
  shortDescription: string;
  tags: string[];
}
export function OfferCard({title, subtitle, shortDescription, tags}: OfferCardProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>{title}</CardTitle>
        <Heart />
      </CardHeader>
      <CardContent>
        <p className="font-semibold">{subtitle}</p>
        <CardDescription>{shortDescription}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        Tags here
      </CardFooter>
    </Card>
  )
}
