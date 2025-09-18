import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './commons/Header'
import Footer from './commons/Footer'
import BackToTop from './commons/BackToTop'
import RightSidebar from './commons/RightSidebar'
import { CATEGORIES as SIDEBAR_CATEGORIES, FEATURED as SIDEBAR_FEATURED, TOP_WEEK as SIDEBAR_TOP_WEEK } from './data/rightSidebar'
import { Plus, Loader2, Facebook as FbIcon, Twitter as XIcon, Instagram, Linkedin, MessageCircle } from 'lucide-react'

// Dummy posts (static) – replace with real API later
const DUMMY_POSTS = [
  {
    id: 1,
    slug: 'europes-best-kept-beaches',
    coverImage:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    title: "Sun, Sand, and Serenity: Europe's Best‑Kept Beaches",
    excerpt:
      'Planning a European escape? Discover quiet coves, crystal waters, and stress‑free tips to make your coastal trip unforgettable.',
    category: 'Europe Visa Travel Tips and Tricks',
    publishedAt: '2024-06-11',
    readTime: '5 min read',
  },
  {
    id: 2,
    slug: 'passport-services',
    coverImage:
      'https://mlvrpw5wpdmq.i.optimole.com/w:1160/h:680/q:mauto/rt:fill/g:ce/ig:avif/https://documitra.com/blog/wp-content/uploads/2025/07/How-to-Expedite-Your-Indian-Passport-Renewal-in-the-USA-A-Comprehensive-Guide.webp',
    title: 'Your Guide to Indian Passport Renewal Abroad',
    excerpt:
      'From paperwork to timelines, here’s a clear, no‑stress guide to renewing your Indian passport when you are outside India.',
    category: 'Passport Services',
    publishedAt: '2024-05-29',
    readTime: '7 min read',
  },
  {
    id: 3,
    slug: 'oci-basics',
    coverImage:
      'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1600&auto=format&fit=crop',
    title: 'OCI Card: Everything You Need to Know',
    excerpt:
      'A concise explainer covering eligibility, documents, common errors, and processing timelines for OCI applicants.',
    category: 'OCI Card Services',
    publishedAt: '2024-04-19',
    readTime: '6 min read',
  },
  {
    id: 4,
    slug: 'legal-finance-nri',
    coverImage:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop',
    title: 'Legal & Financial Insights for NRIs: 2025 Edition',
    excerpt:
      'Important compliances, investment options, and best practices for NRIs to stay compliant and grow wealth.',
    category: 'Legal & Financial Insights for NRI',
    publishedAt: '2024-12-15',
    readTime: '8 min read',
  },
  {
    id: 5,
    slug: 'apostille-101',
    coverImage:
      'https://images.unsplash.com/photo-1529336953121-a5c62d0f9f6e?q=80&w=1600&auto=format&fit=crop',
    title: 'Apostille & Attestation: Simple Checklist',
    excerpt:
      'Understand the difference, when you need which, and the documents required—without the jargon.',
    category: 'Apostille and Attestation',
    publishedAt: '2024-03-10',
    readTime: '4 min read',
  },
  {
    id: 6,
    slug: 'travel-insurance',
    coverImage:
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop',
    title: 'Essential Guide to Travel Insurance for Your Next Trip Abroad',
    excerpt:
      'What to look for in a policy, travel hacks, and how to claim when plans change unexpectedly.',
    category: 'Travel Tips',
    publishedAt: '2024-02-08',
    readTime: '5 min read',
  },
  {
    id: 7,
    slug: 'india-e-passport-guide',
    coverImage:
      'https://images.unsplash.com/photo-1529078155058-5d716f45d604?q=80&w=1600&auto=format&fit=crop',
    title: 'India’s e‑Passport: Everything You Need to Know',
    excerpt:
      'A quick primer on the new e‑passport: features, eligibility, rollout, and how to apply safely.',
    category: 'Passport Services',
    publishedAt: '2024-01-20',
    readTime: '4 min read',
  },
  {
    id: 8,
    slug: 'new-oci-portal',
    coverImage:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop',
    title: 'New OCI Portal: What Applicants Need to Know',
    excerpt:
      'We summarized the new portal flow with screenshots, common errors, and submission tips.',
    category: 'OCI Card Services',
    publishedAt: '2024-01-12',
    readTime: '6 min read',
  },
  {
    id: 9,
    slug: 'trusted-traveler-programs-2025',
    coverImage:
      'https://images.unsplash.com/photo-1558980664-10ea292c40ec?q=80&w=1600&auto=format&fit=crop',
    title: 'Trusted Traveler Programs (TTP) Updates in 2025',
    excerpt:
      'Global Entry, NEXUS, SENTRI—what changed this year and which program is best for you?',
    category: 'Travel Tips',
    publishedAt: '2024-01-05',
    readTime: '7 min read',
  },
  {
    id: 10,
    slug: 'i94-expiration-stay-limits',
    coverImage:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop',
    title:
      'I‑94 Expiration: What Every Visa Holder Needs to Know About Stay Limits, Passport Validity, and Compliance',
    excerpt:
      'Understand I‑94 vs visa validity, how to check records, and avoid overstay pitfalls.',
    category: 'Legal & Financial Insights for NRI',
    publishedAt: '2023-12-16',
    readTime: '9 min read',
  },
  {
    id: 11,
    slug: 'schengen-travel-hacks',
    coverImage:
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1600&auto=format&fit=crop',
    title: 'Travel Hacks and Tidbits You Should Know Before Visiting the Schengen States',
    excerpt:
      'Insurance proof, itinerary tips, and border control nuances most travelers miss.',
    category: 'Europe Visa Travel Tips and Tricks',
    publishedAt: '2023-11-28',
    readTime: '5 min read',
  },
  {
    id: 12,
    slug: 'common-oci-application-issues',
    coverImage:
      'https://mlvrpw5wpdmq.i.optimole.com/w:1160/h:680/q:mauto/rt:fill/g:ce/ig:avif/https://documitra.com/blog/wp-content/uploads/2025/05/Common-OCI-Application-Issues-Answered-A-Practical-Guide.webp',
    title: 'Common OCI Application Issues Answered: A Practical Guide',
    excerpt:
      'Photo/signature rejections, address proofs, and document order—real fixes that work.',
    category: 'OCI Card Services',
    publishedAt: '2023-11-10',
    readTime: '6 min read',
  },
  {
    id: 13,
    slug: 'evisa-vs-paper-visa',
    coverImage:
      'https://images.unsplash.com/photo-1461696114087-397271a7aedc?q=80&w=1600&auto=format&fit=crop',
    title:
      'Indian e‑Visa vs. Paper Visa: Which One Should You Choose for Your Next Trip?',
    excerpt:
      'Speed, costs, permitted entries, and practical pros/cons—choose confidently.',
    category: 'Indian Visa Travel Tips and Tricks',
    publishedAt: '2023-10-18',
    readTime: '5 min read',
  },
  {
    id: 14,
    slug: 'passport-photo-requirements',
    coverImage:
      'https://images.unsplash.com/photo-1520975784900-5cbf0c58e7dc?q=80&w=1600&auto=format&fit=crop',
    title: 'Passport Photo Requirements: Do’s and Don’ts',
    excerpt:
      'Avoid rejections with correct size, background, glasses policy, and digital vs. print tips.',
    category: 'Passport Services',
    publishedAt: '2024-03-22',
    readTime: '4 min read',
  },
  {
    id: 15,
    slug: 'oci-renewal-tips',
    coverImage:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
    title: 'OCI Renewal Tips: Documents and Timelines',
    excerpt:
      'When to renew, what to upload, and common mistakes applicants make while renewing OCI.',
    category: 'OCI Card Services',
    publishedAt: '2024-03-02',
    readTime: '6 min read',
  },
  {
    id: 16,
    slug: 'packing-checklist-international',
    coverImage:
      'https://images.unsplash.com/photo-1502920514313-52581002a659?q=80&w=1600&auto=format&fit=crop',
    title: 'International Travel Packing Checklist',
    excerpt:
      'Smart packing templates, medication rules, power adapters, and security-friendly bags.',
    category: 'Travel Tips',
    publishedAt: '2024-02-18',
    readTime: '5 min read',
  },
  {
    id: 17,
    slug: 'indian-visa-appointment-guide',
    coverImage:
      'https://images.unsplash.com/photo-1519160558534-579f5104b9a3?q=80&w=1600&auto=format&fit=crop',
    title: 'Booking Your Indian Visa Appointment: Step‑by‑Step',
    excerpt:
      'How to pick centers, upload documents, and avoid last‑minute rescheduling issues.',
    category: 'Indian Visa Travel Tips and Tricks',
    publishedAt: '2024-01-28',
    readTime: '7 min read',
  },
  {
    id: 18,
    slug: 'nri-tax-basics',
    coverImage:
      'https://images.unsplash.com/photo-1454165205744-3b78555e5572?q=80&w=1600&auto=format&fit=crop',
    title: 'NRI Tax Basics: Residency, Accounts, and Reporting',
    excerpt:
      'Understand residential status, NRE/NRO accounts, and compliance essentials for NRIs.',
    category: 'Legal & Financial Insights for NRI',
    publishedAt: '2023-12-05',
    readTime: '6 min read',
  },
]

