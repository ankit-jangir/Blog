import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import { showSuccessToast, showErrorToast } from '@/components/ui/global-toast'

export default function CategoryNew() {
  const navigate = useNavigate()
  const [form, setForm] = React.useState({
    name: '',
    slug: '',
    status: 'Active',
    description: '',
    author: 'Admin',
    createdAt: new Date().toISOString().slice(0, 16),
    coverFile: null,
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

  function handleName(e) {
    const value = e.target.value
    setForm((prev) => ({ ...prev, name: value, slug: slugLocked ? prev.slug : slugify(value) }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { name, slug, status, description, author, createdAt, coverFile } = form
    if (!name || !slug) {
      showErrorToast('Please fill required fields')
      return
    }
    let image = ''
    if (coverFile) {
      try {
        image = await new Promise((resolve, reject) => {
          const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(coverFile)
        })
      } catch {}
    }
    const newCat = {
      id: `uc-${Date.now()}`,
      name: String(name).trim(),
      slug: slugify(slug || name),
      status: status === 'Inactive' ? 'Inactive' : 'Active',
      description: String(description || '').trim(),
      author: String(author || 'Admin').trim(),
      createdAt: createdAt ? new Date(createdAt).toISOString() : new Date().toISOString(),
      posts: 0,
      image,
    }
    try {
      const prev = JSON.parse(localStorage.getItem('admin_categories') || '[]')
      localStorage.setItem('admin_categories', JSON.stringify([newCat, ...prev]))
    } catch {}
    showSuccessToast('Category created')
    navigate('/admin/categories')
  }

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Add Category</h2>
        <Link to="/admin/categories"><Button variant="outline">Cancel</Button></Link>
      </div>
      <form onSubmit={handleSubmit} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Name *</div>
            <Input value={form.name} onChange={handleName} placeholder="e.g., Travel Tips" />
          </div>
          <div>
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Slug *</div>
            <Input value={form.slug} onChange={(e) => { setSlugLocked(true); handleChange('slug', slugify(e.target.value)) }} placeholder="slug-like-this" />
          </div>
          <div>
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Author</div>
            <Input value={form.author} onChange={(e) => handleChange('author', e.target.value)} placeholder="Author name" />
          </div>
          <div>
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Created at</div>
            <Input type="datetime-local" value={form.createdAt} onChange={(e) => handleChange('createdAt', e.target.value)} />
          </div>
          <div>
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Status</div>
            <select className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs" value={form.status} onChange={(e) => handleChange('status', e.target.value)}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Cover Image</div>
            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 p-4 text-center hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/40">
                <span className="text-xs text-slate-500">Click to select an image (optional)</span>
                <input type="file" accept="image/*" onChange={(e) => handleChange('coverFile', e.target.files?.[0] || null)} className="hidden" />
              </label>
              {form.coverFile && (
                <div className="relative overflow-hidden rounded-md border">
                  <img src={URL.createObjectURL(form.coverFile)} alt="preview" className="h-24 w-32 object-cover" />
                  <button
                    type="button"
                    onClick={() => handleChange('coverFile', null)}
                    className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100 dark:bg-gray-900 dark:text-slate-200 dark:ring-gray-700"
                    aria-label="Remove image"
                    title="Remove image"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Description</div>
            <textarea className="border-input min-h-[120px] w-full rounded-md border bg-transparent p-3 text-sm shadow-xs" value={form.description} onChange={(e) => handleChange('description', e.target.value)} placeholder="Short description" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/categories')}>Discard</Button>
          <Button type="submit" className="bg-blue-900 text-white hover:bg-blue-950">Create</Button>
        </div>
      </form>
    </div>
  )
}



