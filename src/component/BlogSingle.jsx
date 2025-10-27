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
  if (!slug) return 'Wellness & Lifestyle'
  const s = String(slug).toLowerCase()
  if (s.includes('diet') || s.includes('nutrition') || s.includes('mediterranean')) return 'Nutrition & Diet'
  if (s.includes('fitness') || s.includes('workout') || s.includes('exercise') || s.includes('yoga') || s.includes('running')) return 'Fitness & Exercise'
  if (s.includes('mental') || s.includes('mindfulness') || s.includes('stress') || s.includes('anxiety') || s.includes('depression')) return 'Mental Health'
  if (s.includes('heart') || s.includes('diabetes') || s.includes('immune') || s.includes('bone') || s.includes('prevention')) return 'Preventive Health'
  if (s.includes('sleep') || s.includes('hydration') || s.includes('wellness')) return 'Wellness & Lifestyle'
  return 'Wellness & Lifestyle'
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
  if (s.includes('mediterranean') || s.includes('diet'))
    return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop'
  if (s.includes('mindfulness') || s.includes('mental'))
    return 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600&auto=format&fit=crop'
  if (s.includes('workout') || s.includes('fitness') || s.includes('hiit'))
    return 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1600&auto=format&fit=crop'
  if (s.includes('sleep') || s.includes('wellness'))
    return 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1600&auto=format&fit=crop'
  if (s.includes('heart') || s.includes('health'))
    return 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=1600&auto=format&fit=crop'
  return 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1600&auto=format&fit=crop'
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
    <div className="w-full bg-gradient-to-br from-amber-50/30 via-emerald-50/20 to-lime-50/10">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Content + right sidebar (left rail removed) */}
        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_320px] lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-emerald-100/40">
            <div className="bg-gradient-to-br from-white via-emerald-50/10 to-lime-50/10 pt-10 px-7 sm:px-10 lg:px-14">
              <span className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-5 py-2.5 rounded-full shadow-sm">
                <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
                Health Article
              </span>
              <h1 className="mt-7 text-slate-800 font-extrabold leading-tight tracking-tight text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px]">{postTitle}</h1>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-slate-600">
                <Link to={`/author/${meta.authorSlug}`} className="inline-flex items-center gap-3 font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-emerald-400 to-lime-500 flex items-center justify-center text-white font-bold text-base">
                    {meta.author.charAt(0)}
                  </div>
                  {meta.author}
                </Link>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span className="text-sm">{meta.date}</span>
              </div>
            </div>
            <div className="relative mt-7 mx-7 sm:mx-10 lg:mx-14 overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-emerald-50 to-lime-50">
              <img src={cover} alt={postTitle} className="h-auto w-full object-cover opacity-95" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/5 to-transparent" />
            </div>
            <div className="px-7 sm:px-10 lg:px-14 pt-10 pb-14">
              <div className="prose prose-lg max-w-none text-[17px] leading-8 text-slate-700 md:text-[18px] md:leading-9 prose-headings:font-extrabold prose-headings:text-slate-900 prose-h2:text-3xl prose-h2:mt-12 prose-h3:text-2xl prose-h3:mt-10 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:text-emerald-700 prose-strong:text-slate-900 prose-strong:font-bold">
                <p>
                  Are you ready to transform your health with one of the world's most researched and celebrated eating patterns? 
                  The Mediterranean diet isn't just a diet—it's a lifestyle that has sustained generations of healthy, vibrant 
                  communities across Southern Europe. Imagine nourishing your body with colorful vegetables, heart-healthy 
                  olive oil, fresh seafood, and whole grains while reducing your risk of chronic diseases and increasing your longevity.
                </p>
                <p>
                  Let me guide you through the science-backed benefits, practical meal planning strategies, and delicious 
                  recipes that will help you embrace this transformative approach to eating and living well.
                </p>
                <h2 className="mt-10 text-[28px] font-extrabold text-slate-900">What is the Mediterranean Diet?</h2>
                <p className="mt-4">
                  The Mediterranean diet is a heart-healthy eating plan inspired by the traditional dietary patterns of 
                  countries bordering the Mediterranean Sea, including Greece, Italy, Spain, and Southern France. It 
                  emphasizes plant-based foods, healthy fats, and lean proteins while limiting processed foods and added sugars.
                </p>

                <h2 className="mt-10 text-[28px] font-extrabold text-slate-900">Core Principles of Mediterranean Eating</h2>
                <ol className="mt-6 list-decimal space-y-4 pl-6 text-slate-800">
                  <li className="font-semibold">Abundant Plant Foods</li>
                  <li className="font-semibold">Healthy Fats from Olive Oil</li>
                  <li className="font-semibold">Moderate Fish and Poultry</li>
                  <li className="font-semibold">Limited Red Meat</li>
                  <li className="font-semibold">Whole Grains Over Refined</li>
                  <li className="font-semibold">Fresh Herbs and Spices</li>
                  <li className="font-semibold">Social and Mindful Eating</li>
                </ol>

                <h3 className="mt-10 text-[24px] font-extrabold text-slate-900">1. Abundant Plant Foods</h3>
                <p className="mt-3">
                  The foundation of the Mediterranean diet is colorful, nutrient-dense vegetables and fruits. Aim for 
                  7-10 servings daily, including leafy greens, tomatoes, bell peppers, eggplant, zucchini, and seasonal 
                  produce. These foods provide essential vitamins, minerals, antioxidants, and fiber that support overall 
                  health and disease prevention.
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
                <p className="mt-10">
                  Ready to transform your health with the Mediterranean diet?{' '}
                  <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700 underline">Contact our nutritionists</a>
                  , and WellnessHub will provide personalized{' '}
                  <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700 underline">meal planning</a>{' '}
                  and{' '}
                  <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700 underline">nutrition coaching</a>{' '}
                  for a healthier, happier you.
                </p>

                <div className="mt-14 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-lime-50 shadow-xl ring-1 ring-emerald-100 p-10 text-center">
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Share this article</h3>
                  <p className="text-sm text-slate-600 mb-7">Help others discover this valuable health information</p>
                  <div className="flex items-center justify-center gap-4">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook" className="group flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:text-emerald-600 hover:bg-emerald-50">
                      <FbIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" aria-label="Share on X" className="group flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:text-emerald-600 hover:bg-emerald-50">
                      <XIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                    <a href={`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" aria-label="Share on Reddit" className="group flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:text-emerald-600 hover:bg-emerald-50">
                      <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  </div>
                  <div className="mt-7 flex items-center justify-center">
                    <div className="relative w-full max-w-2xl">
                      <input readOnly value={shareUrl} className="w-full rounded-full border-2 border-emerald-100 bg-white px-6 py-3 text-sm text-slate-700 font-medium shadow-sm focus:outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100" />
                      <button type="button" onClick={handleCopy} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2.5 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-300" aria-label="Copy URL">
                        <Copy className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  {copied && (
                    <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Link copied to clipboard!
                    </div>
                  )}
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
        <section className="mt-16 px-3 sm:px-0">
          <div className="mb-10 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3">Continue Your Wellness Journey</h2>
            <p className="text-slate-600 text-lg">Explore more health articles curated just for you</p>
          </div>
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                slug: 'mental-health-mindfulness',
                title: 'Mindfulness and Mental Health: A Beginner\'s Guide to Inner Peace',
                date: 'January 12, 2025',
                excerpt:
                  'Learn evidence-based mindfulness techniques to reduce stress, anxiety, and improve your overall mental wellbeing...',
                image:
                  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
                readTime: '6 MIN READ',
              },
              {
                slug: 'hiit-workout-beginners',
                title:
                  'HIIT Workouts for Beginners: Maximum Results in Minimum Time',
                date: 'January 10, 2025',
                excerpt:
                  'High-Intensity Interval Training explained: workout plans, safety tips, and how to get started...',
                image:
                  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop',
                readTime: '7 MIN READ',
              },
              {
                slug: 'heart-health-prevention',
                title: 'Heart Health: Prevention Strategies That Actually Work',
                date: 'January 5, 2025',
                excerpt:
                  'Protect your heart with lifestyle changes, nutrition tips, exercise recommendations, and early warning signs...',
                image:
                  'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=1200&auto=format&fit=crop',
                readTime: '9 MIN READ',
              },
              {
                slug: 'plant-based-nutrition',
                title: 'Plant-Based Nutrition: Complete Guide to Healthy Vegan Living',
                date: 'January 3, 2025',
                excerpt:
                  'Everything you need to know about plant-based eating: protein sources, meal plans, supplements, and balance...',
                image:
                  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop',
                readTime: '10 MIN READ',
              },
            ]
              .filter((it) => it.slug !== (slug || ''))
              .map((it, idx) => (
              <Link
                key={idx}
                to={`/blog/${it.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-emerald-100/40 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-200/50 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-100 to-lime-100">
                  <img src={it.image} alt={it.title} className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 opacity-90" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent" />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                    <span className="text-[10px] font-extrabold text-emerald-600">{it.readTime}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-5 py-5 bg-gradient-to-br from-white to-amber-50/30">
                  <h3 className="text-[18px] md:text-[19px] font-bold leading-tight text-slate-800 group-hover:text-emerald-600 line-clamp-2 transition-colors duration-300">
                    {it.title}
                  </h3>
                  <div className="mt-2 text-xs text-slate-500">{it.date}</div>
                  <p className="mt-3 text-[13px] text-slate-600 line-clamp-2 min-h-[40px]">{it.excerpt}</p>
                  <div className="mt-auto pt-4 flex items-center justify-end">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 group-hover:gap-3 transition-all duration-300">
                      Read
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
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
