import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const transitionLayers = []
  const ctx = gsap.context(() => {
    gsap.utils.toArray('[data-reveal]').forEach(el => {
      gsap.fromTo(el, { y: 28, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: .85,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })

    gsap.fromTo('.destination-card', { y: 35, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: .75,
      stagger: .11,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.destination-grid', start: 'top 82%', once: true },
    })

    gsap.to('.hero-image', {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    })

    // Each following section opens with a brief Om reveal before its content is uncovered.
    document.querySelectorAll('main > section:not(.hero), footer').forEach(section => {
      const layer = document.createElement('div')
      layer.className = 'section-om-transition'
      layer.setAttribute('aria-hidden', 'true')
      const starfield = Array.from({ length: 14 }, (_, i) => {
        const x = 7 + ((i * 37) % 87)
        const y = 13 + ((i * 23) % 73)
        return `<i style="--x:${x}%;--y:${y}%;--delay:${(i % 6) * -.21}s"></i>`
      }).join('')
      layer.innerHTML = `<div class="section-om-particles">${starfield}</div><span class="section-om-symbol">ॐ</span>`
      section.appendChild(layer)
      transitionLayers.push(layer)

      const symbol = layer.querySelector('.section-om-symbol')
      const revealOm = () => {
        gsap.killTweensOf([layer, symbol])
        gsap.set(layer, { autoAlpha: 1 })
        gsap.set(symbol, { autoAlpha: 0, scale: .72, rotate: -14 })
        gsap.timeline()
          .to(symbol, { autoAlpha: 1, scale: 1, rotate: 0, duration: .55, ease: 'power2.out' })
          .to(layer, { autoAlpha: 0, duration: .65, ease: 'power2.inOut' }, '+=.18')
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top 78%',
        onEnter: revealOm,
        onEnterBack: revealOm,
      })
    })
  })

  return () => {
    ctx.revert()
    transitionLayers.forEach(layer => layer.remove())
  }
}
