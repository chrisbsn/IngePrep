import { useState } from "react"
import Button from "../ui/Button"
import { useWaitlist } from "./useWaitlist"
import "./WaitlistForm.css"

const ROLES = [
  { value: "rheto", label: "Élève de rhéto" },
  { value: "prepa", label: "Étudiant·e en année de préparation" },
  { value: "autre", label: "Autre" },
]

export default function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState(ROLES[0].value)
  const { status, submit } = useWaitlist()

  function handleSubmit(event) {
    event.preventDefault()
    if (!email) return
    submit({ email, role })
  }

  if (status === "success") {
    return (
      <div className="waitlist-form waitlist-form--success">
        <span className="waitlist-form__success-icon" aria-hidden="true">✓</span>
        <div>
          <p className="waitlist-form__success-title">Tu es sur la liste !</p>
          <p className="waitlist-form__success-text">
            On t'écrira à {email} dès que le tarif de lancement et la date d'accès anticipé seront confirmés.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      className="waitlist-form"
      name="waitlist"
      onSubmit={handleSubmit}
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value="waitlist" />
      <div className="waitlist-form__row">
        <label className="visually-hidden" htmlFor="waitlist-email">Adresse email</label>
        <input
          id="waitlist-email"
          type="email"
          name="email"
          required
          placeholder="ton.email@exemple.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="waitlist-form__input"
        />
        <select
          className="waitlist-form__select"
          name="role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          aria-label="Ton profil"
        >
          {ROLES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Button type="submit" size="md" disabled={status === "submitting"}>
          {status === "submitting" ? "Envoi..." : "Je m'inscris"}
        </Button>
      </div>
      <p className="waitlist-form__disclaimer">
        On ne t'enverra que des nouvelles de IngePrep. Désinscription en un clic à tout moment.
      </p>
    </form>
  )
}
