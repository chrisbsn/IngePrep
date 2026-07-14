import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import Reveal from "../ui/Reveal"
import "./InfoESA.css"

const BLOCKS = [
  {
    title: "C'est quoi, les études d'ingénieur civil (Polytech) ?",
    body: (
      <>
        <p>
          Les études d'ingénieur civil sont organisées par les <strong>quatre facultés polytechniques</strong>{" "}
          de la Fédération Wallonie-Bruxelles : l'<strong>UCLouvain</strong> (École polytechnique de Louvain),
          l'<strong>ULB</strong> (École polytechnique de Bruxelles), l'<strong>ULiège</strong> (Faculté des
          Sciences appliquées) et l'<strong>UMons</strong> (Faculté polytechnique). Le titre d'ingénieur civil
          correspond à un master en sciences de l'ingénieur, soit cinq années d'études.
        </p>
        <p>
          Contrairement à la plupart des autres filières universitaires, l'accès n'y est pas libre : il
          faut réussir un examen d'entrée, l'examen spécial d'admission.
        </p>
      </>
    ),
  },
  {
    title: "C'est quoi, l'examen spécial d'admission (ESA) ?",
    body: (
      <>
        <p>
          L'<strong>examen spécial d'admission</strong> est l'épreuve obligatoire pour entamer un bachelier
          d'ingénieur civil en Fédération Wallonie-Bruxelles. Son programme est <strong>commun aux quatre
          facultés</strong> : le même programme et les mêmes critères, et la réussite donne accès
          indistinctement à n'importe laquelle des quatre. Il vérifie que chaque candidat maîtrise les
          fondements mathématiques nécessaires pour aborder les études.
        </p>
        <p>
          Le niveau correspond au programme de <strong>mathématiques 6h/semaine</strong> du 3ᵉ degré du
          secondaire. Environ 70 % des candidats le réussissent — ce n'est pas un concours : il n'y a
          aucune limite au nombre d'admis, toute personne qui atteint le seuil est admise.
        </p>
      </>
    ),
  },
  {
    title: "Quelles matières sont testées ?",
    body: (
      <>
        <p>L'examen porte sur cinq matières mathématiques, chacune notée sur 20 :</p>
        <ul>
          <li>
            <strong>Analyse</strong> — fonctions, limites, dérivées, intégrales
          </li>
          <li>
            <strong>Algèbre</strong> — nombres complexes, polynômes, systèmes, second degré
          </li>
          <li>
            <strong>Trigonométrie et calcul numérique</strong> — formules, équations trigonométriques
          </li>
          <li>
            <strong>Géométrie synthétique</strong> — triangles, cercles, Thalès, Pythagore, volumes
          </li>
          <li>
            <strong>Géométrie analytique</strong> — vecteurs, droites, coniques, produit scalaire
          </li>
        </ul>
        <p>
          <strong>La calculatrice est interdite</strong> : les questions se résolvent à la main et les
          réponses attendues sont exactes (fractions, radicaux, expressions symboliques) — jamais des
          valeurs décimales approchées.
        </p>
      </>
    ),
  },
  {
    title: "Comment réussir l'examen ?",
    body: (
      <p>
        Il faut obtenir <strong>au minimum 10/20 dans chacune des cinq matières</strong>. Un échec dans une
        seule matière suffit à devoir repasser — mais un système de dispenses te permet de ne représenter,
        en seconde session, que les matières échouées (dans la même faculté et la même année académique).
      </p>
    ),
  },
  {
    title: "Quand et comment s'inscrire ?",
    body: (
      <>
        <p>
          L'examen est organisé <strong>deux fois par an</strong> : une première session lors de la première
          quinzaine de juillet et une seconde lors de la première quinzaine de septembre, toujours en
          présentiel dans les universités. Les inscriptions ouvrent entre mars et juin selon l'université
          choisie.
        </p>
        <p>
          Le diplôme de secondaire suffit pour se présenter, quelle que soit ton option. Si tu viens d'une
          filière avec moins de 6h de maths par semaine, une préparation sérieuse fait toute la
          différence.
        </p>
      </>
    ),
  },
]

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "C'est quoi l'examen spécial d'admission (ESA) en ingénieur civil ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'examen spécial d'admission est l'épreuve obligatoire pour entamer des études d'ingénieur civil en Belgique francophone. Son programme est commun aux quatre facultés (UCLouvain, ULB, ULiège, UMons) et porte sur cinq matières mathématiques de niveau 6h/semaine : analyse, algèbre, trigonométrie et calcul numérique, géométrie synthétique et géométrie analytique. La calculatrice est interdite.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles sont les conditions de réussite de l'examen d'admission ingénieur civil ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il faut obtenir au minimum 10/20 dans chacune des cinq matières de mathématiques. Un système de dispenses permet de ne repasser que les matières échouées en seconde session, dans la même faculté et la même année académique.",
      },
    },
    {
      "@type": "Question",
      name: "Quand a lieu l'examen d'entrée en polytechnique en Belgique ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Deux sessions par an : la première quinzaine de juillet et la première quinzaine de septembre, en présentiel dans les universités. Les inscriptions ouvrent entre mars et juin selon l'université.",
      },
    },
    {
      "@type": "Question",
      name: "Où trouver les annales de l'examen d'admission ingénieur civil ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IngePrep met à disposition gratuitement les sujets officiels de l'ESA de 2009 à 2025 au format PDF d'origine, sessions de juillet et septembre incluses.",
      },
    },
  ],
}

export default function InfoESA() {
  return (
    <section className="info-esa" id="examen-admission">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <Container>
        <SectionTitle
          eyebrow="Tout comprendre"
          title="L'examen d'admission ingénieur civil en Belgique, expliqué simplement"
          description="Tu découvres le projet Polytech, ou tes parents veulent comprendre de quoi il s'agit ? Voici l'essentiel sur l'examen spécial d'admission — sans jargon."
        />
        <div className="info-esa__grid">
          {BLOCKS.map((block, index) => (
            <Reveal as="article" className="info-esa__block" delay={index * 80} key={block.title}>
              <h3>{block.title}</h3>
              <div className="info-esa__body">{block.body}</div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
