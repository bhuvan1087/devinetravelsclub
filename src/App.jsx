import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import HeroSection from './components/HeroSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import DestinationsSection from './components/DestinationsSection.jsx'
import ExperiencesSection from './components/ExperiencesSection.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'
import GallerySection from './components/GallerySection.jsx'
import TestimonialsSection from './components/TestimonialsSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import Footer from './components/Footer.jsx'
import { initScrollAnimations } from './animations/animations.js'

export default function App() {
  useEffect(() => initScrollAnimations(), [])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="site-om-watermark" aria-hidden="true">ॐ</div>
      <Navbar />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <DestinationsSection />
        <ExperiencesSection />
        <WhyChooseUs />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
