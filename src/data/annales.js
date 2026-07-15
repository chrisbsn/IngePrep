// Banque d'annales ESA — PDF bruts des examens, tels que distribués.
// Chaque année comporte deux sessions : juillet et septembre.
const YEARS = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017,
  2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009,
]

export const annales = YEARS.flatMap((year) => [
  { year, session: "juillet", file: `/annales/esa-${year}-juillet.pdf` },
  { year, session: "septembre", file: `/annales/esa-${year}-septembre.pdf` },
])

// Les sessions à partir de cette année restent en libre accès (sans compte).
// Les années antérieures sont réservées aux utilisateurs connectés.
export const RECENT_YEAR_MIN = 2023
export const annalesRecentes = annales.filter((a) => a.year >= RECENT_YEAR_MIN)
export const annalesAnciennes = annales.filter((a) => a.year < RECENT_YEAR_MIN)

export function annaleLabel(annale) {
  return `ESA ${annale.year} — ${annale.session === "juillet" ? "Juillet" : "Septembre"}`
}
