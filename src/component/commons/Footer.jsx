import React from 'react'
import { Link } from 'react-router-dom'
import {
  Facebook,
  Mail,
  MessageCircle,
  Instagram,
  Youtube,
  Linkedin,
  X,
  Music2,
  BadgeCheck,
} from 'lucide-react'

const SERVICES = [
  { label: 'OCI', to: '/services/oci' },
  { label: 'Visa', to: '/services/visa' },
  { label: 'Passport', to: '/services/passport' },
  { label: 'Surrender of Indian Passport', to: '/services/surrender-passport' },
  { label: 'PAN Card', to: '/services/pan-card' },
  { label: 'Visa Extension', to: '/services/visa-extension' },
  { label: 'Indian Consular Services', to: '/services/indian-consular' },
  { label: 'EAD Card', to: '/services/ead-card' },
  { label: 'Green Card', to: '/services/green-card' },
  { label: 'US Citizenship', to: '/services/us-citizenship' },
  { label: 'NRI Services', to: '/services/nri' },
  { label: 'Forms and Formats', to: '/services/forms' },
  { label: 'Apostille of Documents', to: '/services/apostille' },
  { label: 'Global Entry Program GEP', to: '/services/gep' },
]

const DOCUMITRA = [
  { label: 'About Us', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faqs' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Refer a Friend', to: '/refer' },
  { label: 'Request Refund', to: '/refund' },
]

function SocialIcon({ href, children, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/70 text-white/90 hover:bg-white/10"
    >
      {children}
    </a>
  )
}

function LinkRow({ href = '#', icon, children }) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 text-[15px] text-white/90 hover:text-white"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/70">
        {icon}
      </span>
      <span className="underline-offset-4 hover:underline">{children}</span>
    </a>
  )
}

const Footer = () => {
  return (
    <footer className="bg-[#0b4091] text-white">
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-36 py-10 lg:py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          {/* Left intro column */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/95 shadow">
                <img src="/logo.jpeg" alt="Documitra" className="h-10 w-auto object-contain" />
              </span>
              <div>
                <h3 className="text-xl font-semibold">Documitra</h3>
                <div className="mt-1 text-sm leading-6 text-white/90">
                  <div>info@documitra.com</div>
                  <div>+1(877)-291-1311</div>
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-6 text-white/85">
              Established in 2020 with a community-focused vision, we have hand-held over
              15,000+ applications to a high approval rate. Our mission is to provide a
              hassle-free visa, consular and NRI solution, ensuring transparency and
              peace of mind throughout your application journey.
            </p>
          </div>

          {/* Services */}
          <div className="hidden lg:block lg:col-span-3">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="mt-4 space-y-2 text-[15px]">
              {SERVICES.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className="hover:underline text-white/90 hover:text-white">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documitra */}
          <div className="col-span-1 md:col-span-6 lg:col-span-2 lg:max-w-[280px]">
            <h4 className="text-lg font-semibold">Documitra</h4>
            <ul className="mt-4 space-y-2 text-[15px]">
              {DOCUMITRA.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:underline text-white/90 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-1 md:col-span-6 lg:col-span-2">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="mt-4 space-y-4">
              <LinkRow icon={<Facebook className="h-4 w-4" />}>Facebook Page</LinkRow>
              <LinkRow icon={<Facebook className="h-4 w-4" />}>Facebook Group</LinkRow>

              <div className="grid grid-cols-6 lg:grid-cols-3 gap-3 lg:gap-4 pt-1">
                <SocialIcon href="#" label="Email">
                  <Mail className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href="#" label="WhatsApp">
                  <MessageCircle className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href="#" label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href="#" label="Instagram">
                  <Instagram className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href="#" label="YouTube">
                  <Youtube className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href="#" label="X">
                  <X className="h-4 w-4" />
                </SocialIcon>
              </div>
            </div>
          </div>

          {/* Badges column (right) */}
          <div className="col-span-2 md:col-span-12 lg:col-span-1 lg:max-w-[300px]">
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-1 gap-4">
              <div className="w-full rounded-lg bg-white shadow flex items-center justify-center md:justify-start px-4 h-16 md:h-20 lg:h-24">
                <img src="/ssl.png" alt="Secure SSL" className="h-10 md:h-12 lg:h-16 w-auto object-contain" />
              </div>
              <div className="w-full rounded-lg bg-white shadow flex items-center justify-center md:justify-start px-4 h-16 md:h-20 lg:h-24">
                <img src="/cards.jpg" alt="Cards Supported" className="h-10 md:h-12 lg:h-16 w-auto object-contain" />
              </div>
              <div className="w-full rounded-lg bg-white shadow flex items-center justify-center md:justify-start px-4 h-16 md:h-20 lg:h-24">
                <img src="/payments.png" alt="Paytm / PhonePe" className="h-10 md:h-12 lg:h-16 w-auto object-contain" />
              </div>
              <div className="w-full rounded-lg bg-white shadow flex items-center justify-center md:justify-start px-4 h-16 md:h-20 lg:h-24">
                <img src="/upi.png" alt="UPI Supported" className="h-10 md:h-12 lg:h-16 w-auto object-contain" />
              </div>
              <div className="w-full rounded-lg bg-white shadow flex items-center justify-center md:justify-start px-4 h-16 md:h-20 lg:h-24">
                <img src="/trustpilot.png" alt="Trustpilot" className="h-10 md:h-12 lg:h-16 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-sm text-white/80">
          <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
            <div>© 2020–2026. All rights reserved</div>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <li><Link to="#" className="hover:underline">Privacy Policy and Cookies</Link></li>
              <li><Link to="#" className="hover:underline">Terms of Use</Link></li>
              <li><Link to="#" className="hover:underline">Refund Policy</Link></li>
              <li><Link to="#" className="hover:underline">Sitemap</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer