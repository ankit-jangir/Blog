import React from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import EmptyState from '@/components/ui/animations/EmptyState'
import { DUMMY_POSTS } from '@/component/Blog'
import { ExternalLink } from 'lucide-react'

export default function AdminPostDetail() {
  const { slug } = useParams()
  const location = useLocation()

  const injected = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('admin_new_blogs') || '[]') } catch { return [] }
  }, [])
  const merged = React.useMemo(() => {
    const bySlug = new Map()
    ;[...(DUMMY_POSTS || []), ...injected].forEach((p) => bySlug.set(p.slug, p))
    return bySlug
  }, [injected])

  const postFromState = location.state && location.state.item ? location.state.item : null
  const post = postFromState || (slug ? merged.get(slug) : null)

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
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100">{post.title}</h2>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>{post.author || 'Admin'}</span>
            {post.date && <span>• {post.date}</span>}
            {post.readTime && <span>• {post.readTime}</span>}
            {post.category && (
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-800">
                {post.category}
              </span>
            )}
            {Array.isArray(post.tags) && post.tags.length > 0 && (
              <span className="flex flex-wrap items-center gap-1">
                {post.tags.slice(0,3).map((t) => (
                  <span key={t} className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] text-slate-700 ring-1 ring-slate-200 dark:bg-gray-800 dark:text-slate-300 dark:ring-gray-700">{t}</span>
                ))}
                {post.tags.length > 3 && <span className="text-[10px] text-slate-500">+{post.tags.length - 3}</span>}
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

      <div className="grid gap-6 md:grid-cols-3">
        <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800 md:col-span-2">
          <div className="relative">
            {post.image && (
              <img src={post.image} alt={post.title} className="h-72 w-full object-cover sm:h-96 md:h-[420px]" loading="lazy" />
            )}
            {post.image && <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />}
          </div>
          <div className="p-5 md:p-7">
            {post.subtitle && (
              <p className="mb-4 text-base text-slate-700 dark:text-slate-300">{post.subtitle}</p>
            )}
            {post.excerpt && (
              <p className="text-slate-700 dark:text-slate-300">{post.excerpt}</p>
            )}
            {Array.isArray(post.keyPoints) && post.keyPoints.length > 0 && (
              <ul className="mt-5 list-disc pl-6 text-slate-700 dark:text-slate-300">
                {post.keyPoints.map((k) => (<li key={k}>{k}</li>))}
              </ul>
            )}
            {post.content && (
              <div className="prose prose-slate mt-6 max-w-none dark:prose-invert">
                <p>{post.content}</p>
              </div>
            )}
            {Array.isArray(post.sections) && post.sections.length > 0 && (
              <div className="mt-8 space-y-10">
                {post.sections.map((sec, idx) => (
                  <section key={idx} className="border-t pt-6 first:border-t-0 first:pt-0 border-slate-200 dark:border-gray-800">
                    {sec.heading && <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">{sec.heading}</h3>}
                    {sec.intro && <p className="text-slate-700 dark:text-slate-300">{sec.intro}</p>}
                    {Array.isArray(sec.bullets) && sec.bullets.length > 0 && (
                      <ul className="mt-3 list-disc pl-6 text-slate-700 dark:text-slate-300">
                        {sec.bullets.map((b) => (<li key={b}>{b}</li>))}
                      </ul>
                    )}
                    {Array.isArray(sec.items) && sec.items.length > 0 && (
                      <div className="mt-4 space-y-5">
                        {sec.items.map((it, j) => (
                          <div key={j}>
                            {it.subtitle && <h4 className="mb-1 text-lg font-semibold text-slate-800 dark:text-slate-200">{it.subtitle}</h4>}
                            {it.description && <p className="text-slate-700 dark:text-slate-300">{it.description}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                    {sec.table && Array.isArray(sec.table.columns) && sec.table.columns.length > 0 && (
                      <div className="mt-5 overflow-x-auto rounded-xl bg-white/60 p-3 shadow-sm ring-1 ring-black/5 dark:bg-gray-900/50 dark:ring-gray-800">
                        {sec.table.title && <h4 className="mb-3 text-base font-semibold text-slate-800 dark:text-slate-200">{sec.table.title}</h4>}
                        <table className="w-full table-auto text-left text-sm">
                          <thead>
                            <tr className="border-b bg-slate-50 text-slate-600 dark:bg-gray-800 dark:text-slate-300">
                              {sec.table.columns.map((c, ci) => (<th key={ci} className="py-2 pr-3 font-medium">{c}</th>))}
                            </tr>
                          </thead>
                          <tbody>
                            {(sec.table.rows || []).map((r, ri) => (
                              <tr key={ri} className="border-b last:border-0 odd:bg-slate-50/40 dark:odd:bg-gray-800/40">
                                {sec.table.columns.map((_, ci) => (<td key={ci} className="py-2 pr-3 align-top text-slate-700 dark:text-slate-300">{r?.[ci] || ''}</td>))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            )}

            {Array.isArray(post.steps) && post.steps.length > 0 && (
              <div className="mt-10 border-t border-slate-200 pt-6 dark:border-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">Steps</h3>
                <ol className="list-decimal space-y-1 pl-6 text-slate-700 dark:text-slate-300">
                  {post.steps.map((s, i) => (<li key={i}>{s}</li>))}
                </ol>
              </div>
            )}

            {Array.isArray(post.fees) && post.fees.length > 0 && (
              <div className="mt-10 border-t border-slate-200 pt-6 dark:border-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">Fees</h3>
                <div className="overflow-x-auto rounded-xl bg-white/60 p-3 shadow-sm ring-1 ring-black/5 dark:bg-gray-900/50 dark:ring-gray-800">
                  <table className="w-full table-auto text-left text-sm">
                    <thead>
                      <tr className="border-b bg-slate-50 text-slate-600 dark:bg-gray-800 dark:text-slate-300">
                        <th className="py-2 pr-3 font-medium">Passport Type</th>
                        <th className="py-2 pr-3 font-medium">Pages</th>
                        <th className="py-2 pr-3 font-medium">Validity</th>
                        <th className="py-2 pr-3 font-medium">Fee (Normal)</th>
                        <th className="py-2 pr-3 font-medium">Fee (Tatkal)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {post.fees.map((r, i) => (
                        <tr key={i} className="border-b last:border-0 odd:bg-slate-50/40 dark:odd:bg-gray-800/40">
                          <td className="py-2 pr-3">{r.type}</td>
                          <td className="py-2 pr-3">{r.pages}</td>
                          <td className="py-2 pr-3">{r.validity}</td>
                          <td className="py-2 pr-3">{r.feeNormal}</td>
                          <td className="py-2 pr-3">{r.feeTatkal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </article>

        <aside className="md:sticky md:top-24">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
            <div className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Overview</div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li><span className="text-slate-500">Status:</span> <span className="ml-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:ring-emerald-800">{post.status || 'Published'}</span></li>
              {post.slug && <li><span className="text-slate-500">Slug:</span> <span className="ml-1 break-all">{post.slug}</span></li>}
              {post.author && <li><span className="text-slate-500">Author:</span> <span className="ml-1">{post.author}</span></li>}
              {post.category && <li><span className="text-slate-500">Category:</span> <span className="ml-1">{post.category}</span></li>}
              {post.readTime && <li><span className="text-slate-500">Read time:</span> <span className="ml-1">{post.readTime}</span></li>}
              {post.date && <li><span className="text-slate-500">Published:</span> <span className="ml-1">{post.date}</span></li>}
              {Array.isArray(post.tags) && post.tags.length > 0 && (
                <li className="flex flex-wrap gap-1"><span className="text-slate-500">Tags:</span> {post.tags.map((t) => (
                  <span key={t} className="ml-1 rounded-full bg-slate-50 px-2 py-0.5 text-[10px] text-slate-700 ring-1 ring-slate-200 dark:bg-gray-800 dark:text-slate-300 dark:ring-gray-700">{t}</span>
                ))}</li>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}


