import { useMemo, useState } from "react"
import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Reveal from "../ui/Reveal"
import { annales, annaleLabel } from "../../data/annales"
import "./Credibility.css"

const FILTERS = [
  { id: "toutes", label: "Toutes" },
  { id: "juillet", label: "Juillet" },
  { id: "septembre", label: "Septembre" },
]

const PROOFS = [
  {
    value: "379",
    label: "questions analysées",
    description:
      "Chaque question des annales est classée par matière et par fréquence d'apparition — on sait exactement ce qui tombe, et à quel rythme.",
  },
  {
    value: "16 ans",
    label: "d'annales couvertes",
    description:
      "Tous les examens de 2009 à 2025, sessions de juillet et de septembre incluses. Aucune sélection arbitraire : l'intégralité du corpus.",
  },
  {
    value: "4",
    label: "universités couvertes",
    description:
      "L'examen est commun à l'UCLouvain, l'ULB, l'ULiège et l'UMons. Nos méthodes de référence valent pour les quatre.",
  },
]

export default function Credibility() {
  const [filter, setFilter] = useState("toutes")

  const visible = useMemo(() => {
    if (filter === "toutes") return annales
    return annales.filter((annale) => annale.session === filter)
  }, [filter])

  return (
    <section className="credibility" id="methode">
      <Container>
        <SectionTitle
          eyebrow="La preuve"
          title="Une rigueur méthodologique, pas des promesses marketing"
          description="Le correcteur ne sort pas ses diagnostics de nulle part : chaque sous-question d'annale a une méthode de référence rédigée et validée, contre laquelle ta démarche est comparée étape par étape."
        />

        <div className="credibility__proofs">
          {PROOFS.map((proof, index) => (
            <Reveal as="div" className="credibility__proof" delay={index * 100} key={proof.label}>
              <span className="credibility__proof-value">{proof.value}</span>
              <span className="credibility__proof-label">{proof.label}</span>
              <p>{proof.description}</p>
            </Reveal>
          ))}
        </div>

        <div className="credibility__bank" id="annales">
          <div className="credibility__bank-head">
            <div>
              <h3>La banque d'annales — en libre accès</h3>
              <p>
                Les sujets officiels de l'examen spécial d'admission, de 2009 à 2025, sessions de
                juillet et de septembre, au format PDF d'origine. Entraîne-toi sur les vrais
                énoncés, pas sur des reconstitutions.
              </p>
            </div>
            <div className="credibility__filters" role="group" aria-label="Filtrer par session">
              {FILTERS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`credibility__filter ${filter === item.id ? "credibility__filter--active" : ""}`}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <ul className="credibility__grid">
            {visible.map((annale) => (
              <li key={annale.file}>
                <a
                  className="credibility__card"
                  href={annale.file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="credibility__card-icon" aria-hidden="true">PDF</span>
                  <span className="credibility__card-label">{annaleLabel(annale)}</span>
                  <span className="credibility__card-action">Ouvrir le sujet →</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
