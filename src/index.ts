import moment, { type Moment } from "moment"

import { isNationalHoliday } from "@/getNationalHolidays"
import { isStateHoliday } from "@/getStateHolidays"

export function ehDiaUtil(date: Date | string, uf?: string) {
    const givenDate = moment(date)
    if (!givenDate.isValid()) {
        return false
    }

    if (ehFinalDeSemana(givenDate)) {
        return false
    }

    if (ehFeriado(date, uf)) {
        return false
    }

    return true
}

export function ehFinalDeSemana(givenDate: Moment) {
    const dayOfWeek = givenDate.day()
    const isWeekend = dayOfWeek === 6 || dayOfWeek === 0
    return isWeekend
}

export function ehFeriado(date: Date | string, uf?: string) {
    const givenDate = moment(date)
    if (!givenDate.isValid()) {
        return false
    }
    if (isNationalHoliday(givenDate) || isStateHoliday(givenDate, uf)) {
        return true
    }
    return false
}
