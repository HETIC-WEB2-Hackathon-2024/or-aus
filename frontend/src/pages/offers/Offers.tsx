import { Button } from "@/components/ui/button"
import { AutoComplete } from "../../components/autocomplete/autocomplete"

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
                        <div className="flex">
                            <AutoComplete variant="search" options={[]}/>
                            <AutoComplete variant="pin" options={[]}/>
                            <Button />
                        </div>
                        left
                    </div>
                    <div className="basis-1/2">right</div>
                </div>
            </div>
        </div>
    )
}