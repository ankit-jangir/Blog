import React from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { DUMMY_POSTS } from '@/component/Blog'
import EmptyState from '@/components/ui/animations/EmptyState'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TAGS as SIDEBAR_TAGS } from '@/component/data/rightSidebar'
import { ArrowLeft, ExternalLink, MoreHorizontal } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { showSuccessToast } from '@/components/ui/global-toast'

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
  const location = useLocation()
  const navigate = useNavigate()
  const stateItem = location.state && location.state.item ? location.state.item : null
  const injected = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('admin_categories') || '[]') } catch { return [] }
  }, [])
  const category = React.useMemo(() => {
    if (stateItem && (stateItem.slug === slug || !slug)) return stateItem
    const fromStorage = injected.find((c) => c.slug === slug)
    if (fromStorage) return fromStorage
    return MOCK.find((c) => c.slug === slug)
  }, [slug, stateItem, injected])

  const [cat, setCat] = React.useState(category)
  React.useEffect(() => { setCat(category) }, [category])

  function updateStatus(nextStatus) {
    setCat((prev) => ({ ...prev, status: nextStatus }))
    try {
      const stored = JSON.parse(localStorage.getItem('admin_categories') || '[]')
      const mapped = stored.map((c) => (c.slug === (category && category.slug)) ? { ...c, status: nextStatus } : c)
      localStorage.setItem('admin_categories', JSON.stringify(mapped))
    } catch {}
    showSuccessToast('Status updated')
  }
  const injectedPosts = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('admin_new_blogs') || '[]') } catch { return [] }
  }, [])
  const hiddenDemoSlugs = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('admin_hidden_posts') || '[]') } catch { return [] }
  }, [])

  const [posts, setPosts] = React.useState([])
  const [openDeletePost, setOpenDeletePost] = React.useState(false)
  const [pendingPost, setPendingPost] = React.useState(null)
  React.useEffect(() => {
    if (!category) { setPosts([]); return }
    const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
    const target = norm(category.name)
    const injected = (injectedPosts || [])
      .filter((p) => norm(p.category) === target)
      .map((p) => ({ title: p.title, slug: p.slug, image: p.image, date: p.date, excerpt: p.excerpt, canDelete: true }))
    const base = (DUMMY_POSTS || [])
      .filter((p) => norm(p.category) === target)
      .map((p) => ({ title: p.title, slug: p.slug, image: p.coverImage, date: p.publishedAt, excerpt: p.excerpt, canDelete: false }))
      .filter((p) => !(hiddenDemoSlugs || []).includes(p.slug))
    setPosts([...injected, ...base])
  }, [category, injectedPosts, hiddenDemoSlugs])

  function handleDeletePost(slugToDelete, canDelete) {
    try {
      if (canDelete) {
        const stored = JSON.parse(localStorage.getItem('admin_new_blogs') || '[]')
        const next = stored.filter((b) => b.slug !== slugToDelete)
        localStorage.setItem('admin_new_blogs', JSON.stringify(next))
      } else {
        const hidden = JSON.parse(localStorage.getItem('admin_hidden_posts') || '[]')
        if (!hidden.includes(slugToDelete)) {
          hidden.push(slugToDelete)
          localStorage.setItem('admin_hidden_posts', JSON.stringify(hidden))
        }
      }
      setPosts((prev) => prev.filter((p) => p.slug !== slugToDelete))
      showSuccessToast('Post removed')
    } catch {}
  }

  if (!category) {
    return (
      <div className="p-3 sm:p-4 md:p-6">
        <EmptyState title="Category not found" subtitle="Please go back to list." action={<Link to="/admin/categories"><Button>Back to Categories</Button></Link>} />
      </div>
    )
  }

  const heroImage = (cat && cat.image) || `https://picsum.photos/seed/${encodeURIComponent((cat && (cat.slug || cat.name)) || 'category')}/960/540`

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100 break-words" title={cat?.name}>{cat?.name}</h2>
        <div className="flex items-center gap-2">
          <Link to="/admin/blogs/new"><Button className="bg-blue-900 text-white hover:bg-blue-950">Add Post</Button></Link>
          <Link to="/admin/categories"><Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Back</Button></Link>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="overflow-hidden rounded-2xl bg-white p-0 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800 md:col-span-2">
          {heroImage && (
            <div className="relative h-56 w-full sm:h-64 md:h-72">
              <img
                src={heroImage}
                alt={cat?.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="min-w-0 text-white">
                  <div className="text-sm opacity-80">Category</div>
                  <div className="max-w-[70vw] truncate text-lg font-semibold leading-tight sm:max-w-[50vw]" title={cat?.name}>{cat?.name}</div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs ${cat?.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-slate-600 text-white'}`}>{cat?.status}</span>
              </div>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3 p-4">
            <div className="rounded-full border px-3 py-1 text-xs text-slate-600 dark:text-slate-300">
              Slug:
              <span className="ml-1 break-all font-mono" title={cat?.slug}>{cat?.slug}</span>
            </div>
            <div className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-800">
              {cat?.posts} posts
            </div>
          </div>
          {cat?.description && (
            <div className="mx-4 mb-4 rounded-md bg-slate-50 p-4 text-sm text-slate-700 ring-1 ring-slate-200 dark:bg-gray-800 dark:text-slate-300 dark:ring-gray-800 whitespace-pre-wrap break-words">
              {cat.description}
            </div>
          )}
        </div>
        <aside className="md:sticky md:top-24 self-start space-y-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
            <div className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Overview</div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li><span className="text-slate-500">Name:</span> <span className="ml-1 break-all" title={cat?.name}>{cat?.name}</span></li>
              <li><span className="text-slate-500">Slug:</span> <span className="ml-1 break-all font-mono" title={cat?.slug}>{cat?.slug}</span></li>
              <li>
                <span className="text-slate-500">Status:</span>
                <select
                  className="ml-2 inline-flex h-7 rounded-md border border-slate-300 bg-transparent px-2 text-xs shadow-sm dark:border-slate-700"
                  value={cat?.status || 'Active'}
                  onChange={(e) => updateStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </li>
              {cat?.author && <li><span className="text-slate-500">Author:</span> <span className="ml-1">{cat.author}</span></li>}
              {cat?.createdAt && <li><span className="text-slate-500">Created:</span> <span className="ml-1">{new Date(cat.createdAt).toLocaleString()}</span></li>}
              <li><span className="text-slate-500">Posts:</span> <span className="ml-1">{cat?.posts || 0}</span></li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
            <div className="mb-2 text-sm text-slate-500">Related categories</div>
            <div className="flex flex-col gap-2">
              {MOCK.filter((c) => c.slug !== (cat && cat.slug)).slice(0, 5).map((c) => (
                <Link key={c.slug} to={`/admin/categories/${c.slug}`} className="group flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <span className="truncate pr-3 group-hover:underline" title={c.name}>{c.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${c.status === 'Active' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-slate-50 text-slate-700 ring-1 ring-slate-200'}`}>{c.status}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
      <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
        <div className="mb-3 text-lg font-semibold">Related tags</div>
        <div className="flex flex-wrap gap-2">
          {SIDEBAR_TAGS.slice(0, 12).map((t) => (
            <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">{t}</span>
          ))}
        </div>
      </div>
      <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
        <div className="mb-3 text-lg font-semibold">Posts in this category</div>
        {posts?.length ? (
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
                {posts.map((p, i) => (
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
                    <TableCell>
                      <div className="flex items-center justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onSelect={() => navigate(`/admin/blogs/${p.slug}`)}>View</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className={'text-destructive'}
                              onSelect={() => {
                                setPendingPost(p)
                                setOpenDeletePost(true)
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-slate-500">No posts listed.</div>
        )}
      </div>
      <Dialog open={openDeletePost} onOpenChange={setOpenDeletePost}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post?</DialogTitle>
            <DialogDescription>
              {pendingPost && (
                <>
                  {pendingPost.canDelete ? 'This action cannot be undone.' : 'This is a demo post and cannot be deleted.'}
                  {" "}Delete "
                  <span className="inline-block max-w-[260px] truncate align-bottom" title={pendingPost.title}>
                    {pendingPost.title}
                  </span>
                  "?
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDeletePost(false)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (pendingPost) {
                  handleDeletePost(pendingPost.slug, pendingPost.canDelete)
                }
                setOpenDeletePost(false)
                setPendingPost(null)
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


