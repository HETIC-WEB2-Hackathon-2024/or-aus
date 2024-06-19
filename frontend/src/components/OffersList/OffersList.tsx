import { OfferCard } from "./../OfferCard/OfferCard"
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { Loader2 } from 'lucide-react';
import { IOffer } from "@/pages/offers/Offers"

interface OffersListProps {
    next: () => void;
    offers: IOffer[];
    selectedOfferId: number;
    onClick: (id: number) => void;
    hasMore: boolean;
    loading: boolean;
}


export default function OffersList({offers, selectedOfferId, next, onClick, hasMore, loading}: OffersListProps) {

    return(
        <div className="flex flex-col items-center justify-between p-4 space-y-3 h-full overflow-scroll">
            {offers.map((offer) => {
                return (
                    <div onClick={() => onClick(offer.offre_id)}>
                        {selectedOfferId === offer.offre_id ? 
                        (<OfferCard 
                            key={offer.offre_id} 
                            title={offer.titre_emploi} 
                            subtitle={offer.entreprise} 
                            shortDescription={offer.description_courte} 
                            tags={[offer.contrat, `${offer.nom_commune} (${offer.code_region})`]}
                            className="bg-primary/30"/>):
                            (<OfferCard 
                                key={offer.offre_id} 
                                title={offer.titre_emploi} 
                                subtitle={offer.entreprise} 
                                shortDescription={offer.description_courte} 
                                tags={[offer.contrat, `${offer.nom_commune} (${offer.code_region})`]} />)
                            }
                    </div>
                )
            })}
            <InfiniteScroll hasMore={hasMore} isLoading={loading} next={next} threshold={1}>
                {hasMore && <Loader2 className="my-4 h-8 w-8 animate-spin" />}
            </InfiniteScroll>
        </div>
                    
    )
}