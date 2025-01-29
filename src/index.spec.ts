import { describe, expect, test } from "bun:test"

import { ehDiaUtil } from "@/index"

describe("É dia útil?", () => {
    test("Dado uma data inválida, o resultado esperado é false", () => {
        expect(ehDiaUtil("8787-52-67")).toEqual(false)
    })
})

describe("É dia útil? (Não considerando o estado)", () => {
    var tests = [
        { date: "2017-09-11", description: "uma Segunda", expected: true },
        { date: "2017-09-12", description: "uma Terça", expected: true },
        { date: "2017-09-13", description: "uma Quarta", expected: true },
        { date: "2017-09-14", description: "uma Quinta", expected: true },
        { date: "2017-09-15", description: "uma Sexta", expected: true },
        { date: "2017-09-09", description: "um Sábado", expected: false },
        { date: "2017-05-13", description: "um Sábado", expected: false },
        { date: "2022-09-10", description: "um Sábado", expected: false },
        { date: "2017-09-30", description: "um Sábado", expected: false },
        { date: "2017-10-01", description: "um Domingo", expected: false },
        { date: "2017-09-10", description: "um Domingo", expected: false },
        { date: "2017-05-06", description: "um Domingo", expected: false },
        { date: "2017-01-07", description: "um Domingo", expected: false },
        { date: "2015-12-25", description: "Natal", expected: false },
        { date: "1988-12-25", description: "Natal", expected: false },
        { date: "2018-12-25", description: "Natal", expected: false },
        { date: "2019-11-15", description: "Proclamação da República", expected: false },
        { date: "2020-11-15", description: "Proclamação da República", expected: false },
        { date: "2050-11-15", description: "Proclamação da República", expected: false },
        { date: "1990-11-15", description: "Proclamação da República", expected: false },
        { date: "2017-11-02", description: "Dia de Finados", expected: false },
        { date: "1990-11-02", description: "Dia de Finados", expected: false },
        { date: "2017-10-12", description: "Dia de Nossa Senhora Aparecida", expected: false },
        { date: "2016-10-12", description: "Dia de Nossa Senhora Aparecida", expected: false },
        { date: "1980-10-12", description: "Dia de Nossa Senhora Aparecida", expected: false },
        { date: "1988-10-12", description: "Dia de Nossa Senhora Aparecida", expected: false },
        { date: "2050-10-12", description: "Dia de Nossa Senhora Aparecida", expected: false },
        { date: "2023-10-12", description: "Dia de Nossa Senhora Aparecida", expected: false },
        { date: "1988-09-07", description: "Independência do Brasil", expected: false },
        { date: "2033-09-07", description: "Independência do Brasil", expected: false },
        { date: "2000-09-07", description: "Independência do Brasil", expected: false },
        { date: "2035-05-01", description: "Dia do Trabalho", expected: false },
        { date: "2000-05-01", description: "Dia do Trabalho", expected: false },
        { date: "2040-04-21", description: "Tiradentes", expected: false },
        { date: "2012-04-21", description: "Tiradentes", expected: false },
        { date: "2010-01-01", description: "Ano novo", expected: false },
        { date: "2001-01-01", description: "Ano novo", expected: false },
        { date: "2017-02-28", description: "Carnaval 2017", expected: false },
        { date: "2018-02-13", description: "Carnaval 2018", expected: false },
        { date: "2019-03-05", description: "Carnaval 2019", expected: false },
        {
            date: "2017-04-14",
            description: "Sexta-feira Santa 2017",
            expected: false,
        },
        {
            date: "2018-03-30",
            description: "Sexta-feira Santa 2018",
            expected: false,
        },
        {
            date: "2019-04-19",
            description: "Sexta-feira Santa 2019",
            expected: false,
        },
        { date: "2017-04-16", description: "Páscoa 2017", expected: false },
        { date: "2018-04-01", description: "Páscoa 2018", expected: false },
        { date: "2019-04-21", description: "Páscoa 2019", expected: false },
        {
            date: "2024-11-20",
            description: "Consciência Negra 2024",
            expected: false,
        },
    ]

    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date)).toEqual(item.expected)
        })
    })
})

// Implementações baseadas em https://pt.wikipedia.org/wiki/Feriados_no_Brasil

/*
  Por meio da lei estadual nº 2.247/2009, os feriados estaduais que caírem entre as terças e quintas-feiras
  são comemorados, por adiamento, nas sextas-feiras, à exceção do feriado alusivo ao aniversário do Acre.[25]
*/

