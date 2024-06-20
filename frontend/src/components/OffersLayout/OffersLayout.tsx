import { useState } from "react"
import { OfferDetail } from "../OfferDetail/OfferDetail"
import OffersList from "@/components/OffersList/OffersList"
import { IFilters, IOffer } from "@/pages/offers/Offers";

interface OffersLayoutProps {
    children?: React.ReactNode;
    filters: IFilters,
    uri: string;
    isSelection?: boolean,
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

export default function OffersLayout({ children, filters, uri, isSelection }: OffersLayoutProps) {

    const [selectedOffer, setSelectedOffer] = useState<IOffer>(intialSelectedOffer)

    return (
        <div className="flex h-full">
            <div className="flex flex-col lg:basis-1/2 border-r">
                {children && children}
                <OffersList
                    filters={filters}
                    uri={uri}
                    selectedOffer={selectedOffer}
                    setSelectedOffer={setSelectedOffer}
                    isSelection={isSelection}
                    initialSelectedOffer={intialSelectedOffer} />
            </div>
            <div className="basis-1/2 hidden lg:block">
                <OfferDetail selectedOffer={selectedOffer} />
            </div>
        </div>
    )
}