import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Reveal from "../ui/Reveal"
import "./Problem.css"

const POINTS = [
  {
    title: "Erreur de méthode ?",
    description:
      "Tu as peut-être choisi la mauvaise approche dès le départ. Le corrigé statique montre la bonne méthode, mais ne te dit jamais à quelle étape précise TA démarche a dérapé.",
  },
  {
    title: "Erreur de calcul ?",
    description:
      "Ou bien ton raisonnement était juste et une seule manipulation a tout fait basculer. Sans diagnostic, tu ne sauras pas que le problème n'était pas ta compréhension.",
  },
  {
    title: "Erreur de concept ?",
    description:
      "Ou encore, tu appliques une formule sans avoir vraiment saisi la notion derrière. C'est l'erreur la plus coûteuse, et celle qu'aucun corrigé type ne détecte.",
  },
]

export default function Problem() {
  return (
    <section className="problem" id="probleme">
      <Container>
        <SectionTitle
          eyebrow="Le problème"
          title="Tu refais un exercice, tu compares au corrigé, ta réponse est fausse. Et maintenant ?"
          description="Le corrigé statique te montre que tu t'es trompé, jamais pourquoi. Tant que tu ne sais pas si c'est la méthode, le calcul ou le concept qui a lâché, tu retravailles au hasard et tu répètes la même faute d'un examen blanc à l'autre."
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