describe("É dia útil no Acre?", () => {
    var tests = [
        {
            date: "2000-01-23",
            description: "Dia do evangélico - Lei Estadual nº 1.538/2004",
            expected: false,
        },
        {
            date: "2000-03-08",
            description: "Alusivo ao Dia Internacional da Mulher - Lei Estadual nº 1.411/2001",
            expected: false,
        },
        {
            date: "2000-06-15",
            description: "Aniversário do estado - Lei Estadual nº 14/1964",
            expected: false,
        },
        {
            date: "2000-09-05",
            description: "Dia da Amazônia - Lei Estadual nº 1.526/2004",
            expected: false,
        },
        {
            date: "2000-11-17",
            description: "Assinatura do Tratado de Petrópolis - Lei estadual nº 57/1965",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "AC")).toEqual(item.expected)
        })
    })
})

/*
  Caso o dia 11 de agosto e o 25 de novembro coincidirem com dias úteis da semana, os feriados e os eventos alusivos às datas são transferidos para o domingo subsequente. [63]
*/

describe("É dia útil em Santa Catarina?", () => {
    var tests = [
        {
            date: "2019-08-11",
            description:
                "Dia de Santa Catarina (criação da capitania, separando-se de São Paulo)",
            expected: false,
        },
        {
            date: "2020-08-11",
            description:
                "Dia de Santa Catarina (criação da capitania, separando-se de São Paulo)",
            expected: false,
        },
        {
            date: "2021-08-11",
            description:
                "Dia de Santa Catarina (criação da capitania, separando-se de São Paulo)",
            expected: false,
        },
        {
            date: "2015-11-25",
            description: "Dia de Santa Catarina de Alexandria",
            expected: false,
        },
        {
            date: "2016-11-25",
            description: "Dia de Santa Catarina de Alexandria",
            expected: false,
        },
        {
            date: "2017-11-25",
            description: "Dia de Santa Catarina de Alexandria",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "SC")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em São Paulo?", () => {
    var tests = [
        {
            date: "2000-07-09",
            description: "Revolução Constitucionalista de 1932 - Lei estadual nº 9.497/1997",
            expected: false,
        },
        {
            date: "2013-07-09",
            description: "Revolução Constitucionalista de 1932 - Lei estadual nº 9.497/1997",
            expected: false,
        },
        {
            date: "2018-07-09",
            description: "Revolução Constitucionalista de 1932 - Lei estadual nº 9.497/1997",
            expected: false,
        },
        {
            date: "2025-07-09",
            description: "Revolução Constitucionalista de 1932 - Lei estadual nº 9.497/1997",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "SP")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em Sergipe?", () => {
    var tests = [
        {
            date: "2000-07-08",
            description: "Emancipação política de Sergipe - Art. 269 da Constituição estadual",
            expected: false,
        },
        {
            date: "2012-07-08",
            description: "Emancipação política de Sergipe - Art. 269 da Constituição estadual",
            expected: false,
        },
        {
            date: "2019-07-08",
            description: "Emancipação política de Sergipe - Art. 269 da Constituição estadual",
            expected: false,
        },
        {
            date: "2022-07-08",
            description: "Emancipação política de Sergipe - Art. 269 da Constituição estadual",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "SE")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em Tocantins?", () => {
    var tests = [
        {
            date: "2001-10-05",
            description: "Criação do estado - Lei estadual nº 98/1989",
            expected: false,
        },
        {
            date: "2040-10-05",
            description: "Criação do estado - Lei estadual nº 98/1989",
            expected: false,
        },
        {
            date: "2045-10-05",
            description: "Criação do estado - Lei estadual nº 98/1989",
            expected: false,
        },
        {
            date: "2004-10-05",
            description: "Criação do estado - Lei estadual nº 98/1989",
            expected: false,
        },
        {
            date: "2005-10-05",
            description: "Criação do estado - Lei estadual nº 98/1989",
            expected: false,
        },
        {
            date: "2016-03-18",
            description:
                "Autonomia do Estado (criação da Comarca do Norte) - Lei estadual nº 960/1998",
            expected: false,
        },
        {
            date: "2027-03-18",
            description:
                "Autonomia do Estado (criação da Comarca do Norte) - Lei estadual nº 960/1998",
            expected: false,
        },
        {
            date: "2008-03-18",
            description:
                "Autonomia do Estado (criação da Comarca do Norte) - Lei estadual nº 960/1998",
            expected: false,
        },
        {
            date: "2009-03-18",
            description:
                "Autonomia do Estado (criação da Comarca do Norte) - Lei estadual nº 960/1998",
            expected: false,
        },
        {
            date: "2010-03-18",
            description:
                "Autonomia do Estado (criação da Comarca do Norte) - Lei estadual nº 960/1998",
            expected: false,
        },
        {
            date: "2011-09-08",
            description:
                "Padroeira do Estado (Nossa Senhora da Natividade) - Lei estadual nº 627/1993",
            expected: false,
        },
        {
            date: "2028-09-08",
            description:
                "Padroeira do Estado (Nossa Senhora da Natividade) - Lei estadual nº 627/1993",
            expected: false,
        },
        {
            date: "2020-09-08",
            description:
                "Padroeira do Estado (Nossa Senhora da Natividade) - Lei estadual nº 627/1993",
            expected: false,
        },
        {
            date: "2014-09-08",
            description:
                "Padroeira do Estado (Nossa Senhora da Natividade) - Lei estadual nº 627/1993",
            expected: false,
        },
        {
            date: "2015-09-08",
            description:
                "Padroeira do Estado (Nossa Senhora da Natividade) - Lei estadual nº 627/1993",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "TO")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em Roraima?", () => {
    var tests = [
        {
            date: "1988-10-05",
            description: "Criação do estado - Art. 9 da Constituição estadual",
            expected: false,
        },
        {
            date: "1995-10-05",
            description: "Criação do estado - Art. 9 da Constituição estadual",
            expected: false,
        },
        {
            date: "2000-10-05",
            description: "Criação do estado - Art. 9 da Constituição estadual",
            expected: false,
        },
        {
            date: "2007-10-05",
            description: "Criação do estado - Art. 9 da Constituição estadual",
            expected: false,
        },
        {
            date: "2019-10-05",
            description: "Criação do estado - Art. 9 da Constituição estadual",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "RR")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em Rondônia?", () => {
    var tests = [
        {
            date: "2019-01-04",
            description: "Criação do estado - Lei estadual nº 2291/2010",
            expected: false,
        },
        {
            date: "2020-01-04",
            description: "Criação do estado - Lei estadual nº 2291/2010",
            expected: false,
        },
        {
            date: "2021-01-04",
            description: "Criação do estado - Lei estadual nº 2291/2010",
            expected: false,
        },
        {
            date: "2022-01-04",
            description: "Criação do estado - Lei estadual nº 2291/2010",
            expected: false,
        },
        {
            date: "2023-01-04",
            description: "Criação do estado - Lei estadual nº 2291/2010",
            expected: false,
        },
        {
            date: "2025-06-18",
            description: "Dia do evangélico - Lei estadual nº 1.026/2001",
            expected: false,
        },
        {
            date: "2026-06-18",
            description: "Dia do evangélico - Lei estadual nº 1.026/2001",
            expected: false,
        },
        {
            date: "2027-06-18",
            description: "Dia do evangélico - Lei estadual nº 1.026/2001",
            expected: false,
        },
        {
            date: "2028-06-18",
            description: "Dia do evangélico - Lei estadual nº 1.026/2001",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "RO")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em Rio Grande do Sul?", () => {
    var tests = [
        {
            date: "1999-09-20",
            description:
                "Proclamação da República Rio-Grandense - Art. 6, parágrafo único da constituição estadual",
            expected: false,
        },
        {
            date: "2019-09-20",
            description:
                "Proclamação da República Rio-Grandense - Art. 6, parágrafo único da constituição estadual",
            expected: false,
        },
        {
            date: "2030-09-20",
            description:
                "Proclamação da República Rio-Grandense - Art. 6, parágrafo único da constituição estadual",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "RS")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em Rio Grande do Norte?", () => {
    var tests = [
        {
            date: "2019-10-03",
            description: "Mártires de Cunhaú e Uruaçu - Lei estadual nº 8.913/2006",
            expected: false,
        },
        {
            date: "2022-10-03",
            description: "Mártires de Cunhaú e Uruaçu - Lei estadual nº 8.913/2006",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "RN")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em Piauí?", () => {
    var tests = [
        {
            date: "2000-10-19",
            description: "Dia do Piauí - Lei estadual nº 176/1937",
            expected: false,
        },
        {
            date: "2002-10-19",
            description: "Dia do Piauí - Lei estadual nº 176/1937",
            expected: false,
        },
        {
            date: "2008-10-19",
            description: "Dia do Piauí - Lei estadual nº 176/1937",
            expected: false,
        },
        {
            date: "2019-10-19",
            description: "Dia do Piauí - Lei estadual nº 176/1937",
            expected: false,
        },
        {
            date: "2024-10-19",
            description: "Dia do Piauí - Lei estadual nº 176/1937",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "PI")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em Pernambuco?", () => {
    var tests = [
        {
            date: "2019-03-06",
            description: "Revolução Pernambucana de 1817 - Lei estadual nº 13.835/2009",
            expected: false,
        },
        {
            date: "2019-06-24",
            description: "Festa de São João (Festa Junina) - Feriado Estadual",
            expected: false,
        },
        {
            date: "2019-07-16",
            description:
                "Dia de Nossa Senhora do Carmo (Padroeira da Cidade do Recife) - Feriado religioso",
            expected: false,
        },
        {
            date: "2019-12-08",
            description:
                "Dia de Nossa Senhora da Conceição (santa de grande devoção pela população da cidade do Recife) - Feriado religioso",
            expected: false,
        },
        {
            date: "2020-12-08",
            description:
                "Dia de Nossa Senhora da Conceição (santa de grande devoção pela população da cidade do Recife) - Feriado religioso",
            expected: false,
        },
        {
            date: "2021-12-08",
            description:
                "Dia de Nossa Senhora da Conceição (santa de grande devoção pela população da cidade do Recife) - Feriado religioso",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "PE")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em Paraná?", () => {
    var tests = [
        {
            date: "1997-12-19",
            description: "Emancipação política do Paraná - Lei estadual nº 4.658/1962",
            expected: false,
        },
        {
            date: "2005-12-19",
            description: "Emancipação política do Paraná - Lei estadual nº 4.658/1962",
            expected: false,
        },
        {
            date: "2019-12-19",
            description: "Emancipação política do Paraná - Lei estadual nº 4.658/1962",
            expected: false,
        },
        {
            date: "2035-12-19",
            description: "Emancipação política do Paraná - Lei estadual nº 4.658/1962",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "PR")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em Paraíba?", () => {
    var tests = [
        {
            date: "2010-07-26",
            description:
                "Homenagem à memória do ex-presidente João Pessoa - Lei Estadual 3.489/67, Art. 2º",
            expected: false,
        },
        {
            date: "2012-07-26",
            description:
                "Homenagem à memória do ex-presidente João Pessoa - Lei Estadual 3.489/67, Art. 2º",
            expected: false,
        },
        {
            date: "2013-07-26",
            description:
                "Homenagem à memória do ex-presidente João Pessoa - Lei Estadual 3.489/67, Art. 2º",
            expected: false,
        },
        {
            date: "2016-07-26",
            description:
                "Homenagem à memória do ex-presidente João Pessoa - Lei Estadual 3.489/67, Art. 2º",
            expected: false,
        },
        {
            date: "2019-07-26",
            description:
                "Homenagem à memória do ex-presidente João Pessoa - Lei Estadual 3.489/67, Art. 2º",
            expected: false,
        },
        {
            date: "2019-08-05",
            description:
                "Fundação do Estado em 1585 e dia da sua padroeira, Nossa Senhora das Neves - Lei Estadual 3.489/1967",
            expected: false,
        },
        {
            date: "2020-08-05",
            description:
                "Fundação do Estado em 1585 e dia da sua padroeira, Nossa Senhora das Neves - Lei Estadual 3.489/1967",
            expected: false,
        },
        {
            date: "2022-08-05",
            description:
                "Fundação do Estado em 1585 e dia da sua padroeira, Nossa Senhora das Neves - Lei Estadual 3.489/1967",
            expected: false,
        },
        {
            date: "2026-08-05",
            description:
                "Fundação do Estado em 1585 e dia da sua padroeira, Nossa Senhora das Neves - Lei Estadual 3.489/1967",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "PB")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em Pará?", () => {
    var tests = [
        {
            date: "1996-08-15",
            description:
                "Adesão do Pará à independência do Brasil - Lei estadual nº 5.999/1996",
            expected: false,
        },
        {
            date: "2000-08-15",
            description:
                "Adesão do Pará à independência do Brasil - Lei estadual nº 5.999/1996",
            expected: false,
        },
        {
            date: "2001-08-15",
            description:
                "Adesão do Pará à independência do Brasil - Lei estadual nº 5.999/1996",
            expected: false,
        },
        {
            date: "2016-08-15",
            description:
                "Adesão do Pará à independência do Brasil - Lei estadual nº 5.999/1996",
            expected: false,
        },
        {
            date: "2022-08-15",
            description:
                "Adesão do Pará à independência do Brasil - Lei estadual nº 5.999/1996",
            expected: false,
        },
        {
            date: "2027-08-15",
            description:
                "Adesão do Pará à independência do Brasil - Lei estadual nº 5.999/1996",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "PA")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em Minas Gerais?", () => {
    var tests = [
        {
            date: "2002-04-21",
            description:
                "Data magna do estado - Art. 256 da constituição estadual[43]; coincide com o feriado nacional de Tiradentes",
            expected: false,
        },
        {
            date: "2019-04-21",
            description:
                "Data magna do estado - Art. 256 da constituição estadual[43]; coincide com o feriado nacional de Tiradentes",
            expected: false,
        },
        {
            date: "2040-04-21",
            description:
                "Data magna do estado - Art. 256 da constituição estadual[43]; coincide com o feriado nacional de Tiradentes",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "MG")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em Mato Grosso do Sul?", () => {
    var tests = [
        {
            date: "2019-10-11",
            description: "Criação do estado - Lei estadual nº 10/1979",
            expected: false,
        },
        {
            date: "2020-10-11",
            description: "Criação do estado - Lei estadual nº 10/1979",
            expected: false,
        },
        {
            date: "2022-10-11",
            description: "Criação do estado - Lei estadual nº 10/1979",
            expected: false,
        },
        {
            date: "2027-10-11",
            description: "Criação do estado - Lei estadual nº 10/1979",
            expected: false,
        },
        {
            date: "2034-10-11",
            description: "Criação do estado - Lei estadual nº 10/1979",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "MS")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em Mato Grosso?", () => {
    var tests = [
        {
            date: "2019-11-20",
            description: "Dia da Consciência Negra - Lei estadual nº 7.879/2002",
            expected: false,
        },
        {
            date: "2023-11-20",
            description: "Dia da Consciência Negra - Lei estadual nº 7.879/2002",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "MT")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em Maranhão?", () => {
    var tests = [
        {
            date: "2019-07-28",
            description:
                "Adesão do Maranhão à independência do Brasil - Lei estadual nº 2.457/1964",
            expected: false,
        },
        {
            date: "2020-07-28",
            description:
                "Adesão do Maranhão à independência do Brasil - Lei estadual nº 2.457/1964",
            expected: false,
        },
        {
            date: "2021-07-28",
            description:
                "Adesão do Maranhão à independência do Brasil - Lei estadual nº 2.457/1964",
            expected: false,
        },
        {
            date: "2022-07-28",
            description:
                "Adesão do Maranhão à independência do Brasil - Lei estadual nº 2.457/1964",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "MA")).toEqual(item.expected)
        })
    })
})

describe("É dia útil em Espírito Santo?", () => {
    test("Espírito Santo não tem feriado estadual <3", () => {})
})

describe("É dia útil em Alagoas?", () => {
    var tests = [
        {
            date: "2019-06-24",
            description: "São João - Lei estadual nº 5.508/1993",
            expected: false,
        },
        {
            date: "2020-06-24",
            description: "São João - Lei estadual nº 5.508/1993",
            expected: false,
        },
        {
            date: "2021-06-24",
            description: "São João - Lei estadual nº 5.508/1993",
            expected: false,
        },
        {
            date: "2022-06-29",
            description: "São Pedro - Lei estadual nº 5.509/1993",
            expected: false,
        },
        {
            date: "2023-06-29",
            description: "São Pedro - Lei estadual nº 5.509/1993",
            expected: false,
        },
        {
            date: "2024-06-29",
            description: "São Pedro - Lei estadual nº 5.509/1993",
            expected: false,
        },
        {
            date: "2025-09-16",
            description: "Emancipação política",
            expected: false,
        },
        {
            date: "2026-09-16",
            description: "Emancipação política",
            expected: false,
        },
        {
            date: "2027-09-16",
            description: "Emancipação política",
            expected: false,
        },
        {
            date: "2028-11-20",
            description: "Morte de Zumbi dos Palmares - Lei estadual nº 5.724/1995",
            expected: false,
        },
        {
            date: "2029-11-20",
            description: "Morte de Zumbi dos Palmares - Lei estadual nº 5.724/1995",
            expected: false,
        },
        {
            date: "2030-11-20",
            description: "Morte de Zumbi dos Palmares - Lei estadual nº 5.724/1995",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "AL")).toEqual(item.expected)
        })
    })
})

describe("É dia útil no Distrito Federal?", () => {
    var tests = [
        {
            date: "2019-04-21",
            description:
                "Fundação de Brasília - Coincide com o feriado nacional de Tiradentes",
            expected: false,
        },
        {
            date: "2019-11-30",
            description: "Dia do evangélico - Lei distrital nº 963/1995",
            expected: false,
        },
        {
            date: "2020-11-30",
            description: "Dia do evangélico - Lei distrital nº 963/1995",
            expected: false,
        },
        {
            date: "2021-11-30",
            description: "Dia do evangélico - Lei distrital nº 963/1995",
            expected: false,
        },
        {
            date: "2022-11-30",
            description: "Dia do evangélico - Lei distrital nº 963/1995",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "DF")).toEqual(item.expected)
        })
    })
})

describe("É dia útil no Ceará?", () => {
    var tests = [
        {
            date: "2019-03-19",
            description: "Dia de São José (Padroeiro do Ceará) - Lei Federal nº 9.093/1995",
            expected: false,
        },
        {
            date: "2019-03-25",
            description:
                "Data magna do estado (data da abolição da escravidão no Ceará) - Art. 18, parágrafo único da constituição estadual",
            expected: false,
        },
        {
            date: "2019-08-15",
            description:
                "Dia de Nossa Senhora da Assunção (Padroeira de Fortaleza) - Lei Federal nº 9.093/1995",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "CE")).toEqual(item.expected)
        })
    })
})

