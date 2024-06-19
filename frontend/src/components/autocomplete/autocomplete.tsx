import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandInputPin
} from "@/components/ui/command"

interface AutoCompleteProps {
  placeholder?: string;
  options?: string[];
  variant: "search" | "pin";
  className?: string;
  onChange: (value: string) => void;
}

export function AutoComplete({placeholder, options, variant, className, onChange}: AutoCompleteProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }
 
  return (
    <div className={className}>
      <Command className="rounded-lg border truncate" onChange={handleChange}>
        {variant == "search" && <CommandInput placeholder={placeholder} className="truncate"/>}
        {variant == "pin" && <CommandInputPin placeholder={placeholder} className="truncate"/>} 
        {options && <CommandList>
          {
            options.map((option, index) => {
              return <CommandItem key={`${option}-${index}`}>{option}</CommandItem>
            })
          }
        </CommandList>}
      </Command>

    </div>
  )
}
