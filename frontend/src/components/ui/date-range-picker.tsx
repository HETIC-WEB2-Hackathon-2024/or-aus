"use client"

import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};
interface DatePickerWithRangeProps {
  className: string;
  date: DateRange | undefined;
  setDate: SelectRangeEventHandler
}

type SelectRangeEventHandler = (
  /** The current range of the selected days. */
  range: DateRange | undefined, 
  /** The day that was selected (or clicked) triggering the event. */
  selectedDay: Date, 
  /** The modifiers of the selected day. */
  activeModifiers: ActiveModifiers, e: React.MouseEvent) => void;

type ActiveModifiers = Record<string, true> & Partial<Record<InternalModifier, true>>;

declare enum InternalModifier {
  Outside = "outside",
  /** Name of the modifier applied to the disabled days, using the `disabled` prop. */
  Disabled = "disabled",
  /** Name of the modifier applied to the selected days using the `selected` prop). */
  Selected = "selected",
  /** Name of the modifier applied to the hidden days using the `hidden` prop). */
  Hidden = "hidden",
  /** Name of the modifier applied to the day specified using the `today` prop). */
  Today = "today",
  /** The modifier applied to the day starting a selected range, when in range selection mode.  */
  RangeStart = "range_start",
  /** The modifier applied to the day ending a selected range, when in range selection mode.  */
  RangeEnd = "range_end",
  /** The modifier applied to the days between the start and the end of a selected range, when in range selection mode.  */
  RangeMiddle = "range_middle"
}

export function DatePickerWithRange({
  className, date, setDate
}: DatePickerWithRangeProps) {

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
