import "./HeroMockup.css"

const DEFAULTS = {
  exerciceLabel: "Exercice 3 · Analyse",
  enonce: "lim (x→2) (x² − 4)/(x − 2) = ?",
  demarche: "Je remplace x par 2 → 0/0, donc la limite n'existe pas.",
  diagnosticLead: "Forme indéterminée ≠ limite inexistante.",
  diagnosticRest:
    " Quand tu tombes sur 0/0, il faut factoriser. Ici : (x²−4) = (x−2)(x+2). Après simplification, la limite vaut 4.",
}

export default function HeroMockup({
  exerciceLabel = DEFAULTS.exerciceLabel,
  enonce = DEFAULTS.enonce,
  demarche = DEFAULTS.demarche,
  diagnosticLead = DEFAULTS.diagnosticLead,
  diagnosticRest = DEFAULTS.diagnosticRest,
}) {
  return (
    <div className="hero-mockup" aria-hidden="true">
      <div className="hero-mockup__titlebar">
        <div className="hero-mockup__titlebar-left">
          <span className="hero-mockup__logo-mark" />
          <span className="hero-mockup__product-name">Cap Ingé</span>
        </div>
        <span className="hero-mockup__status-badge">En analyse</span>
      </div>

      <div className="hero-mockup__block">
        <p className="hero-mockup__label">{exerciceLabel}</p>
        <p className="hero-mockup__enonce">{enonce}</p>
      </div>

      <div className="hero-mockup__block">
        <p className="hero-mockup__label">Ta démarche</p>
        <p className="hero-mockup__demarche">{demarche}</p>
      </div>

      <div className="hero-mockup__diagnostic">
        <div className="hero-mockup__diagnostic-header">
          <span className="hero-mockup__diagnostic-dot" />
          <span className="hero-mockup__diagnostic-label">Diagnostic</span>
        </div>
        <p className="hero-mockup__diagnostic-text">
          <span className="hero-mockup__diagnostic-lead">{diagnosticLead}</span>
          {diagnosticRest}
        </p>
      </div>
    </div>
  )
}
