export function getNationalHolidays(year: number) {
    const easterDate = calculateEaster(year)
    const corpusChristiDate = calculateCorpusChristi(easterDate)
    const carnivalDate = calculateCarnival(easterDate)
    const goodFridayDate = calculateGodsFriday(easterDate)

    return [
        easterDate,
        corpusChristiDate,
        carnivalDate,
        goodFridayDate,
        new Date(`${year}-01-01`),
        new Date(`${year}-04-21`),
        new Date(`${year}-05-01`),
        new Date(`${year}-09-07`),
        new Date(`${year}-10-12`),
        new Date(`${year}-11-02`),
        new Date(`${year}-11-15`),
        new Date(`${year}-12-25`),
        new Date(`${year}-11-20`),
    ]
}

export function isNationalHoliday(date: Date) {
    const nationalHolidays = getNationalHolidays(date.getFullYear())
    for (const holiday of nationalHolidays) {
        if (holiday.getMonth() === date.getMonth() && holiday.getDate() === date.getDate()) {
            return true
        }
    }
    return false
}

function calculateEaster(year: number) {
    const C = Math.floor(year / 100)
    const N = year - 19 * Math.floor(year / 19)
    const K = Math.floor((C - 17) / 25)
    let I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15
    I = I - 30 * Math.floor(I / 30)
    I =
        I -
        Math.floor(I / 28) *
            (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11))
    let J = year + Math.floor(year / 4) + I + 2 - C + Math.floor(C / 4)
    J = J - 7 * Math.floor(J / 7)
    const L = I - J
    const M = 3 + Math.floor((L + 40) / 44)
    const D = L + 28 - 31 * Math.floor(M / 4)
    const month = M < 10 ? "0" + M : M
    const day = D < 10 ? "0" + D : D
    const easterDate = year + "-" + month + "-" + day
    return new Date(easterDate)
}

function calculateCorpusChristi(easterDate: Date) {
    return new Date(easterDate.getFullYear(), easterDate.getMonth(), easterDate.getDate() + 60)
}

function calculateCarnival(easterDate: Date) {
    return new Date(easterDate.getFullYear(), easterDate.getMonth(), easterDate.getDate() - 47)
}

function calculateGodsFriday(easterDate: Date) {
    return new Date(easterDate.getFullYear(), easterDate.getMonth(), easterDate.getDate() - 2)
}
