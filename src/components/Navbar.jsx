import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Sun, X } from 'lucide-react'

const links = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Destinations', 'destinations'],
  ['Experiences', 'experiences'],
  ['Gallery', 'gallery'],
  ['Contact', 'contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 24)
    const closeOnEscape = event => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <header className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      <a className="brand" href="#home" aria-label="Divine Souls Club home">
        <span className="brand-mark" aria-hidden="true"><Sun size={21} strokeWidth={1.4} /></span>
        <span>DIVINE SOULS <i>CLUB</i></span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <a className="nav-cta" href="#contact">Plan your journey <span aria-hidden="true">↗</span></a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(value => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: .2 }}
          >
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}<span aria-hidden="true">↗</span></a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
