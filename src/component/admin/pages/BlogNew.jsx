import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { showSuccessToast, showErrorToast } from '@/components/ui/global-toast'
import { CATEGORIES as SIDEBAR_CATEGORIES, TAGS as SIDEBAR_TAGS } from '@/component/data/rightSidebar'

export default function BlogNew() {
  const navigate = useNavigate()
  const [form, setForm] = React.useState({
    title: '',
    slug: '',
    category: '',
    tags: '',
    author: 'Admin',
    coverFile: null,
    readTime: '5 min read',
    date: new Date().toISOString().slice(0, 10),
    excerpt: '',
    content: '',
  })
  const [slugLocked, setSlugLocked] = React.useState(false)

  function slugify(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleTitle(e) {
    const value = e.target.value
    setForm((prev) => ({ ...prev, title: value, slug: slugLocked ? prev.slug : slugify(value) }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { title, slug, category, author, readTime, date, excerpt, content, tags } = form
    if (!title || !slug || !category || !author || !readTime || !date || !form.coverFile || !excerpt || !content || !tags) {
      showErrorToast('Please fill all required fields')
      return
    }
    try {
      const file = form.coverFile
      const fileDataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
      const newRow = {
        id: String(Date.now()),
        title: form.title,
        slug: slugify(form.slug || form.title),
        author,
        category,
        status: 'Published',
        date,
        readTime,
        excerpt,
        content,
        tag: tags,
        tags: [tags],
        image: fileDataUrl,
      }
      try {
        const prev = JSON.parse(localStorage.getItem('admin_new_blogs') || '[]')
        localStorage.setItem('admin_new_blogs', JSON.stringify([newRow, ...prev]))
      } catch {}
      showSuccessToast('Blog created')
      navigate('/admin/Blogs')
    } catch (err) {
      showErrorToast('Failed to read image file')
    }
  }

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Add Blog</h2>
        <Link to="/admin/Blogs"><Button variant="outline">Cancel</Button></Link>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Title *</div>
            <Input value={form.title} onChange={handleTitle} placeholder="Post title" />
          </div>
          <div>
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Slug *</div>
            <Input
              value={form.slug}
              onChange={(e) => { setSlugLocked(true); handleChange('slug', slugify(e.target.value)) }}
              placeholder="slug-like-this"
            />
          </div>
          <div>
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Category *</div>
            <select
              className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
            >
              <option value="">Select category</option>
              {SIDEBAR_CATEGORIES.map((c) => (
                <option key={c.title} value={c.title}>{c.title}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Author</div>
            <Input value={form.author} onChange={(e) => handleChange('author', e.target.value)} placeholder="Author name" />
          </div>
          <div>
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Tag *</div>
            <select
              className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              value={form.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
            >
              <option value="">Select tag</option>
              {SIDEBAR_TAGS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Cover Image *</div>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 p-4 text-center hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/40">
              <span className="text-xs text-slate-500">Click to select an image (JPG/PNG)</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleChange('coverFile', e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
            {form.coverFile && (
              <div className="mt-3 overflow-hidden rounded-md border">
                <img src={URL.createObjectURL(form.coverFile)} alt="preview" className="h-48 w-full object-cover" />
              </div>
            )}
          </div>
          <div>
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Read time</div>
            <Input value={form.readTime} onChange={(e) => handleChange('readTime', e.target.value)} placeholder="5 min read" />
          </div>
          <div>
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Published date</div>
            <Input type="date" value={form.date} onChange={(e) => handleChange('date', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Excerpt *</div>
            <textarea
              className="border-input min-h-[90px] w-full rounded-md border bg-transparent p-3 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              value={form.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              placeholder="Short summary shown on cards"
            />
          </div>
          <div className="md:col-span-2">
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Content</div>
            <textarea
              className="border-input min-h-[160px] w-full rounded-md border bg-transparent p-3 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              value={form.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Full blog content (optional for now)"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/Blogs')}>Discard</Button>
          <Button type="submit" className="bg-blue-900 text-white hover:bg-blue-950">Create</Button>
        </div>
      </form>
    </div>
  )
}


