import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { showErrorToast } from '@/components/ui/global-toast'

export default function ProtectedRoute({ children }) {
  const location = useLocation()
  let isAuthed = false
  try { isAuthed = Boolean(localStorage.getItem('token')) } catch {}

  if (!isAuthed) {
    showErrorToast('Please sign in to continue')
    return <Navigate to="/admin/signin" replace state={{ from: location }} />
  }

  return children
}


