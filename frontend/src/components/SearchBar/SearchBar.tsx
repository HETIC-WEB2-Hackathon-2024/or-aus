import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AutoComplete } from "../../components/Autocompelte/Autocomplete";
import { IFilters } from "@/pages/offers/Offers";

interface SearchBarProps {
    setQueryFilters: React.Dispatch<React.SetStateAction<IFilters>>;
    queryFilters: IFilters;
}

export default function SearchBar({
    queryFilters,
    setQueryFilters,
}: SearchBarProps) {
    const [filters, setFilters] = useState<IFilters>({});
        const changeFilters = (value: string, filter: "search" | "city_or_department") => {
        if (value === "") {
            const updatedFilters = filters
            const updatedQueryFilters = queryFilters
            delete updatedFilters[filter]
            delete updatedQueryFilters[filter]
            setFilters({...updatedFilters, ...updatedQueryFilters})
        } else {
            setFilters({...filters, ...queryFilters, [filter]: value})
        }
    }
    return (
        <div className="flex flex-col lg:flex-row justify-between p-3 items-center">
            <AutoComplete
                variant="search"
                placeholder={"Intitulé du poste"}
                options={[]}
                className="m-2 w-full"
                onChange={(value: string) => changeFilters(value, "search")}
            />
            <AutoComplete
                variant="pin"
                placeholder={"Ville, département"}
                options={[]}
                className="m-2 w-full"
                onChange={(value: string) => changeFilters(value, "city_or_department")}
            />
            <Button
                className="m-2 w-full"
                onClick={() => setQueryFilters({ ...queryFilters, ...filters })}
            >
                Rechercher
            </Button>
        </div>
    );
}
