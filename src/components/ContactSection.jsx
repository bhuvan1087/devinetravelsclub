import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react'
import config from '../data/siteConfig.json'

export default function ContactSection() {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email) ? config.email : ''
  const phone = /^\+?[\d\s()-]{7,}$/.test(config.phone) ? config.phone : ''
  const whatsappNumber = config.whatsapp.replace(/\D/g, '')
  const whatsapp = config.whatsapp.startsWith('https://')
    ? config.whatsapp
    : /^\+?[\d\s()-]{7,}$/.test(config.whatsapp) && whatsappNumber
      ? `https://wa.me/${whatsappNumber}`
      : ''

  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-ornament" aria-hidden="true">ॐ</div>
      <div className="contact-content" data-reveal>
        <p className="eyebrow">YOUR NEXT CHAPTER BEGINS HERE</p>
        <h2>Begin your<br /><em>divine journey.</em></h2>
        <p>Tell us what your heart is seeking. We&apos;d love to help you find a journey that feels like your own.</p>
        {email ? (
          <a className="button button-gold" href={`mailto:${email}`}><Mail size={16} /> Make an enquiry <ArrowUpRight size={16} /></a>
        ) : (
          <span className="button button-gold button-disabled" aria-disabled="true"><Mail size={16} /> Enquiry details coming soon</span>
        )}
        <span className="contact-note">{email ? 'We look forward to hearing from you.' : 'Contact details will be added before enquiries open.'}</span>
      </div>

      <div className="contact-side">
        {whatsapp ? (
          <a href={whatsapp} target="_blank" rel="noreferrer" className="contact-detail">
            <span className="contact-icon"><MessageCircle size={17} aria-hidden="true" /></span>
            <span><small>WHATSAPP</small><strong>Message Divine Souls Club</strong></span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ) : (
          <div className="contact-detail"><span className="contact-icon"><MessageCircle size={17} aria-hidden="true" /></span><span><small>WHATSAPP</small><strong>Contact details coming soon</strong></span></div>
        )}
        {email ? (
          <a href={`mailto:${email}`} className="contact-detail"><span className="contact-icon"><Mail size={17} aria-hidden="true" /></span><span><small>EMAIL</small><strong>{email}</strong></span><ArrowUpRight size={16} aria-hidden="true" /></a>
        ) : (
          <div className="contact-detail"><span className="contact-icon"><Mail size={17} aria-hidden="true" /></span><span><small>EMAIL</small><strong>Contact details coming soon</strong></span></div>
        )}
        {phone ? (
          <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="contact-detail"><span className="contact-icon"><Phone size={17} aria-hidden="true" /></span><span><small>PHONE</small><strong>{phone}</strong></span><ArrowUpRight size={16} aria-hidden="true" /></a>
        ) : (
          <div className="contact-detail"><span className="contact-icon"><Phone size={17} aria-hidden="true" /></span><span><small>PHONE</small><strong>Contact details coming soon</strong></span></div>
        )}
        <div className="contact-location">
          <span className="eyebrow">BASED IN</span>
          <p>India <span>·</span> Travelling wherever devotion calls</p>
        </div>
      </div>
    </section>
  )
}
