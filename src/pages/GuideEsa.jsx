import { Link } from "react-router-dom"
import Footer from "../components/layout/Footer"
import Container from "../components/ui/Container"
import Logo from "../components/ui/Logo"
import "./GuideEsa.css"

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "C'est quoi l'examen spécial d'admission (ESA) en ingénieur civil ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'examen spécial d'admission est l'épreuve obligatoire pour entamer des études d'ingénieur civil en Belgique francophone. Son programme est commun aux quatre facultés (UCLouvain, ULB, ULiège, UMons) et porte, pour la majorité des candidats, sur cinq matières mathématiques de niveau 6h/semaine : analyse, algèbre, trigonométrie et calcul numérique, géométrie synthétique et géométrie analytique. La calculatrice est interdite.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles sont les conditions de réussite de l'examen d'admission ingénieur civil ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il faut obtenir au minimum 10/20 dans chacune des cinq matières, sans compensation possible entre elles. Un système de dispenses permet de ne repasser que les matières échouées en seconde session, dans la même faculté et la même année académique.",
      },
    },
    {
      "@type": "Question",
      name: "Quand a lieu l'examen d'entrée en polytechnique en Belgique ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Deux sessions par an : la première quinzaine de juillet (résultats avant le 15 juillet) et la première quinzaine de septembre (résultats avant le 15 septembre).",
      },
    },
    {
      "@type": "Question",
      name: "L'examen spécial d'admission est-il un concours sélectif ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non, c'est un examen et non un concours : il n'y a aucune limitation de places. Environ 70 % des candidats le réussissent chaque année.",
      },
    },
  ],
}

