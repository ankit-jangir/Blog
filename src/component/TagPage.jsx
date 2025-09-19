import React from 'react'
import { useParams } from 'react-router-dom'
import Header from './commons/Header'
import Footer from './commons/Footer'
import Blog from './Blog'
import BackToTop from './commons/BackToTop'

const TagPage = () => {
  const { slug } = useParams()
  return (
    <div className="w-full bg-slate-50">
      {/* <Header /> */}
      <Blog filter={{ tag: slug }} />
      {/* <Footer /> */}
      <BackToTop />
    </div>
  )
}

export default TagPage
