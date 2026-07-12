import { Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import AppHome from "./pages/AppHome"
import Exercice from "./pages/Exercice"
import { useSmoothAnchorScroll } from "./hooks/useSmoothAnchorScroll"

export default function App() {
  useSmoothAnchorScroll()

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<AppHome />} />
      <Route path="/app/exercice/:id" element={<Exercice />} />
    </Routes>
  )
}
