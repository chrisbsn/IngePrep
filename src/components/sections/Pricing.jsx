import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Reveal from "../ui/Reveal"
import OffreCard from "../offre/OffreCard"
import "./Pricing.css"

export default function Pricing() {
  return (
    <section className="pricing" id="tarif">
      <Container>
        <SectionTitle
          align="center"
          eyebrow="Tarif"
          title="Un accès unique, pensé pour un budget d'étudiant"
          description="Un seul paiement, pas d'abonnement. Et si la méthode ne te convient pas, tu es remboursé, sans justification."
        />

        <Reveal className="pricing__card">
          <OffreCard />
        </Reveal>
      </Container>
    </section>
  )
}
