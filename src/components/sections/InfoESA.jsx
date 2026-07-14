import { Link } from "react-router-dom"
import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Reveal from "../ui/Reveal"
import "./InfoESA.css"

// Cartes volontairement courtes (chiffre + une phrase) : le détail complet
// vit désormais sur /guide-esa, vers laquelle cette section renvoie.
const CARTES = [
  { chiffre: "4", texte: "facultés délivrent le titre — UCLouvain, ULB, ULiège, UMons — pour un même examen." },
  { chiffre: "70 %", texte: "de réussite en moyenne : un examen à préparer, pas un concours sélectif." },
  { chiffre: "5", texte: "matières notées sur 20 : analyse, algèbre, trigonométrie, géométrie synthétique et analytique." },
  { chiffre: "10/20", texte: "le seuil à atteindre dans chaque matière, sans compensation possible entre elles." },
  { chiffre: "2", texte: "sessions par an — juillet et septembre — avec dispense des matières déjà réussies." },
]

export default function InfoESA() {
  return (
    <section className="info-esa" id="examen-admission">
      <Container>
        <SectionTitle
          eyebrow="Tout comprendre"
          title="L'examen d'admission ingénieur civil, en un coup d'œil"
          description="L'essentiel à savoir sur l'ESA. Le détail complet — programme, sessions, dispenses — est disponible dans notre guide."
        />
        <div className="info-esa__grid">
          {CARTES.map((carte, index) => (
            <Reveal as="div" className="info-esa__carte" delay={index * 60} key={carte.chiffre + carte.texte}>
              <span className="info-esa__chiffre">{carte.chiffre}</span>
              <p>{carte.texte}</p>
            </Reveal>
          ))}
        </div>
        <div className="info-esa__lien">
          <Link to="/guide-esa">En savoir plus sur l'examen →</Link>
        </div>
      </Container>
    </section>
  )
}
