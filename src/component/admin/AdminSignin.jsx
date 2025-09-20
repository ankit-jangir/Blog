import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../commons/Header'
import Footer from '../commons/Footer'
import { Button } from '@/components/ui/button'
import { User2, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { showSuccessToast, showErrorToast } from '@/components/ui/global-toast'

export default function AdminSignin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (!email || !password) {
      setLoading(false)
      setError('Please enter email and password')
      showErrorToast('Please enter email and password')
      return
    }
    // Simple credential check (demo). Replace with real API when ready.
    setTimeout(() => {
      setLoading(false)
      const ok = email.trim().toLowerCase() === 'admin@gmail.com' && password === 'Admin@19'
      if (ok) {
        try { localStorage.setItem('token', 'admin_demo_token') } catch {}
        showSuccessToast('Logged in successfully')
        navigate('/admin/dashboard', { replace: true })
      } else {
        setError('Please enter valid credentials')
        showErrorToast('Invalid credentials')
      }
    }, 600)
  }

  return (
    <div className="min-h-screen w-full bg-slate-100">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 text-white">
              <User2 className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">SignIn</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Email</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Please enter email id"
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Please enter password"
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-10 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && <div className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>}

            <Button type="submit" disabled={loading} className="h-11 w-full rounded-full bg-blue-900 text-white hover:bg-blue-950">
              {loading ? 'Signing in…' : 'SignIn'}
            </Button>

            <div className="text-center text-sm">
              <a href="#" className="text-blue-700 underline">Forgot Password</a>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
