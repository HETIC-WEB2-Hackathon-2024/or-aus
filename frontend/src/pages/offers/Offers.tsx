import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { AutoComplete } from "../../components/Autocomplete/Autocomplete"
import { OfferCard } from "../../components/Card/OfferCard"
import { useAuth0 } from "@auth0/auth0-react";
import { authenticatedGet } from "./../../auth/helper";
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { Loader2 } from 'lucide-react';
import { DatePickerWithRange } from "@/components/ui/date-range-picker"

interface OffersProps {
}

interface IOffer {
    commune_id: string;
    contrat: string;
    debut_stage: string;
    description: string;
    description_courte: string;
    entreprise: string;
    id: number;
    lieu: string;
    metier_id?: number;
    mois_de_stage?: number;
    offre_id: number;
    secteur_id?: number;
    titre_emploi: string;
    type_contrat: string;
    nom_commune: string;
    code_region: number;
    secteur: string;
}

interface IFilters {
    search?: string;
    city_or_department?: string;
    type_de_contrat?: string;
    secteur_id?: number;
    period_start?: string;
    period_end?: string;
    limit: number;
    offset: number;
}

const intialSelectedOffer = {
    commune_id: "",
    contrat: "",
    debut_stage: "",
    description: "",
    description_courte: "",
    entreprise: "",
    id: 0,
    lieu: "",
    metier_id: 0,
    mois_de_stage: 0,
    offre_id: 0,
    secteur_id: 0,
    titre_emploi: "",
    type_contrat: "",
    nom_commune: "",
    code_region: 0,
    secteur: ""
}

export default function Offers({}: OffersProps) {
    const [offers, setOffers] = useState<IOffer[]>([])
    const [selectedOffer, setSelectedOffer] = useState<IOffer>(intialSelectedOffer)
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<IFilters>({
        limit: 20,
        offset: 0
    })
    const [loading, setLoading] = useState(true);
    const { getAccessTokenSilently } = useAuth0();
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [periodOpen, setPeriodOpen] = useState(false)
    const [contractTypeOpen, setContractTypeOpen] = useState(false)
    const [sectorOpen, setSectorOpen] = useState(false)

    const getOffers = useCallback(async () => {
        try {
            const token = await getAccessTokenSilently();
            setSelectedOffer(intialSelectedOffer)
            console.log(filters)
            const path = createQueryString("/v1/offres", filters)
            const newOffers = await authenticatedGet(token, path);
            setPage((prev) => prev + 1);
            setFilters({...filters, offset: page * filters.limit})
            if (newOffers.length === 0 || newOffers.length < 20) {
                setHasMore(false);
            }
            setOffers([...offers, ...newOffers]);
        } catch (err) {
            setHasMore(false);
            setError(`Error from web service: ${err}`);
        } finally {
            setLoading(false);
        }
    }, [filters])

    const changeSelectedOffer = useCallback((id: number) => {
        const index = offers.findIndex((offer) => offer.offre_id === id)
        setSelectedOffer(offers[index])
    }, [offers])

    const createQueryString = useCallback((path:string, filters: IFilters) => {
        let queryString = `${path}?`;
        Object.entries(filters).forEach((filter) => queryString += `${filter[0]}=${filter[1]}&`)
        return queryString;
    }, [])

    useEffect(() => {
        getOffers()
        if (offers.length > 0) setSelectedOffer(offers[0])
    }, [])

    const next = async () => {
        setLoading(true);
        getOffers()
        setLoading(false);
      };

    return(
        <div className="flex flex-row justify-between h-screen mt-5">
            <div className="basis-1/5 border-r flex flex-col space-y-5 items-center pr-3 pl-3">
                <div className="py-4 pl-4 w-full">
                    <h2 className="text-2xl font-bold text-left">Filtres</h2>
                </div>
                <div className="w-full">
                    <Button className="w-full" onClick={() => setContractTypeOpen(!contractTypeOpen)} variant={contractTypeOpen? "default" : "outline"}>Type de contrat</Button>
                    {contractTypeOpen && (
                        <div>Open</div>
                    )}
                </div>
                <div className="w-full">
                    <Button className="w-full" onClick={() => setSectorOpen(!sectorOpen)} variant={sectorOpen? "default" : "outline"}>Secteur</Button>
                    {sectorOpen && (
                        <div>
                            Open
                        </div>
                    )}
                </div>
                <div className="w-full">
                    <Button className="w-full" onClick={() => setPeriodOpen(!periodOpen)} variant={periodOpen? "default" : "outline"}>Période</Button>
                    {periodOpen && (
                        <div className="w-full">
                            <DatePickerWithRange className="w-full" />
                        </div>
                    )}
                </div>
            </div>
            <div className="basis-4/5">
                <div className="border-b py-4 pl-4">
                    <h2 className="text-2xl font-bold">Trouver le job qu'il vous faut</h2>
                </div>
                <div className="flex h-full">
                    <div className="flex flex-col basis-1/2 border-r">
                        <div className="flex justify-between p-3 items-center">
                                <AutoComplete 
                                    variant="search" 
                                    placeholder={"Intitulé du poste"} 
                                    options={[]} 
                                    className="m-2"
                                    onChange={(value: string) => setFilters({...filters, search: value})}/>
                                <AutoComplete 
                                    variant="pin" 
                                    placeholder={"Ville, département"} 
                                    options={[]} 
                                    className="m-2"
                                    onChange={(value: string) => setFilters({...filters, city_or_department: value})}/>
                                <Button className="m-2" onClick={getOffers}>Rechercher</Button>
                        </div>
                        <div className="flex flex-col items-center justify-between p-4 space-y-3 h-full overflow-scroll">
                            {offers.map((offer) => {
                                return (
                                    <div onClick={() => changeSelectedOffer(offer.offre_id)}>
                                        {selectedOffer.offre_id === offer.offre_id ? 
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
                    </div>
                    <div className="basis-1/2">
                        <div className="border-b py-3 pl-3">
                            <h2 className="text-2xl font-bold">{selectedOffer.titre_emploi}</h2>
                            <p className="text-md">Chez <span className="font-bold">{selectedOffer.entreprise}</span></p>
                        </div>
                        <div className="pt-4 pl-4 pr-4">
                            <h3 className="text-xl font-bold pt-4 pb-2">Détails de l'emploi</h3>
                            <h4 className="text-l font-bold pt-4 pb-2">Type de poste</h4>
                            <div className="space-x-1 ">
                                <Badge>{selectedOffer.contrat}</Badge>
                                <Badge>{selectedOffer.type_contrat}</Badge>
                            </div>
                            <h4 className="text-l font-bold pt-4 pb-2">Secteur</h4>
                            <Badge>{selectedOffer.secteur}</Badge>
                            <h4 className="text-l font-bold pt-4 pb-2">Localisation</h4>
                            <Badge>{selectedOffer.nom_commune} ({selectedOffer.code_region})</Badge>
                            <h3 className="text-xl font-bold pt-4 pb-2">Description du poste</h3>
                            <p>{selectedOffer.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}