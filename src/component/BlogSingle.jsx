import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Header from './commons/Header'
import Footer from './commons/Footer'
import BackToTop from './commons/BackToTop'
import RightSidebar from './commons/RightSidebar'
import { Link } from 'react-router-dom'
import { Facebook as FbIcon, Twitter as XIcon, MessageCircle, Copy } from 'lucide-react'
import { FEATURED as SIDEBAR_FEATURED, TOP_WEEK as SIDEBAR_TOP_WEEK, CATEGORIES as SIDEBAR_CATEGORIES, TAGS as SIDEBAR_TAGS } from './data/rightSidebar'

function deriveCategoryFromSlug(slug) {
  if (!slug) return 'Travel Tips'
  const s = String(slug).toLowerCase()
  if (s.includes('passport')) return 'Passport Services'
  if (s.includes('oci')) return 'OCI Card Services'
  if (s.includes('legal') || s.includes('nri')) return 'Legal & Financial Insights for NRI'
  if (s.includes('europe')) return 'Europe Visa Travel Tips and Tricks'
  if (s.includes('indian-visa') || s.includes('e-visa') || s.includes('visa')) return 'Indian Visa Travel Tips and Tricks'
  if (s.includes('apostille')) return 'Apostille and Attestation'
  return 'Travel Tips'
}

