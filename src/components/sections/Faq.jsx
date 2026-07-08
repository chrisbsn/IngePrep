import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Accordion from "../ui/Accordion"
import { faqItems } from "../../data/faq"
import "./Faq.css"

export default function Faq() {
  return (
    <section className="faq" id="faq">
      <Container className="faq__inner">
        <SectionTitle eyebrow="Questions fréquentes" title="Ce que tu te demandes probablement" />
        <Accordion items={faqItems} />
      </Container>
    </section>
  )
}
