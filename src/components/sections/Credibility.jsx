import { Link } from "react-router-dom"
import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Reveal from "../ui/Reveal"
import { annalesRecentes, annaleLabel } from "../../data/annales"
import { useCompteSimule } from "../../hooks/useCompteSimule"
import "./Credibility.css"

// Aperçu libre : les sessions les plus récentes (2023-2025). Les années
// antérieures sont accessibles via /annales, derrière la création de compte.
const APERCU = annalesRecentes

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
  const { connecte } = useCompteSimule()

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
                Les sujets officiels de l'examen spécial d'admission, au format PDF d'origine.
                Entraîne-toi sur les vrais énoncés, pas sur des reconstitutions.
              </p>
            </div>
          </div>

          <ul className="credibility__grid">
            {APERCU.map((annale) => (
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

          <div className="credibility__voir-tout">
            {connecte ? (
              <Link to="/annales" className="credibility__voir-tout-lien">
                Voir toutes les annales (2009–2025) →
              </Link>
            ) : (
              <Link to="/connexion" className="credibility__voir-tout-lien">
                Voir toutes les années précédentes →
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