describe("É dia útil na Bahia?", () => {
    var tests = [
        {
            date: "2002-07-02",
            description:
                "Independência da Bahia (Data magna do estado) - Art. 6º, § 3º da Constituição estadual",
            expected: false,
        },
        {
            date: "2003-07-02",
            description:
                "Independência da Bahia (Data magna do estado) - Art. 6º, § 3º da Constituição estadual",
            expected: false,
        },
        {
            date: "2010-07-02",
            description:
                "Independência da Bahia (Data magna do estado) - Art. 6º, § 3º da Constituição estadual",
            expected: false,
        },
        {
            date: "2015-07-02",
            description:
                "Independência da Bahia (Data magna do estado) - Art. 6º, § 3º da Constituição estadual",
            expected: false,
        },
        {
            date: "2020-07-02",
            description:
                "Independência da Bahia (Data magna do estado) - Art. 6º, § 3º da Constituição estadual",
            expected: false,
        },
        {
            date: "2025-07-02",
            description:
                "Independência da Bahia (Data magna do estado) - Art. 6º, § 3º da Constituição estadual",
            expected: false,
        },
        {
            date: "2030-07-02",
            description:
                "Independência da Bahia (Data magna do estado) - Art. 6º, § 3º da Constituição estadual",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "BA")).toEqual(item.expected)
        })
    })
})

