import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import destinations from '../data/destinations.json'

const photos = [destinations[4], destinations[1], destinations[3], destinations[2], destinations[6]]

export default function GallerySection() {
  const [active, setActive] = useState(null)
  const closeButtonRef = useRef(null)
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)
  const activeRef = useRef(active)
  const reduceMotion = useReducedMotion()
  activeRef.current = active

  useEffect(() => {
    if (active === null) return undefined

    const previousFocus = triggerRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setActive(null)
      } else if (event.key === 'ArrowLeft') {
        setActive(index => (index + photos.length - 1) % photos.length)
      } else if (event.key === 'ArrowRight') {
        setActive(index => (index + 1) % photos.length)
      } else if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [active !== null])

  const openPhoto = (index, event) => {
    triggerRef.current = event.currentTarget
    setActive(index)
  }

  return (
    <section className="gallery section-pad" id="gallery">
      <div className="section-heading" data-reveal>
        <div><p className="eyebrow">A GLIMPSE OF THE JOURNEY</p><h2>Moments of <em>stillness.</em></h2></div>
        <p className="heading-aside">A few impressions from the sacred landscapes and shared moments that make every journey its own.</p>
      </div>
      <div className="gallery-grid">
        {photos.map((place, index) => (
          <button
            key={place.credit}
            className={`gallery-photo gallery-photo-${index + 1}`}
            onClick={event => openPhoto(index, event)}
            aria-label={`View photo: ${place.name}`}
          >
            <img src={place.image} alt={`${place.name} temple and sacred place`} loading="lazy" decoding="async" />
            <span>{place.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            ref={dialogRef}
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : .2 }}
            onClick={() => setActive(null)}
          >
            <button ref={closeButtonRef} className="lightbox-close" aria-label="Close gallery" onClick={() => setActive(null)}><X aria-hidden="true" /></button>
            <button className="lightbox-prev" aria-label="Previous image" onClick={event => { event.stopPropagation(); setActive(index => (index + photos.length - 1) % photos.length) }}><ArrowLeft aria-hidden="true" /></button>
            <motion.img
              key={active}
              src={photos[active].image}
              alt={`${photos[active].name} temple and sacred place`}
              initial={reduceMotion ? false : { scale: .96 }}
              animate={{ scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : .2 }}
              onClick={event => event.stopPropagation()}
            />
            <button className="lightbox-next" aria-label="Next image" onClick={event => { event.stopPropagation(); setActive(index => (index + 1) % photos.length) }}><ArrowRight aria-hidden="true" /></button>
            <p aria-live="polite">{photos[active].name} <span> · {String(active + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span></p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
