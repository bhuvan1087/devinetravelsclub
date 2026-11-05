import { ArrowUpRight } from 'lucide-react'
import imageCredits from '../data/imageCredits.json'
import siteConfig from '../data/siteConfig.json'

const socialProfiles = [
  { label: 'Instagram', href: siteConfig.instagram },
  { label: 'Facebook', href: siteConfig.facebook },
  { label: 'YouTube', href: siteConfig.youtube },
]

function SocialIcon({ name }) {
  if (name === 'Instagram') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle fill="currentColor" stroke="none" cx="17.7" cy="6.6" r="1"/></svg>
  if (name === 'Facebook') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H8.3v3.1H11v8z"/></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.3 7.1a2.5 2.5 0 0 0-1.8-1.8C17.9 4.9 12 4.9 12 4.9s-5.9 0-7.5.4a2.5 2.5 0 0 0-1.8 1.8 26 26 0 0 0-.4 4.9 26 26 0 0 0 .4 4.9 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.5.4 7.5.4s5.9 0 7.5-.4a2.5 2.5 0 0 0 1.8-1.8 26 26 0 0 0 .4-4.9 26 26 0 0 0-.4-4.9ZM10 15.2V8.8l5.5 3.2z"/></svg>
}

export default function Footer() {
  const activeProfiles = socialProfiles.filter(({ href }) => href)

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand-column">
          <a className="brand footer-brand" href="#home">
            <span className="brand-mark" aria-hidden="true">✳</span>
            <span>DIVINE SOULS <i>CLUB</i></span>
          </a>
          <p className="footer-mantra">Journeys for the soul.<br /><span>Made with reverence in India.</span></p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <h2>Explore</h2>
          <a href="#about">Our story</a>
          <a href="#destinations">Destinations</a>
          <a href="#experiences">Experiences</a>
          <a href="#contact">Enquire <ArrowUpRight size={13} aria-hidden="true" /></a>
        </nav>

        <div className="footer-social">
          <h2>Stay connected</h2>
          <div className="socials" aria-label="Social media">
            {socialProfiles.map(({ label, href }) => (
              href ? (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                  <SocialIcon name={label} />
                </a>
              ) : (
                <span key={label} className="social-disabled" aria-label={`${label} profile coming soon`} title={`${label} profile coming soon`}>
                  <SocialIcon name={label} />
                </span>
              )
            ))}
          </div>
          {activeProfiles.length === 0 && <p className="social-note">Official social profiles coming soon</p>}
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Divine Souls Club. All rights reserved.</span>
        <span className="footer-signoff">TRAVEL WITH REVERENCE <b aria-hidden="true">✳</b></span>
        <a href="#home">BACK TO TOP ↑</a>
      </div>

      <details className="image-credits">
        <summary>Image credits and licenses</summary>
        <ul>{imageCredits.map(item => <li key={item.id}><a href={item.sourceUrl} target="_blank" rel="noreferrer">{item.name}</a> — {item.author}, <a href={item.licenseUrl} target="_blank" rel="noreferrer">{item.license}</a></li>)}</ul>
      </details>
    </footer>
  )
}
