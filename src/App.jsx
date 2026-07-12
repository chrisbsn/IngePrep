import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Hero from "./components/sections/Hero"
import Problem from "./components/sections/Problem"
import Differentiator from "./components/sections/Differentiator"
import HowItWorks from "./components/sections/HowItWorks"
import Audience from "./components/sections/Audience"
import Pricing from "./components/sections/Pricing"
import Checkout from "./components/sections/Checkout"
import Faq from "./components/sections/Faq"
import WaitlistSection from "./components/sections/WaitlistSection"
import CheckoutBanner from "./components/ui/CheckoutBanner"
import { useSmoothAnchorScroll } from "./hooks/useSmoothAnchorScroll"

export default function App() {
  useSmoothAnchorScroll()

  return (
    <>
      <CheckoutBanner />
      <Header />
      <main>
        <Hero />
        <Problem />
        <Differentiator />
        <HowItWorks />
        <Audience />
        <Pricing />
        <Checkout />
        <Faq />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  )
}
