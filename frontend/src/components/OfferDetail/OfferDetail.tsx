import { Badge } from "@/components/ui/badge";
import { IOffer } from "../../pages/offers/Offers";
import { X } from "lucide-react"

interface OfferDetailProps {
    selectedOffer: IOffer;
    handleClose: () => void;
}

export function OfferDetail({ selectedOffer, handleClose }: OfferDetailProps) {
    return (
        <>
            <div className="border-b py-6 pl-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold basis-4/5">
                        {selectedOffer.titre_emploi}
                    </h2>
                    < X onClick={handleClose} className="lg:hidden  basis-1/5"/>
                </div>
                <p className="text-md">
                    Chez{" "}
                    <span className="font-bold">
                        {selectedOffer.entreprise}
                    </span>
                </p>
            </div>
            <div className="pt-4 pl-6 pr-4">
                <h3 className="text-xl font-bold pt-4 pb-2">
                    Détails de l'emploi
                </h3>
                <h4 className="text-l font-bold pt-4 pb-2">Type de poste</h4>
                <div className="space-x-1 ">
                    <Badge>{selectedOffer.contrat}</Badge>
                    <Badge>{selectedOffer.type_contrat}</Badge>
                </div>
                <h4 className="text-l font-bold pt-4 pb-2">Secteur</h4>
                <Badge>{selectedOffer.secteur}</Badge>
                <h4 className="text-l font-bold pt-4 pb-2">Localisation</h4>
                <Badge>
                    {selectedOffer.nom_commune} ({selectedOffer.code_region})
                </Badge>
                <h3 className="text-xl font-bold pt-4 pb-2">
                    Description du poste
                </h3>
                <p className="font-light pr-4 text-gray-500">
                    {selectedOffer.description
                        .split("\\n")
                        .map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                </p>
            </div>
        </>
    );
}
