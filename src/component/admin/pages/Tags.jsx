import React from 'react'
import useOnline from '@/hooks/use-online'
import Offline from '@/components/ui/animations/Offline'
import EmptyState from '@/components/ui/animations/EmptyState'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ChevronDown, ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { showSuccessToast } from '@/components/ui/global-toast'
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'

export default function Tags() {
  const isOnline = useOnline()

  const data = React.useMemo(() => ([
    { id: 't-1', name: 'Passport', slug: 'passport', posts: 12, status: 'Active' },
    { id: 't-2', name: 'OCI', slug: 'oci', posts: 9, status: 'Active' },
    { id: 't-3', name: 'Indian Visa', slug: 'indian-visa', posts: 7, status: 'Active' },
    { id: 't-4', name: 'Apostille', slug: 'apostille', posts: 5, status: 'Inactive' },
    { id: 't-5', name: 'Travel Tips', slug: 'travel-tips', posts: 8, status: 'Active' },
    { id: 't-6', name: 'Embassy', slug: 'embassy', posts: 4, status: 'Active' },
    { id: 't-7', name: 'Biometrics', slug: 'biometrics', posts: 3, status: 'Inactive' },
    { id: 't-8', name: 'Insurance', slug: 'insurance', posts: 6, status: 'Active' },
    { id: 't-9', name: 'Itinerary', slug: 'itinerary', posts: 5, status: 'Active' },
    { id: 't-10', name: 'Documents', slug: 'documents', posts: 10, status: 'Active' },
    { id: 't-11', name: 'Country', slug: 'country', posts: 11, status: 'Active' },
  ]), [])

  const [rows, setRows] = React.useState(data)
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
  const [openDelete, setOpenDelete] = React.useState(false)
  const [openEdit, setOpenEdit] = React.useState(false)
  const [activeItem, setActiveItem] = React.useState(null)
  const [pendingDelete, setPendingDelete] = React.useState(null)
  const [editForm, setEditForm] = React.useState({ name: '', slug: '', status: 'Active' })

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
      accessorKey: 'name',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const name = String(row.getValue('name') ?? '')
        return <div className="max-w-[420px] truncate" title={name}>{name}</div>
      },
    },
    { accessorKey: 'slug', header: 'Slug' },
    { accessorKey: 'posts', header: 'Posts' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const val = String(row.getValue('status') ?? '')
        const isActive = val === 'Active'
        return <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-slate-50 text-slate-700 ring-1 ring-slate-200'}`}>{val}</span>
      },
    },
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
                <DropdownMenuItem onSelect={() => { setActiveItem(item); setEditForm({ name: item.name, slug: item.slug, status: item.status || 'Active' }); setOpenEdit(true) }}>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onSelect={() => { setPendingDelete(item); setOpenDelete(true) }}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]), [])

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
          setColumnVisibility({ select: false, name: true, slug: false, posts: false, actions: true })
        } else if (w < 1024) {
          setColumnVisibility({ name: true, slug: false, posts: true, actions: true })
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
        <h2 className="text-xl font-bold">Tags</h2>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Input
            placeholder="Filter name..."
            value={(table.getColumn('name')?.getFilterValue() ?? '')}
            onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
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
          <Button className="bg-blue-900 text-white hover:bg-blue-950">Add Tag</Button>
        </div>
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
          <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit tag</DialogTitle>
                <DialogDescription>Change name or slug and save.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-3">
                <div>
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Name</div>
                  <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Tag name" />
                </div>
                <div>
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Slug</div>
                  <Input value={editForm.slug} onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })} placeholder="slug-like-this" />
                </div>
                <div>
                  <div className="mb-1 text-sm text-slate-600 dark:text-slate-300">Status</div>
                  <select
                    className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenEdit(false)}>Cancel</Button>
                <Button
                  onClick={() => {
                    if (!activeItem) { setOpenEdit(false); return }
                    const nextName = String(editForm.name || '').trim()
                    const nextSlug = String(editForm.slug || '').trim()
                    const nextStatus = editForm.status === 'Inactive' ? 'Inactive' : 'Active'
                    setRows((prev) => prev.map((r) => r.id === activeItem.id ? { ...r, name: nextName || r.name, slug: nextSlug || r.slug, status: nextStatus } : r))
                    setOpenEdit(false)
                    setActiveItem(null)
                    showSuccessToast('Tag updated')
                  }}
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete tag?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. {pendingDelete ? `Delete "${pendingDelete.name}"?` : ''}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDelete(false)}>Cancel</Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (pendingDelete) {
                      setRows((prev) => prev.filter((r) => r.id !== pendingDelete.id))
                    }
                    setOpenDelete(false)
                    setPendingDelete(null)
                    showSuccessToast('Tag deleted')
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


