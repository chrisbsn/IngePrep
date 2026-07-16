# Méthode de référence — AN-DER · ESA 2025 juillet · Q1.2

> ⚠️ **Brouillon de travail** — première méthode du type « dérivées ».
> Découpe atomique et signatures d'erreur à valider par Chris avant de servir de référence au correcteur.

## Bloc 1 — En-tête de classement

- **Sous-code** : AN-DER (dérivation) — teinte AN-CON (dérivabilité en un point)
- **Source** : ESA, session juillet 2025, Question 1, sous-question 2
- **Énoncé exact** : « Calculez la dérivée première de f (notée f′). » avec **f(x) = |x + 2| + e^(x/2)**

## Bloc 2 — Réponse exacte attendue

    f′(x) = 1 + ½·e^(x/2)    si x > −2
    f′(x) = −1 + ½·e^(x/2)   si x < −2
    f non dérivable en x = −2   (point anguleux)
    dom(f′) = ℝ \ {−2}

## Bloc 3 — Prérequis mobilisés

Dérivée d'une somme · dérivée d'une valeur absolue (fonction définie par cas / signe) ·
**règle de la composée** sur l'exponentielle (facteur ½) · notion de dérivabilité en un
point (dérivées latérales, point anguleux).

## Bloc 4 — Chaîne de résolution atomique

*(action · résultat intermédiaire · mécanisme nommé)*

| # | Action | Résultat | Mécanisme nommé |
|---|--------|----------|-----------------|
| 1 | Découper `|x+2|` selon le signe de x+2 | deux cas : x>−2 et x<−2 | une valeur absolue ne se dérive pas « en bloc » — l'expliciter par cas d'abord |
| 2 | Dériver ±(x+2) sur chaque cas | +1 (x>−2) ; −1 (x<−2) | dérivée de ±(x+2) = ±1, i.e. sgn(x+2) |
| 3 | Dériver e^(x/2) par la composée | **½·e^(x/2)** | (e^u)′ = u′·e^u, u = x/2 ⇒ u′ = ½ — le ½ vient de la dérivée interne |
| 4 | Sommer par cas | 1+½e^(x/2) ; −1+½e^(x/2) | dérivée d'une somme = somme des dérivées |
| 5 | Traiter x = −2 | dérivées latérales −1+½e^(−1) ≠ 1+½e^(−1) ⇒ non dérivable | dérivabilité = égalité des dérivées à gauche/droite ; saut de 2 ⇒ point anguleux |

## Bloc 5 — Points de décrochage typiques (symptômes observables) — **le cœur**

- **Étape 3 — signature n°1 (la plus fréquente)** : oubli du facteur ½ → copie affiche
  `f′ = ±1 + e^(x/2)`. Règle de la composée non appliquée, dérivée interne évaporée.
- **Étape 3 — variante** : `(e^(x/2))′ = (x/2)·e^(x/2)` → confusion avec (xⁿ)′,
  l'élève « fait descendre l'exposant » comme une puissance.
- **Étape 1/2** : ne découpe pas la valeur absolue, écrit une seule expression → pas de
  `−1` pour x<−2. Symptôme : `f′` donnée sans distinction de cas.
- **Étape 2 — variante** : traite la barre comme neutre, `|x+2|′ = 1` partout.
- **Étape 5** : calcul par cas correct mais conclut « dérivable partout » ou ne mentionne
  jamais x = −2.

## Bloc 6 — Pièges spécifiques à CETTE question

Le **point anguleux en x = −2** : beaucoup dérivent juste par cas mais oublient d'exclure /
signaler x = −2 — or c'est exactement ce que teste la sous-question 3 de l'annale. Une
réponse complète pose `dom(f′) = ℝ \ {−2}`. Piège secondaire : réécrire e^(x/2) en
manipulant mal l'exposant.

## Bloc 7 — Verdict pédagogique gradué

- **Décroche étape 3** → « Tu ne mobilises pas la règle de la composée sur l'exponentielle :
  la dérivée interne ½ disparaît. Prérequis à retravailler : dérivée de e^(u(x)). »
- **Décroche étape 1/2** → « Tu dérives la valeur absolue sans la découper par cas.
  Prérequis : fonction définie par morceaux / dérivée du signe. »
- **Calcul juste mais x = −2 oublié** → « Exact mais incomplet : une dérivée se pose sur un
  domaine — le point anguleux en −2 doit être exclu et signalé. »

---

**Pont vers le contrat JSON du correcteur** : Bloc 4 → `methode_reference.etapes[]`
(action + attendu + mécanisme) · Bloc 5 → `pieges` / signatures par étape · Bloc 7 →
`explication` du diagnostic. Le gabarit humain est la source ; le JSON en est la
sérialisation pour Opus.
