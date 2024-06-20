import { Badge } from "@/components/ui/badge";
import { IOffer } from "../../pages/offers/Offers";

interface OfferDetailProps {
    selectedOffer: IOffer;
}

export function OfferDetail({ selectedOffer }: OfferDetailProps) {
    return (
        <>
            <div className="border-b py-3 pl-3">
                <h2 className="text-2xl font-bold">
                    {selectedOffer.titre_emploi}
                </h2>
                <p className="text-md">
                    Chez{" "}
                    <span className="font-bold">
                        {selectedOffer.entreprise}
                    </span>
                </p>
            </div>
            <div className="pt-4 pl-4 pr-4">
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
                <p>
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
