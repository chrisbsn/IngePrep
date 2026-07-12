import Anthropic from "@anthropic-ai/sdk"
import dotenv from "dotenv"

dotenv.config()

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// ============================================================
// CAS À TESTER — Change juste TEST_NUM pour lancer un autre cas
// ============================================================

const TEST_NUM = 5

const casTests = {
  1: {
    exercice: {
      matiere: "algebre",
      enonce: "Résoudre dans ℝ l'équation : x² - 5x + 6 = 0",
      solution_attendue: "x = 2 ou x = 3",
    },
    reponseEleve: "x = 2 et x = 3",
    description: "Réponse CORRECTE",
  },
  2: {
    exercice: {
      matiere: "algebre",
      enonce: "Résoudre dans ℝ l'équation : x² - 5x + 6 = 0",
      solution_attendue: "x = 2 ou x = 3",
    },
    reponseEleve: "Le discriminant vaut b² + 4ac = 25 + 24 = 49, donc x = (5±7)/2, soit x = 6 ou x = -1",
    description: "Erreur conceptuelle : mauvaise formule du discriminant (+ au lieu de -)",
  },
  3: {
    exercice: {
      matiere: "algebre",
      enonce: "Résoudre dans ℝ l'inéquation : (x-2)(x+3) > 0",
      solution_attendue: "x < -3 ou x > 2",
    },
    reponseEleve: "x > 2 et x > -3, donc x > 2",
    description: "Erreur méthodologique : ne fait pas le tableau de signes",
  },
  4: {
    exercice: {
      matiere: "algebre",
      enonce: "Développer et réduire : (2x - 3)(x + 4)",
      solution_attendue: "2x² + 5x - 12",
    },
    reponseEleve: "2x² + 8x - 3x + 12 = 2x² + 5x + 12",
    description: "Erreur de calcul : signe du terme constant",
  },
  5: {
    exercice: {
      matiere: "algebre",
      enonce: "Résoudre dans ℝ le système : x + y = 5 et 2x - y = 1",
      solution_attendue: "x = 2 et y = 3",
    },
    reponseEleve: "x = 3 et y = 2",
    description: "Erreur : a inversé x et y à la fin",
  },
}

const { exercice, reponseEleve, description } = casTests[TEST_NUM]
console.log(`\n[TEST ${TEST_NUM}] ${description}\n`)

// ============================================================
// PROMPT SYSTÈME DU CORRECTEUR
// ============================================================

const promptSysteme = `Tu es un correcteur pédagogique pour l'examen d'admission ingénieur civil en Belgique francophone. Public : rhétorique (dernière année secondaire, option math 6h). Matières : algèbre, analyse, géométrie, trigonométrie.

Ta mission : diagnostiquer précisément le mécanisme d'erreur d'un élève et lui expliquer brièvement.

CATÉGORIES D'ERREUR (choisis-en UNE, la plus précise) :

1. "erreur_conceptuelle" : l'élève ne connaît pas ou confond une notion / une formule. Exemples : écrit le discriminant b² + 4ac au lieu de b² - 4ac, confond dérivée et primitive, croit que sin²(x) + cos²(x) = 0, ne sait pas ce qu'est une asymptote.

2. "erreur_methodologique" : connaît les notions, mais applique la mauvaise stratégie. Exemples : essaie de factoriser une équation qui nécessite le discriminant, oublie de faire un tableau de signes pour une inéquation produit, cherche le maximum d'une fonction sans dériver.

3. "erreur_de_calcul" : méthode correcte, formule correcte, mais erreur arithmétique ou algébrique dans l'exécution. Exemples : -3 × 4 = +12, oublie de distribuer un signe moins, erreur de simplification de fraction, inverse deux valeurs finales par étourderie. NE PAS confondre avec erreur_conceptuelle : si l'élève écrit une mauvaise formule dès le départ, c'est conceptuel.

4. "erreur_denonce" : mauvaise lecture de la consigne. Exemples : résout dans ℂ au lieu de ℝ, cherche le maximum au lieu du minimum, calcule f'(2) au lieu de f(2).

FORMAT DE RÉPONSE — CRITIQUE :
Ta réponse doit être PARSABLE directement en JavaScript avec JSON.parse().
INTERDIT ABSOLU : les caractères backtick, les balises markdown, les mots "json" avant l'accolade, tout texte hors JSON.
COMMENCE ta réponse par { (accolade ouvrante) et TERMINE par } (accolade fermante). Rien d'autre.

Structure exacte :

{
  "correcte": true | false,
  "type_erreur": "erreur_conceptuelle" | "erreur_methodologique" | "erreur_de_calcul" | "erreur_denonce" | null,
  "ce_qui_est_juste": "1 phrase courte sur le positif, ou chaîne vide si rien de positif",
  "explication": "2 à 4 phrases MAXIMUM. Direct, précis, ton encourageant mais pas mièvre. Montre où est l'erreur et donne une piste, sans donner la réponse finale si l'élève peut la retrouver seul."
}

SI LA RÉPONSE EST CORRECTE :
- "type_erreur" = null
- "ce_qui_est_juste" = 1 phrase de confirmation
- "explication" = chaîne vide ""
- AUCUNE digression sur la notation, la sémantique, "et vs ou", etc. L'élève a juste, il passe au suivant.

CONTRAINTE DE STYLE :
- Utilise "tu", jamais "vous".
- Sois direct : "Ton discriminant est faux" plutôt que "L'erreur se situe dans le calcul du discriminant".
- Pas de "L'élève a..." nulle part : tu parles À l'élève.`

// ============================================================
// APPEL À CLAUDE HAIKU
// ============================================================

async function corriger() {
  console.log("=== EXERCICE ===")
  console.log(exercice.enonce)
  console.log("\n=== SOLUTION ATTENDUE ===")
  console.log(exercice.solution_attendue)
  console.log("\n=== RÉPONSE DE L'ÉLÈVE ===")
  console.log(reponseEleve)
  console.log("\n=== APPEL À CLAUDE HAIKU... ===\n")

  const debut = Date.now()

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1000,
    system: promptSysteme,
    messages: [
      {
        role: "user",
        content: `EXERCICE : ${exercice.enonce}\n\nSOLUTION ATTENDUE : ${exercice.solution_attendue}\n\nRÉPONSE DE L'ÉLÈVE : ${reponseEleve}`,
      },
    ],
  })

  const duree = Date.now() - debut

  console.log("=== FEEDBACK IA ===")
  const feedback = message.content[0].text
  console.log(feedback)

  console.log("\n=== STATS ===")
  console.log(`Durée : ${duree}ms`)
  console.log(`Tokens entrée : ${message.usage.input_tokens}`)
  console.log(`Tokens sortie : ${message.usage.output_tokens}`)
  const cout = (message.usage.input_tokens * 0.8 + message.usage.output_tokens * 4) / 1_000_000
  console.log(`Coût estimé : ${cout.toFixed(6)} $ (environ ${(cout * 0.92).toFixed(6)} €)`)
}

corriger().catch((err) => {
  console.error("Erreur :", err.message)
  process.exit(1)
})
