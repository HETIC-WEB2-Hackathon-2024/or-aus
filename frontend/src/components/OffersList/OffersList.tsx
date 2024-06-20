import { OfferCard } from "./../OfferCard/OfferCard";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { Loader2 } from "lucide-react";
import { IOffer } from "@/pages/offers/Offers";
import { useState, useCallback, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
    authenticatedGet,
    authenticatedPost,
    authenticatedDelete,
} from "./../../auth/helper";
import { IFilters } from "../../pages/offers/Offers";

interface OffersListProps {
    filters: IFilters;
    uri: string;
    selectedOffer: IOffer;
    setSelectedOffer: React.Dispatch<React.SetStateAction<IOffer>>;
    initialSelectedOffer: IOffer;
    isSelection?: boolean;
}

interface IPagination {
    limit: number;
    offset: number;
}

export default function OffersList({
    filters,
    uri,
    selectedOffer,
    setSelectedOffer,
}: OffersListProps) {
    const [offers, setOffers] = useState<IOffer[]>([]);
    const [loading, setLoading] = useState(true);
    const { getAccessTokenSilently } = useAuth0();
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [pagination, setPagination] = useState<IPagination>({
        limit: 20,
        offset: 0,
    });

    const changeSelectedOffer = useCallback(
        (id: number) => {
            const index = offers.findIndex((offer) => offer.id === id);
            setSelectedOffer(offers[index]);
        },
        [offers, setSelectedOffer]
    );

    const createQueryString = useCallback(
        (path: string, filters: IFilters, pagination: IPagination) => {
            let queryString = `${path}?`;
            Object.entries(filters).forEach(
                (filter) => (queryString += `${filter[0]}=${filter[1]}&`)
            );
            Object.entries(pagination).forEach(
                (filter) => (queryString += `${filter[0]}=${filter[1]}&`)
            );
            return queryString;
        },
        []
    );

    const getOffers = useCallback(
        async (queryType: "first" | "next" | "filter") => {
            try {
                const token = await getAccessTokenSilently();
                let offset: number = pagination.offset;
                switch (queryType) {
                    case "first":
                        setPagination({ ...pagination, offset: 0 });
                        setPage(0);
                        offset = 0;
                        break;
                    case "next":
                        setPagination({
                            ...pagination,
                            offset: (page + 1) * pagination.limit,
                        });
                        setPage((prev) => prev + 1);
                        break;
                    case "filter":
                        setPagination({ ...pagination, offset: 0 });
                        setPage(0);
                        offset = 0;
                        break;
                    default:
                        break;
                }
                const path = createQueryString(uri, filters, {
                    limit: pagination.limit,
                    offset,
                });
                const newOffers = await authenticatedGet(token, path);
                if (!Array.isArray(newOffers)) {
                    throw new Error("newOffers is not an array");
                }
                if (newOffers.length === 0 || newOffers.length < 20) {
                    setHasMore(false);
                }
                if (queryType === "next") {
                    setOffers([...offers, ...newOffers]);
                } else {
                    setOffers([...newOffers]);
                    if (newOffers.length > 0) setSelectedOffer(newOffers[0]);
                }
            } catch (err) {
                setHasMore(false);
            } finally {
                setLoading(false);
            }
        },
        [
            filters,
            getAccessTokenSilently,
            setSelectedOffer,
            createQueryString,
            offers,
            page,
            pagination,
            uri
        ]
    );

    useEffect(() => {
        getOffers("first");
    }, [getOffers]);

    useEffect(() => {
        getOffers("filter");
    }, [getOffers]);

    const next = async () => {
        setLoading(true);
        getOffers("next");
        setLoading(false);
    };
    const handleFavoriteToggle = async (
        offerId: number,
        isFavorite: boolean
    ) => {
        try {
            const token = await getAccessTokenSilently();
            if (isFavorite) {
                await authenticatedDelete(
                    token,
                    `v1/offres/favorite?offre_id=${offerId}`
                );
            } else {
                await authenticatedPost(
                    token,
                    `v1/offres/favorite?offre_id=${offerId}`,
                    {}
                );
            }
        } catch (error) {
            console.error("Failed to update favorite status", error);
        }
    };
    return (
        <div className="flex flex-col items-center p-4 space-y-3 h-80 md:h-full">
            {offers.map((offer) => {
                return (
                    <div
                        key={offer.id}
                        onClick={() => changeSelectedOffer(offer.id)}
                        className="w-full"
                    >
                        <OfferCard
                            title={offer.titre_emploi}
                            subtitle={offer.entreprise}
                            shortDescription={offer.description_courte.replace(
                                /\\n/g,
                                ""
                            )}
                            tags={[
                                offer.contrat,
                                `${offer.nom_commune} (${offer.code_region})`,
                            ]}
                            className={
                                selectedOffer.id === offer.id
                                    ? "bg-primary/30"
                                    : ""
                            }
                            onFavoriteToggle={handleFavoriteToggle}
                            isFavoriteBase={offer.is_favorite}
                            offerId={offer.id}
                        />
                    </div>
                );
            })}
            <InfiniteScroll
                hasMore={hasMore}
                isLoading={loading}
                next={next}
                threshold={1}
            >
                {hasMore && <Loader2 className="my-4 h-8 w-8 animate-spin" />}
            </InfiniteScroll>
        </div>
    );
}