function cn(...args) {
  return args.filter(Boolean).join(' ')
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return ''
  }
}

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[-_/]+/g, ' ')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function titleCase(text) {
  return String(text || '')
    .split(' ')
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
    .join(' ')
}

function toWordsUpper(text) {
  return String(text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toUpperCase())
}

function buildCategoryCounts(posts) {
  const counts = new Map()
  posts.forEach((p) => {
    const key = normalize(p.category)
    counts.set(key, (counts.get(key) || 0) + 1)
  })
  return counts
}

// Fallback images for posts and categories
const DEFAULT_POST_IMAGE =
  'https://picsum.photos/seed/documitra-post/1600/900'
const DEFAULT_CATEGORY_IMAGE =
  'https://picsum.photos/seed/documitra-category/1200/800'

function PostHero({ post }) {
  const href = post?.slug ? `/blog/${post.slug}` : post?.url || '#'
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-emerald-100">
      <Link to={href} className="group flex flex-col gap-0 lg:flex-row lg:gap-6">
        <img
          src={post?.coverImage || DEFAULT_POST_IMAGE}
          alt={post?.title}
          className="h-56 w-full object-cover lg:h-auto lg:w-1/2"
          loading="lazy"
        />
        <div className="flex flex-1 flex-col p-5 lg:p-7">
          <span className="text-[12px] tracking-wide text-blue-700/80">
            {post?.category || ''}
          </span>
          <h2 className="mt-2 text-2xl font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-emerald-600 hover:text-emerald-600">
            {post?.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-[15px] text-slate-600">{post?.excerpt}</p>
          <div className="relative mt-auto h-8 border-t border-slate-200">
            <span className="absolute left-0 top-2 text-sm text-slate-500 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1">
              {post?.readTime || '5 min read'}
            </span>
            <span className="absolute left-0 top-2 text-xs font-semibold uppercase tracking-wide text-emerald-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">
              Read more
            </span>
            <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-full" />
          </div>
        </div>
      </Link>
    </article>
  )
}

