import { useMemo, useState } from "react"
import { annales, annaleLabel } from "../data/annales"
import "./AnnalesESA.css"

const FILTERS = [
  { id: "toutes", label: "Toutes" },
  { id: "juillet", label: "Juillet" },
  { id: "septembre", label: "Septembre" },
]

// Vue annales dans la coquille : l'utilisateur est connecté, donc l'intégralité
// du corpus (34 PDF) est accessible, sans bloc verrouillé.
export default function AnnalesApp() {
  const [filter, setFilter] = useState("toutes")

  const visible = useMemo(() => {
    if (filter === "toutes") return annales
    return annales.filter((annale) => annale.session === filter)
  }, [filter])

  return (
    <main className="annales-page annales-page--dans-coquille">
      <h1 className="annales-page__titre">Toutes les annales de l'ESA</h1>
      <p className="annales-page__intro">
        Les 34 sujets officiels de l'examen spécial d'admission, de 2009 à 2025, sessions de
        juillet et de septembre, au format PDF d'origine.
      </p>

      <div className="annales-page__filters" role="group" aria-label="Filtrer par session">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`annales-page__filter ${
              filter === item.id ? "annales-page__filter--active" : ""
            }`}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <ul className="annales-page__grid">
        {visible.map((annale) => (
          <li key={annale.file}>
            <a
              className="annales-page__card"
              href={annale.file}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="annales-page__card-icon" aria-hidden="true">PDF</span>
              <span className="annales-page__card-label">{annaleLabel(annale)}</span>
              <span className="annales-page__card-action">Ouvrir le sujet →</span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