describe("É dia útil no Amazonas?", () => {
    var tests = [
        {
            date: "2019-09-05",
            description:
                "Elevação do Amazonas à categoria de província - Lei estadual nº 25/1977",
            expected: false,
        },
        {
            date: "2019-11-20",
            description: "Dia da Consciência Negra - Lei estadual nº 84/2010",
            expected: false,
        },
        {
            date: "2019-12-08",
            description: "Nossa Senhora da Conceição",
            expected: false,
        },
        {
            date: "2020-12-08",
            description: "Nossa Senhora da Conceição",
            expected: false,
        },
        {
            date: "2021-12-08",
            description: "Nossa Senhora da Conceição",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "AM")).toEqual(item.expected)
        })
    })
})

describe("É dia útil no Amapá?", () => {
    var tests = [
        {
            date: "2019-03-19",
            description:
                "Dia de São José, santo padroeiro do Amapá - Lei estadual nº 667, de 16 de abril de 2002",
            expected: false,
        },
        {
            date: "2019-09-13",
            description:
                "Criação do Território Federal (Data Magna do estado) - Art. 335 da Constituição estadual",
            expected: false,
        },
    ]
    tests.forEach((item) => {
        test(`${format(item.date)} - ${item.description}`, () => {
            expect(ehDiaUtil(item.date, "AP")).toEqual(item.expected)
        })
    })
})

function format(date: Date | string) {
    return new Date(date).toLocaleString("pt-BR", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    })
}
