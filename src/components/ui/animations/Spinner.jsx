import React from 'react'

export default function Spinner({ label = 'Loading...' }) {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <div className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</div>
      </div>
    </div>
  )
}


