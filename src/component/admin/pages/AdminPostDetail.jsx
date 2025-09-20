import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import EmptyState from '@/components/ui/animations/EmptyState'
import { DUMMY_POSTS } from '@/component/Blog'
import { ExternalLink } from 'lucide-react'

export default function AdminPostDetail() {
  const { slug } = useParams()

  const injected = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('admin_new_blogs') || '[]') } catch { return [] }
  }, [])
  const merged = React.useMemo(() => {
    const bySlug = new Map()
    ;[...(DUMMY_POSTS || []), ...injected].forEach((p) => bySlug.set(p.slug, p))
    return bySlug
  }, [injected])

  const post = slug ? merged.get(slug) : null

  if (!slug) {
    return (
      <div className="p-3 sm:p-4 md:p-6">
        <EmptyState title="Post not found" subtitle="Please go back to list." action={<Link to="/admin/Blogs"><Button>Back to Blogs</Button></Link>} />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="p-3 sm:p-4 md:p-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold break-all">{slug}</h2>
          <Link to="/admin/Blogs"><Button variant="outline">Back</Button></Link>
        </div>
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
          <iframe title="post" src={`/blog/${slug}`} className="h-[72vh] w-full rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold leading-tight text-slate-900 dark:text-slate-100">{post.title}</h2>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>{post.author || 'Admin'}</span>
            {post.date && <span>• {post.date}</span>}
            {post.readTime && <span>• {post.readTime}</span>}
            {post.category && (
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-800">
                {post.category}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50">
            Open public <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <Link to="/admin/Blogs"><Button variant="outline">Back</Button></Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800 md:col-span-2">
          <div className="relative">
            {post.image && (
              <img src={post.image} alt={post.title} className="h-60 w-full object-cover sm:h-72 md:h-80" loading="lazy" />
            )}
            {post.image && <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />}
          </div>
          <div className="p-4 md:p-6">
            {post.excerpt && (
              <p className="text-slate-700 dark:text-slate-300">{post.excerpt}</p>
            )}
            {post.content && (
              <div className="prose prose-slate mt-6 max-w-none dark:prose-invert">
                <p>{post.content}</p>
              </div>
            )}
          </div>
        </article>

        <aside className="md:sticky md:top-20">
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
            <div className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Post details</div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li><span className="text-slate-500">Status:</span> <span className="ml-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:ring-emerald-800">{post.status || 'Published'}</span></li>
              {post.category && <li><span className="text-slate-500">Category:</span> <span className="ml-1">{post.category}</span></li>}
              {post.readTime && <li><span className="text-slate-500">Read time:</span> <span className="ml-1">{post.readTime}</span></li>}
              {post.date && <li><span className="text-slate-500">Published:</span> <span className="ml-1">{post.date}</span></li>}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}


