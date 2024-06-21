import { Badge } from "@/components/ui/badge";
import { IOffer } from "../../pages/offers/Offers";
import { X } from "lucide-react"
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { authenticatedPost } from "@/auth/helper";
import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "../ui/use-toast";

interface OfferDetailProps {
    selectedOffer: IOffer;
    handleClose: () => void;
}

export function OfferDetail({ selectedOffer, handleClose }: OfferDetailProps) {
    const { getAccessTokenSilently } = useAuth0();
    const { toast } = useToast()

    const apply = useMutation({
        mutationKey: ["offer_id", selectedOffer.id],
        mutationFn: async () => authenticatedPost(await getAccessTokenSilently(), `v1/users/offres?offre_id=${selectedOffer.id}`, {}),
        onSuccess(data) {
            toast({
                title: data.message || data.error,
                description: data.error ? "Soyons patient." : "Puisse le sort vous être favorable !",
            })
        },
        onError(error) {
            toast({
                title: error.message,
                description: "Veuillez nous excuser.",
            })
        }
    })

    return (
        <>
            <div className="border-b py-6 px-6 flex flex-col justify-between items-start w-full">
                <div className="flex justify-between w-full">
                    <h2 className="text-2xl font-bold basis-4/5">
                        {selectedOffer.titre_emploi}
                    </h2>
                    <div className="flex flex-col gap-2 items-end">
                        < X onClick={handleClose} className="lg:hidden  basis-1/5"/>
                        <Button onClick={() => apply.mutate()}>Postuler</Button>
                    </div>
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
