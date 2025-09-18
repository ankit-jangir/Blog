import React from 'react'
import { Clock, Facebook as FbIcon, Twitter as XIcon, MessageCircle } from 'lucide-react'

/**
 * LeftRail — reusable left side section used on single blog and other pages.
 *
 * Props:
 * - titleLines: string[]  // up to 3 lines shown next to the badge
 * - readTime: string      // e.g. "5 MIN READ"
 * - stickyTop: number     // px offset for sticky on lg+
 * - sticky: boolean       // whether desktop rail is sticky
 * - showMobile: boolean   // show stacked mobile block (lg:hidden)
 * - showDesktop: boolean  // show sticky left rail (hidden lg:block)
 * - socials: {label:string, href:string, Icon:React.FC}[] // optional custom icons
 * - badgeInitial: string  // letter inside the green badge
 */
const LeftRail = ({
  titleLines = ['Europe Visa', 'Travel Tips', 'And Tricks'],
  readTime = '5 MIN READ',
  stickyTop = 100,
  sticky = true,
  showMobile = true,
  showDesktop = true,
  socials,
  badgeInitial = 'E',
}) => {
  const items =
    socials && socials.length
      ? socials
      : [
          { label: 'Facebook', href: '#', Icon: FbIcon },
          { label: 'Twitter', href: '#', Icon: XIcon },
          { label: 'Message', href: '#', Icon: MessageCircle },
        ]

  return (
    <>
      {showMobile && (
        <section className="mb-6 lg:hidden">
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white font-semibold">
                {badgeInitial}
              </div>
              <div className="text-[11px] font-semibold leading-tight text-slate-700 uppercase tracking-wide">
                {titleLines.map((t, i) => (
                  <div key={i}>{t}</div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Clock className="h-4 w-4" />
              <span className="text-[14px] font-semibold tracking-wide">{readTime}</span>
            </div>
            <ul className="flex flex-col items-start gap-4">
              {items.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} className="inline-flex items-center justify-center text-slate-700 hover:text-emerald-600">
                    <Icon className="h-[18px] w-[18px] md:h-5 md:w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {showDesktop && (
        <aside className="relative hidden lg:block w-[160px]">
          <div className={sticky ? 'sticky' : ''} style={sticky ? { top: `${stickyTop}px` } : undefined}>
            <div className="mb-3 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white font-semibold">
                {badgeInitial}
              </div>
              <div className="text-[12px] font-semibold leading-tight text-slate-700 uppercase tracking-wide">
                {titleLines.map((t, i) => (
                  <div key={i}>{t}</div>
                ))}
              </div>
            </div>
            <div className="mb-3 flex items-center gap-2 text-slate-700">
              <Clock className="h-4 w-4" />
              <span className="text-[14px] font-semibold tracking-wide whitespace-nowrap">{readTime}</span>
            </div>
            <ul className="flex flex-col items-start gap-4">
              {items.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} className="inline-flex items-center justify-center text-slate-700 hover:text-emerald-600">
                    <Icon className="h-[18px] w-[18px] md:h-5 md:w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </>
  )
}

export default LeftRail


