// Clavier mathématique guidé, inspiré du clavier GeoGebra : 4 onglets
// (123, f(x), ABC, #&¬). Les touches insèrent un modèle à la position du
// curseur dans la zone de rédaction. La saisie au clavier reste possible.
import { useState } from "react"
import "./ClavierMath.css"

// t(label, insere, curseur) — `curseur` : décalage depuis la fin du texte inséré,
// pour placer le curseur À L'INTÉRIEUR du modèle (ex. entre les parenthèses).
const t = (label, insere, curseur = 0, aria) => ({ label, insere, curseur, aria: aria || label })

// Touches spéciales, traitées à part (pas d'insertion simple).
const RETOUR = { special: "retour", label: "⌫", aria: "Effacer" }
const GAUCHE = { special: "gauche", label: "‹", aria: "Curseur à gauche" }
const DROITE = { special: "droite", label: "›", aria: "Curseur à droite" }
const ENTREE = { special: "entree", label: "↵", aria: "Nouvelle ligne" }
const MAJ = { special: "maj", label: "⇧", aria: "Majuscules" }
const ESPACE = { special: "espace", label: "", aria: "Espace", large: true }

const ONGLETS = [
  {
    id: "123",
    label: "123",
    gauche: {
      colonnes: 4,
      touches: [
        t("x", "x"), t("y", "y"), t("z", "z"), t("π", "π", 0, "Pi"),
        t("x²", "^2", 0, "Carré"), t("xⁿ", "^()", -1, "Exposant"), t("√", "√()", -1, "Racine carrée"), t("e", "e"),
        t("<", " < "), t(">", " > "), t("a⁄b", "()/()", -4, "Fraction"), t("ⁿ√", "racine(, )", -3, "Racine n-ième"),
        t("(", "()", -1, "Parenthèses"), t(")", ")"), t("|x|", "||", -1, "Valeur absolue"), t(",", ", "),
      ],
    },
    droite: {
      colonnes: 5,
      touches: [
        t("7", "7"), t("8", "8"), t("9", "9"), t("×", "·", 0, "Multiplier"), t("÷", "/", 0, "Diviser"),
        t("4", "4"), t("5", "5"), t("6", "6"), t("+", " + "), t("−", " − ", 0, "Moins"),
        t("1", "1"), t("2", "2"), t("3", "3"), t("=", " = "), RETOUR,
        t("0", "0"), t(".", "."), GAUCHE, DROITE, ENTREE,
      ],
    },
  },
  {
    id: "fx",
    label: "f(x)",
    gauche: {
      colonnes: 3,
      touches: [
        t("sin", "sin()", -1), t("cos", "cos()", -1), t("tan", "tan()", -1),
        t("sin⁻¹", "arcsin()", -1, "Arc sinus"), t("cos⁻¹", "arccos()", -1, "Arc cosinus"), t("tan⁻¹", "arctan()", -1, "Arc tangente"),
        t("ln", "ln()", -1), t("log₁₀", "log()", -1, "Logarithme décimal"), t("logₐ", "log_()()", -3, "Logarithme en base a"),
        t("eˣ", "e^()", -1, "Exponentielle"), t("10ˣ", "10^()", -1, "Puissance de 10"), t("ⁿ√", "racine(, )", -3, "Racine n-ième"),
      ],
    },
    droite: {
      colonnes: 4,
      touches: [
        t("%", "%"), t("!", "!", 0, "Factorielle"), t("∞", "∞", 0, "Infini"), t("°", "°", 0, "Degré"),
        t("{", "{}", -1, "Accolades"), t("}", "}"), t("≤", " ≤ "), t("≥", " ≥ "),
        t("d⁄dx", "d/dx()", -1, "Dérivée"), t("∫", "∫", 0, "Intégrale"), t("lim", "lim()", -1, "Limite"), RETOUR,
        t("xₙ", "_()", -1, "Indice"), t("→", " → ", 0, "Tend vers"), GAUCHE, DROITE,
      ],
    },
  },
  {
    id: "abc",
    label: "ABC",
    clavier: [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      [MAJ, "z", "x", "c", "v", "b", "n", "m", RETOUR],
      [t("αβγ", "α", 0, "Lettres grecques"), t(",", ", "), t("(", "()", -1), t(")", ")"), ESPACE, GAUCHE, DROITE, ENTREE],
    ],
  },
  {
    id: "symboles",
    label: "#&¬",
    gauche: {
      colonnes: 5,
      touches: [
        t("∞", "∞", 0, "Infini"), t("≠", " ≠ ", 0, "Différent"), t("∧", " ∧ ", 0, "Et"), t("∨", " ∨ ", 0, "Ou"), t("¬", "¬", 0, "Non"),
        t("∈", " ∈ ", 0, "Appartient à"), t("∉", " ∉ ", 0, "N'appartient pas"), t("⊂", " ⊂ ", 0, "Inclus"), t("∪", " ∪ ", 0, "Union"), t("∩", " ∩ ", 0, "Intersection"),
        t("ℝ", "ℝ", 0, "Réels"), t("ℕ", "ℕ", 0, "Naturels"), t("ℤ", "ℤ", 0, "Entiers"), t("∅", "∅", 0, "Ensemble vide"), t("∀", "∀", 0, "Pour tout"),
        t("[", "[]", -1, "Crochets"), t("]", "]"), t("⊥", " ⊥ ", 0, "Perpendiculaire"), t("∥", " ∥ ", 0, "Parallèle"), t("∠", "∠", 0, "Angle"),
      ],
    },
    droite: {
      colonnes: 4,
      touches: [
        t("±", " ± ", 0, "Plus ou moins"), t("≈", " ≈ ", 0, "Environ"), t("⇒", " ⇒ ", 0, "Implique"), t("⇔", " ⇔ ", 0, "Équivaut"),
        t("′", "′", 0, "Prime"), t("″", "″", 0, "Seconde"), t("Δ", "Δ", 0, "Delta"), t("∂", "∂", 0, "Dérivée partielle"),
        t(";", " ; "), t(":", " : "), t("∃", "∃", 0, "Il existe"), RETOUR,
        t("α", "α"), t("β", "β"), GAUCHE, DROITE,
      ],
    },
  },
]

