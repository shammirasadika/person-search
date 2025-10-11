"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Calendar component disabled due to React 19 compatibility with react-day-picker
// This component is not currently used in the Person Search application
export type CalendarProps = {
  className?: string
  [key: string]: any
}

function Calendar({ className, ...props }: CalendarProps) {
  return (
    <div className={cn("p-3 text-center", className)}>
      <p className="text-sm text-muted-foreground">
        Calendar component temporarily unavailable.
        <br />
        Waiting for React 19 compatibility update.
      </p>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