export default function GuideEsa() {
  return (
    <>
      {/* Header minimaliste propre à cette page : pas de nav commerciale ni de
          boutons de connexion/accès, seulement le logo (cliquable vers l'accueil)
          et le fil d'Ariane plus bas. */}
      <header className="guide-esa-header">
        <Container className="guide-esa-header__inner">
          <Link to="/" className="guide-esa-header__logo">
            <Logo size={28} />
            IngePrep
          </Link>
        </Container>
      </header>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <main className="guide-esa">
        <Container>
          <nav className="guide-esa__fil" aria-label="Fil d'Ariane">
            <Link to="/">Accueil</Link>
            <span aria-hidden="true">›</span>
            <strong>Guide de l'examen</strong>
          </nav>

          <p className="guide-esa__eyebrow">Guide de l'examen</p>
          <h1 className="guide-esa__titre">
            L'examen spécial d'admission en ingénieur civil, expliqué en détail
          </h1>

          <article className="guide-esa__article">
            <section>
              <h2>Les études d'ingénieur civil en Belgique francophone</h2>
              <p>
                Le titre d'ingénieur civil est décerné en Fédération Wallonie-Bruxelles par
                quatre facultés : l'École polytechnique de Bruxelles (ULB), la Faculté des
                Sciences Appliquées de l'ULiège, l'École Polytechnique de Louvain (UCLouvain) et
                la Faculté Polytechnique de Mons (UMons). La formation dure cinq ans — trois
                années de bachelier communes à toutes les spécialités, suivies de deux années de
                master parmi une quinzaine d'orientations possibles : électromécanique,
                informatique, biomédical, sciences des données, construction, ou encore ingénieur
                civil architecte, qui se distingue dès la première année.
              </p>
              <p>
                Contrairement à la plupart des filières universitaires, l'accès n'y est pas
                libre. Pour s'inscrire en bachelier, chaque candidat doit d'abord réussir
                l'examen spécial d'admission — souvent appelé ESA. Ce n'est pas une formalité
                isolée à chaque université : le programme de l'examen est commun aux quatre
                facultés, et sa réussite dans l'une d'entre elles ouvre l'accès indistinctement
                aux trois autres.
              </p>
            </section>

            <section>
              <h2>Qu'est-ce que l'examen spécial d'admission, et pourquoi seulement des mathématiques</h2>
              <p>
                Pour un candidat titulaire du Certificat d'Enseignement Secondaire Supérieur
                (CESS) ou d'un diplôme assimilé, l'examen porte exclusivement sur les
                mathématiques, sur la base du programme à six heures de mathématiques par
                semaine du troisième degré du secondaire. Les candidats qui ne possèdent pas ce
                diplôme doivent en revanche présenter une épreuve complète incluant également le
                français, les sciences, l'histoire et une seconde langue — un cas de figure
                marginal, qui ne concerne pas l'immense majorité des candidats sortant du
                secondaire belge.
              </p>
              <p>
                Le choix des mathématiques comme unique matière n'est pas arbitraire. Les études
                d'ingénieur civil mobilisent constamment un mode de pensée mathématique :
                traduire un problème concret en une description abstraite, puis le résoudre par
                des méthodes de raisonnement systématiques. L'examen ne cherche donc pas à
                évaluer une culture générale, mais à vérifier qu'un candidat maîtrise déjà les
                outils de raisonnement sur lesquels toute la suite du cursus va s'appuyer.
              </p>
              <p>
                Il faut aussi être clair sur sa nature : c'est un examen, pas un concours. La
                réussite se juge uniquement sur la copie du candidat, sans limitation de places
                ni comparaison avec les autres candidats de la session. Dans les faits, environ
                70 % des candidats qui se présentent réussissent — un chiffre qui reste stable et
                homogène d'une faculté à l'autre depuis plusieurs années, malgré des ajustements
                réguliers du format des épreuves. Ce n'est donc pas un filtre conçu pour éliminer
                en masse, mais un vrai test de préparation : ceux qui réussissent l'ESA affichent
                ensuite, en moyenne, de meilleurs taux de réussite au cours du cursus d'ingénieur
                que dans la plupart des autres filières universitaires — y compris ceux qui se
                réorientent ensuite vers d'autres études.
              </p>
            </section>

            <section>
              <h2>Les cinq matières et ce qu'elles recouvrent réellement</h2>
              <p>Le programme se répartit sur cinq matières mathématiques, chacune notée sur 20.</p>
              <p>
                <strong>L'analyse</strong> couvre les fonctions dans leur ensemble : domaine de
                définition, opérations et composition, parité, périodicité, continuité et limites
                — y compris les cas classiques d'indétermination — puis la dérivation (fonctions
                usuelles, sommes, produits, quotients, composées, fonctions réciproques), les
                théorèmes de Rolle et des accroissements finis, et enfin le calcul de primitives
                et d'intégrales, avec leurs applications au calcul d'aires planes et de volumes
                de solides de révolution.
              </p>
              <p>
                <strong>L'algèbre</strong> part du calcul dans les nombres réels (valeur absolue,
                puissances, radicaux) et s'étend aux nombres complexes sous leurs différentes
                formes, à la manipulation des polynômes et des fractions rationnelles, aux
                équations et inéquations du premier et du second degré avec discussion, ainsi
                qu'aux bases du dénombrement, des probabilités et de la statistique descriptive.
              </p>
              <p>
                <strong>La trigonométrie et le calcul numérique</strong> repose sur un formulaire
                volontairement limité aux valeurs et relations classiques (angles opposés,
                sommes, duplication) : toute formule non listée dans le programme officiel doit
                être redémontrée par le candidat plutôt que simplement invoquée. Elle couvre
                aussi la résolution d'équations trigonométriques et la résolution de triangles
                quelconques.
              </p>
              <p>
                <strong>La géométrie synthétique</strong>, plane et dans l'espace, s'appuie sur
                les propriétés classiques des triangles et des cercles, le théorème de Thalès et
                sa réciproque, les relations d'angles, ainsi que les problèmes de construction
                dans l'espace — sections planes d'un cube ou d'un tétraèdre, calculs d'aires et
                de volumes des solides usuels.
              </p>
              <p>
                <strong>La géométrie analytique</strong>, plane et dans l'espace, traite des
                équations de droites et de plans sous leurs différentes formes, des coniques et
                de leurs équations cartésiennes, du calcul vectoriel et du produit scalaire,
                ainsi que des lieux géométriques classiques.
              </p>
              <p>
                Un point technique mérite d'être souligné : la calculatrice est interdite à
                l'examen. Les réponses attendues sont donc des formes exactes — fractions,
                radicaux, expressions symboliques — jamais des valeurs décimales approchées.
              </p>
            </section>

            <section>
              <h2>Les sessions, les dispenses, et le seuil de réussite</h2>
              <p>
                L'examen a lieu deux fois par an : une première session durant la première
                quinzaine de juillet, avec proclamation des résultats avant le 15 juillet, et une
                seconde session durant la première quinzaine de septembre, avec proclamation
                avant le 15 septembre.
              </p>
              <p>
                Le seuil de réussite est fixé à 10/20 dans chacune des cinq matières. Un candidat
                qui obtient au moins 10/20 partout est admis automatiquement, sans compensation
                possible entre matières : une seule matière sous le seuil suffit à devoir la
                représenter. En cas d'ajournement en juillet, le candidat ne doit repasser en
                septembre que les matières où il n'a pas atteint 10/20 — les notes égales ou
                supérieures à 10/20 obtenues en juillet sont automatiquement reportées. Ce report
                n'est toutefois valable qu'à deux conditions : les deux sessions doivent être
                présentées au sein de la même faculté, et durant la même année académique.
              </p>
            </section>

            <section>
              <h2>Un marché en croissance, pour une filière qui manque de diplômés</h2>
              <p>
                Le nombre de candidats à l'examen augmente année après année : l'ULB est passée
                de moins de 300 candidats en 2010 à 621 en 2021, une croissance déclarée
                d'environ 10 % par an sur la décennie, et l'ULiège a suivi une trajectoire
                comparable, de 350 candidats en 2019 à plus de 400 l'année suivante. Cette hausse
                s'inscrit dans un contexte où le marché de l'emploi belge manque
                structurellement d'ingénieurs — la presse économique évoque régulièrement un
                déficit de l'ordre de 500 ingénieurs par an, toutes spécialités confondues.
              </p>
            </section>
          </article>

          <div className="guide-esa__passerelle">
            <p>
              Que tu sois encore en rhéto ou en année de préparation dédiée, comprendre le
              programme est une chose — savoir précisément où ton raisonnement dévie sur chaque
              exercice en est une autre. C'est exactement ce que fait le correcteur IA
              d'IngePrep.
            </p>
            <Link to="/#correcteur-ia" className="btn btn--primary btn--md">
              Découvrir le correcteur IA
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
