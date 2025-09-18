import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook as FbIcon, Twitter as XIcon, Instagram, Linkedin, MessageCircle } from 'lucide-react'

const DEFAULT_CATEGORY_IMAGE = 'https://picsum.photos/seed/sidebar-category/1200/800'
const DEFAULT_TOP_IMAGE = (seed) => `https://picsum.photos/seed/topweek-${seed}/100/100`

function CategoryTile({ item }) {
  const data = { ...item, image: item.image || DEFAULT_CATEGORY_IMAGE }
  return (
    <Link to={data.to} className="group relative block overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
      <img
        src={data.image}
        alt={data.title}
        className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] sm:h-40"
        loading="lazy"
      />
      {/* overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/35 transition-colors duration-200 group-hover:bg-black/55" />
      {/* centered content */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 text-center text-white">
        {/* default: title + count */}
        <div className="transition-opacity duration-200 group-hover:opacity-0">
          <div className="text-[18px] font-extrabold leading-tight">{data.title}</div>
          {typeof data.count === 'number' && (
            <div className="mt-1 text-[12px] font-semibold text-white/90">{data.count} Posts</div>
          )}
        </div>
        {/* hover: view posts */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-[14px] font-bold tracking-wide">
            VIEW POSTS
          </span>
        </div>
      </div>
    </Link>
  )
}

function FeaturedPosts({ items }) {
  if (!items || items.length === 0) return null
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="border-b px-4 py-3 text-[11px] font-semibold tracking-wider text-slate-600">FEATURED POSTS</div>
      <ul className="divide-y">
        {items.map((it, idx) => (
          <li key={idx} className="px-4 py-3">
            <div className="mb-1 flex items-center gap-2 text-[12px] text-slate-500">
              {it.author && <span className="font-semibold text-slate-700">{it.author}</span>}
              {it.date && (
                <>
                  <span>•</span>
                  <span>{it.date}</span>
                </>
              )}
            </div>
            <Link to={it.to} className="block text-[15px] font-semibold leading-snug text-slate-900 hover:text-emerald-600">
              {it.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CategoryList({ items }) {
  if (!items || items.length === 0) return null
  const [hovered, setHovered] = React.useState(-1)
  const preview = items[hovered >= 0 ? hovered : 0]?.image
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="h-28 w-full overflow-hidden sm:h-32">
        {preview && (
          <img src={preview} alt="preview" className="h-full w-full object-cover" loading="lazy" />
        )}
      </div>
      <ul>
        {items.map((it, idx) => (
          <li
            key={it.to || it.key || idx}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(-1)}
            className="group flex items-center justify-between px-4 py-4 hover:bg-slate-50 cursor-pointer"
          >
            <Link to={it.to} className="text-[15px] font-semibold text-slate-900 group-hover:text-emerald-600">
              {it.title}
            </Link>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-700 text-white text-[13px] font-semibold">
              {typeof it.count === 'number' ? it.count : ''}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TopOnTheWeek({ items }) {
  if (!items || items.length === 0) return null
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="border-b px-4 py-3 text-[11px] font-semibold tracking-wider text-slate-600">TOP ON THE WEEK</div>
      <ul className="divide-y">
        {items.map((it, idx) => {
          const thumb = it.image || DEFAULT_TOP_IMAGE(idx + 1)
          return (
            <li key={idx} className="group flex items-center gap-3 px-4 py-3">
              <div className="relative h-10 w-10 shrink-0">
                {/* number (default visible) */}
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-slate-100 font-semibold text-slate-700 transition-opacity duration-200 group-hover:opacity-0">
                  {idx + 1}
                </div>
                {/* image (shows on hover) */}
                <img
                  src={thumb}
                  alt={it.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full rounded-xl object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
                {/* keep number visible on hover as small badge */}
                <span className="pointer-events-none absolute -bottom-1 -right-1 hidden h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-slate-700 ring-1 ring-black/5 group-hover:flex">
                  {idx + 1}
                </span>
              </div>
              <Link to={it.to} className="block text-[15px] font-semibold leading-snug text-slate-900 hover:text-emerald-600 break-words">
                {it.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function GetSocial() {
  const items = [
    { label: 'Facebook', href: 'https://facebook.com', Icon: FbIcon },
    { label: 'Twitter', href: 'https://twitter.com', Icon: XIcon },
    { label: 'Instagram', href: 'https://instagram.com', Icon: Instagram },
    { label: 'LinkedIn', href: 'https://linkedin.com', Icon: Linkedin },
    { label: 'Reddit', href: 'https://reddit.com', Icon: MessageCircle },
  ]
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="border-b px-4 py-3 text-[11px] font-semibold tracking-wider text-slate-600">LET’S GET SOCIAL</div>
      <ul className="divide-y">
        {items.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between px-4 py-3 text-[15px] text-slate-800 hover:bg-slate-50"
            >
              <span className="font-semibold transition-colors duration-200 group-hover:text-emerald-600">{label}</span>
              <Icon className="h-5 w-5 text-slate-500 transition-transform group-hover:scale-110 group-hover:text-emerald-600" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const RightSidebar = ({
  categories = [],
  featured = [],
  topWeek = [],
  stickyTopMd = 96,
  stickyTopLg = 96,
  showCategories = true,
  showFeatured = true,
  showTopWeek = true,
  showSocial = true,
  showCategoryList = false,
  categoriesPosition = 'top',
}) => {
  return (
    <aside className="space-y-4">
      {showCategories && categoriesPosition === 'top' && categories.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          {categories.map((c) => (
            <CategoryTile key={c.to || c.key} item={c} />
          ))}
        </div>
      )}
      {showFeatured && <FeaturedPosts items={featured} />}
      {showTopWeek && <TopOnTheWeek items={topWeek} />}
      {showCategories && categoriesPosition === 'bottom' && categories.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          {categories.map((c) => (
            <CategoryTile key={c.to || c.key} item={c} />
          ))}
        </div>
      )}
      {showCategoryList && (
        <div className="mt-2">
          <div className="border-b px-4 py-3 text-[11px] font-semibold tracking-wider text-slate-600">BROWSING CATEGORY</div>
          <CategoryList items={categories} />
        </div>
      )}
      {showSocial && (
        <div
          className={"md:sticky lg:sticky md:[top:var(--stickyOffsetMd)] lg:[top:var(--stickyOffsetLg)]"}
          style={{ "--stickyOffsetMd": `${stickyTopMd}px`, "--stickyOffsetLg": `${stickyTopLg}px` }}
        >
          <GetSocial />
        </div>
      )}
    </aside>
  )
}

export default RightSidebar