function PostCard({ post }) {
  const href = post?.slug ? `/blog/${post.slug}` : post?.url || '#'
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-emerald-100">
      <Link to={href} className="group flex min-h-[260px] flex-col gap-0 lg:min-h-[300px] lg:flex-row lg:gap-6">
        <img
          src={post?.coverImage || DEFAULT_POST_IMAGE}
          alt={post?.title}
          className="h-56 w-full object-cover transition-all duration-300 ease-out lg:h-auto lg:w-1/2 lg:min-h-[300px] group-hover:scale-[1.02] group-hover:brightness-105 group-hover:saturate-150"
          loading="lazy"
        />
        <div className="flex flex-1 flex-col p-5 lg:p-7">
          <span className="text-[12px] tracking-wide text-blue-700/80">
            {post?.category || ''}
          </span>
          <h3 className="mt-2 text-xl lg:text-2xl font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-emerald-600 hover:text-emerald-600">
            {post?.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-[15px] text-slate-600">{post?.excerpt}</p>
        <div className="relative mt-auto h-8 border-t border-slate-200">
            <span className="absolute left-0 top-2 text-sm text-slate-500 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1">
              {post?.readTime || '5 min read'}
            </span>
          <span className="absolute left-0 top-2 text-xs font-semibold uppercase tracking-wide text-emerald-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">
              Read more
            </span>
          <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-full" />
          </div>
        </div>
      </Link>
    </article>
  )
}

