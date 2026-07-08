import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import WaitlistForm from "../waitlist/WaitlistForm"
import "./WaitlistSection.css"

export default function WaitlistSection() {
  return (
    <section className="waitlist" id="waitlist">
      <Container>
        <SectionTitle
          align="center"
          eyebrow="Liste d'attente"
          title="Sois prévenu·e dès l'ouverture, avant tout le monde"
          description="Laisse ton email pour recevoir l'annonce du lancement, le tarif préférentiel et un accès anticipé avant septembre 2026."
        />
        <WaitlistForm />
      </Container>
    </section>
  )
}
