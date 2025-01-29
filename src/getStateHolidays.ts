import type { Uf } from "./types"

export function getStateHolidays(year: number, uf?: Uf) {
    if (!uf) {
        return []
    }

    const holidaysByUf: Partial<Record<Uf, Date[]>> = {
        AC: [
            new Date(`${year}-01-23`),
            new Date(`${year}-03-08`),
            new Date(`${year}-06-15`),
            new Date(`${year}-09-05`),
            new Date(`${year}-11-17`),
        ],
        AL: [
            new Date(`${year}-06-24`),
            new Date(`${year}-06-29`),
            new Date(`${year}-09-16`),
            new Date(`${year}-11-20`),
        ],
        AM: [
            new Date(`${year}-09-05`),
            new Date(`${year}-11-20`),
            new Date(`${year}-12-08`),
            new Date(`${year}-03-19`),
        ],
        AP: [new Date(`${year}-03-19`), new Date(`${year}-09-13`)],
        BA: [new Date(`${year}-07-02`)],
        CE: [new Date(`${year}-03-19`), new Date(`${year}-03-25`), new Date(`${year}-08-15`)],
        DF: [new Date(`${year}-04-21`), new Date(`${year}-11-30`)],
        MA: [new Date(`${year}-07-28`)],
        MG: [new Date(`${year}-04-21`)],
        MS: [new Date(`${year}-10-11`)],
        MT: [new Date(`${year}-11-20`)],
        PA: [new Date(`${year}-08-15`)],
        PB: [new Date(`${year}-07-26`), new Date(`${year}-08-05`)],
        PE: [
            new Date(`${year}-03-06`),
            new Date(`${year}-06-24`),
            new Date(`${year}-07-16`),
            new Date(`${year}-12-08`),
        ],
        PI: [new Date(`${year}-10-19`)],
        PR: [new Date(`${year}-12-19`)],
        RN: [new Date(`${year}-10-03`)],
        RO: [new Date(`${year}-01-04`), new Date(`${year}-06-18`)],
        RR: [new Date(`${year}-10-05`)],
        RS: [new Date(`${year}-09-20`)],
        SC: [new Date(`${year}-08-11`), new Date(`${year}-11-25`)],
        SE: [new Date(`${year}-07-08`)],
        SP: [new Date(`${year}-07-09`)],
        TO: [new Date(`${year}-03-18`), new Date(`${year}-09-08`), new Date(`${year}-10-05`)],
    }
    return holidaysByUf[uf.toUpperCase() as Uf] ?? []
}

export function isStateHoliday(date: Date, uf?: Uf) {
    const stateHolidays = getStateHolidays(date.getFullYear(), uf)
    for (const holiday of stateHolidays) {
        if (holiday.getMonth() === date.getMonth() && holiday.getDate() === date.getDate()) {
            return true
        }
    }
    return false
}
