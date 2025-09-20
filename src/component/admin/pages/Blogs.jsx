import React from 'react'
import useOnline from '@/hooks/use-online'
import Offline from '@/components/ui/animations/Offline'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDown, MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'
import { showSuccessToast } from '@/components/ui/global-toast'
import { CATEGORIES as SIDEBAR_CATEGORIES } from '@/component/data/rightSidebar'
import EmptyState from '@/components/ui/animations/EmptyState'

export default function Blogs() {
  const isOnline = useOnline()
  const navigate = useNavigate()

  const injected = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('admin_new_blogs') || '[]') } catch { return [] }
  }, [])

  const base = React.useMemo(() => ([
    { id: '1', title: 'First blog post', author: 'Admin', category: 'Passport Services', status: 'Published', date: '2025-01-10' },
    { id: '2', title: 'Travel tips 2025', author: 'Nikita', status: 'Draft', date: '2025-01-12' },
    { id: '3', title: 'OCI updates', author: 'Anvit', category: 'OCI Card Services', status: 'Published', date: '2025-01-14' },
    { id: '4', title: 'Visa updates 2025', author: 'Admin', status: 'Published', date: '2025-01-18' },
    { id: '5', title: 'Best beaches in EU', author: 'Nikita', status: 'Draft', date: '2025-01-20' },
    { id: '6', title: 'Attestation basics', author: 'Anvit', status: 'Published', date: '2025-01-25' },
    { id: '7', title: 'Schengen checklist', author: 'Admin', status: 'Published', date: '2025-02-01' },
    { id: '8', title: 'Embassy interview tips', author: 'Nikita', status: 'Draft', date: '2025-02-03'   },
    { id: '9', title: 'Apostille vs Attestation', author: 'Anvit', status: 'Published', date: '2025-02-06' },
    { id: '10', title: 'Lost passport guide', author: 'Admin', status: 'Published', date: '2025-02-10' },
    { id: '11', title: 'Travel insurance 101', author: 'Nikita', status: 'Draft', date: '2025-02-12' },
    { id: '12', title: 'OCI reissue process', author: 'Anvit', status: 'Published', date: '2025-02-15' },
    { id: '13', title: 'Student visa timeline', author: 'Admin', status: 'Published', date: '2025-02-18' },
    { id: '14', title: 'UK priority visa', author: 'Nikita', status: 'Draft', date: '2025-02-20' },
    { id: '15', title: 'Canada visitor visa', author: 'Anvit', status: 'Published', date: '2025-02-22' },
    { id: '16', title: 'Dubai transit visa', author: 'Admin', status: 'Published', date: '2025-02-25' },
    { id: '17', title: 'Biometrics explained', author: 'Nikita', status: 'Draft', date: '2025-02-28' },
    { id: '18', title: 'Visa photo rules', author: 'Anvit', status: 'Published', date: '2025-03-01' },
    { id: '19', title: 'Itinerary mistakes', author: 'Admin', status: 'Published', date: '2025-03-03' },
    { id: '20', title: 'France consulate guide', author: 'Nikita', status: 'Draft', date: '2025-03-05' },
    { id: '21', title: 'Hotel bookings proof', author: 'Anvit', status: 'Published', date: '2025-03-06' },
    { id: '22', title: 'Cover letter format', author: 'Admin', status: 'Published', date: '2025-03-08' },
    { id: '23', title: 'Funds requirement', author: 'Nikita', status: 'Draft', date: '2025-03-10' },
    { id: '24', title: 'Visa processing delays', author: 'Anvit', status: 'Published', date: '2025-03-12' },
    { id: '25', title: 'Schengen countries list', author: 'Admin', status: 'Published', date: '2025-03-14' },
  ]), [])
  const merged = React.useMemo(() => {
    const seen = new Set()
    const out = []
    ;[...injected, ...base].forEach((p) => {
      const key = (p.slug || p.id || '').toString()
      if (!seen.has(key)) {
        seen.add(key)
        out.push(p)
      }
    })
    return out
  }, [injected, base])

  const [rows, setRows] = React.useState(merged)
  
  const [openDelete, setOpenDelete] = React.useState(false)
  const [pendingDelete, setPendingDelete] = React.useState(null)
  const [openView, setOpenView] = React.useState(false)
  const [openEdit, setOpenEdit] = React.useState(false)
  const [activeItem, setActiveItem] = React.useState(null)
  const [editForm, setEditForm] = React.useState({ title: '', slug: '', author: 'Admin', category: '', date: '', readTime: '5 min read', excerpt: '', content: '', status: 'Published', coverFile: null, image: '' })

  function slugify(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const columns = React.useMemo(() => ([
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'image',
      header: 'Image',
      cell: ({ row }) => {
        const item = row.original
        const src = item.image || `https://picsum.photos/seed/blog-${item.id}/80/80`
        const alt = String(item.title || 'Blog image')
        return (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-9 w-9 rounded-full object-cover"
          />
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Title
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const title = String(row.getValue('title') ?? '')
        return <div className="max-w-[420px] truncate" title={title}>{title}</div>
      },
    },
    { accessorKey: 'author', header: 'Author' },
    { accessorKey: 'category', header: 'Category' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const val = String(row.getValue('status') ?? '')
        const isPub = val === 'Published'
        return <span className={`rounded-full px-2 py-0.5 text-xs ${isPub ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-slate-50 text-slate-700 ring-1 ring-slate-200'}`}>{val}</span>
      },
    },
    { accessorKey: 'date', header: 'Date' },
    {
      id: 'actions',
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const item = row.original
        return (
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
                <DropdownMenuItem
                  onSelect={() => {
                    const slug = slugify(item.slug || item.title || '')
                    if (slug) navigate(`/admin/blogs/${slug}`)
                  }}
                >
                  View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    setActiveItem(item)
                    setEditForm({
                      title: item.title || '',
                      slug: item.slug || '',
                      author: item.author || 'Admin',
                      category: item.category || '',
                      date: item.date || '',
                      readTime: item.readTime || '5 min read',
                      excerpt: item.excerpt || '',
                      content: item.content || '',
                      status: item.status || 'Published',
                      coverFile: null,
                      image: item.image || '',
                    })
                    setOpenEdit(true)
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onSelect={() => {
                    setPendingDelete(item)
                    setOpenDelete(true)
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]), [])
  const data = React.useMemo(() => injected.concat(base), [injected, base])

  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
  })

  // Responsive columns for tablet/phone
  React.useEffect(() => {
    function applyResponsiveColumns() {
      try {
        const w = window.innerWidth
        if (w < 768) {
          setColumnVisibility({ select: false, image: true, title: true, author: false, category: true, status: true, date: false, actions: true })
        } else if (w < 1024) {
          setColumnVisibility({ image: true, title: true, author: true, category: true, status: true, date: false, actions: true })
        } else {
          setColumnVisibility({})
        }
      } catch {}
    }
    applyResponsiveColumns()
    window.addEventListener('resize', applyResponsiveColumns)
    return () => window.removeEventListener('resize', applyResponsiveColumns)
  }, [])

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold">Blogs</h2>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Input
            placeholder="Filter title..."
            value={(table.getColumn('title')?.getFilterValue() ?? '')}
            onChange={(e) => table.getColumn('title')?.setFilterValue(e.target.value)}
            className="max-w-xs"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns().filter((col) => col.getCanHide()).map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize"
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}>
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <select
            value={(table.getColumn('category')?.getFilterValue() ?? '')}
            onChange={(e) => table.getColumn('category')?.setFilterValue(e.target.value || undefined)}
            className="border-input h-9 rounded-md border bg-transparent px-3 text-sm shadow-xs"
          >
            <option value="">All categories</option>
            {[...new Set(data.map((d) => d.category).filter(Boolean))].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <Link to="/admin/blogs/new">
            <Button className="bg-blue-900 text-white hover:bg-blue-950">Add Blog</Button>
          </Link>
          </div>
          <Dialog open={openView} onOpenChange={setOpenView}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>View blog</DialogTitle>
                <DialogDescription>Basic details for quick preview.</DialogDescription>
              </DialogHeader>
              {activeItem && (
                <div className="grid gap-2">
                  <div><span className="text-slate-500">Title:</span> {activeItem.title}</div>
                  <div><span className="text-slate-500">Author:</span> {activeItem.author}</div>
                  <div><span className="text-slate-500">Status:</span> {activeItem.status}</div>
                  <div><span className="text-slate-500">Date:</span> {activeItem.date}</div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenView(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogContent className="max-w-3xl md:max-w-4xl">
              <DialogHeader>
                <DialogTitle>Edit blog</DialogTitle>
                <DialogDescription>Update details then save.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 md:grid-cols-2 max-h-[70vh] overflow-auto pr-1">
                <div className="md:col-span-2">
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Title</div>
                  <Input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value, slug: editForm.slug || slugify(e.target.value) })} />
                </div>
                <div>
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Slug</div>
                  <Input value={editForm.slug} onChange={(e) => setEditForm({ ...editForm, slug: slugify(e.target.value) })} />
                </div>
                <div>
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Author</div>
                  <Input value={editForm.author} onChange={(e) => setEditForm({ ...editForm, author: e.target.value })} />
                </div>
                <div>
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Category</div>
                  <select className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs" value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}>
                    <option value="">Select category</option>
                    {SIDEBAR_CATEGORIES.map((c) => (
                      <option key={c.title} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Read time</div>
                  <Input value={editForm.readTime} onChange={(e) => setEditForm({ ...editForm, readTime: e.target.value })} />
                </div>
                <div>
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Published date</div>
                  <Input type="date" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Excerpt</div>
                  <textarea className="border-input min-h-[90px] w-full rounded-md border bg-transparent p-3 text-sm shadow-xs" value={editForm.excerpt} onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Content</div>
                  <textarea className="border-input min-h-[140px] w-full rounded-md border bg-transparent p-3 text-sm shadow-xs" value={editForm.content} onChange={(e) => setEditForm({ ...editForm, content: e.target.value })} />
                </div>
                <div>
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Status</div>
                  <select className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs" value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Cover Image</div>
                  <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                    <input type="file" accept="image/*" onChange={(e) => setEditForm({ ...editForm, coverFile: e.target.files?.[0] || null })} className="block w-full text-sm rounded-md border border-dashed p-2" />
                    {(editForm.coverFile || editForm.image) && (
                      <div className="overflow-hidden rounded-md border">
                        <img src={editForm.coverFile ? URL.createObjectURL(editForm.coverFile) : editForm.image} alt="preview" className="h-24 w-32 object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenEdit(false)}>Cancel</Button>
                <Button onClick={async () => {
                  const updated = { ...editForm }
                  if (updated.coverFile) {
                    const fileDataUrl = await new Promise((resolve, reject) => {
                      const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(updated.coverFile)
                    })
                    updated.image = fileDataUrl
                  }
                  updated.slug = slugify(updated.slug || updated.title)
                  setRows((prev) => prev.map((r) => (r.slug === activeItem.slug ? { ...r, ...updated } : r)))
                  try {
                    const stored = JSON.parse(localStorage.getItem('admin_new_blogs') || '[]')
                    localStorage.setItem('admin_new_blogs', JSON.stringify(stored.map((r) => (r.slug === activeItem.slug ? { ...r, ...updated } : r))))
                  } catch {}
                  setOpenEdit(false)
                }}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
      </div>

      {!isOnline ? (
        <Offline />
      ) : (
        <div className="rounded-xl bg-white p-2 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
          <div className="relative w-full overflow-x-auto">
            <Table className="text-xs sm:text-sm">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="p-0">
                      <EmptyState title="No results found" subtitle="Try adjusting your search." />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col items-center justify-end gap-2 py-4 sm:flex-row">
            <div className="text-muted-foreground flex-1 text-sm">
              {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
              </Button>
      </div>
      </div>
          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete blog?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. {pendingDelete ? `Delete "${pendingDelete.title}"?` : ''}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDelete(false)}>Cancel</Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (pendingDelete) {
                      setRows((prev) => {
                        const next = prev.filter((r) => r.id !== pendingDelete.id)
                        // Fix page index if current page becomes empty after delete
                        const totalPages = Math.max(1, Math.ceil(next.length / pagination.pageSize))
                        const nextPageIndex = Math.min(pagination.pageIndex, totalPages - 1)
                        if (nextPageIndex !== pagination.pageIndex) {
                          setPagination({ ...pagination, pageIndex: nextPageIndex })
                        }
                        return next
                      })
                      showSuccessToast('Blog deleted')
                    }
                    setOpenDelete(false)
                    setPendingDelete(null)
                    setOpenMenuId(null)
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}


