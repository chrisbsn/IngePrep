import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import Hero from "../components/sections/Hero"
import Problem from "../components/sections/Problem"
import Differentiator from "../components/sections/Differentiator"
import Credibility from "../components/sections/Credibility"
import InfoESA from "../components/sections/InfoESA"
import HowItWorks from "../components/sections/HowItWorks"
import Pricing from "../components/sections/Pricing"
import Faq from "../components/sections/Faq"
import CheckoutBanner from "../components/ui/CheckoutBanner"

export default function Landing() {
  return (
    <>
      <CheckoutBanner />
      <Header />
      <main>
        <Hero />
        <Problem />
        <Differentiator />
        <Credibility />
        <InfoESA />
        <HowItWorks />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
