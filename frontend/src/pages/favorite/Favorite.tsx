import OffersLayout from "@/components/OffersLayout/OffersLayout";


export default function Favorite() {
    return (
        <OffersLayout filters={{}} uri={"/v1/offres/favorite"} isSelection={true} />
    )
}
//vérifier selectedoffer  === offer.offre.id
// vérifier que le offre id est bien différent 