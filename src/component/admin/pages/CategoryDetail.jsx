import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { DUMMY_POSTS } from '@/component/Blog'
import EmptyState from '@/components/ui/animations/EmptyState'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TAGS as SIDEBAR_TAGS } from '@/component/data/rightSidebar'
import { ArrowLeft, ExternalLink } from 'lucide-react'

const MOCK = [
  {
    slug: 'europe-visa-travel-tips-and-tricks',
    name: 'Europe Visa Travel Tips and Tricks',
    posts: 12,
    status: 'Active',
    image: 'https://picsum.photos/seed/europe-visa/960/540',
    postItems: [
      { title: 'Sun, Sand, and Serenity', slug: 'europes-best-kept-beaches', image: 'https://picsum.photos/seed/beach-eu/640/426', date: '2025-02-01', excerpt: 'Hidden coastal gems across Europe with serene sands and crystal waters.' },
      { title: 'Schengen checklist', slug: 'schengen-checklist', image: 'https://picsum.photos/seed/schengen/640/426', date: '2025-02-05', excerpt: 'Everything you need before your Schengen visa appointment.' },
      { title: 'Lost passport guide', slug: 'lost-passport-guide', image: 'https://picsum.photos/seed/passport-lost/640/426', date: '2025-02-09', excerpt: 'Steps to follow if you lose your passport while abroad.' },
    ],
  },
  {
    slug: 'indian-visa-travel-tips-and-tricks',
    name: 'Indian Visa Travel Tips and Tricks',
    posts: 9,
    status: 'Active',
    image: 'https://picsum.photos/seed/india-visa/960/540',
    postItems: [
      { title: 'Interview tips', slug: 'embassy-interview-tips', image: 'https://picsum.photos/seed/interview/640/426', date: '2025-01-21', excerpt: 'Practical ways to prepare for embassy interviews.' },
      { title: 'Biometrics explained', slug: 'biometrics-explained', image: 'https://picsum.photos/seed/biometrics/640/426', date: '2025-01-28', excerpt: 'What to expect during your biometrics appointment.' },
    ],
  },
  {
    slug: 'apostille-and-attestation',
    name: 'Apostille and Attestation',
    posts: 7,
    status: 'Active',
    image: 'https://picsum.photos/seed/apostille/960/540',
    postItems: [
      { title: 'Apostille vs Attestation', slug: 'apostille-vs-attestation', image: 'https://picsum.photos/seed/apostille-vs/640/426', date: '2025-03-01', excerpt: 'Understand the difference and when to use each.' },
      { title: 'Attestation basics', slug: 'attestation-basics', image: 'https://picsum.photos/seed/attestation/640/426', date: '2025-03-04', excerpt: 'A beginner-friendly guide to document attestation.' },
    ],
  },
]

export default function CategoryDetail() {
  const { slug } = useParams()
  const category = React.useMemo(() => MOCK.find((c) => c.slug === slug), [slug])
  const matchedPosts = React.useMemo(() => {
    if (!category) return []
    // Match posts by normalized category title
    const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
    const target = norm(category.name)
    return (DUMMY_POSTS || []).filter((p) => norm(p.category) === target).map((p) => ({
      title: p.title,
      slug: p.slug,
      image: p.coverImage,
      date: p.publishedAt,
      excerpt: p.excerpt,
    }))
  }, [category])

  if (!category) {
    return (
      <div className="p-3 sm:p-4 md:p-6">
        <EmptyState title="Category not found" subtitle="Please go back to list." action={<Link to="/admin/categories"><Button>Back to Categories</Button></Link>} />
      </div>
    )
  }

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">{category.name}</h2>
        <Link to="/admin/categories"><Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Back</Button></Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-0 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800 md:col-span-2 overflow-hidden">
          {category.image && (
            <div className="relative h-56 w-full sm:h-64 md:h-72">
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="text-white">
                  <div className="text-sm opacity-80">Category</div>
                  <div className="text-lg font-semibold leading-tight">{category.name}</div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs ${category.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-slate-600 text-white'}`}>{category.status}</span>
              </div>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3 p-4">
            <div className="rounded-full border px-3 py-1 text-xs text-slate-600 dark:text-slate-300">
              Slug: <span className="font-mono">{category.slug}</span>
            </div>
            <div className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-800">
              {category.posts} posts
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
          <div className="mb-2 text-sm text-slate-500">Related categories</div>
          <div className="flex flex-col gap-2">
            {MOCK.filter((c) => c.slug !== category.slug).slice(0, 5).map((c) => (
              <Link key={c.slug} to={`/admin/categories/${c.slug}`} className="group flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <span className="truncate pr-3 group-hover:underline">{c.name}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] ${c.status === 'Active' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-slate-50 text-slate-700 ring-1 ring-slate-200'}`}>{c.status}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
        <div className="mb-3 text-lg font-semibold">Related tags</div>
        <div className="flex flex-wrap gap-2">
          {SIDEBAR_TAGS.slice(0, 12).map((t) => (
            <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">{t}</span>
          ))}
        </div>
      </div>
      <div className="mt-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
        <div className="mb-3 text-lg font-semibold">Posts in this category</div>
        {matchedPosts?.length ? (
          <div className="relative w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead className="w-full">Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matchedPosts.map((p, i) => (
                  <TableRow key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <TableCell>
                      <img src={p.image} alt={p.title} loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                    </TableCell>
                    <TableCell>
                      <div className="line-clamp-2 font-semibold text-slate-900 dark:text-slate-100" title={p.title}>{p.title}</div>
                      {p.excerpt && <div className="line-clamp-2 text-xs text-slate-500">{p.excerpt}</div>}
                      <div className="text-xs text-slate-400">Slug: <span className="break-all">{p.slug}</span></div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600">{p.date || '—'}</span>
                    </TableCell>
                    {/* <TableCell>
                      <Link to={`/admin/blogs/${p.slug}`} className="inline-flex items-center gap-1 text-blue-700 hover:underline dark:text-blue-300">
                        Open <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-slate-500">No posts listed.</div>
        )}
      </div>
    </div>
  )
}


