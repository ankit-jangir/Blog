import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from './commons/Header'
import Footer from './commons/Footer'
import BackToTop from './commons/BackToTop'
import { Clock } from 'lucide-react'
import RightSidebar from './commons/RightSidebar'
import { FEATURED, TOP_WEEK } from './data/rightSidebar'

const BlogSingle = () => {
  const { slug } = useParams()

  // Dummy data for the single page
  const post = {
    title: slug?.replace(/-/g, ' ') || 'Blog post',
    category: { name: 'Passport Services', slug: 'passport' },
    tags: [
      { name: 'How-To', slug: 'how-to' },
      { name: 'Tips', slug: 'tips' },
    ],
    image: 'https://picsum.photos/seed/single/1600/900',
    content:
      'This is a sample blog content. Replace with your backend data. It demonstrates where the detailed article text will appear.',
  }

  const featured = [
    { title: 'OCI Card: Everything You Need to Know', to: '/blog/oci-basics' },
    { title: 'Your Guide to Indian Passport Renewal Abroad', to: '/blog/passport-services' },
    { title: 'Trusted Traveler Programs (TTP) Updates in 2025', to: '/blog/trusted-traveler-programs-2025' },
  ]

  

  return (
    <div className="w-full">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top header meta section */}
        <section className="mb-4 md:mb-6 lg:mb-8">
          <div className="flex items-start gap-5 md:gap-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white font-semibold md:h-16 md:w-16">E</div>
              <div className="hidden sm:block text-[11px] md:text-[12px] font-semibold leading-tight text-slate-600 uppercase tracking-wide">
                Europe Visa<br />
                Travel Tips<br />
                And Tricks
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-slate-900 font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{post.title}</h1>
              <div className="mt-3 flex items-center gap-3 text-slate-500">
                <span className="font-semibold text-slate-700">Anvit</span>
                <span className="text-sm">July 28, 2025</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-slate-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-semibold tracking-wide">5 MIN READ</span>
              </div>
            </div>
          </div>
        </section>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          
          {/* Article */}
          <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <img src={post.image} alt={post.title} className="h-auto w-full object-cover" loading="lazy" />
            <div className="p-5 lg:p-7">
              <div className="text-[12px] tracking-wide text-blue-700/80">
                <Link to={`/category/${post.category.slug}`}>{post.category.name}</Link>
              </div>
              <h1 className="mt-1 text-2xl font-bold leading-snug text-slate-900 lg:text-3xl">{post.title}</h1>
              <div className="mt-2 text-sm text-slate-500">5 min read</div>

              <div className="prose mt-5 max-w-none text-[15px] leading-7 text-slate-700">
                <p>{post.content}</p>
                <h2 className="mt-6 text-xl font-semibold text-slate-900">Sub heading</h2>
                <p>More body content here to mirror your screenshot layout.</p>
                <ul className="ml-5 list-disc space-y-1">
                  <li>Point one</li>
                  <li>Point two</li>
                  <li>Point three</li>
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 pt-3">
                {post.tags.map((t) => (
                  <Link key={t.slug} to={`/tag/${t.slug}`} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200">
                    #{t.name}
                  </Link>
                ))}
              </div>
            </div>
          </article>

          {/* Right: Sidebar using shared component */}
          <RightSidebar
            categories={[]}
            featured={FEATURED}
            topWeek={TOP_WEEK}
            stickyTopMd={100}
            stickyTopLg={150}
            showCategories={false}
            showTopWeek={true}
            showSocial={true}
            showFeatured={true}
          />
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default BlogSingle
