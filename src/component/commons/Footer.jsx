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
  { label: 'Nutrition Counseling', to: '/services/nutrition-counseling' },
  { label: 'Fitness Training', to: '/services/fitness-training' },
  { label: 'Mental Health Therapy', to: '/services/mental-health-therapy' },
  { label: 'Wellness Coaching', to: '/services/wellness-coaching' },
  { label: 'Yoga & Meditation Classes', to: '/services/yoga-meditation' },
  { label: 'Weight Management', to: '/services/weight-management' },
  { label: 'Preventive Health Screening', to: '/services/preventive-screening' },
  { label: 'Stress Management', to: '/services/stress-management' },
  { label: 'Sleep Consultation', to: '/services/sleep-consultation' },
  { label: 'Corporate Wellness Programs', to: '/services/corporate-wellness' },
  { label: 'Online Health Coaching', to: '/services/online-coaching' },
  { label: 'Health Assessment', to: '/services/health-assessment' },
  { label: 'Chronic Disease Management', to: '/services/chronic-disease' },
  { label: 'Holistic Health Services', to: '/services/holistic-health' },
]

const WELLNESSHUB = [
  { label: 'About Us', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faqs' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Health Resources', to: '/resources' },
  { label: 'Book Appointment', to: '/book-appointment' },
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
      className="flex items-center gap-3 text-[15px] text-white/90 hover:text-white underline underline-offset-4"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/70">
        {icon}
      </span>
      <span>{children}</span>
    </a>
  )
}

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-800 via-emerald-900 to-green-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
      <div className="relative px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-36 py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          {/* Left intro column (visible on all screens) */}
          <div className="col-span-2 md:col-span-12 lg:col-span-3">
            <div className="flex items-center gap-4 mb-6">
              {/* <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-emerald-50 shadow-xl">
                <img src="/logo.jpeg" alt="WellnessHub" className="h-12 w-auto object-contain" />
              </span> */}
              <div>
                <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-lime-200">WellnessHub</h3>
                <div className="mt-1 text-sm leading-6 text-lime-100">
                  <div className="font-semibold">info@wellnesshub.com</div>
                  <div className="font-semibold">+1(800)WELLNESS</div>
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-6 text-white/85">
              Established in 2020 with a health-first vision, we have helped over
              15,000+ individuals achieve their wellness goals. Our mission is to provide
              comprehensive health and wellness solutions, ensuring a holistic approach to
              physical, mental, and emotional wellbeing throughout your health journey.
            </p>
          </div>

          {/* Services (visible on all screens) */}
          <div className="col-span-2 md:col-span-6 lg:col-span-3">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="mt-4 space-y-2 text-[15px]">
              {SERVICES.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className="text-sm font-medium hover:text-lime-200 transition-colors duration-300">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* WellnessHub */}
          <div className="col-span-1 md:col-span-6 lg:col-span-2 lg:max-w-[280px]">
            <h4 className="text-lg font-semibold">WellnessHub</h4>
            <ul className="mt-4 space-y-2 text-[15px]">
              {WELLNESSHUB.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm font-medium hover:text-lime-200 transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-2 md:col-span-6 lg:col-span-2">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="mt-4 space-y-4">
              <LinkRow icon={<Facebook className="h-4 w-4" />}>Facebook Page</LinkRow>
              <LinkRow icon={<Facebook className="h-4 w-4" />}>Facebook Group</LinkRow>

              <div className="flex flex-wrap items-center gap-3 lg:grid lg:grid-cols-3 lg:gap-4 pt-1">
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

          {/* Certifications column (right) */}
          <div className="col-span-2 md:col-span-12 lg:col-span-2 lg:max-w-[420px]">
            <h4 className="text-lg font-semibold mb-4">Certifications & Trust</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-1 gap-4">
              <div className="w-full rounded-lg bg-white shadow flex items-center justify-center md:justify-start px-4 h-14 md:h-18 lg:h-20">
                <img src="/ssl.png" alt="HIPAA Compliant" className="h-10 md:h-12 lg:h-16 w-auto object-contain" />
              </div>
              <div className="w-full rounded-lg bg-white shadow flex items-center justify-center md:justify-start px-4 h-14 md:h-18 lg:h-20">
                <img src="/cards.jpg" alt="Secure Payments" className="h-10 md:h-12 lg:h-16 w-auto object-contain" />
              </div>
              <div className="w-full rounded-lg bg-white shadow flex items-center justify-center md:justify-start px-4 h-14 md:h-18 lg:h-20">
                <img src="/payments.png" alt="Insurance Accepted" className="h-10 md:h-12 lg:h-16 w-auto object-contain" />
              </div>
              <div className="w-full rounded-lg bg-white shadow flex items-center justify-center md:justify-start px-4 h-14 md:h-18 lg:h-20">
                <img src="/trustpilot.png" alt="Trusted Reviews" className="h-10 md:h-12 lg:h-16 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-8 text-sm text-white/90">
          <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
            <div className="font-semibold">© 2020–2026 WellnessHub. All rights reserved • Empowering Health 🌿</div>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <li><Link to="#" className="font-medium hover:text-teal-200 transition-colors duration-300">Privacy Policy (HIPAA Compliant)</Link></li>
              <li><Link to="#" className="font-medium hover:text-teal-200 transition-colors duration-300">Terms of Use</Link></li>
              <li><Link to="#" className="font-medium hover:text-teal-200 transition-colors duration-300">Cancellation Policy</Link></li>
              <li><Link to="#" className="font-medium hover:text-teal-200 transition-colors duration-300">Sitemap</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer