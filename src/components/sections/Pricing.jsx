import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Button from "../ui/Button"
import "./Pricing.css"

const INCLUDED = [
  "Accès unique à la plateforme jusqu'à ton examen",
  "Corrections IA illimitées sur les exercices types ESA",
  "Diagnostics détaillés par mécanisme d'erreur",
  "Suivi de ta progression sur tes points faibles",
]

export default function Pricing() {
  return (
    <section className="pricing" id="tarif">
      <Container>
        <SectionTitle
          align="center"
          eyebrow="Tarif"
          title="Un accès unique, pensé pour un budget d'étudiant"
          description="Le prix définitif sera communiqué avant le lancement. Les inscrits à la liste d'attente seront informés en priorité et bénéficieront d'un tarif de lancement préférentiel."
        />

        <div className="pricing__card">
          <div className="pricing__price">
            <span className="pricing__price-value">Prix à venir</span>
            <span className="pricing__price-note">Communiqué avant septembre 2026</span>
          </div>
          <ul className="pricing__included">
            {INCLUDED.map((item) => (
              <li key={item}>
                <span className="pricing__check" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <Button href="#waitlist" size="md" className="pricing__cta">
            Être informé·e du tarif de lancement
          </Button>
        </div>
      </Container>
    </section>
  )
}
