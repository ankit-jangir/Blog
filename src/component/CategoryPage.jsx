import React from 'react'
import { useParams } from 'react-router-dom'
import Header from './commons/Header'
import Footer from './commons/Footer'
import Blog from './Blog'
import BackToTop from './commons/BackToTop'

const CategoryPage = () => {
  const { slug } = useParams()
  // For now, reuse Blog layout; in a real app, pass a filter prop
  return (
    <div className="w-full bg-slate-50">
      <Header />
      {/* Reuse Blog list; later fetch category-specific posts by slug */}
      <Blog filter={{ category: slug }} />
      <Footer />
      <BackToTop />
    </div>
  )
}

export default CategoryPage
