import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandInputPin
} from "@/components/ui/command"
import { useState } from "react";

interface AutoCompleteProps {
  placeholder?: string;
  options?: string[];
  variant: "search" | "pin";
  className?: string;
  onChange?: (value: string) => void;
  onSelection?: (value: string) => void;
}

export function AutoComplete({placeholder, options, variant, className, onChange, onSelection}: AutoCompleteProps) {
  const [value, setValue] = useState("")
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    if (onChange) onChange(event.target.value)
  }

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue)
    if (onSelection) onSelection(currentValue)
  }

  return (
    <div className={className}>
      <Command className="rounded-lg border truncate" onChange={handleChange} >
        {variant == "search" && <CommandInput placeholder={placeholder} className="truncate" value={value}/>}
        {variant == "pin" && <CommandInputPin placeholder={placeholder} className="truncate"/>} 
        {options && <CommandList>
          {
            options.map((option, index) => {
              return <CommandItem key={`${option}-${index}`} value={option} onSelect={(currentValue) => {
                handleSelect(currentValue)
              }}>{option}</CommandItem>
            })
          }
        </CommandList>}
      </Command>

    </div>
  )
}