function PostFullCard({ post }) {
  const href = post?.slug ? `/blog/${post.slug}` : post?.url || '#'
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-emerald-100">
      <Link to={href} className="group">
        <div className="px-5 pt-5">
          <span className="text-[11px] tracking-wide text-blue-700/80">
            {post?.category || ''}
          </span>
          <h3 className="mt-2 text-2xl lg:text-3xl font-bold leading-snug text-slate-900 transition-colors duration-200 hover:text-emerald-600">
            {post?.title}
          </h3>
          <div className="mt-1 text-xs text-slate-500">
            {post?.author || 'Nikita'}
            <span className="mx-2">{post?.publishedAt ? formatDate(post.publishedAt) : ''}</span>
          </div>
        </div>
        <img
          src={post?.coverImage || DEFAULT_POST_IMAGE}
          alt={post?.title}
          className="mt-4 h-72 w-full object-cover"
          loading="lazy"
        />
        <div className="relative border-t border-slate-200 px-5 pt-5 pb-4">
          <span className="text-sm text-slate-500 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1">
            {post?.readTime || '3 min read'}
          </span>
          <span className="absolute left-5 top-5 text-xs font-semibold uppercase tracking-wide text-emerald-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">
            Read more
          </span>
          <span className="absolute bottom-0 left-5 h-0.5 w-0 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-[calc(100%-2.5rem)]" />
        </div>
      </Link>
    </article>
  )
}

function PostOverlayCard({ post }) {
  const href = post?.slug ? `/blog/${post.slug}` : post?.url || '#'
  return (
    <article className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-emerald-100">
      <Link to={href} className="group block">
        <img
          src={post?.coverImage || DEFAULT_POST_IMAGE}
          alt={post?.title}
          className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] lg:h-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 p-5 lg:p-7 text-white">
          <span className="text-[11px] tracking-wide text-white/80">
            {post?.category || ''}
          </span>
          <h3 className="mt-2 text-2xl font-extrabold leading-snug drop-shadow lg:text-3xl transition-colors duration-200 hover:text-emerald-300">
            {post?.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/80 drop-shadow">
            {post?.excerpt}
          </p>
          <div className="relative mt-4 border-t border-white/20 pt-4">
            <span className="text-sm text-white/80 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1">
              {post?.readTime || '3 min read'}
            </span>
            <span className="absolute left-0 top-4 text-xs font-semibold uppercase tracking-wide text-emerald-300 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">
              Read more
            </span>
            <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-emerald-300 transition-all duration-300 group-hover:w-full" />
          </div>
        </div>
      </Link>
    </article>
  )
}

function LoadMoreButton({ onClick, disabled, loading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`mx-auto flex items-center gap-3 disabled:opacity-50 ${loading ? 'cursor-wait' : 'cursor-pointer'}`}
      aria-busy={loading ? 'true' : 'false'}
    >
      <span className={loading ? "text-emerald-300 text-sm font-semibold tracking-wide" : "text-emerald-600 hover:text-emerald-700 text-sm font-semibold tracking-wide"}>Load More</span>
      {loading ? (
        <span className="relative inline-flex h-9 w-9 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-emerald-500 shadow" />
          <span className="absolute inset-0 rounded-full ring-2 ring-emerald-300 animate-pulse" />
          <span className="absolute inset-1.5 rounded-full border-2 border-white/80" />
          <span className="absolute inset-3 rounded-full bg-emerald-400" />
        </span>
      ) : (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-emerald-300">
          <Plus className="h-4 w-4 text-emerald-600" />
        </span>
      )}
    </button>
  )
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-64 w-full rounded-2xl bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-40 rounded-xl bg-slate-200" />
        ))}
      </div>
    </div>
  )
}

// Sidebar category tiles (dummy)
const DUMMY_CATEGORIES = [
  {
    key: 'passport',
    title: 'Passport Services',
    count: 12,
    image:
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200&auto=format&fit=crop',
    to: '/blog/passport',
  },
  {
    key: 'oci',
    title: 'OCI Card Services',
    count: 8,
    image:
      'https://mlvrpw5wpdmq.i.optimole.com/w:768/h:558/q:mauto/ig:avif/https://documitra.com/blog/wp-content/uploads/2025/08/OCI-2.1-1.png',
    to: '/blog/oci',
  },
  {
    key: 'nri-legal',
    title: 'Legal & Financial Insights for NRI',
    count: 6,
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    to: '/blog/legal',
  },
  {
    key: 'indian-visa',
    title: 'Indian Visa Travel Tips and Tricks',
    count: 16,
    image:
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop',
    to: '/blog/indian-visa',
  },
  {
    key: 'apostille',
    title: 'Apostille and Attestation',
    count: 3,
    image:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop',
    to: '/blog/apostille',
  },
]

