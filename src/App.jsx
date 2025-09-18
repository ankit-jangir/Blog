import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Blog from './component/Blog'
import Home from './component/Home'
import BlogSingle from './component/BlogSingle'
import CategoryPage from './component/CategoryPage'
import TagPage from './component/TagPage'
import Author from './component/Author'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogSingle />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/tag/:slug" element={<TagPage />} />
      <Route path="/author/:slug" element={<Author />} />
    </Routes>
  )
}

export default App