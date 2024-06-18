import * as React from "react"

import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandInputPin
} from "@/components/ui/command"

interface AutoCompleteProps {
  placeholder?: string;
  options: string[]
  variant: "search" | "pin"
}

export function AutoComplete({placeholder, options, variant}: AutoCompleteProps) {

  return (
    <>
      <Command>
        {variant == "search" && <CommandInput placeholder={placeholder} />}
        {variant == "pin" && <CommandInputPin placeholder={placeholder} />} 
        <CommandList>
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
        </CommandList>
      </Command>

    </>
  )
}
