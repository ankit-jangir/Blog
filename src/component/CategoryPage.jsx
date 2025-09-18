import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from './commons/Header'
import Footer from './commons/Footer'
import Blog from './Blog'
import BackToTop from './commons/BackToTop'

const CategoryPage = () => {
  const { slug } = useParams()
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      window.scrollTo(0, 0)
    }
  }, [slug])
  // For now, reuse Blog layout; in a real app, pass a filter prop
  return (
    <div className="w-full bg-slate-50">
      {/* <Header /> */}
      <Blog
        filter={{ category: slug }}
        showCategoryHeader
        sidebarShowCategoryList={false}
        sidebarCategoriesPosition="top"
      />
      {/* <Footer /> */}
      <BackToTop />
    </div>
  )
}

export default CategoryPage
