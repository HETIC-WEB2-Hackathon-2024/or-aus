import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import OffersLayout from "@/components/OffersLayout/OffersLayout";
import SearchBar from "@/components/SearchBar/SearchBar";
import { authenticatedGet } from "./../../auth/helper";
import { useAuth0 } from "@auth0/auth0-react";
import { Checkbox } from "@/components/ui/checkbox";
import { AutoComplete } from "@/components/Autocompelte/Autocomplete";
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"

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
    type_contrat?: string[];
    secteur?: string;
    period_start?: string;
    period_end?: string;
}

export default function Offers() {
    const [periodOpen, setPeriodOpen] = useState(false)
    const [contractTypeOpen, setContractTypeOpen] = useState(false)
    const [sectorOpen, setSectorOpen] = useState(false)
    const [queryFilters, setQueryFilters] = useState<IFilters>({})
    const [contractTypes, setContractTypes] = useState<string[]>([])
    const [secteurOptions, setSecteurOptions] = useState<string[]>([])
    const { getAccessTokenSilently } = useAuth0();
    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
      })

    useEffect(() => {
        const periodStart = date?.from?.toISOString().split('T')[0]
        const periodEnd = date?.to?.toISOString().split('T')[0]
        if (periodStart && periodEnd) setQueryFilters({...queryFilters, period_start: periodStart, period_end: periodEnd})
    }, [date])

    const getContractTypes = useCallback(async () => {
        try {
            const token = await getAccessTokenSilently();
            const data = await authenticatedGet(token, "/v1/offres/contractTypes");
            setContractTypes(data)
        } catch (err) {
            console.log(err)
        } 
    }, [getAccessTokenSilently])

    const getSecteursOptions = useCallback(async () => {
        try {
            const token = await getAccessTokenSilently();
            const data = await authenticatedGet(token, "/v1/secteurs");
            setSecteurOptions(data)
        } catch (err) {
            console.log(err)
        } 
    }, [getAccessTokenSilently])

    useEffect(() => {
        getContractTypes()
        getSecteursOptions()
    }, [])

    const addContractTypeFilter = (e: React.FormEvent<HTMLButtonElement>) => {
        let filterArray: string[]
        if (queryFilters.type_contrat && queryFilters.type_contrat.length > 0) {
            filterArray = queryFilters.type_contrat
        } else {
            filterArray = []
        }
        filterArray.push(e.currentTarget.id)
        setQueryFilters({...queryFilters, type_contrat: filterArray})
    }

    return(
        <div className="flex flex-row justify-between h-screen mt-5">
            <div className="basis-1/5 border-r flex flex-col space-y-5 items-center pr-3 pl-3">
                <div className="py-4 pl-4 w-full">
                    <h2 className="text-2xl font-bold text-left">Filtres</h2>
                </div>
                <div className="w-full space-y-1">
                    <Button className="w-full" onClick={() => setContractTypeOpen(!contractTypeOpen)} variant={contractTypeOpen? "default" : "outline"}>Type de contrat</Button>
                    {contractTypeOpen && 
                        contractTypes.map((type) => {
                        return (<div key={type} className="flex items-center space-x-2 pl-1">
                            <Checkbox id={type} onClick={addContractTypeFilter} />
                            <label
                                htmlFor={type}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                {type}
                            </label>
                        </div>)})
                    }
                </div>
                <div className="w-full space-y-1">
                    <Button className="w-full" onClick={() => setSectorOpen(!sectorOpen)} variant={sectorOpen? "default" : "outline"}>Secteur</Button>
                    {sectorOpen && (
                        <div>
                            <AutoComplete options={secteurOptions} onSelection={(option) => setQueryFilters({...queryFilters, secteur: option})} variant="search" placeholder="Secteur d'activités"/>
                        </div>
                    )}
                </div>
                <div className="w-full space-y-1">
                    <Button className="w-full" onClick={() => setPeriodOpen(!periodOpen)} variant={periodOpen? "default" : "outline"}>Période</Button>
                    {periodOpen && (
                        <div className="w-full">
                            <DatePickerWithRange className="w-full" date={date} setDate={setDate}/>
                        </div>
                    )}
                </div>
            </div>
            <div className="basis-4/5">
                <div className="border-b py-4 pl-4">
                    <h2 className="text-2xl font-bold">Trouver le job qu'il vous faut</h2>
                </div>
                <div className="flex h-full">
                    <OffersLayout children={<SearchBar setQueryFilters={setQueryFilters} queryFilters={queryFilters}/>} uri="/v1/offres" filters={queryFilters}/>
                </div>
            </div>
        </div>
    )
}