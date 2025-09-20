import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="relative mx-auto mb-6 h-28 w-28">
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-200"></div>
          <div className="absolute inset-2 animate-pulse rounded-full bg-blue-500"></div>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">404 - Page not found</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">The page you’re looking for doesn’t exist.</p>
        <button onClick={() => navigate('/admin/dashboard')} className="mt-6 rounded-full bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">Go to Dashboard</button>
      </div>
    </div>
  )
}


