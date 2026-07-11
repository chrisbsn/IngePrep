import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Reveal from "../ui/Reveal"
import "./Problem.css"

const POINTS = [
  {
    title: "Les corrections statiques s'arrêtent au résultat",
    description:
      "Des milliers de corrections types existent déjà. Elles te montrent la bonne méthode, mais ne te disent jamais à quelle étape précise TA copie a dérapé.",
  },
  {
    title: "Les prépas classiques corrigent en masse",
    description:
      "Avec des dizaines d'élèves par session, le feedback individualisé sur le raisonnement est rare — on te donne une note, rarement un diagnostic.",
  },
  {
    title: "Tu répètes les mêmes erreurs sans le savoir",
    description:
      "Sans comprendre le mécanisme d'erreur, tu t'entraînes sur les mauvais exercices et tu répètes le même type de faute d'un test à l'autre.",
  },
]

export default function Problem() {
  return (
    <section className="problem" id="probleme">
      <Container>
        <SectionTitle
          eyebrow="Le problème"
          title="Savoir que tu t'es trompé ne suffit pas à progresser"
          description="La plupart des outils de préparation valident une réponse. Peu t'expliquent pourquoi ton raisonnement a cassé — et c'est pourtant l'information qui change vraiment ta progression."
        />
        <div className="problem__grid">
          {POINTS.map((point, index) => (
            <Reveal as="div" className="problem__card" delay={index * 100} key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
