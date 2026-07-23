import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"

export default function TestConnexion() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [session, setSession] = useState(null)
  const [resultat, setResultat] = useState("")

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  async function envoyerLien() {
    setMessage("Envoi en cours...")
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + "/test-connexion" },
    })
    setMessage(error ? "Erreur : " + error.message : "Lien envoye. Regarde ta boite mail.")
  }

  async function testerLecture(table) {
    const { data, error } = await supabase.from(table).select("*")
    setResultat(
      table + " : " + (error ? "erreur : " + error.message : data.length + " ligne(s)")
    )
  }

  if (!session) {
    return (
      <div style={{ padding: 40, fontFamily: "monospace" }}>
        <h1>Test de connexion</h1>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.be"
          style={{ padding: 8, width: 260 }}
        />
        <button onClick={envoyerLien} style={{ padding: 8, marginLeft: 8 }}>
          Recevoir le lien
        </button>
        <p>{message}</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 40, fontFamily: "monospace" }}>
      <h1>Connecte</h1>
      <p>Email : {session.user.email}</p>
      <p>Identifiant : {session.user.id}</p>

      <h2>Test des regles d'acces</h2>
      <button onClick={() => testerLecture("solutions")} style={{ padding: 8 }}>
        Lire solutions
      </button>
      <button onClick={() => testerLecture("exercices")} style={{ padding: 8, marginLeft: 8 }}>
        Lire exercices
      </button>
      <button onClick={() => testerLecture("profils")} style={{ padding: 8, marginLeft: 8 }}>
        Lire mon profil
      </button>
      <p>{resultat}</p>

      <button onClick={() => supabase.auth.signOut()} style={{ padding: 8, marginTop: 20 }}>
        Se deconnecter
      </button>
    </div>
  )
}
