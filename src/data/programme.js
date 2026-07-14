// Programme officiel de l'examen spécial d'admission (ESA).
// Source : brochure "Programme de l'examen spécial d'admission" (Facultés polytechniques FWB)
// — section "Détail des matières mathématiques". Arborescence fidèle au document.
//
// statut : "pilote" (contenu brouillon affiché) | "a-venir" (navigation seule)

export const programme = [
  {
    id: "analyse",
    label: "Analyse",
    description: "Fonctions, limites, dérivées, primitives et intégrales.",
    chapitres: [
      {
        slug: "generalites-fonctions",
        titre: "Généralités sur les fonctions",
        statut: "a-venir",
        sousChapitres: [
          "Domaine de définition",
          "Opérations sur les fonctions : addition, soustraction, multiplication, composition",
          "Fonctions réciproques",
          "Maximum et minimum d'une fonction sur un intervalle",
          "Parité et périodicité",
          "Comparaison des graphiques : f(x), f(x)+a, f(x+a), k·f(x), f(kx)",
          "Fonctions usuelles : puissances et racines, trigonométriques et cyclométriques, exponentielles et logarithmes",
        ],
      },
      {
        slug: "continuite",
        titre: "Continuité",
        statut: "a-venir",
        sousChapitres: [
          "Continuité d'une fonction en un point, sur un intervalle",
          "Continuité à gauche, à droite",
          "Lien entre limite et continuité",
        ],
      },
      {
        slug: "limites-asymptotes",
        titre: "Limites et asymptotes",
        statut: "a-venir",
        sousChapitres: [
          "Limite des valeurs d'une fonction",
          "Asymptotes",
          "Calcul de limites, y compris les cas classiques d'indétermination",
        ],
      },
      {
        slug: "derivees",
        titre: "Dérivées",
        statut: "pilote",
        sousChapitres: [
          "Nombre dérivé et fonction dérivée : définitions",
          "Propriétés des fonctions dérivables sur un intervalle",
          "Dérivée des fonctions usuelles",
          "Dérivée d'une somme, d'un produit, d'un quotient",
          "Dérivée de la composée de deux fonctions",
          "Dérivée d'une fonction réciproque",
          "Théorèmes de Rolle et des accroissements finis",
          "Signe de la dérivée première et croissance ; recherche d'extrema",
          "Concavité et signe de la dérivée seconde ; construction du graphique",
        ],
      },
      {
        slug: "primitives-integrales",
        titre: "Primitives et intégrales",
        statut: "a-venir",
        sousChapitres: [
          "Primitive et intégrale d'une fonction continue",
          "Intégration par parties, par substitution",
          "Applications au calcul d'aires planes et de volumes de solides de révolution",
        ],
      },
    ],
  },
  {
    id: "algebre",
    label: "Algèbre",
    description: "Réels, complexes, polynômes, équations et probabilités.",
    chapitres: [
      {
        slug: "calcul-reels",
        titre: "Calcul dans les nombres réels",
        statut: "a-venir",
        sousChapitres: [
          "Opérations fondamentales",
          "Valeur absolue",
          "Puissances rationnelles des nombres réels positifs",
          "Radicaux",
        ],
      },
      {
        slug: "nombres-complexes",
        titre: "Nombres complexes",
        statut: "a-venir",
        sousChapitres: [
          "Définition et opérations fondamentales",
          "Représentation géométrique",
          "Forme trigonométrique",
          "Formule de Moivre",
          "Racines n-ièmes",
        ],
      },
      {
        slug: "polynomes",
        titre: "Polynômes",
        statut: "a-venir",
        sousChapitres: [
          "Identités remarquables",
          "Zéros réels et complexes d'un polynôme",
          "Divisibilité et division polynomiale avec reste",
          "Division d'un polynôme par x − a : loi du quotient et du reste",
          "Factorisation des polynômes",
        ],
      },
      {
        slug: "fractions-rationnelles",
        titre: "Fractions rationnelles",
        statut: "a-venir",
        sousChapitres: ["Opérations sur les fractions rationnelles"],
      },
      {
        slug: "premier-degre",
        titre: "Premier degré",
        statut: "a-venir",
        sousChapitres: [
          "Propriétés de la fonction ax + b",
          "Résolution et discussion de systèmes d'équations (jusqu'à 3 × 3, avec un paramètre)",
          "Inéquations et systèmes d'inéquations à une inconnue",
          "Problèmes du premier degré avec discussion",
        ],
      },
      {
        slug: "deuxieme-degre",
        titre: "Deuxième degré",
        statut: "a-venir",
        sousChapitres: [
          "Équation à une inconnue à coefficients réels ou complexes",
          "Propriétés des racines",
          "Équations réductibles au deuxième degré : bicarrées, irrationnelles",
          "Discussion de l'équation à coefficients réels",
          "Propriétés de la fonction ax² + bx + c",
          "Résolution et discussion d'inéquations",
          "Problèmes du deuxième degré avec discussion",
        ],
      },
      {
        slug: "combinatoire-binome",
        titre: "Analyse combinatoire et binôme de Newton",
        statut: "a-venir",
        sousChapitres: [
          "Analyse combinatoire sans répétition",
          "Binôme de Newton",
          "Triangle de Pascal",
        ],
      },
      {
        slug: "progressions",
        titre: "Progressions",
        statut: "a-venir",
        sousChapitres: ["Progressions arithmétiques et géométriques : définitions et propriétés"],
      },
      {
        slug: "probabilites-statistique",
        titre: "Probabilités et statistique descriptive",
        statut: "a-venir",
        sousChapitres: [
          "Probabilité d'un événement",
          "Événements compatibles, incompatibles, dépendants, indépendants, contraires",
          "Paramètres de position : mode, médiane, moyenne",
          "Paramètres de dispersion : étendue, variance, écart-type",
        ],
      },
    ],
  },
  {
    id: "trigonometrie",
    label: "Trigonométrie et calcul numérique",
    description: "Formules, équations trigonométriques, triangles et calcul numérique.",
    chapitres: [
      {
        slug: "valeurs-remarquables",
        titre: "Valeurs remarquables et fonctions trigonométriques",
        statut: "a-venir",
        sousChapitres: [
          "Valeurs particulières classiques des fonctions trigonométriques (hors cotangente, sécante, cosécante)",
          "Fonctions cyclométriques",
        ],
      },
      {
        slug: "formules-trigonometriques",
        titre: "Formules trigonométriques",
        statut: "a-venir",
        sousChapitres: [
          "Angles associés : sin(−a), cos(−a), tg(−a) ; sin(π ± a), cos(π ± a), tg(π ± a) ; sin(π/2 ± a), cos(π/2 ± a), tg(π/2 ± a)",
          "Formules d'addition : sin(a ± b), cos(a ± b), tg(a ± b)",
          "Transformation de sommes : sin p ± sin q, cos p ± cos q",
          "Duplication : sin 2a, cos 2a, tg 2a, 1 ± cos 2a",
        ],
      },
      {
        slug: "equations-trigonometriques",
        titre: "Équations trigonométriques",
        statut: "a-venir",
        sousChapitres: [
          "Équations du type a·cos x + b·sin x = c",
          "Résolution d'équations trigonométriques",
          "Représentation de l'ensemble des solutions sur le cercle trigonométrique",
        ],
      },
      {
        slug: "resolution-triangles",
        titre: "Résolution de triangles",
        statut: "a-venir",
        sousChapitres: [
          "Relations entre angles et côtés d'un triangle rectangle et d'un triangle quelconque",
          "Règles des sinus et des cosinus",
          "Résolution de triangles",
        ],
      },
      {
        slug: "calcul-numerique",
        titre: "Calcul numérique",
        statut: "a-venir",
        sousChapitres: [
          "Calcul d'expressions comportant les fonctions usuelles : trigonométriques, cyclométriques, exponentielle, logarithme, puissances et racines",
        ],
      },
    ],
  },
  {
    id: "geometrie",
    label: "Géométrie synthétique et analytique",
    description: "Figures, espace, droites, coniques, vecteurs et lieux géométriques.",
    chapitres: [
      {
        slug: "figures-planes",
        titre: "Figures planes",
        statut: "a-venir",
        sousChapitres: [
          "Longueur d'un segment, alignement, amplitude d'un angle, mesures",
          "Angles adjacents, somme d'angles, angles complémentaires et supplémentaires",
          "Triangles, quadrilatères (carré, rectangle, losange, parallélogramme, trapèze), cercles : périmètre, aire et propriétés",
          "Symétries : propriétés et constructions",
        ],
      },
      {
        slug: "proprietes-triangles",
        titre: "Propriétés des triangles",
        statut: "a-venir",
        sousChapitres: [
          "Médiatrices, hauteurs, bissectrices, médianes ; orthocentre",
          "Théorème de Pythagore et caractérisation du triangle rectangle",
          "Triangle rectangle inscrit dans un demi-cercle",
          "Cercles inscrit et circonscrit",
          "Figures isométriques ; isométrie des triangles",
          "Figures semblables ; similitude des triangles",
        ],
      },
      {
        slug: "angles-cercles",
        titre: "Angles et cercles",
        statut: "a-venir",
        sousChapitres: [
          "Angles opposés par le sommet, angles alternes-internes",
          "Somme des angles d'un triangle",
          "Angles au centre, angles inscrits",
          "Angles à côtés parallèles, à côtés perpendiculaires",
          "Théorème de Thalès dans le plan et réciproque",
        ],
      },
      {
        slug: "geometrie-espace",
        titre: "Géométrie dans l'espace",
        statut: "a-venir",
        sousChapitres: [
          "Positions relatives de deux droites, d'une droite et d'un plan, de deux plans",
          "Distance d'un point à une droite",
          "Parallélisme dans le plan et dans l'espace",
          "Point de percée d'une droite dans un plan",
          "Sections planes d'un cube, d'un tétraèdre, d'un parallélépipède rectangle",
          "Orthogonalité",
          "Aires et volumes : cube, parallélépipède rectangle, sphère, cône, cylindre, prisme, pyramide",
          "Représentation à main levée de ces volumes",
        ],
      },
      {
        slug: "analytique-plane",
        titre: "Géométrie analytique plane",
        statut: "a-venir",
        sousChapitres: [
          "Équations paramétriques et cartésiennes d'une droite",
          "Distance entre deux points ; équation cartésienne du cercle",
          "Problèmes d'intersections",
          "Orthogonalité, parallélisme, angle de deux droites",
        ],
      },
      {
        slug: "coniques",
        titre: "Coniques",
        statut: "a-venir",
        sousChapitres: [
          "Définitions géométriques et équations cartésiennes dans un repère orthonormé",
          "Intersection d'une droite et d'une conique ; tangentes à une conique",
          "Réduction par translation",
        ],
      },
      {
        slug: "vecteurs-produit-scalaire",
        titre: "Vecteurs et produit scalaire",
        statut: "a-venir",
        sousChapitres: [
          "Vecteurs et calcul vectoriel dans le plan et dans l'espace",
          "Produit scalaire dans le plan et dans l'espace, propriétés",
        ],
      },
      {
        slug: "lieux-geometriques",
        titre: "Lieux géométriques",
        statut: "a-venir",
        sousChapitres: ["Médiatrice, bissectrice, cercle, parabole, ellipse, hyperbole"],
      },
      {
        slug: "analytique-espace",
        titre: "Géométrie analytique dans l'espace",
        statut: "a-venir",
        sousChapitres: [
          "Équations vectorielles, paramétriques et cartésiennes d'un plan, d'une droite",
          "Équation du plan par la notion de déterminant",
          "Distances : entre deux points, d'un point à une droite, d'un point à un plan",
          "Problèmes d'intersections ; orthogonalité et parallélisme",
        ],
      },
    ],
  },
]

export function getChapitre(slug) {
  for (const matiere of programme) {
    const chapitre = matiere.chapitres.find((c) => c.slug === slug)
    if (chapitre) return { matiere, chapitre }
  }
  return null
}
