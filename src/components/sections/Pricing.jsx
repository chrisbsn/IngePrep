import { Link } from "react-router-dom"
import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Reveal from "../ui/Reveal"
import "./Pricing.css"

const INCLUDED = [
  "Accès unique à la plateforme jusqu'à ton examen",
  "Corrections IA illimitées sur les exercices types ESA",
  "Diagnostics détaillés par mécanisme d'erreur",
  "Suivi de ta progression sur tes points faibles",
  "Garantie satisfait ou remboursé pendant 14 jours",
]

export default function Pricing() {
  return (
    <section className="pricing" id="tarif">
      <Container>
        <SectionTitle
          align="center"
          eyebrow="Tarif"
          title="Un accès unique, pensé pour un budget d'étudiant"
          description="Un seul paiement, pas d'abonnement. Et si la méthode ne te convient pas, tu es remboursé — sans justification."
        />

        <Reveal className="pricing__card">
          <span className="pricing__badge">Mode test — aucun montant réel débité</span>
          <div className="pricing__price">
            <span className="pricing__price-anchor" aria-hidden="true">129 €</span>
            <span className="pricing__price-value">79 €</span>
            <span className="pricing__price-note">
              Prix de lancement pour les 100 premiers utilisateurs — 129 € ensuite
            </span>
          </div>

          <div className="pricing__comparaison">
            <p className="pricing__comparaison-titre">
              Le prix d'une heure de cours particulier, pour toute ta préparation
            </p>
            <p className="pricing__comparaison-texte">
              Un cours particulier chez un ingénieur diplômé coûte entre 50 € et 80 € de l'heure.
              Une année complète chez Student Academy dépasse 700 €. IngePrep, c'est un accès
              illimité jusqu'à ton examen pour 79 €.
            </p>
          </div>

          <ul className="pricing__included">
            {INCLUDED.map((item) => (
              <li key={item}>
                <span className="pricing__check" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <Link to="/inscription" className="btn btn--primary btn--md pricing__cta">
            Obtenir mon accès — 79 €
          </Link>
          <p className="pricing__note">
            Paiement sécurisé par Stripe. Carte bancaire et Bancontact acceptés.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
