import { Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import AnnalesESA from "./pages/AnnalesESA"
import GuideEsa from "./pages/GuideEsa"
import AppHome from "./pages/AppHome"
import Exercice from "./pages/Exercice"
import Chapitre from "./pages/Chapitre"
import Connexion from "./pages/Connexion"
import Inscription from "./pages/Inscription"
import TableauDeBord from "./pages/TableauDeBord"
import { useSmoothAnchorScroll } from "./hooks/useSmoothAnchorScroll"

export default function App() {
  useSmoothAnchorScroll()

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/annales" element={<AnnalesESA />} />
      <Route path="/guide-esa" element={<GuideEsa />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/tableau-de-bord" element={<TableauDeBord />} />
      <Route path="/app" element={<AppHome />} />
      <Route path="/app/chapitre/:slug" element={<Chapitre />} />
      <Route path="/app/exercice/:id" element={<Exercice />} />
    </Routes>
  )
}
