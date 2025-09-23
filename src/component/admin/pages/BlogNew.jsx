import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { showSuccessToast, showErrorToast } from '@/components/ui/global-toast'
import { CATEGORIES as SIDEBAR_CATEGORIES, TAGS as SIDEBAR_TAGS } from '@/component/data/rightSidebar'

export default function BlogNew() {
  const navigate = useNavigate()
  const [form, setForm] = React.useState({
    title: '',
    slug: '',
    categories: [],
    tags: [],
    author: 'Admin',
    coverFile: null,
    readTime: '5 min read',
    date: new Date().toISOString().slice(0, 10),
    excerpt: '',
    content: '',
    subtitle: '',
    keyPoints: '',
    sections: [
      { heading: '', intro: '', bullets: '', items: [{ subtitle: '', description: '' }], table: { columns: [], rows: [] } },
    ],
    steps: '',
    feesRows: [
      { type: '', pages: '', validity: '', feeNormal: '', feeTatkal: '' },
    ],
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
    const { title, slug, categories, author, readTime, date, excerpt, content, tags, subtitle, keyPoints, sections, steps, feesRows } = form
    if (!title || !slug || !Array.isArray(categories) || categories.length === 0 || !author || !readTime || !date || !form.coverFile || !excerpt || !content || !Array.isArray(tags) || tags.length === 0) {
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
        category: Array.isArray(categories) && categories.length ? categories[0] : '',
        categories: Array.isArray(categories) ? categories : [],
        status: 'Published',
        date,
        readTime,
        excerpt,
        content,
        tag: Array.isArray(tags) && tags.length ? tags[0] : '',
        tags: Array.isArray(tags) ? tags : [],
        image: fileDataUrl,
        subtitle,
        keyPoints: String(keyPoints || '')
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        sections: (sections || []).map((s) => ({
          heading: String(s.heading || '').trim(),
          intro: String(s.intro || '').trim(),
          bullets: String(s.bullets || '')
            .split('\n')
            .map((b) => b.replace(/^[-*•]\s*/, '').trim())
            .filter(Boolean),
          items: (Array.isArray(s.items) ? s.items : [])
            .map((it) => ({
              subtitle: String(it.subtitle || '').trim(),
              description: String(it.description || '').trim(),
            }))
            .filter((it) => it.subtitle || it.description),
          table: s.table && Array.isArray(s.table.columns) && s.table.columns.length
            ? {
                title: String(s.table.title || '').trim(),
                columns: s.table.columns.map((c) => String(c || '').trim()),
                rows: (s.table.rows || []).map((r) => (Array.isArray(r) ? r.map((v) => String(v || '').trim()) : [])),
              }
            : undefined,
        })).filter((s) => s.heading || s.intro || (s.bullets && s.bullets.length) || (s.items && s.items.length)),
        steps: String(steps || '')
          .split('\n')
          .map((s) => s.replace(/^\d+[).]\s*/, '').trim())
          .filter(Boolean),
        fees: (feesRows || []).filter((r) => r.type || r.pages || r.validity || r.feeNormal || r.feeTatkal).map((r) => ({
          type: String(r.type || '').trim(),
          pages: String(r.pages || '').trim(),
          validity: String(r.validity || '').trim(),
          feeNormal: String(r.feeNormal || '').trim(),
          feeTatkal: String(r.feeTatkal || '').trim(),
        })),
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
          <div className="min-w-0">
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Categories *</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" className="mt-1 w-full min-h-9 h-auto px-2 py-1.5 justify-between gap-2">
                  <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
                    {form.categories.length ? (
                      form.categories.map((c) => (
                        <span key={c} className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:ring-blue-800">{c}</span>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">Select categories</span>
                    )}
                  </div>
                  <ChevronDown size={16} className="shrink-0 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[min(22rem,90vw)] sm:w-64">
                {SIDEBAR_CATEGORIES.map((c) => (
                  <DropdownMenuCheckboxItem
                    key={c.title}
                    checked={form.categories.includes(c.title)}
                    onCheckedChange={(checked) => {
                      const next = checked
                        ? [...form.categories, c.title]
                        : form.categories.filter((x) => x !== c.title)
                      handleChange('categories', next)
                    }}
                  >
                    {c.title}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Author</div>
            <Input value={form.author} onChange={(e) => handleChange('author', e.target.value)} placeholder="Author name" />
          </div>
          <div className="min-w-0">
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Tags *</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" className="mt-1 w-full min-h-9 h-auto px-2 py-1.5 justify-between gap-2">
                  <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
                    {form.tags.length ? (
                      form.tags.map((t) => (
                        <span key={t} className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:ring-emerald-800">{t}</span>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">Select tags</span>
                    )}
                  </div>
                  <ChevronDown size={16} className="shrink-0 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[min(22rem,90vw)] sm:w-64">
                {SIDEBAR_TAGS.map((t) => (
                  <DropdownMenuCheckboxItem
                    key={t}
                    checked={form.tags.includes(t)}
                    onCheckedChange={(checked) => {
                      const next = checked
                        ? [...form.tags, t]
                        : form.tags.filter((x) => x !== t)
                      handleChange('tags', next)
                    }}
                  >
                    {t}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:col-span-2">
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Cover Image *</div>
            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 p-4 text-center hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/40">
                <span className="text-xs text-slate-500">Click to select an image (JPG/PNG)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChange('coverFile', e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
              {(form.coverFile) && (
                <div className="relative overflow-hidden rounded-md border">
                  <img src={URL.createObjectURL(form.coverFile)} alt="preview" className="h-24 w-32 object-cover" />
                  <button
                    type="button"
                    className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100 dark:bg-gray-900 dark:text-slate-200 dark:ring-gray-700"
                    onClick={() => handleChange('coverFile', null)}
                    title="Remove image"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
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
        {/* Additional middle-section fields */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Subtitle</div>
            <Input value={form.subtitle} onChange={(e) => handleChange('subtitle', e.target.value)} placeholder="Short subtitle under the title" />
          </div>
          <div className="md:col-span-2">
            <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Key points (one per line)</div>
            <textarea
              className="border-input min-h-[120px] w-full rounded-md border bg-transparent p-3 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              value={form.keyPoints}
              onChange={(e) => handleChange('keyPoints', e.target.value)}
              placeholder={"Example:\n• Step-by-step process\n• Required documents\n• Fees and timeline"}
            />
          </div>
          {/* Dynamic Sections: Heading → Intro/Bullets → Items (Subtitle + Description) */}
          <div className="md:col-span-2">
            <div className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Middle Sections</div>
            <div className="space-y-4">
              {form.sections.map((sec, i) => (
                <div key={i} className="rounded-lg border p-3">
                  <div className="mb-1 text-xs text-slate-500">Section {i + 1} Heading</div>
                  <Input value={sec.heading} onChange={(e) => {
                    const next = [...form.sections]; next[i] = { ...next[i], heading: e.target.value }; handleChange('sections', next)
                  }} placeholder="e.g., United Kingdom" />
                  <div className="mt-3 mb-1 text-xs text-slate-500">Intro paragraph</div>
                  <textarea className="border-input min-h-[100px] w-full rounded-md border bg-transparent p-3 text-sm shadow-xs" value={sec.intro || ''} onChange={(e) => { const next = [...form.sections]; next[i] = { ...next[i], intro: e.target.value }; handleChange('sections', next) }} placeholder="Intro description for the section" />
                  <div className="mt-3 mb-1 text-xs text-slate-500">Bullets (one per line)</div>
                  <textarea className="border-input min-h-[80px] w-full rounded-md border bg-transparent p-3 text-sm shadow-xs" value={sec.bullets || ''} onChange={(e) => { const next = [...form.sections]; next[i] = { ...next[i], bullets: e.target.value }; handleChange('sections', next) }} placeholder={"• Personal information\n• Digitally signed photograph"} />
                  <div className="mt-3 space-y-3">
                    {(sec.items || []).map((it, j) => (
                      <div key={j} className="rounded-md border p-3">
                        <div className="mb-1 text-xs text-slate-500">Subtitle</div>
                        <Input value={it.subtitle} onChange={(e) => {
                          const next = [...form.sections]
                          const items = [...(next[i].items || [])]
                          items[j] = { ...items[j], subtitle: e.target.value }
                          next[i] = { ...next[i], items }
                          handleChange('sections', next)
                        }} placeholder="e.g., West Beach, Scotland" />
                        <div className="mt-2 mb-1 text-xs text-slate-500">Description</div>
                        <textarea className="border-input min-h-[120px] w-full rounded-md border bg-transparent p-3 text-sm shadow-xs" value={it.description} onChange={(e) => {
                          const next = [...form.sections]
                          const items = [...(next[i].items || [])]
                          items[j] = { ...items[j], description: e.target.value }
                          next[i] = { ...next[i], items }
                          handleChange('sections', next)
                        }} placeholder="Paragraph details" />
                        <div className="mt-2 flex justify-end gap-2">
                          <Button type="button" variant="outline" onClick={() => {
                            const next = [...form.sections]
                            const items = (next[i].items || []).filter((_, idx) => idx !== j)
                            next[i] = { ...next[i], items }
                            handleChange('sections', next)
                          }}>Remove</Button>
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => {
                      const next = [...form.sections]
                      const items = [...(next[i].items || []), { subtitle: '', description: '' }]
                      next[i] = { ...next[i], items }
                      handleChange('sections', next)
                    }}>Add Item</Button>
                  </div>
                  {/* Table builder */}
                  <div className="mt-4 rounded-md border p-3">
                    <div className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Section Table</div>
                    <Input className="mb-2" placeholder="Table Title (optional)" value={sec.table?.title || ''} onChange={(e) => {
                      const next = [...form.sections]
                      const table = next[i].table || { columns: [], rows: [] }
                      table.title = e.target.value
                      next[i] = { ...next[i], table }
                      handleChange('sections', next)
                    }} />
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      {(sec.table?.columns || []).map((col, ci) => (
                        <div key={ci} className="flex items-center gap-2">
                          <Input className="w-40" placeholder={`Column ${ci+1}`} value={col} onChange={(e) => {
                            const next = [...form.sections]
                            const columns = [...(next[i].table?.columns || [])]
                            const table = next[i].table || { columns: [], rows: [] }
                            columns[ci] = e.target.value
                            table.columns = columns
                            next[i] = { ...next[i], table }
                            handleChange('sections', next)
                          }} />
                          <Button type="button" variant="outline" onClick={() => {
                            const next = [...form.sections]
                            const table = next[i].table || { columns: [], rows: [] }
                            const cols = [...(table.columns || [])]
                            const colCount = cols.length
                            cols.splice(ci, 1)
                            table.columns = cols
                            // also remove that column from all rows
                            table.rows = (table.rows || []).map((r) => {
                              const row = Array.isArray(r) ? [...r] : []
                              if (row.length === colCount) row.splice(ci, 1)
                              return row
                            })
                            next[i] = { ...next[i], table }
                            handleChange('sections', next)
                          }}>Remove</Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => {
                        const next = [...form.sections]
                        const table = next[i].table || { columns: [], rows: [] }
                        table.columns = [...(table.columns || []), '']
                        next[i] = { ...next[i], table }
                        handleChange('sections', next)
                      }}>Add Column</Button>
                    </div>
                    <div className="space-y-2">
                      {(sec.table?.rows || []).map((row, ri) => (
                        <div key={ri} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${sec.table?.columns?.length || 1}, minmax(0,1fr))` }}>
                          {(sec.table?.columns || []).map((_, ci) => (
                            <Input key={ci} placeholder={`R${ri+1}C${ci+1}`} value={row?.[ci] || ''} onChange={(e) => {
                              const next = [...form.sections]
                              const table = next[i].table || { columns: [], rows: [] }
                              const rows = [...(table.rows || [])]
                              const current = Array.isArray(rows[ri]) ? [...rows[ri]] : []
                              current[ci] = e.target.value
                              rows[ri] = current
                              table.rows = rows
                              next[i] = { ...next[i], table }
                              handleChange('sections', next)
                            }} />
                          ))}
                          <div className="flex items-center gap-2">
                            <Button type="button" variant="outline" onClick={() => {
                              const next = [...form.sections]
                              const table = next[i].table || { columns: [], rows: [] }
                              table.rows = (table.rows || []).filter((_, idx) => idx !== ri)
                              next[i] = { ...next[i], table }
                              handleChange('sections', next)
                            }}>Remove</Button>
                          </div>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={() => {
                        const next = [...form.sections]
                        const table = next[i].table || { columns: [], rows: [] }
                        const numCols = (table.columns || []).length || 1
                        table.rows = [...(table.rows || []), new Array(numCols).fill('')]
                        next[i] = { ...next[i], table }
                        handleChange('sections', next)
                      }}>Add Row</Button>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => {
                      const next = form.sections.filter((_, idx) => idx !== i); handleChange('sections', next)
                    }}>Remove</Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3"><Button type="button" variant="outline" onClick={() => handleChange('sections', [...form.sections, { heading: '', intro: '', bullets: '', items: [{ subtitle: '', description: '' }] }])}>Add Section</Button></div>
          </div>
          {/* Steps list (numbered) */}
          <div className="md:col-span-2">
            <div className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Steps (one per line)</div>
            <textarea className="border-input min-h-[120px] w-full rounded-md border bg-transparent p-3 text-sm shadow-xs" value={form.steps} onChange={(e) => handleChange('steps', e.target.value)} placeholder={"1. Register Online\n2. Fill the Application\n3. Make Payment"} />
          </div>
          {/* Fees table rows */}
          <div className="md:col-span-2">
            <div className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Fees table</div>
            <div className="space-y-3">
              {form.feesRows.map((r, i) => (
                <div key={i} className="grid gap-2 sm:grid-cols-5">
                  <Input placeholder="Passport Type" value={r.type} onChange={(e) => { const next = [...form.feesRows]; next[i] = { ...next[i], type: e.target.value }; handleChange('feesRows', next) }} />
                  <Input placeholder="Pages" value={r.pages} onChange={(e) => { const next = [...form.feesRows]; next[i] = { ...next[i], pages: e.target.value }; handleChange('feesRows', next) }} />
                  <Input placeholder="Validity" value={r.validity} onChange={(e) => { const next = [...form.feesRows]; next[i] = { ...next[i], validity: e.target.value }; handleChange('feesRows', next) }} />
                  <Input placeholder="Fee (Normal)" value={r.feeNormal} onChange={(e) => { const next = [...form.feesRows]; next[i] = { ...next[i], feeNormal: e.target.value }; handleChange('feesRows', next) }} />
                  <div className="flex items-center gap-2">
                    <Input className="flex-1" placeholder="Fee (Tatkal)" value={r.feeTatkal} onChange={(e) => { const next = [...form.feesRows]; next[i] = { ...next[i], feeTatkal: e.target.value }; handleChange('feesRows', next) }} />
                    <Button type="button" variant="outline" onClick={() => { const next = form.feesRows.filter((_, idx) => idx !== i); handleChange('feesRows', next) }}>Remove</Button>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => handleChange('feesRows', [...form.feesRows, { type: '', pages: '', validity: '', feeNormal: '', feeTatkal: '' }])}>Add Row</Button>
            </div>
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


