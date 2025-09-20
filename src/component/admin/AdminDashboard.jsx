import React from 'react'
import AdminLayout from './layout/AdminLayout'
import { ArrowUpRight, FileText, Eye, MessageSquare, DollarSign } from 'lucide-react'
import { DUMMY_POSTS } from '@/component/Blog'
import { CATEGORIES as SIDEBAR_CATEGORIES, TAGS as SIDEBAR_TAGS } from '@/component/data/rightSidebar'


export default function AdminDashboard() {
  const injected = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('admin_new_blogs') || '[]') } catch { return [] }
  }, [])
  const posts = React.useMemo(() => ([...(injected || []), ...(DUMMY_POSTS || [])]), [injected])
  const totals = { posts: posts.length, views: 102402, comments: 12403, earning: 143.1 }
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug']
  const monthlyViews = [3800,2600,3400,3700,4137,3200,4600,1200]
  const devices = { mobile: 3152, desktop: 996 }
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
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
            <div className="flex items-center justify-between"><div className="text-xs text-slate-500">Post</div><FileText className="h-4 w-4 text-slate-400" /></div>
            <div className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-slate-100">{totals.posts}</div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
            <div className="flex items-center justify-between"><div className="text-xs text-slate-500">View</div><Eye className="h-4 w-4 text-amber-500" /></div>
            <div className="mt-1 text-2xl font-extrabold text-amber-600">{totals.views.toLocaleString()}</div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
            <div className="flex items-center justify-between"><div className="text-xs text-slate-500">Comment</div><MessageSquare className="h-4 w-4 text-rose-500" /></div>
            <div className="mt-1 text-2xl font-extrabold text-rose-600">{totals.comments.toLocaleString()}</div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
            <div className="flex items-center justify-between"><div className="text-xs text-slate-500">Earning</div><DollarSign className="h-4 w-4 text-emerald-600" /></div>
            <div className="mt-1 text-2xl font-extrabold text-emerald-600">${totals.earning}</div>
          </div>
        </div>

        {/* Report + right column */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800 lg:col-span-2">
            <div className="mb-3 flex items-center justify-between"><div className="text-lg font-semibold text-slate-800 dark:text-slate-100">Report View</div><div className="text-xs rounded-md border px-2 py-1 text-slate-500">Monthly</div></div>
            <div className="relative h-56 w-full sm:h-64">
              <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full">
                {monthlyViews.map((v,i)=>{
                  const x = (i*(100/months.length))+4
                  const h = (v/4800)*45+5
                  const y = 55 - h
                  const isPeak = i===4
                  return <rect key={i} x={x} y={y} width="6" height={h} rx="1" fill={isPeak? '#3b82f6':'#d1d5db'} />
                })}
              </svg>
              <div className="absolute inset-x-0 bottom-0 flex justify-between px-4 text-[10px] text-slate-500">{months.map((m)=> <span key={m}>{m}</span>)}</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
              <div className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Recent Activity</div>
              <ul className="space-y-3 text-sm">
                <li><span className="font-semibold">You</span> published <span className="font-medium">{posts[0]?.title || 'a new post'}</span></li>
                <li><span className="font-semibold">Earning</span> this week <span className="text-emerald-600">$143.10</span> added</li>
                <li><span className="font-semibold">Congratulations!</span> Your post reached 1K views</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
              <div className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">User Devices</div>
              <div className="relative mx-auto h-40 w-40">
                <svg viewBox="0 0 36 36" className="h-full w-full"><defs><linearGradient id="dm" x1="0" x2="1"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#34d399" /></linearGradient></defs><circle cx="18" cy="18" r="15.915" fill="none" stroke="#e5e7eb" strokeWidth="3" /><circle cx="18" cy="18" r="15.915" fill="none" stroke="url(#dm)" strokeWidth="3" strokeDasharray={`${(devices.mobile/(devices.mobile+devices.desktop))*100}, 100`} transform="rotate(-90 18 18)" /></svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">{Math.round((devices.mobile/(devices.mobile+devices.desktop))*100)}%</div>
              </div>
              <ul className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-300"><li>Mobile – (76% – {devices.mobile.toLocaleString()})</li><li>Desktop – (24% – {devices.desktop.toLocaleString()})</li></ul>
            </div>
          </div>
        </div>

        {/* Recent Blogs + Tags + Categories */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800 lg:col-span-2">
            <div className="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-100">Recent Blogs</div>
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
              <div className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Tags</div>
              <div className="grid grid-cols-2 gap-2">
                {tags.map((t)=> (<span key={t} className="truncate rounded-full bg-slate-50 px-3 py-1 text-xs ring-1 ring-slate-200 dark:bg-gray-800 dark:ring-gray-700" title={t}>{t}</span>))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
              <div className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">Categories</div>
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
