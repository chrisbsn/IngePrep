import { Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import AppHome from "./pages/AppHome"
import Exercice from "./pages/Exercice"
import Chapitre from "./pages/Chapitre"
import Connexion from "./pages/Connexion"
import TableauDeBord from "./pages/TableauDeBord"
import { useSmoothAnchorScroll } from "./hooks/useSmoothAnchorScroll"

export default function App() {
  useSmoothAnchorScroll()

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/tableau-de-bord" element={<TableauDeBord />} />
      <Route path="/app" element={<AppHome />} />
      <Route path="/app/chapitre/:slug" element={<Chapitre />} />
      <Route path="/app/exercice/:id" element={<Exercice />} />
    </Routes>
  )
}
