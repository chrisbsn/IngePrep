import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import Hero from "../components/sections/Hero"
import Problem from "../components/sections/Problem"
import Differentiator from "../components/sections/Differentiator"
import HowItWorks from "../components/sections/HowItWorks"
import Credibility from "../components/sections/Credibility"
import Audience from "../components/sections/Audience"
import Pricing from "../components/sections/Pricing"
import Faq from "../components/sections/Faq"
import InfoESA from "../components/sections/InfoESA"
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
        <HowItWorks />
        <Credibility />
        <Audience />
        <Pricing />
        <Faq />
        <InfoESA />
      </main>
      <Footer />
    </>
  )
}