function toTitle(str) {
  const s = String(str || '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return s
    .split(' ')
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
    .join(' ')
}

function getCoverFromSlug(slug) {
  const s = String(slug || '').toLowerCase()
  if (s.includes('beach'))
    return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop'
  if (s.includes('passport'))
    return 'https://mlvrpw5wpdmq.i.optimole.com/w:1160/h:680/q:mauto/rt:fill/g:ce/ig:avif/https://documitra.com/blog/wp-content/uploads/2025/07/How-to-Expedite-Your-Indian-Passport-Renewal-in-the-USA-A-Comprehensive-Guide.webp'
  if (s.includes('oci'))
    return 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1600&auto=format&fit=crop'
  if (s.includes('visa'))
    return 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1600&auto=format&fit=crop'
  return 'https://picsum.photos/seed/single/1600/900'
}

const BlogSingle = () => {
  const { slug } = useParams()
  const location = useLocation()
  // Left rail removed per request
  const postTitle = toTitle(slug || 'Blog Post')
  const cover = getCoverFromSlug(slug)
  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://documitra.com/blog/${slug || ''}`
  const [copied, setCopied] = React.useState(false)
  const meta = React.useMemo(() => {
    const all = [...SIDEBAR_FEATURED, ...SIDEBAR_TOP_WEEK]
    const found = all.find((it) => (it.to || '').split('/').filter(Boolean).pop() === slug)
    const stateAuthor = location.state && location.state.author
    const stateDate = location.state && location.state.date
    const author = stateAuthor || found?.author || 'Anvit'
    const date = stateDate || found?.date || 'July 28, 2025'
    const authorSlug = author.toLowerCase()
    return { author, date, authorSlug }
  }, [slug, location.state])
  function handleCopy() {
    try {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      window.scrollTo(0, 0)
    }
  }, [slug])
  return (
    <div className="w-full">
      <Header />
      <main className="mx-auto max-w-7xl px-1 py-10 sm:px-6 lg:px-1">
        {/* Content + right sidebar (left rail removed) */}
        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_320px] lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="bg-white">
            <div className="pt-0 px-0">
              <h1 className="text-slate-900 font-bold leading-tight tracking-tight text-[40px] md:text-[50px]">{postTitle}</h1>
              <div className="mt-1 flex items-center gap-3 text-slate-500">
                <Link to={`/author/${meta.authorSlug}`} className="font-semibold text-slate-700 hover:text-emerald-500 transition-colors">{meta.author}</Link>
                <span className="text-sm">{meta.date}</span>
              </div>
            </div>
            <img src={cover} alt={postTitle} className="mt-4 h-auto w-full rounded-2xl object-cover" loading="lazy" />
            <div className="px-5 pt-6 pb-10 lg:px-1">
              <div className="prose max-w-none text-[18px] leading-8 text-slate-800 md:text-[19px] md:leading-9">
                <p>
                  The world, and bask in the serenity only nature can offer? Missing out on the world's best beaches is
                  more than just a lost travel opportunity—it's forgoing the chance to experience life‑altering beauty
                  and tranquility. Imagine yourself enveloped by the whispering waves, walking on sands so fine they
                  slip through your fingers like silk, under skies painted with the colors of dreams.
                </p>
                <p>
                  Let me take you on a journey to some of Europe's most enchanting and secluded beaches, where every
                  grain of sand tells a story and every breeze carries a promise of adventure.
                </p>
                <ol className="mt-6 list-decimal space-y-6 pl-6 text-slate-800">
                  <li>Norway</li>
                  <li>Iceland</li>
                  <li>United Kingdom</li>
                  <li>Ireland</li>
                  <li>Denmark</li>
                  <li>France</li>
                  <li>Portugal</li>
                  <li>Spain</li>
                  <li>Greece</li>
                  <li>Italy</li>
                </ol>
                <ol start={11} className="mt-6 list-decimal space-y-6 pl-6 text-slate-800">
                  <li>Montenegro</li>
                  <li>Cyprus</li>
                  <li>Croatia</li>
                </ol>

                <ul className="mt-8 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Haukland Beach, Norway</li>
                </ul>
                <p className="mt-3">
                  Picture the Lofoten Islands, rising majestically from the Norwegian Sea like the spine of a mythical
                  dragon. Haukland Beach, with its jagged granite peaks piercing the sky, offers a surreal experience.
                  Here, creamy sands meet sapphire waters, which remain a brisk 15°C (59°F) even in summer. The allure
                  of the Arctic setting, whether illuminated by the midnight sun or dancing Northern Lights, is simply
                  irresistible.
                </p>

                <ul className="mt-6 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Rauðasandur, Iceland</li>
                </ul>
                <p className="mt-3">
                  The journey to Rauðasandur in Iceland’s Westfjords is as breathtaking as the destination. This vast,
                  windswept beach, formed by crushed scallop shells, offers an otherworldly landscape of bronze sands
                  and wild seas. Nearby, the Látrabjarg cliffs are a haven for seabirds and seals, adding to the area’s
                  rugged allure.
                </p>

                <h3 className="mt-10 text-[20px] font-extrabold uppercase text-slate-900">United Kingdom:</h3>
                <ul className="mt-4 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">West Beach, Scotland</li>
                </ul>
                <p className="mt-3">
                  In the wild expanse of the Outer Hebrides, West Beach on Berneray Island stands as a testament to
                  nature’s untouched beauty. This 5km (3‑mile) stretch of white sand, bordered by wind‑bent machair
                  grasses, offers solitude and tranquility. With only seabirds and the occasional porpoise for company,
                  it’s a place to reconnect with the earth and sea.
                </p>
                <ul className="mt-6 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Barafundle Bay, Wales</li>
                </ul>
                <p className="mt-3">
                  A scenic walk over the gorse‑cloaked clifftops of the Pembrokeshire Coast Path leads to the magical
                  Barafundle Bay. This secluded cove, with its arc of butterscotch sand and clear turquoise waters,
                  frequently tops the list of the UK’s finest beaches. Visit outside the busy summer weekends to truly
                  appreciate its unspoiled beauty.
                </p>
                <ul className="mt-6 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Keem Bay, Ireland</li>
                </ul>
                <p className="mt-3">
                  Keem Bay on Achill Island is a hidden treasure along Ireland’s Wild Atlantic Way. This secluded
                  half‑moon bay of golden sand, backed by steep cliffs and grassy slopes, offers a rugged, unspoiled
                  beauty. On calm days, basking sharks can sometimes be seen offshore, adding to the bay’s wild charm.
                </p>

                <ul className="mt-8 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Dueodde, Denmark</li>
                </ul>
                <p className="mt-3">
                  Dueodde Beach on the Danish island of Bornholm is a dreamlike expanse of white sand and clear
                  waters. Renowned for its fine, talcum‑like sand, this beach offers endless space to explore and wade
                  in shallow waters. At sunset, the pastel skies and solitary lighthouse create a scene of pure serenity.
                </p>

                <h3 className="mt-10 text-[20px] font-extrabold uppercase text-slate-900">France:</h3>
                <ul className="mt-4 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Île de Porquerolles, France</li>
                </ul>
                <p className="mt-3">
                  Île de Porquerolles, a car‑free islet off the coast of Hyères, is a microcosm of the French Riviera’s
                  charm. Its crescent‑shaped beaches of pearl‑white sand, bordered by pine and eucalyptus woods, are
                  best enjoyed in the low season when you can fully immerse yourself in its serene beauty.
                </p>
                <ul className="mt-6 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Plage de Palombaggia, Corsica (France)</li>
                </ul>
                <p className="mt-3">
                  Corsica’s Plage de Palombaggia enchants with its sweeping curve of powder‑soft sand, crystalline
                  waters, and fragrant umbrella pines. Overlooking the Îles Cerbicale, this beach is the embodiment of
                  Mediterranean dreams. Snorkeling here reveals a vibrant underwater world, while the surrounding
                  wooded hills provide a symphony of cicadas at sunset.
                </p>

                <h3 className="mt-10 text-[20px] font-extrabold uppercase text-slate-900">Portugal:</h3>
                <ul className="mt-4 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Praia da Arrifana, Portugal</li>
                </ul>
                <p className="mt-3">
                  On the rugged Algarve coast, Praia da Arrifana offers a stunning golden crescent of sand surrounded
                  by towering cliffs. This beach is a haven for surfers and those seeking a quieter side of Portugal.
                  The nearby ruins of a fortress add a historical touch to this wild, wind‑swept beach.
                </p>

                <h3 className="mt-10 text-[20px] font-extrabold uppercase text-slate-900">Spain:</h3>
                <ul className="mt-4 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Praia as Catedrais</li>
                </ul>
                <p className="mt-3">
                  Praia as Catedrais, or Cathedral Beach, in Galicia is a natural masterpiece of rock formations
                  sculpted by wind and sea. Best visited at low tide, this beach reveals its golden sands and
                  spectacular arches, towers, and chambers, creating a divine coastal sanctuary.
                </p>
                <ul className="mt-6 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Cala Macarella, Menorca</li>
                </ul>
                <p className="mt-3">
                  Cala Macarella is a dreamscape of flour‑white sands and turquoise waters nestled among pine‑dotted
                  cliffs. Accessible only by foot or boat, this Menorcan gem is busiest in summer, so visiting early or
                  in the low season ensures a more peaceful experience.
                </p>
                <ul className="mt-6 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Platja Illetes, Formentera</li>
                </ul>
                <p className="mt-3">
                  Formentera’s Platja Illetes, with its bleach‑blonde sands and translucent azure waters, rivals any
                  Caribbean beach. Positioned on the slender Trucador Peninsula, this idyllic spot offers stunning views
                  of the two illetes (islets), Pouet and Rodona. It’s a barefoot paradise where the only decision is
                  which pristine spot to lay your towel.
                </p>
                <ul className="mt-6 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Platja de Coll Baix, Mallorca</li>
                </ul>
                <p className="mt-3">
                  The remote Platja de Coll Baix on Mallorca’s Cap des Pinar peninsula offers an adventurous escape. A
                  challenging trail through pine forests leads to this secluded bay, where pale pebbles meet crystal‑clear
                  waters. Early morning or late evening visits are ideal for experiencing its untouched splendor.
                </p>

                <h3 className="mt-10 text-[20px] font-extrabold uppercase text-slate-900">Greece:</h3>
                <ul className="mt-4 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Navagio Beach</li>
                </ul>
                <p className="mt-3">
                  Navagio Beach on Zakynthos, famed for its iconic shipwreck, is a vision of paradise with its striking
                  blue waters and dramatic cliffs. Although it’s a popular spot, timing your visit outside peak seasons
                  allows you to savor its unparalleled beauty in relative solitude.
                </p>
                <ul className="mt-6 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Myrtos Beach, Kefallonia</li>
                </ul>
                <p className="mt-3">
                  Myrtos Beach on Kefallonia Island is a dramatic sweep of white pebbles framed by towering cliffs and
                  vibrant blue waters. The descent to the beach is an adventure in itself, revealing a breathtaking vista
                  that feels like a gift from the gods. Avoiding peak times ensures a more intimate connection with this
                  iconic Greek beach.
                </p>

                <h3 className="mt-10 text-[20px] font-extrabold uppercase text-slate-900">Italy:</h3>
                <ul className="mt-4 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Cala Goloritzè, Sardinia</li>
                </ul>
                <p className="mt-3">
                  Nestled on Sardinia’s east coast, Cala Goloritzè is a vision of coastal perfection. As you approach,
                  the pure aquamarine sea lapping at snow‑white pebbles takes your breath away. Towering limestone cliffs
                  and the dramatic Monte Caroddi add a touch of adventure, inviting climbers and hikers alike. Whether
                  you arrive by boat or trek the Cala Goloritzè Trail, this secluded beach is a slice of paradise.
                </p>
                <ul className="mt-6 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Spiaggia dei Conigli, Sicily</li>
                </ul>
                <p className="mt-3">
                  Spiaggia dei Conigli on Lampedusa Island is a pristine haven in Sicily. Its bleached sands and shallow
                  aquamarine waters are part of a marine reserve, making it a critical nesting ground for loggerhead
                  turtles. Accessible by boat or on foot, this beach is a serene escape from the modern world.
                </p>

                <ul className="mt-8 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Sveti Stefan, Montenegro</li>
                </ul>
                <p className="mt-3">
                  The fortified island village of Sveti Stefan in Montenegro is a photogenic marvel. Its pink sands and
                  azure waters, framed by 15th‑century stone villas and lush greenery, make it one of the Adriatic’s most
                  enchanting spots. While access to the island is limited, the surrounding beach offers ample opportunity
                  to soak in the stunning views.
                </p>

                <ul className="mt-8 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Lara Beach, Cyprus</li>
                </ul>
                <p className="mt-3">
                  Lara Beach on Cyprus’s west coast is a secluded, conservation area teeming with natural beauty. Its
                  pristine sands and clear waters are a nesting ground for loggerhead and green turtles, offering a
                  glimpse of Cyprus before the advent of mass tourism. A 4WD journey to this hidden gem is well worth
                  the effort.
                </p>

                <ul className="mt-8 list-disc space-y-4 pl-6">
                  <li className="font-semibold text-slate-900">Zlatni Rat, Croatia</li>
                </ul>
                <p className="mt-3">
                  Zlatni Rat on Brač Island, Croatia, is a striking, slender beach that extends into the Adriatic Sea
                  like a golden horn. Fringed by pine trees and set against rugged cliffs, this iconic beach is best
                  visited in the off‑season for a more tranquil experience.
                </p>

                <p className="mt-10">
                  Each of these hidden gems, with its own unique story, invites you to venture off the beaten path and
                  immerse yourself in the raw beauty of Europe’s most captivating beaches. Whether you seek solitude,
                  adventure, or simply a place to lose yourself in the nature, these beaches promise an experience that
                  will linger in your memories long after the sand has washed away.
                </p>
                <p className="mt-6">
                  Worried about how to apply for a visa?{' '}
                  <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700 underline">Contact us</a>
                  , and Documitra will assist you with the{' '}
                  <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700 underline">Schengen visa process</a>{' '}
                  and the{' '}
                  <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700 underline">UK visa process</a>{' '}
                  for a hassle‑free experience.
                </p>

                <div className="mt-10 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6 text-center">
                  <h3 className="text-xl font-extrabold text-slate-900">Share this article</h3>
                  <div className="mt-4 flex items-center justify-center gap-6">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook" className="text-slate-600 hover:text-emerald-600">
                      <FbIcon className="h-6 w-6" />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" aria-label="Share on X" className="text-slate-600 hover:text-emerald-600">
                      <XIcon className="h-6 w-6" />
                    </a>
                    <a href={`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" aria-label="Share on Reddit" className="text-slate-600 hover:text-emerald-600">
                      <MessageCircle className="h-6 w-6" />
                    </a>
                  </div>
                  <div className="mt-5 flex items-center justify-center">
                    <div className="relative w-full max-w-3xl">
                      <input readOnly value={shareUrl} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700" />
                      <button type="button" onClick={handleCopy} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-600 hover:text-emerald-600" aria-label="Copy URL">
                        <Copy className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">Shareable URL {copied ? '(Copied!)' : ''}</div>
                </div>
              </div>
            </div>
          </article>
          <RightSidebar
            categories={SIDEBAR_CATEGORIES}
            featured={SIDEBAR_FEATURED}
            topWeek={SIDEBAR_TOP_WEEK}
            stickyTopMd={100}
            stickyTopLg={150}
            showCategories={true}
            showFeatured={true}
            showTopWeek={true}
            showSocial={true}
            showTags={true}
            tags={SIDEBAR_TAGS}
          />
        </div>

        {/* Read next */}
        <section className="mt-14">
          <h2 className="px-1 text-2xl font-extrabold text-slate-900">Read next</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                slug: 'japan-e-visa-for-indian-tourist',
                title: "Japan’s E‑Visa for Indian Tourist",
                date: 'August 30, 2024',
                excerpt:
                  'Exciting news for Indian travelers planning a trip to Japan! Starting April 1, 2024, Japan is revolutionizing...',
                image:
                  'https://japan-evisa.info/images/egypt-e-visa-from-japan.png',
                readTime: '5 MIN READ',
              },
              {
                slug: 'uk-electronic-travel-authorization-eta',
                title:
                  'UK Electronic Travel Authorization (ETA): Everything US Travelers Need to Know Before Visiting the UK',
                date: 'March 26, 2025',
                excerpt:
                  'The United Kingdom introduced the Electronic Travel Authorization (ETA) system on January 8, 2025...',
                image:
                  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop',
                readTime: '3 MIN READ',
              },
              {
                slug: 'china-visa-free-six-european',
                title: 'China’s Visa free option for 6 New European countries',
                date: 'August 30, 2024',
                excerpt:
                  'Calling all travelers from Switzerland, Ireland, Hungary, Austria, Belgium, and Luxembourg—China is now closer...',
                image:
                  'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1200&auto=format&fit=crop',
                readTime: '3 MIN READ',
              },
              {
                slug: 'choice-of-schengen-country-matters',
                title: 'Why Your Choice of Schengen Country Matters for Visa Approval?',
                date: 'March 26, 2025',
                excerpt:
                  'What is a Schengen Visa? A Schengen visa is a short‑stay visa that allows travelers to visit any of the 27...',
                image:
                  'https://i0.wp.com/schengenvisa.news/wp-content/uploads/2024/02/schengen-countries.png',
                readTime: '3 MIN READ',
              },
            ]
              .filter((it) => it.slug !== (slug || ''))
              .map((it, idx) => (
              <Link
                key={idx}
                to={`/blog/${it.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg hover:shadow-emerald-100"
              >
                <span className="h-[3px] w-full bg-slate-200" aria-hidden="true" />
                <div className="flex flex-1 flex-col px-5 pt-5">
                  <h3 className="text-[19px] md:text-[20px] font-extrabold leading-snug text-slate-900 group-hover:text-emerald-600 line-clamp-2">
                    {it.title}
                  </h3>
                  <div className="mt-2 text-xs text-slate-500">{it.date}</div>
                  <p className="mt-3 text-[14px] text-slate-600 line-clamp-2 min-h-[44px]">{it.excerpt}</p>
                  <div className="mt-4 overflow-hidden">
                    <div className="relative aspect-[3/2] w-full">
                      <img src={it.image} alt={it.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                    </div>
                  </div>
                </div>
                <div className="relative border-t mt-2 bg-white px-5 py-3">
                  <span className="text-[12px] text-slate-500 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1">{it.readTime}</span>
                  <span className="absolute right-5 top-4 text-[12px] font-semibold uppercase tracking-wide text-emerald-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">Read more</span>
                  <span className="absolute bottom-0 right-5 z-10 h-0.5 w-0 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-[calc(100%-2.5rem)]" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default BlogSingle