function CategoryCard({ item }) {
  return (
    <Link to={item.to} className="group relative block overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
      <img
        src={item.image}
        alt={item.title}
        className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] sm:h-40"
        loading="lazy"
      />
      {/* overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/35 transition-colors duration-200 group-hover:bg-black/55" />
      {/* centered content */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 text-center text-white">
        {/* default: title + count */}
        <div className="transition-opacity duration-200 group-hover:opacity-0">
          <div className="text-[18px] font-extrabold leading-tight">
            {item.title}
          </div>
          <div className="mt-1 text-[12px] font-semibold text-white/90">{item.count} Posts</div>
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

// Featured posts (dummy)
const DUMMY_FEATURED = [
  {
    title: "Sun, Sand, and Serenity: Europe's Best‑Kept Beaches",
    author: 'Anvit',
    date: '2025-07-28',
    to: '/blog/europes-best-kept-beaches',
  },
  {
    title: 'Essential Guide to Travel Insurance for Your Next Trip Abroad: Don’t Skip This!',
    author: 'Anvit',
    date: '2025-07-17',
    to: '/blog/travel-insurance-guide',
  },
  {
    title: 'Your Guide to Indian Passport Renewal Abroad:',
    author: 'Anvit',
    date: '2025-07-01',
    to: '/blog/guide-indian-passport-renewal',
  },
  {
    title: 'India’s e‑Passport: Everything You Need to Know',
    author: 'Nikita',
    date: '2025-06-24',
    to: '/blog/india-e-passport', 
  },
  {
    title: 'New OCI Portal: What Applicants Need to Know',
    author: 'Nikita',
    date: '2025-06-20',
    to: '/blog/new-oci-portal',
  },
]

function FeaturedPosts({ items }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="border-b px-4 py-3 text-[11px] font-semibold tracking-wider text-slate-600">FEATURED POSTS</div>
      <ul className="divide-y">
        {items.map((it, idx) => (
          <li key={idx} className="px-4 py-3">
            <div className="mb-1 flex items-center gap-2 text-[11px] text-slate-500">
              <span className="font-medium text-slate-700">{it.author}</span>
              <span>•</span>
              <span>{formatDate(it.date)}</span>
            </div>
            <Link to={it.to} className="block text-[15px] font-semibold leading-snug text-slate-900 hover:text-blue-800">
              {it.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Top on the week (dummy)
const DUMMY_TOP_WEEK = [...DUMMY_FEATURED].slice(0, 5)

function TopOnTheWeek({ items }) {
  function getThumb(item) {
    const slug = (item.to || '').split('/').filter(Boolean).pop()
    const m = DUMMY_POSTS.find((p) => p.slug === slug)
    return m?.coverImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop'
  }
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="border-b px-4 py-3 text-[11px] font-semibold tracking-wider text-slate-600">TOP ON THE WEEK</div>
      <ul className="divide-y">
        {items.map((it, idx) => (
          <li key={idx} className="group flex items-center gap-3 px-4 py-3">
            <div className="relative h-10 w-10 shrink-0">
              <img
                src={getThumb(it)}
                alt="thumb"
                className="absolute inset-0 h-10 w-10 rounded-xl object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                loading="lazy"
              />
              <span className="absolute inset-0 inline-flex items-center justify-center rounded-xl bg-slate-100 font-semibold text-slate-700 transition-opacity duration-200 group-hover:opacity-0">
                {idx + 1}
              </span>
            </div>
            <Link
              to={it.to}
              className="block text-[15px] font-semibold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-emerald-600"
            >
              {it.title}
            </Link>
          </li>
        ))}
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
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
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
              <span className="font-semibold group-hover:text-emerald-600 transition-colors duration-200">{label}</span>
              <span className="text-slate-500 transition-transform duration-200 group-hover:scale-110 group-hover:text-emerald-600">
                <Icon className="h-5 w-5" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Blog = ({ filter, sidebarShowCategoryList = false, showCategoryHeader = false }) => {
  const [posts, setPosts] = useState(DUMMY_POSTS)

  // Ensure the initial left section order matches the desired layout:
  // 1) Beaches (hero), 2) Travel Insurance, 3) Indian Passport Renewal
  const START_ORDER = [
    'europes-best-kept-beaches',
    'travel-insurance',
    'passport-services',
    'common-oci-application-issues',
    'evisa-vs-paper-visa',
  ]
  const orderedPosts = useMemo(() => {
    const rank = (p) => {
      const i = START_ORDER.indexOf(p.slug)
      return i === -1 ? START_ORDER.length + (p.id || 0) : i
    }
    return [...posts].sort((a, b) => rank(a) - rank(b))
  }, [posts])
  const [loading] = useState(false)
  const [error] = useState('')

  // If you later enable an API, replace the above state with a fetch and fallback to DUMMY_POSTS on error.

  const filtered = useMemo(() => {
    const base = orderedPosts
    if (!filter) return base
    if (filter.category) {
      const query = normalize(filter.category)
      return base.filter((p) => normalize(p.category).includes(query))
    }
    if (filter.tag) {
      return base.filter((p) => (p.tags || []).some((t) => t.toLowerCase().includes(filter.tag.toLowerCase())))
    }
    return base
  }, [orderedPosts, filter])

  const hero = filtered?.[0]
  const rest = useMemo(() => (filtered || []).slice(1), [filtered])
  // Show 10 total on initial load (1 hero + 9 more)
  const [visibleCount, setVisibleCount] = useState(9)
  const [loadingMore, setLoadingMore] = useState(false)

  // Dynamic sidebar category counts derived from available posts
  const categoryCounts = useMemo(() => buildCategoryCounts(orderedPosts), [orderedPosts])
  const sidebarCategories = useMemo(() => {
    return SIDEBAR_CATEGORIES.map((c) => {
      const key = normalize(c.title)
      const dynamic = categoryCounts.get(key)
      return { ...c, count: typeof dynamic === 'number' ? dynamic : (c.count || 0) }
    })
  }, [categoryCounts])

  function handleLoadMore() {
    if (loadingMore) return
    if (visibleCount >= rest.length) return
    setLoadingMore(true)
    // Simulate async loading
    setTimeout(() => {
      setVisibleCount((c) => Math.min(c + 1, rest.length))
      setLoadingMore(false)
    }, 500)
  }

  // Scroll to top on route/filter change
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      window.scrollTo(0, 0)
    }
  }, [filter?.category, filter?.tag])

  return (
    <div className="w-full bg-slate-50">
      <Header />
      <main className="min-h-screen w-full">
        <div className="mx-auto max-w-[1400px] px-3 py-6 sm:px-4 lg:px-6">
          {loading && <LoadingSkeleton />}
          {!loading && error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>
          )}

            {!loading && !error && (
             <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px] lg:grid-cols-[minmax(0,1fr)_360px]">
              {/* Left: optional category header + hero + post list */}
              <div className="space-y-6">
                {showCategoryHeader && filter?.category && (
                  <section className="mt-2">
                    <div className="mb-2 text-[12px] font-semibold tracking-wider text-slate-600">BROWSING CATEGORY</div>
                    <h1 className="heading-tight text-[35px] font-bold text-slate-800 sm:text-[45px] lg:text-[40px]">
                      {titleCase(normalize(filter.category))}
                    </h1>
                    <div className="mt-2 text-[13px] sm:text-[14px] text-slate-500">{filtered.length} posts</div>
                  </section>
                )}
                {hero && <PostHero post={hero} />}

                <div className="space-y-6">
                  {rest.slice(0, visibleCount).map((p, idx) => {
                    // 0,1 -> split; 2 -> full
                    if (idx < 2) return <PostCard key={p.id || p.slug} post={p} />
                    if (idx === 2) return <PostFullCard key={p.id || p.slug} post={p} />

                    // After first three, follow layout: full, split, split, split, overlay (repeat)
                    const pos = (idx - 3) % 5
                    if (pos === 0) return <PostFullCard key={p.id || p.slug} post={p} />
                    if (pos >= 1 && pos <= 3) return <PostCard key={p.id || p.slug} post={p} />
                    return <PostOverlayCard key={p.id || p.slug} post={p} />
                  })}
                </div>
                <div className="py-6">
                  <LoadMoreButton 
                    onClick={handleLoadMore}
                    disabled={visibleCount >= rest.length}
                    loading={loadingMore}
                  />
                </div>
              </div>

              <RightSidebar
                categories={sidebarCategories}
                featured={SIDEBAR_FEATURED}
                topWeek={SIDEBAR_TOP_WEEK}
                stickyTopMd={100}
                stickyTopLg={150}
                showCategoryList={sidebarShowCategoryList}
                categoriesPosition={filter?.category ? 'bottom' : 'top'}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BackToTop />
        </div>
  )
}

export default Blog