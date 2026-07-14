import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Reveal from "../ui/Reveal"
import "./Esa.css"

function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4a2 2 0 0 1 2-2h6.5a2 2 0 0 1 2 2v16a2 2 0 0 0-2-2H2z" />
      <path d="M22 4a2 2 0 0 0-2-2h-6.5a2 2 0 0 0-2 2v16a2 2 0 0 1 2-2H22z" />
    </svg>
  )
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function IconBriefcase() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

const TUILES = [
  {
    titre: "Les 4 matières",
    corps:
      "Algèbre · Analyse · Géométrie · Trigonométrie. Programme de math 6h du secondaire supérieur. Équations polynomiales, dérivées, primitives, intégrales, coniques, vecteurs, équations trigonométriques.",
    Icon: IconBook,
    tone: "coral",
  },
  {
    titre: "Les 2 sessions",
    corps:
      "Mi-juillet et fin août. Deux tentatives par an. Un système de dispenses permet de ne représenter que les matières échouées en seconde session.",
    Icon: IconCalendar,
    tone: "mint",
  },
  {
    titre: "La condition",
    corps:
      "10/20 minimum dans chaque matière. Pas de compensation entre matières. Une seule matière ratée peut suffire à échouer, quelle que soit la moyenne générale.",
    Icon: IconTarget,
    tone: "coral",
  },
  {
    titre: "Les débouchés",
    corps:
      "Ingénieur civil. Filière en croissance de 127 % depuis 2010. Débouchés : construction, énergie, informatique, aérospatial, biomédical, finance quantitative. Pénurie structurelle de 500 ingénieurs/an en Belgique francophone.",
    Icon: IconBriefcase,
    tone: "mint",
  },
]

export default function Esa() {
  return (
    <section className="esa" id="esa">
      <Container>
        <SectionTitle
          eyebrow="L'examen"
          title="L'ESA, un verrou sélectif pour l'ingénierie"
          description="L'Examen Spécial d'Admission (ESA) est le passage obligé pour intégrer une école polytechnique en Belgique francophone. Aucun numerus clausus, mais des exigences techniques élevées : les universités organisent chaque année leur session sur un programme commun et harmonisé. Réussir demande une préparation ciblée sur les mécanismes de raisonnement, pas la simple mémorisation."
        />

        <div className="esa__grid">
          {TUILES.map((tuile, index) => (
            <Reveal as="div" className="esa__tile" delay={index * 100} key={tuile.titre}>
              <span className={`esa__tile-icon esa__tile-icon--${tuile.tone}`}>
                <tuile.Icon />
              </span>
              <h3>{tuile.titre}</h3>
              <p>{tuile.corps}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
