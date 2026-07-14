// ⚠ CONTENU PROVISOIRE — chapitre pilote "Dérivées".
// Brouillon rédigé uniquement pour tester la mise en page et le parcours.
// Chaque élément doit être validé par un enseignant avant d'être considéré comme définitif.
// Le marquage "provisoire" est aussi affiché dans l'interface (bandeau) — pas seulement ici.

export const theorieDerivees = {
  intro:
    "La dérivée mesure la vitesse à laquelle une fonction varie. À l'ESA, elle intervient dans deux familles de questions : le calcul direct de dérivées (avec les règles de dérivation) et l'étude de fonctions (croissance, extrema, concavité, tangentes).",
  blocs: [
    {
      titre: "Définition — le nombre dérivé",
      contenu:
        "Le nombre dérivé de f en a est la limite, si elle existe, du taux d'accroissement : f′(a) = lim (h→0) [f(a+h) − f(a)] / h. Géométriquement, c'est la pente de la tangente à la courbe de f au point d'abscisse a.",
    },
    {
      titre: "Règles de calcul",
      contenu:
        "Somme : (u + v)′ = u′ + v′ · Produit : (u·v)′ = u′v + uv′ · Quotient : (u/v)′ = (u′v − uv′)/v² · Composée : (f∘g)′(x) = f′(g(x))·g′(x). Dérivées usuelles : (xⁿ)′ = n·xⁿ⁻¹, (sin x)′ = cos x, (cos x)′ = −sin x, (eˣ)′ = eˣ, (ln x)′ = 1/x, (√x)′ = 1/(2√x).",
    },
    {
      titre: "Méthode — étude de la croissance d'une fonction",
      contenu:
        "1. Déterminer le domaine de définition. 2. Calculer f′(x) et la simplifier complètement. 3. Étudier le signe de f′(x) (tableau de signes). 4. En déduire les intervalles de croissance et de décroissance. 5. Identifier les extrema : f′ s'annule ET change de signe. Piège classique : f′(a) = 0 sans changement de signe n'est pas un extremum (ex. f(x) = x³ en 0).",
    },
    {
      titre: "Méthode — équation d'une tangente",
      contenu:
        "La tangente à la courbe de f au point d'abscisse a a pour équation : y = f′(a)·(x − a) + f(a). Deux quantités à calculer, dans cet ordre : f(a) puis f′(a). Piège classique : confondre f(a) et f′(a), ou oublier de repasser par f(a) après avoir dérivé.",
    },
  ],
}

// Scénarios de soumission simulés (outil de test interne, pré-IA).
// Chaque diagnostic est rédigé à la main pour servir d'exemple de sortie du correcteur.
export const SCENARIOS = [
  { id: "correcte", label: "Réponse correcte" },
  { id: "erreur_methode", label: "Erreur de méthode" },
  { id: "erreur_calcul", label: "Erreur de calcul" },
  { id: "resultat_propre_faux", label: "Résultat propre mais faux" },
]

