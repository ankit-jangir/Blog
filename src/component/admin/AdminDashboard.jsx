import React from 'react'
import AdminLayout from './layout/AdminLayout'
import { BookOpenText, FileText, Tag as TagIcon, Folder } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { DUMMY_POSTS } from '@/component/Blog'
import { CATEGORIES as SIDEBAR_CATEGORIES, TAGS as SIDEBAR_TAGS } from '@/component/data/rightSidebar'


export default function AdminDashboard() {
  const injected = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('admin_new_blogs') || '[]') } catch { return [] }
  }, [])
  const posts = React.useMemo(() => ([...(injected || []), ...(DUMMY_POSTS || [])]), [injected])
  const totalBlogs = posts.length
  const totalPublishedPosts = posts.filter((p) => (p.status ? p.status === 'Published' : true)).length
  const totalTags = SIDEBAR_TAGS.length
  const totalCategories = SIDEBAR_CATEGORIES.length
  const recentBlogs = React.useMemo(() => {
    const normalized = posts.map((p, i) => ({
      title: p.title,
      category: p.category || '—',
      status: p.status || 'Published',
      date: p.date || p.publishedAt || `2025-01-${(i%27)+1}`,
    }))
    return normalized
      .sort((a,b)=> new Date(b.date) - new Date(a.date))
      .slice(0,5)
  }, [posts])
  const categories = SIDEBAR_CATEGORIES
  const tags = SIDEBAR_TAGS.slice(0,12)

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        {/* KPI row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Blogs */}
          <Link to="/admin/Blogs" className="relative block h-28 overflow-hidden rounded-2xl p-5 shadow-sm ring-1 ring-black/5 bg-gradient-to-br from-blue-50 to-blue-100 transition hover:shadow-md dark:from-blue-950/40 dark:to-blue-900/30">
            <div className="flex h-full items-start justify-between">
              <div>
                <div className="text-xs font-medium text-blue-700/80 dark:text-blue-300/80">Total Blogs</div>
                <div className="mt-1 text-3xl font-extrabold text-blue-900 dark:text-blue-200">{totalBlogs}</div>
              </div>
              <div className="rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-white/60 dark:bg-white/10 dark:ring-white/10">
                <BookOpenText className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
          </Link>

          {/* Total Posts */}
          <Link to="/admin/Blogs" className="relative block h-28 overflow-hidden rounded-2xl p-5 shadow-sm ring-1 ring-black/5 bg-gradient-to-br from-indigo-50 to-indigo-100 transition hover:shadow-md dark:from-indigo-950/40 dark:to-indigo-900/30">
            <div className="flex h-full items-start justify-between">
              <div>
                <div className="text-xs font-medium text-indigo-700/80 dark:text-indigo-300/80">Total Posts</div>
                <div className="mt-1 text-3xl font-extrabold text-indigo-900 dark:text-indigo-200">{totalPublishedPosts}</div>
              </div>
              <div className="rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-white/60 dark:bg-white/10 dark:ring-white/10">
                <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
              </div>
            </div>
          </Link>

          {/* Total Tags */}
          <Link to="/admin/tags" className="relative block h-28 overflow-hidden rounded-2xl p-5 shadow-sm ring-1 ring-black/5 bg-gradient-to-br from-fuchsia-50 to-pink-100 transition hover:shadow-md dark:from-fuchsia-950/40 dark:to-pink-900/30">
            <div className="flex h-full items-start justify-between">
              <div>
                <div className="text-xs font-medium text-fuchsia-700/80 dark:text-pink-300/80">Total Tags</div>
                <div className="mt-1 text-3xl font-extrabold text-fuchsia-900 dark:text-pink-200">{totalTags}</div>
              </div>
              <div className="rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-white/60 dark:bg-white/10 dark:ring-white/10">
                <TagIcon className="h-6 w-6 text-fuchsia-600 dark:text-pink-300" />
              </div>
            </div>
          </Link>

          {/* Total Categories */}
          <Link to="/admin/categories" className="relative block h-28 overflow-hidden rounded-2xl p-5 shadow-sm ring-1 ring-black/5 bg-gradient-to-br from-emerald-50 to-emerald-100 transition hover:shadow-md dark:from-emerald-950/40 dark:to-emerald-900/30">
            <div className="flex h-full items-start justify-between">
              <div>
                <div className="text-xs font-medium text-emerald-700/80 dark:text-emerald-300/80">Total Categories</div>
                <div className="mt-1 text-3xl font-extrabold text-emerald-900 dark:text-emerald-200">{totalCategories}</div>
              </div>
              <div className="rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-white/60 dark:bg-white/10 dark:ring-white/10">
                <Folder className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
              </div>
            </div>
          </Link>
        </div>

        

        {/* Recent Blogs + Tags + Categories */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800 lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">Recent Blogs</div>
              <Link to="/admin/Blogs"><Button variant="outline" size="sm">More</Button></Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead><tr className="border-b text-slate-500 dark:text-slate-400"><th className="py-2 pr-2">Title</th><th className="py-2 pr-2">Post Date</th><th className="py-2 pr-2">Category</th><th className="py-2 pr-2">Status</th></tr></thead>
                <tbody>
                  {recentBlogs.map((p) => (
                    <tr key={`${p.title}-${p.date}`} className="border-b last:border-0">
                      <td className="py-2 pr-2 max-w-[320px] truncate" title={p.title}>{p.title}</td>
                      <td className="py-2 pr-2">{p.date}</td>
                      <td className="py-2 pr-2">{p.category}</td>
                      <td className="py-2 pr-2"><span className={`rounded-full px-2 py-0.5 text-xs ${p.status==='Published'?'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200':'bg-slate-50 text-slate-700 ring-1 ring-slate-200'}`}>{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">Tags</div>
                <Link to="/admin/tags"><Button variant="outline" size="sm">More</Button></Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {tags.map((t)=> (<span key={t} className="truncate rounded-full bg-slate-50 px-3 py-1 text-xs ring-1 ring-slate-200 dark:bg-gray-800 dark:ring-gray-700" title={t}>{t}</span>))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">Categories</div>
                <Link to="/admin/categories"><Button variant="outline" size="sm">More</Button></Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead><tr className="border-b text-slate-500 dark:text-slate-400"><th className="py-2 pr-2">Category</th><th className="py-2 pr-2">Posts</th></tr></thead>
                  <tbody>
                    {categories.slice(0,6).map((c)=> (
                      <tr key={c.key} className="border-b last:border-0">
                        <td className="py-2 pr-2 max-w-[240px] truncate" title={c.title}>{c.title}</td>
                        <td className="py-2 pr-2">{c.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
