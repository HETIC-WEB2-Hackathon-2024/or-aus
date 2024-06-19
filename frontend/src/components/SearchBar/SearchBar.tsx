import {useState } from "react"
import { Button } from "@/components/ui/button"
import { AutoComplete } from "../../components/Autocompelte/Autocomplete"
import { IFilters } from "@/pages/offers/Offers"

interface SearchBarProps {
    setQueryFilters: React.Dispatch<React.SetStateAction<IFilters>>
}

export default function SearchBar({setQueryFilters}: SearchBarProps) {
    const [filters, setFilters] = useState<IFilters>({})
    return(
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
                <Button className="m-2" onClick={() => setQueryFilters(filters)}>Rechercher</Button>
        </div>
                       
    )
}