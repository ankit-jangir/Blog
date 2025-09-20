import React, { useEffect, useState } from 'react'
import useOnline from '@/hooks/use-online'
import Offline from '@/components/ui/animations/Offline'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { showSuccessToast, showErrorToast } from '@/components/ui/global-toast'
import { Eye, EyeOff, MapPin, Shield, Phone, Calendar, Clock, Mail, AtSign, Settings as SettingsIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function Settings() {
  const isOnline = useOnline()

  // Admin profile (local demo state; replace with API when ready)
  const [activeTab, setActiveTab] = useState('profile') // 'profile' | 'password'
  const [name, setName] = useState('Admin User')
  const [email, setEmail] = useState('admin@gmail.com')
  const [avatar, setAvatar] = useState('https://github.com/shadcn.png')
  const [role, setRole] = useState('Administrator')
  const [username, setUsername] = useState('admin')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [joined, setJoined] = useState('2025-01-01')
  const [lastLogin, setLastLogin] = useState('2025-01-15 10:00')
  const [postCount, setPostCount] = useState(0)
  const [draftCount, setDraftCount] = useState(0)
  const [tagCount, setTagCount] = useState(0)
  const [BlogCount, setBlogCount] = useState(0)
  const [categoryCount, setCategoryCount] = useState(0)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('adminProfile')
      if (raw) {
        const p = JSON.parse(raw)
        if (p?.name) setName(p.name)
        if (p?.email) setEmail(p.email)
        if (p?.avatar) setAvatar(p.avatar)
        if (p?.role) setRole(p.role)
        if (p?.username) setUsername(p.username)
        if (p?.phone) setPhone(p.phone)
        if (p?.location) setLocation(p.location)
        if (p?.joined) setJoined(p.joined)
        if (p?.lastLogin) setLastLogin(p.lastLogin)
        if (typeof p?.postCount === 'number') setPostCount(p.postCount)
        if (typeof p?.draftCount === 'number') setDraftCount(p.draftCount)
        if (typeof p?.tagCount === 'number') setTagCount(p.tagCount)
        if (typeof p?.BlogCount === 'number') setBlogCount(p.BlogCount)
        if (typeof p?.categoryCount === 'number') setCategoryCount(p.categoryCount)
      }
    } catch {}
  }, [])

  const profileForm = useForm({
    defaultValues: { name, username, role, email, phone, location, avatar },
    mode: 'onChange'
  })

  const wName = profileForm.watch('name') || ''
  const wUser = profileForm.watch('username') || ''
  const wRole = profileForm.watch('role') || ''
  const wEmail = profileForm.watch('email') || ''
  const wPhone = profileForm.watch('phone') || ''
  const wLoc = profileForm.watch('location') || ''
  const wAvatar = profileForm.watch('avatar') || ''

  useEffect(() => {
    profileForm.reset({ name, username, role, email, phone, location, avatar })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, username, role, email, phone, location, avatar])

  function onSubmitProfile(values) {
    if ((values.name || '').length > 60) { showErrorToast('Name too long (max 60)'); return }
    if ((values.username || '').length > 30) { showErrorToast('Username too long (max 30)'); return }
    if ((values.email || '').length > 120) { showErrorToast('Email too long (max 120)'); return }
    if ((values.location || '').length > 60) { showErrorToast('Location too long (max 60)'); return }
    if ((values.avatar || '').length > 200) { showErrorToast('Avatar URL too long (max 200)'); return }
    const next = { ...values }
    setName(next.name || '')
    setUsername(next.username || '')
    setRole(next.role || '')
    setEmail(next.email || '')
    setPhone(next.phone || '')
    setLocation(next.location || '')
    setAvatar(next.avatar || '')
    try {
      localStorage.setItem('adminProfile', JSON.stringify({ name: next.name, email: next.email, avatar: next.avatar, role: next.role, username: next.username, phone: next.phone, location: next.location, joined, lastLogin, postCount, draftCount, tagCount, categoryCount,BlogCount }))
    } catch {}
    showSuccessToast('Profile updated')
  }

  const passwordForm = useForm({ defaultValues: { current: '', new: '', confirm: '' } })
  function onSubmitPassword(values) {
    if (!values.new || !values.confirm) {
      showErrorToast('Please enter new password and confirm')
      return
    }
    if (values.new !== values.confirm) {
      showErrorToast('Passwords do not match')
      return
    }
    showSuccessToast('Password updated')
    passwordForm.reset()
  }

  // Password visibility toggles
  const [showCur, setShowCur] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConf, setShowConf] = useState(false)

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Settings</h2>
      </div>

      {!isOnline ? (
        <Offline />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          {/* Left: Profile card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-200 hover:shadow-md hover:ring-slate-300 motion-reduce:transition-none dark:bg-slate-900 dark:ring-slate-800 dark:hover:ring-slate-700">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={avatar} />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="block w-full truncate text-xl font-semibold tracking-wide text-slate-900 dark:text-slate-100" title={`${name} (${(name||'').length} chars)`}>{name}</div>
                <div className="block w-full truncate text-sm text-slate-500 dark:text-slate-400" title={`${email} (${(email||'').length} chars)`}>{email}</div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex max-w-[220px] items-center gap-1 rounded-full bg-gradient-to-r from-blue-600/10 to-emerald-500/10 px-2.5 py-1 text-blue-800 ring-1 ring-blue-200 dark:text-blue-200 dark:ring-blue-700/40" title={`${role} (${(role||'').length} chars)`}><Shield className="h-3.5 w-3.5" /> <span className="truncate">{role}</span></span>
              {location && <span className="inline-flex max-w-[220px] items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 ring-1 ring-emerald-200" title={`${location} (${(location||'').length} chars)`}><MapPin className="h-3.5 w-3.5" /> <span className="truncate">{location}</span></span>}
              {phone && <span className="inline-flex max-w-[220px] items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-slate-700 ring-1 ring-slate-200" title={`${phone} (${(phone||'').length} chars)`}><Phone className="h-3.5 w-3.5" /> <span className="truncate">{phone}</span></span>}
            </div>
            {/* Stats 2x2 grid on all screens */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <Link to="/admin/Blogs" className="rounded-xl bg-slate-50 p-4 ring-1 ring-transparent transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:ring-blue-200 motion-reduce:transition-none dark:bg-slate-800 dark:hover:bg-slate-800/80 dark:hover:ring-slate-700">
                <div className="text-xs text-slate-500">Blog</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{BlogCount}</div>
              </Link>
              <Link to="/admin/tags" className="rounded-xl bg-slate-50 p-4 ring-1 ring-transparent transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:ring-blue-200 motion-reduce:transition-none dark:bg-slate-800 dark:hover:bg-slate-800/80 dark:hover:ring-slate-700">
                <div className="text-xs text-slate-500">Tags</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{tagCount}</div>
              </Link>
              <Link to="/admin/categories" className="rounded-xl bg-slate-50 p-4 ring-1 ring-transparent transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:ring-blue-200 motion-reduce:transition-none dark:bg-slate-800 dark:hover:bg-slate-800/80 dark:hover:ring-slate-700">
                <div className="text-xs text-slate-500">Categories</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{categoryCount}</div>
              </Link>
              <Link to="/admin/posts" className="rounded-xl bg-slate-50 p-4 ring-1 ring-transparent transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:ring-blue-200 motion-reduce:transition-none dark:bg-slate-800 dark:hover:bg-slate-800/80 dark:hover:ring-slate-700">
                <div className="text-xs text-slate-500">Posts</div>
                <div className="flex items-center justify-center gap-1 text-2xl font-extrabold text-slate-900 dark:text-slate-100">{postCount}</div>
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><Calendar className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> <span className="font-semibold text-slate-700 dark:text-slate-200">Joined:</span> {joined}</div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><Clock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> <span className="font-semibold text-slate-700 dark:text-slate-200">Last login:</span> {lastLogin}</div>
             
            </div>
          </div>

          {/* Right: Tabs + Forms */}
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-gray-800">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between border-b px-4 pt-3">
                <TabsList>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
              <TabsContent value="profile">
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onSubmitProfile)} className="grid max-w-2xl gap-4">
                    <FormField control={profileForm.control} name="name" rules={{ required: true, maxLength: 60 }} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter name" className="w-full" {...field} />
                        </FormControl>
                        <div className="flex items-center justify-between">
                          <FormMessage />
                          <FormDescription>{wName.length}/60</FormDescription>
                        </div>
                      </FormItem>
                    )} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField control={profileForm.control} name="username" rules={{ maxLength: 30 }} render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="username" className="w-full pl-8" {...field} />
                              <AtSign className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            </div>
                          </FormControl>
                          <div className="flex items-center justify-between">
                            <FormMessage />
                            <FormDescription>{wUser.length}/30</FormDescription>
                          </div>
                        </FormItem>
                      )} />
                      <FormField control={profileForm.control} name="role" rules={{ maxLength: 30 }} render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input placeholder="Administrator" className="w-full" maxLength={30} {...field} />
                          </FormControl>
                          <div className="flex items-center justify-between">
                            <FormMessage />
                            <FormDescription>{wRole.length}/30</FormDescription>
                          </div>
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={profileForm.control} name="email" rules={{ required: true, maxLength: 120 }} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="email" placeholder="Enter email" className="w-full pl-8" {...field} />
                            <Mail className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          </div>
                        </FormControl>
                        <div className="flex items-center justify-between">
                          <FormMessage />
                          <FormDescription>{wEmail.length}/120</FormDescription>
                        </div>
                      </FormItem>
                    )} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField control={profileForm.control} name="phone" rules={{ maxLength: 20 }} render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 555 000 1111" className="w-full" {...field} />
                          </FormControl>
                          <div className="flex items-center justify-between">
                            <FormMessage />
                            <FormDescription>{wPhone.length}/20</FormDescription>
                          </div>
                        </FormItem>
                      )} />
                      <FormField control={profileForm.control} name="location" rules={{ maxLength: 60 }} render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, Country" className="w-full" {...field} />
                          </FormControl>
                          <div className="flex items-center justify-between">
                            <FormMessage />
                            <FormDescription>{wLoc.length}/60</FormDescription>
                          </div>
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={profileForm.control} name="avatar" rules={{ maxLength: 200 }} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avatar URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://" className="w-full" {...field} />
                        </FormControl>
                        <div className="flex items-center justify-between">
                          <FormMessage />
                          <FormDescription>{wAvatar.length}/200</FormDescription>
                        </div>
                      </FormItem>
                    )} />
                    <div className="pt-2">
                      <Button type="submit" className="bg-blue-900 text-white hover:bg-blue-950">Save changes</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="password">
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="grid max-w-xl gap-4">
                    <FormField control={passwordForm.control} name="current" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type={showCur ? 'text' : 'password'} className="w-full pr-9" placeholder="••••••••" {...field} />
                            <button type="button" onClick={() => setShowCur((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500">
                              {showCur ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={passwordForm.control} name="new" render={({ field }) => (
                      <FormItem>
                        <FormLabel>New password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type={showNew ? 'text' : 'password'} className="w-full pr-9" placeholder="••••••••" {...field} />
                            <button type="button" onClick={() => setShowNew((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500">
                              {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={passwordForm.control} name="confirm" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm new password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type={showConf ? 'text' : 'password'} className="w-full pr-9" placeholder="••••••••" {...field} />
                            <button type="button" onClick={() => setShowConf((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500">
                              {showConf ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="pt-2">
                      <Button type="submit" className="bg-blue-900 text-white hover:bg-blue-950">Update password</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </div>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
}


