import { Button } from "@/components/ui/button"
import { AutoComplete } from "../../components/autocomplete/autocomplete"
import { OfferCard } from "../../components/card/offerCard"

interface OffersProps {
}


export default function Offers({}: OffersProps) {
    return(
        <div className="flex flex-row justify-between h-screen mt-5">
            <div className="basis-1/4 border-r">
                Test
            </div>
            <div className="basis-3/4">
                <div className="border-b py-3 pl-3">
                    <h2 className="text-2xl font-bold">Trouver le job qu'il vous faut</h2>
                </div>
                <div className="flex h-full">
                    <div className="basis-1/2 border-r">
                        <div className="flex justify-between p-3 items-center">
                                <AutoComplete 
                                    variant="search" 
                                    placeholder={"Intitulé du poste"} 
                                    options={[]} 
                                    className="m-2"/>
                                <AutoComplete variant="pin" placeholder={"Ville, département"} options={[]} className="m-2"/>
                                <Button className="m-2">Rechercher</Button>
                        </div>
                        <div>
                        <OfferCard title={"title"} subtitle="subtitle" shortDescription={"description"} tags={["CDI"]}/>
                        </div>
                    </div>
                    <div className="basis-1/2">right</div>
                </div>
            </div>
        </div>
    )
}