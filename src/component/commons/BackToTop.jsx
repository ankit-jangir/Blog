import React, { useEffect, useState } from 'react'

const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 shadow-md ring-1 ring-black/5 hover:bg-slate-200 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10"
    >
      <span className="inline-block h-3.5 w-3.5 rounded-sm border-2 border-slate-500" />
    </button>
  )
}

export default BackToTop


