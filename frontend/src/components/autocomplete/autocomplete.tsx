import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandInputPin
} from "@/components/ui/command"

interface AutoCompleteProps {
  placeholder?: string;
  options: string[];
  variant: "search" | "pin";
  className?: string;
}

export function AutoComplete({placeholder, options, variant, className}: AutoCompleteProps) {

  return (
    <div className={className}>
      <Command className="rounded-lg border truncate">
        {variant == "search" && <CommandInput placeholder={placeholder} className="truncate"/>}
        {variant == "pin" && <CommandInputPin placeholder={placeholder} className="truncate"/>} 
        <CommandList>
            {/* <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem> */}
        </CommandList>
      </Command>

    </div>
  )
}
