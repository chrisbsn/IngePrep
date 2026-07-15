import { Routes, Route, Navigate } from "react-router-dom"
import Landing from "./pages/Landing"
import AnnalesESA from "./pages/AnnalesESA"
import GuideEsa from "./pages/GuideEsa"
import Exercice from "./pages/Exercice"
import Chapitre from "./pages/Chapitre"
import Connexion from "./pages/Connexion"
import Inscription from "./pages/Inscription"
import TableauDeBord from "./pages/TableauDeBord"
import Matiere from "./pages/Matiere"
import AnnalesApp from "./pages/AnnalesApp"
import Compte from "./pages/Compte"
import AppShell from "./components/app/AppShell"
import { useSmoothAnchorScroll } from "./hooks/useSmoothAnchorScroll"
import { useScrollToTop } from "./hooks/useScrollToTop"

export default function App() {
  useSmoothAnchorScroll()
  useScrollToTop()

  return (
    <Routes>
      {/* Pages publiques */}
      <Route path="/" element={<Landing />} />
      <Route path="/annales" element={<AnnalesESA />} />
      <Route path="/guide-esa" element={<GuideEsa />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />

      {/* Coquille d'application (vues connectées) */}
      <Route element={<AppShell />}>
        <Route path="/tableau-de-bord" element={<TableauDeBord />} />
        <Route path="/app" element={<Navigate to="/tableau-de-bord" replace />} />
        <Route path="/app/matiere/:id" element={<Matiere />} />
        <Route path="/app/chapitre/:slug" element={<Chapitre />} />
        <Route path="/app/annales" element={<AnnalesApp />} />
        <Route path="/compte" element={<Compte />} />
      </Route>

      {/* Ancienne page exercice (hors coquille) */}
      <Route path="/app/exercice/:id" element={<Exercice />} />
    </Routes>
  )
}
