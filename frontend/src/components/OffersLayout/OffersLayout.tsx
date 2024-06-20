import { useState } from "react"
import { OfferDetail } from "../OfferDetail/OfferDetail"
import OffersList from "@/components/OffersList/OffersList"
import { IFilters, IOffer } from "@/pages/offers/Offers";
import { useMediaQuery } from 'react-responsive'

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
    secteur: "",
    is_favorite: false,
}

export default function OffersLayout({ children, filters, uri }: OffersLayoutProps) {

    const [selectedOffer, setSelectedOffer] = useState<IOffer>(intialSelectedOffer)
    const [offerListClass, setOfferListClass] = useState("")
    const [offerDetailClass, setOfferDetailClass] = useState("hidden")
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    
    const handleClick = () => {
        if (isTabletOrMobile) {
            setOfferListClass("hidden")
            setOfferDetailClass("block")
            window.scrollTo({top: 0})
        }
    }

    const handleClose = () => {
        if (isTabletOrMobile) {
            setOfferListClass("block")
            setOfferDetailClass("hidden")
        }
    }

    return (
        <div className="flex h-full">
            <div className={`flex flex-col ${offerListClass} lg:basis-1/2 border-r`} >
                {children && children}
                <div onClick={handleClick}>
                    <OffersList
                        filters={filters}
                        uri={uri}
                        selectedOffer={selectedOffer}
                        setSelectedOffer={setSelectedOffer}
                        initialSelectedOffer={intialSelectedOffer} />
                </div>
            </div>
            <div className={`lg:basis-1/2 ${offerDetailClass} lg:block`}>
                <OfferDetail selectedOffer={selectedOffer} handleClose={handleClose} />
            </div>
        </div>
    )
}
