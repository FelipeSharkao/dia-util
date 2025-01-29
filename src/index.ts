import { isNationalHoliday } from "@/getNationalHolidays"
import { isStateHoliday } from "@/getStateHolidays"

import type { Uf } from "./types"

export function ehDiaUtil(date: Date | string, uf?: Uf): boolean {
    date = new Date(date)
    return !Number.isNaN(date.getTime()) && !ehFinalDeSemana(date) && !ehFeriado(date, uf)
}

export function ehFinalDeSemana(date: Date): boolean {
    const dayOfWeek = date.getDay()
    return dayOfWeek === 6 || dayOfWeek === 0
}

export function ehFeriado(date: Date | string, uf?: Uf): boolean {
    date = new Date(date)
    return (
        !Number.isNaN(date.getTime()) && (isNationalHoliday(date) || isStateHoliday(date, uf))
    )
}
