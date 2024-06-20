import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OfferCardProps {
  title: string;
  subtitle: string;
  shortDescription: string;
  tags: string[];
  offerId: number;
  candidateId: number;
  className?: string;
  isFavoriteBase: boolean;
  onFavoriteToggle: (offerId: number, isFavorite: boolean) => void;
}

export function OfferCard({ title, subtitle, shortDescription, tags, offerId, candidateId, className, onFavoriteToggle, isFavoriteBase}: OfferCardProps) {
  const [isFavorite, setIsFavorite] = useState(isFavoriteBase);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onFavoriteToggle(offerId, isFavorite);
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex-row justify-between items-center space-y-1 p-3">
        <CardTitle className="basis-14/15">{title}</CardTitle>
        <Heart 
          onClick={handleFavoriteClick} 
          className={`text-primary ${isFavorite ? 'fill-primary' : 'hover:fill-primary'} basis-1/15 h-6 w-6 shrink-0 cursor-pointer`}
        />
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="font-semibold">{subtitle}</p>
        <CardDescription className="">{shortDescription}</CardDescription>
      </CardContent>
      <CardFooter className="p-3 space-x-1">
        {tags.length > 0 && tags.map((tag, index) => (
          <Badge key={`${tag}-${index}`}>{tag}</Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
