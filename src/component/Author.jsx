import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { User2, Plus } from 'lucide-react'
import Header from './commons/Header'
import Footer from './commons/Footer'
import BackToTop from './commons/BackToTop'
import RightSidebar from './commons/RightSidebar'
import { CATEGORIES as SIDEBAR_CATEGORIES, FEATURED as SIDEBAR_FEATURED, TOP_WEEK as SIDEBAR_TOP_WEEK } from './data/rightSidebar'

const Author = () => {
  const { name, id } = useParams()
  const authorName = name || 'Author'
  const authors = [
    {
      id: '29',
      name: 'Anvit',
      posts: [
        { slug: 'europes-best-kept-beaches', title: 'Sun, Sand, and Serenity: Europe’s Best‑Kept Beaches', category: 'Europe Visa Travel Tips and Tricks', readTime: '5 MIN READ', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop' },
        { slug: 'travel-insurance-guide', title: 'Essential Guide to Travel Insurance for Your Next Trip Abroad: Don’t Skip This!', category: 'USA Visa Travel Tips and Tricks', readTime: '6 MIN READ', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop' },
      ],
    },
    {
      id: '31',
      name: 'Nikita',
      posts: [
        { slug: 'guide-indian-passport-renewal', title: 'Your Guide to Indian Passport Renewal Abroad:', category: 'Passport Services', readTime: '4 MIN READ', image: 'https://images.unsplash.com/photo-1529078155058-5d716f45d604?q=80&w=1600&auto=format&fit=crop' },
        { slug: 'india-e-passport', title: 'India’s e‑Passport: Everything You Need to Know', category: 'Passport Services', readTime: '4 MIN READ', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop' },
      ],
    },
    {
      id: '33',
      name: 'Rohit',
      posts: [
        { slug: 'new-oci-portal', title: 'New OCI Portal: What Applicants Need to Know', category: 'OCI Card Services', readTime: '3 MIN READ', image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1600&auto=format&fit=crop' },
        { slug: 'business-e-visa-india', title: 'Business E‑Visa For India: A Complete Guide by Documitra', category: 'Indian Visa Travel Tips and Tricks', readTime: '5 MIN READ', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1600&auto=format&fit=crop' },
      ],
    },
    {
      id: '35',
      name: 'Isha',
      posts: [
        { slug: 'opportunity-card-germany', title: 'New Opportunities for Skilled Workers: Germany’s “Opportunity Card”', category: 'Passport Services', readTime: '5 MIN READ', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop' },
        { slug: 'us-green-card-family', title: 'Understanding US‑Green Cards and Family‑Based Green Cards Application Process', category: 'Passport Services', readTime: '6 MIN READ', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop' },
      ],
    },
  ]
  
  const currentAuthor = authors.find((a) => a.name.toLowerCase() === (authorName || '').toLowerCase() && a.id === id) || authors[0]
  const posts = [
    {
      slug: 'europes-best-kept-beaches',
      title: `Sun, Sand, and Serenity: Europe’s Best‑Kept Beaches`,
      category: 'Europe Visa Travel Tips and Tricks',
      readTime: '5 MIN READ',
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    },
    {
      slug: 'travel-insurance-guide',
      title: `Essential Guide to Travel Insurance for Your Next Trip Abroad: Don’t Skip This!`,
      category: 'USA Visa Travel Tips and Tricks',
      readTime: '6 MIN READ',
      image:
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop',
    },
    {
      slug: 'guide-indian-passport-renewal',
      title: 'Your Guide to Indian Passport Renewal Abroad:',
      category: 'Passport Services',
      readTime: '4 MIN READ',
      image: 'https://images.unsplash.com/photo-1529078155058-5d716f45d604?q=80&w=1600&auto=format&fit=crop',
    },
    {
      slug: 'india-e-passport',
      title: 'India’s e‑Passport: Everything You Need to Know',
      category: 'Passport Services',
      readTime: '4 MIN READ',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop',
    },
    {
      slug: 'new-oci-portal',
      title: 'New OCI Portal: What Applicants Need to Know',
      category: 'OCI Card Services',
      readTime: '3 MIN READ',
      image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1600&auto=format&fit=crop',
    },
    {
      slug: 'business-e-visa-india',
      title: 'Business E‑Visa For India: A Complete Guide by Documitra',
      category: 'Indian Visa Travel Tips and Tricks',
      readTime: '5 MIN READ',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1600&auto=format&fit=crop',
    },
    {
      slug: 'opportunity-card-germany',
      title: 'New Opportunities for Skilled Workers: Germany’s “Opportunity Card”',
      category: 'Passport Services',
      readTime: '5 MIN READ',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop',
    },
    {
      slug: 'us-green-card-family',
      title: 'Understanding US‑Green Cards and Family‑Based Green Cards Application Process',
      category: 'Passport Services',
      readTime: '6 MIN READ',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop',
    },
    {
      slug: 'lost-damaged-passport-renewal',
      title: 'Understanding the Indian Passport Renewal Process for Lost or Damaged Passports',
      category: 'Passport Services',
      readTime: '3 MIN READ',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1600&auto=format&fit=crop',
    },
    {
      slug: 'minor-us-passport-renewal-case-study',
      title: 'Minor US Passport Renewals: A Case Study from Documitra',
      category: 'Passport Services',
      readTime: '3 MIN READ',
      image: 'https://images.unsplash.com/photo-1529336953121-a5c62d0f9f6e?q=80&w=1600&auto=format&fit=crop',
    },
  ]
  const [visibleCount, setVisibleCount] = React.useState(6)
  const [loadingMore, setLoadingMore] = React.useState(false)

  function handleLoadMore() {
    if (loadingMore) return
    if (visibleCount >= posts.length) return
    setLoadingMore(true)
    setTimeout(() => {
      setVisibleCount((c) => Math.min(c + 1, posts.length))
      setLoadingMore(false)
    }, 500)
  }

  function LoadMoreButton({ onClick, disabled, loading }) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled || loading}
        className={`mx-auto flex items-center gap-3 ${loading ? 'cursor-wait' : 'cursor-pointer'} disabled:opacity-50`}
        aria-busy={loading ? 'true' : 'false'}
      >
        <span className={loading ? 'text-emerald-300 text-sm font-semibold tracking-wide' : 'text-emerald-600 hover:text-emerald-700 text-sm font-semibold tracking-wide'}>
          Load More
        </span>
        {loading ? (
          <span className="relative inline-flex h-9 w-9 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-emerald-500/80" />
            <span className="absolute inset-0 rounded-full ring-2 ring-emerald-300 animate-pulse" />
            <span className="absolute inset-2 rounded-full border-2 border-white/80" />
          </span>
        ) : (
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-emerald-300">
            <Plus className="h-4 w-4 text-emerald-600" />
          </span>
        )}
      </button>
    )
  }

  return (
    <div className="w-full bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 min-h-[50vh]">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px] lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            {/* Author header */}
            <div className="mb-8 flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-200 text-slate-500 ring-1 ring-black/5">
                <User2 className="h-12 w-12" />
              </div>
              <div>
                <h1 className="heading-tight text-3xl font-extrabold text-slate-900 sm:text-4xl">{currentAuthor.name}</h1>
                <div className="mt-1 text-sm text-slate-500">ID: {currentAuthor.id} • {posts.length} posts</div>
              </div>
            </div>

            {/* Author posts list */}
            <div className="mt-6 space-y-6">
              {posts.slice(0, visibleCount).map((p) => (
                <article
                  key={p.slug}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-emerald-100"
                >
                  <Link to={`/blog/${p.slug}`} className="group flex flex-col gap-0 md:flex-row md:gap-6">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-56 w-full object-cover md:h-64 md:w-1/2"
                      loading="lazy"
                    />
                    <div className="flex flex-1 flex-col p-5 md:p-7">
                      <span className="text-[11px] tracking-wide text-blue-700/80">{p.category}</span>
                      <h2 className="mt-2 text-2xl font-extrabold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-emerald-600">
                        {p.title}
                      </h2>
                      <div className="relative mt-auto border-t pt-4">
                        <span className="text-sm text-slate-500 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1">
                          {p.readTime}
                        </span>
                        <span className="absolute left-0 top-4 text-xs font-semibold uppercase tracking-wide text-emerald-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">
                          Read more
                        </span>
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
              <div className="py-6">
                <LoadMoreButton onClick={handleLoadMore} disabled={visibleCount >= posts.length} loading={loadingMore} />
              </div>
            </div>
          </div>
          <RightSidebar
            categories={SIDEBAR_CATEGORIES}
            featured={SIDEBAR_FEATURED}
            topWeek={SIDEBAR_TOP_WEEK}
            stickyTopMd={100}
            stickyTopLg={150}
          />
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default Author


