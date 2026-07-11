import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Hero from "./components/sections/Hero"
import Problem from "./components/sections/Problem"
import Differentiator from "./components/sections/Differentiator"
import HowItWorks from "./components/sections/HowItWorks"
import Audience from "./components/sections/Audience"
import Pricing from "./components/sections/Pricing"
import Faq from "./components/sections/Faq"
import WaitlistSection from "./components/sections/WaitlistSection"
import { useSmoothAnchorScroll } from "./hooks/useSmoothAnchorScroll"

export default function App() {
  useSmoothAnchorScroll()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Differentiator />
        <HowItWorks />
        <Audience />
        <Pricing />
        <Faq />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  )
}