export const exercicesDerivees = [
  {
    id: "der-1",
    titre: "Dérivée d'une fonction composée",
    enonce: "Calcule la dérivée de f(x) = (3x² − 5x + 1)⁴.",
    origine: "Type ESA — calcul direct (brouillon)",
    difficulte: 2,
    // Étapes calquées sur la méthode de référence du chapitre (règle de la composée).
    etapes: [
      "Identifier la structure : quelle est la fonction externe, quelle est l'interne ?",
      "Dériver la fonction externe (en gardant l'interne intacte)",
      "Dériver la fonction interne",
      "Assembler avec la règle de la composée et réduire",
    ],
    reponseLabel: "f′(x) =",
    diagnostics: {
      correcte: {
        verdict: "Réponse correcte",
        mecanisme: null,
        texte:
          "f′(x) = 4(3x² − 5x + 1)³ · (6x − 5). La structure composée est bien identifiée, la dérivée interne (6x − 5) est présente et le résultat est complètement réduit. Rien à signaler.",
      },
      erreur_methode: {
        verdict: "Erreur de méthode",
        mecanisme: "Règle de la composée non mobilisée",
        texte:
          "Tu as écrit f′(x) = 4(3x² − 5x + 1)³ : c'est la dérivée de u⁴ comme si u était la variable. La fonction est une composée — il faut multiplier par la dérivée interne u′ = 6x − 5. Le mécanisme en jeu : tu appliques la formule (xⁿ)′ = n·xⁿ⁻¹ hors de son domaine de validité.",
      },
      erreur_calcul: {
        verdict: "Erreur de calcul",
        mecanisme: "Erreur isolée dans un raisonnement juste",
        texte:
          "Ta structure est correcte : 4(…)³ · (dérivée interne). Mais la dérivée interne est fausse : (3x² − 5x + 1)′ = 6x − 5, pas 6x − 5x. Ton application de la règle de la composée est acquise — c'est la dérivation terme à terme qu'il faut fiabiliser.",
      },
      resultat_propre_faux: {
        verdict: "Résultat faux malgré une présentation impeccable",
        mecanisme: "Vérification finale absente",
        texte:
          "Ta copie est propre et bien structurée, mais le résultat final 12x(3x² − 5x + 1)³ ne correspond à aucune étape de ton développement : la dérivée interne 6x − 5 s'est transformée en 12x entre l'avant-dernière et la dernière ligne. Une relecture de la dernière ligne t'aurait sauvé — c'est le réflexe à installer.",
      },
    },
  },
  {
    id: "der-2",
    titre: "Croissance et extrema",
    enonce: "Soit f(x) = x³ − 3x² + 4. Étudie la croissance de f et détermine ses extrema.",
    origine: "Type ESA — étude de fonction (brouillon)",
    difficulte: 3,
    // Étapes calquées sur la méthode « étude de la croissance d'une fonction ».
    etapes: [
      "Déterminer le domaine de définition",
      "Calculer f′(x) et la simplifier complètement",
      "Étudier le signe de f′(x) (tableau de signes)",
      "En déduire les intervalles de croissance et de décroissance",
      "Identifier les extrema (f′ s'annule ET change de signe) et calculer leur ordonnée",
    ],
    reponseLabel: "Extrema :",
    diagnostics: {
      correcte: {
        verdict: "Réponse correcte",
        mecanisme: null,
        texte:
          "f′(x) = 3x² − 6x = 3x(x − 2) ; f′ > 0 sur ]−∞ ; 0[ et ]2 ; +∞[, f′ < 0 sur ]0 ; 2[. Maximum local (0 ; 4), minimum local (2 ; 0). Tableau de signes complet et conclusions correctes.",
      },
      erreur_methode: {
        verdict: "Erreur de méthode",
        mecanisme: "Extremum conclu sans étude de signe",
        texte:
          "Tu as résolu f′(x) = 0 (x = 0 et x = 2) puis conclu directement aux extrema, sans tableau de signes. Résoudre f′ = 0 donne des candidats, pas des extrema : il faut vérifier que f′ change de signe. Ici ça fonctionne par chance, mais sur f(x) = x³ la même démarche te ferait inventer un extremum en 0 qui n'existe pas.",
      },
      erreur_calcul: {
        verdict: "Erreur de calcul",
        mecanisme: "Erreur isolée dans un raisonnement juste",
        texte:
          "Ta démarche est complète (dérivée, factorisation, tableau de signes, conclusion) mais f′(x) = 3x² − 6x se factorise en 3x(x − 2), pas 3x(x − 3). Du coup ton tableau bascule au mauvais endroit. Le mécanisme d'étude est acquis — c'est la factorisation qu'il faut sécuriser.",
      },
      resultat_propre_faux: {
        verdict: "Résultat faux malgré une présentation impeccable",
        mecanisme: "Valeur de la fonction non recalculée",
        texte:
          "Ton tableau de signes est juste, tes intervalles de croissance sont justes — mais tu annonces un minimum en (2 ; 4) : tu as recopié f(0) au lieu de calculer f(2) = 8 − 12 + 4 = 0. L'ordonnée d'un extremum se calcule toujours avec la fonction f, jamais avec f′, et jamais de mémoire.",
      },
    },
  },
  {
    id: "der-3",
    titre: "Dérivée d'un quotient",
    enonce: "Calcule la dérivée de f(x) = (2x + 1)/(x − 3) et précise son domaine.",
    origine: "Type ESA — calcul direct (brouillon)",
    difficulte: 2,
    // Étapes calquées sur la méthode de référence (règle du quotient).
    etapes: [
      "Déterminer le domaine de définition",
      "Poser u et v, puis calculer u′ et v′",
      "Appliquer la règle du quotient : (u′v − uv′)/v²",
      "Développer le numérateur en distribuant les signes, puis réduire",
    ],
    reponseLabel: "f′(x) =",
    diagnostics: {
      correcte: {
        verdict: "Réponse correcte",
        mecanisme: null,
        texte:
          "f′(x) = [2(x − 3) − (2x + 1)] / (x − 3)² = −7/(x − 3)², sur ℝ \\ {3}. Règle du quotient bien appliquée, numérateur réduit, domaine précisé. Complet.",
      },
      erreur_methode: {
        verdict: "Erreur de méthode",
        mecanisme: "Formule du quotient inversée",
        texte:
          "Tu as écrit (u′v + uv′)/v² : c'est la structure du produit transposée au quotient. La règle est (u/v)′ = (u′v − uv′)/v² — le signe moins n'est pas un détail, il vient de la dérivation de 1/v. Moyen mnémotechnique : le numérateur « commence » toujours par u′v.",
      },
      erreur_calcul: {
        verdict: "Erreur de calcul",
        mecanisme: "Erreur de distribution d'un signe",
        texte:
          "Formule correcte, mais au numérateur tu développes −(2x + 1) en −2x + 1. Le signe moins doit distribuer sur les deux termes : −2x − 1, ce qui donne −7 et non −5. C'est LA faute de signe classique du quotient — surligne la distribution quand tu développes.",
      },
      resultat_propre_faux: {
        verdict: "Résultat faux malgré une présentation impeccable",
        mecanisme: "Domaine de définition oublié",
        texte:
          "Ton calcul de f′ est exact et bien présenté, mais ta réponse ne mentionne nulle part que x ≠ 3. À l'ESA, une dérivée sans domaine est une réponse incomplète : l'énoncé le demandait explicitement. Le correcteur humain t'enlèverait des points ici, pas sur le calcul.",
      },
    },
  },
  {
    id: "der-4",
    titre: "Équation d'une tangente",
    enonce: "Détermine l'équation de la tangente à la courbe de f(x) = x² − 4x + 3 au point d'abscisse a = 1.",
    origine: "Type ESA — application géométrique (brouillon)",
    difficulte: 3,
    // Étapes calquées sur la méthode « équation d'une tangente ».
    etapes: [
      "Calculer f(a) — l'ordonnée du point de contact",
      "Calculer f′(x), puis f′(a) — la pente de la tangente",
      "Écrire y = f′(a)·(x − a) + f(a)",
      "Réduire, puis vérifier que la droite passe bien par (a ; f(a))",
    ],
    reponseLabel: "Équation de la tangente :",
    diagnostics: {
      correcte: {
        verdict: "Réponse correcte",
        mecanisme: null,
        texte:
          "f(1) = 0, f′(x) = 2x − 4 donc f′(1) = −2. Tangente : y = −2(x − 1) + 0 = −2x + 2. Les deux quantités sont calculées dans le bon ordre et la forme finale est réduite. Parfait.",
      },
      erreur_methode: {
        verdict: "Erreur de méthode",
        mecanisme: "Confusion entre f(a) et f′(a)",
        texte:
          "Tu as utilisé f(1) = 0 comme pente : ta droite y = 0·(x − 1) + … n'est pas une tangente, c'est une horizontale posée au hasard. La pente d'une tangente est TOUJOURS f′(a), la valeur f(a) sert au point de passage. Ce sont deux objets différents calculés à partir de deux fonctions différentes.",
      },
      erreur_calcul: {
        verdict: "Erreur de calcul",
        mecanisme: "Erreur isolée dans un raisonnement juste",
        texte:
          "Structure parfaite : y = f′(1)(x − 1) + f(1). Mais f′(1) = 2(1) − 4 = −2, pas +2. Un signe perdu dans une soustraction élémentaire inverse toute la pente. Ta méthode est acquise — ralentis juste sur l'évaluation numérique.",
      },
      resultat_propre_faux: {
        verdict: "Résultat faux malgré une présentation impeccable",
        mecanisme: "Réponse plausible non vérifiée",
        texte:
          "Ta rédaction est irréprochable mais y = −2x + 3 ne passe pas par le point de tangence (1 ; 0) : en x = 1 ta droite donne y = 1. Une tangente passe par définition par le point de contact — cette vérification prend cinq secondes et aurait détecté l'erreur. Vérifier sa réponse fait partie de la méthode.",
      },
    },
  },
]

// Bandeau simulé de détection du mécanisme récurrent (outil de test interne).
export function detecterMecanismeRecurrent(historique) {
  const erreurs = historique.filter((s) => s !== "correcte")
  if (historique.length < 3 || erreurs.length < 2) return null

  const compte = {}
  for (const s of erreurs) compte[s] = (compte[s] || 0) + 1
  const [scenario, occurrences] = Object.entries(compte).sort((a, b) => b[1] - a[1])[0]
  if (occurrences < 2) return null

  const libelles = {
    erreur_methode: "une erreur de méthode (mauvais outil ou règle mal mobilisée)",
    erreur_calcul: "une erreur de calcul isolée dans un raisonnement juste",
    resultat_propre_faux: "un résultat final faux non vérifié malgré une démarche propre",
  }
  return {
    scenario,
    occurrences,
    total: historique.length,
    message: `Sur tes ${historique.length} dernières soumissions, ${occurrences} présentent le même mécanisme : ${libelles[scenario]}. C'est ce schéma récurrent qu'il faut corriger en priorité — pas chaque exercice isolément.`,
  }
}
