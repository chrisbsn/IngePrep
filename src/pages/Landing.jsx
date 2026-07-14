import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import Hero from "../components/sections/Hero"
import Problem from "../components/sections/Problem"
import Differentiator from "../components/sections/Differentiator"
import HowItWorks from "../components/sections/HowItWorks"
import Esa from "../components/sections/Esa"
import Audience from "../components/sections/Audience"
import Pricing from "../components/sections/Pricing"
import Faq from "../components/sections/Faq"
import WaitlistSection from "../components/sections/WaitlistSection"
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
        <Esa />
        <Audience />
        <Pricing />
        <Faq />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  )
}