export default function ClavierMath({ champRef, onInsertion, desactive }) {
  const [ongletActif, setOngletActif] = useState("123")
  const [majuscule, setMajuscule] = useState(false)

  const onglet = ONGLETS.find((o) => o.id === ongletActif)

  function appliquer(touche) {
    const champ = champRef.current
    if (!champ || desactive) return

    const debut = champ.selectionStart ?? champ.value.length
    const fin = champ.selectionEnd ?? champ.value.length
    const valeur = champ.value

    let nouvelleValeur = valeur
    let nouvellePosition = debut

    if (touche.special === "retour") {
      if (debut !== fin) {
        nouvelleValeur = valeur.slice(0, debut) + valeur.slice(fin)
        nouvellePosition = debut
      } else if (debut > 0) {
        nouvelleValeur = valeur.slice(0, debut - 1) + valeur.slice(debut)
        nouvellePosition = debut - 1
      }
    } else if (touche.special === "gauche") {
      nouvellePosition = Math.max(0, debut - 1)
    } else if (touche.special === "droite") {
      nouvellePosition = Math.min(valeur.length, fin + 1)
    } else if (touche.special === "maj") {
      setMajuscule((m) => !m)
      champ.focus()
      return
    } else {
      // Insertion (touche normale, espace ou entrée)
      let insere =
        touche.special === "espace" ? " " : touche.special === "entree" ? "\n" : touche.insere
      const selection = valeur.slice(debut, fin)

      // Si du texte est sélectionné et que le modèle a un "trou", on l'y place.
      if (selection && touche.curseur) {
        const point = insere.length + touche.curseur
        insere = insere.slice(0, point) + selection + insere.slice(point)
      }

      nouvelleValeur = valeur.slice(0, debut) + insere + valeur.slice(fin)
      nouvellePosition =
        debut + insere.length + (selection ? 0 : touche.curseur || 0)
    }

    if (nouvelleValeur !== valeur) onInsertion(nouvelleValeur)

    requestAnimationFrame(() => {
      champ.focus()
      champ.setSelectionRange(nouvellePosition, nouvellePosition)
    })
  }

  // Une lettre de l'onglet ABC : chaîne simple → on la transforme en touche.
  function toucheLettre(lettre) {
    const l = majuscule ? lettre.toUpperCase() : lettre
    return t(l, l)
  }

  function Touche({ touche, classe = "" }) {
    return (
      <button
        type="button"
        className={`clavier-math__touche ${classe} ${
          touche.special ? "clavier-math__touche--speciale" : ""
        } ${touche.large ? "clavier-math__touche--espace" : ""} ${
          touche.special === "maj" && majuscule ? "clavier-math__touche--active" : ""
        }`}
        onClick={() => appliquer(touche)}
        onMouseDown={(event) => event.preventDefault()} // garde le focus dans le champ
        aria-label={touche.aria}
        title={touche.aria}
        disabled={desactive}
      >
        {touche.label}
      </button>
    )
  }

  return (
    <div className="clavier-math" role="group" aria-label="Clavier mathématique">
      <div className="clavier-math__onglets" role="tablist">
        {ONGLETS.map((o) => (
          <button
            key={o.id}
            type="button"
            role="tab"
            aria-selected={ongletActif === o.id}
            className={`clavier-math__onglet ${
              ongletActif === o.id ? "clavier-math__onglet--actif" : ""
            }`}
            onClick={() => setOngletActif(o.id)}
            onMouseDown={(event) => event.preventDefault()}
            disabled={desactive}
          >
            {o.label}
          </button>
        ))}
      </div>

      {onglet.clavier ? (
        // Onglet ABC : disposition azerty/qwerty en lignes
        <div className="clavier-math__abc">
          {onglet.clavier.map((ligne, index) => (
            <div className="clavier-math__ligne" key={index}>
              {ligne.map((item, i) => {
                const touche = typeof item === "string" ? toucheLettre(item) : item
                return <Touche key={`${index}-${i}`} touche={touche} />
              })}
            </div>
          ))}
        </div>
      ) : (
        <div className="clavier-math__blocs">
          <div
            className="clavier-math__bloc"
            style={{ "--colonnes": onglet.gauche.colonnes }}
          >
            {onglet.gauche.touches.map((touche, i) => (
              <Touche key={i} touche={touche} />
            ))}
          </div>
          <div
            className="clavier-math__bloc"
            style={{ "--colonnes": onglet.droite.colonnes }}
          >
            {onglet.droite.touches.map((touche, i) => (
              <Touche key={i} touche={touche} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
