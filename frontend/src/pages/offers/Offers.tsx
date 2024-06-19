import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import OffersLayout from "@/components/OffersLayout/OffersLayout";
import SearchBar from "@/components/SearchBar/SearchBar";

export interface IOffer {
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

export interface IFilters {
    search?: string;
    city_or_department?: string;
    type_de_contrat?: string;
    secteur_id?: number;
    period_start?: string;
    period_end?: string;
}

export default function Offers() {
    const [periodOpen, setPeriodOpen] = useState(false)
    const [contractTypeOpen, setContractTypeOpen] = useState(false)
    const [sectorOpen, setSectorOpen] = useState(false)
    const [queryFilters, setQueryFilters] = useState<IFilters>({})


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
                    <OffersLayout children={<SearchBar setQueryFilters={setQueryFilters} />} uri="/v1/offres" filters={queryFilters}/>
                </div>
            </div>
        </div>
    )
}