import { OfferCard } from "./../OfferCard/OfferCard"
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { Loader2 } from 'lucide-react';
import { IOffer } from "@/pages/offers/Offers"
import { useState, useCallback, useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react";
import { authenticatedGet } from "./../../auth/helper";
import { IFilters } from "../../pages/offers/Offers"

interface OffersListProps {
    filters: IFilters;
    uri: string;
    selectedOffer: IOffer;
    setSelectedOffer: React.Dispatch<React.SetStateAction<IOffer>>;
    initialSelectedOffer: IOffer;
}

interface IPagination {
    limit: number;
    offset: number;
}

export default function OffersList({ filters, uri, selectedOffer, setSelectedOffer, initialSelectedOffer }: OffersListProps) {
    const [offers, setOffers] = useState<IOffer[]>([])
    const [loading, setLoading] = useState(true);
    const { getAccessTokenSilently } = useAuth0();
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [pagination, setPagination] = useState<IPagination>({
        limit: 20,
        offset: 0
    })

    const changeSelectedOffer = useCallback((id: number) => {
        const index = offers.findIndex((offer) => offer.offre_id === id)
        setSelectedOffer(offers[index])
    }, [offers])

    const createQueryString = useCallback((path: string, filters: IFilters, pagination: IPagination) => {
        let queryString = `${path}?`;
        Object.entries(filters).forEach((filter) => queryString += `${filter[0]}=${filter[1]}&`)
        Object.entries(pagination).forEach((filter) => queryString += `${filter[0]}=${filter[1]}&`)
        return queryString;
    }, [])

    const getOffers = useCallback(async (isNext = false) => {
        try {
            const token = await getAccessTokenSilently();
            setSelectedOffer(initialSelectedOffer)
            const path = createQueryString(uri, filters, pagination)
            const newOffers = await authenticatedGet(token, path);
            setPage((prev) => prev + 1);
            setPagination({ ...pagination, offset: page * pagination.limit })
            if (newOffers.length === 0 || newOffers.length < 20) {
                setHasMore(false);
            }
            if (isNext) {
                setOffers([...offers, ...newOffers])
            } else {
                setOffers(newOffers)
            }
        } catch (err) {
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [filters, getAccessTokenSilently, createQueryString, offers, page])

    useEffect(() => {
        getOffers()
        if (offers.length > 0) setSelectedOffer(offers[0])
    }, [])

    useEffect(() => {
        getOffers()
        if (offers.length > 0) setSelectedOffer(offers[0])
    }, [filters])

    const next = async () => {
        setLoading(true);
        getOffers(true)
        setLoading(false);
    };
    return (
        <div className="flex flex-col items-center justify-between p-4 space-y-3 h-full overflow-scroll">
            {offers.map((offer) => {
                return (
                    <div key={offer.offre_id} onClick={() => changeSelectedOffer(offer.offre_id)}>
                        {selectedOffer.offre_id === offer.offre_id ?
                            (<OfferCard
                                title={offer.titre_emploi}
                                subtitle={offer.entreprise}
                                shortDescription={offer.description_courte}
                                tags={[offer.contrat, `${offer.nom_commune} (${offer.code_region})`]}
                                className="bg-primary/30" />) :
                            (<OfferCard
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