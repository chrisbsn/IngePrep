import Anthropic from "@anthropic-ai/sdk"

const SYSTEM_PROMPT = `Tu es un correcteur pédagogique pour l'examen d'admission ingénieur civil en Belgique francophone. Public : rhétorique (dernière année secondaire, option math 6h). Matières : algèbre, analyse, géométrie, trigonométrie.

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

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Le correcteur IA n'est pas configuré (clé API manquante)." }),
    }
  }

  let payload
  try {
    payload = JSON.parse(event.body || "{}")
  } catch {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Corps de requête JSON invalide." }),
    }
  }

  const { exercice, reponse_eleve } = payload

  if (!exercice?.enonce || !exercice?.solution_attendue || !reponse_eleve) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Champs manquants : exercice.enonce, exercice.solution_attendue et reponse_eleve sont requis.",
      }),
    }
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `EXERCICE : ${exercice.enonce}\n\nSOLUTION ATTENDUE : ${exercice.solution_attendue}\n\nRÉPONSE DE L'ÉLÈVE : ${reponse_eleve}`,
        },
      ],
    })

    const raw = message.content[0].text
    const cleaned = raw.replace(/```json\s*|\s*```/g, "").trim()

    let feedback
    try {
      feedback = JSON.parse(cleaned)
    } catch {
      return {
        statusCode: 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Le correcteur IA a renvoyé une réponse mal formée. Réessaie." }),
      }
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback }),
    }
  } catch (error) {
    let userMessage = "Le correcteur IA n'a pas pu analyser ta réponse. Réessaie dans un instant."

    if (error instanceof Anthropic.AuthenticationError) {
      userMessage = "Configuration du correcteur IA invalide."
    } else if (error instanceof Anthropic.RateLimitError) {
      userMessage = "Le correcteur IA est très sollicité. Réessaie dans quelques secondes."
    } else if (error instanceof Anthropic.APIConnectionError) {
      userMessage = "Le correcteur IA a mis trop de temps à répondre. Réessaie."
    }

    return {
      statusCode: 502,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: userMessage }),
    }
  }
}
