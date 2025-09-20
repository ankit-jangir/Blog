import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
const Blog = lazy(() => import('./component/Blog'))
const Home = lazy(() => import('./component/Home'))
const BlogSingle = lazy(() => import('./component/BlogSingle'))
const CategoryPage = lazy(() => import('./component/CategoryPage'))
const TagPage = lazy(() => import('./component/TagPage'))
const Author = lazy(() => import('./component/Author'))
const AdminSignin = lazy(() => import('./component/admin/AdminSignin'))
const AdminDashboard = lazy(() => import('./component/admin/AdminDashboard'))
const AdminLayout = lazy(() => import('./component/admin/layout/AdminLayout'))
const Tags = lazy(() => import('./component/admin/pages/Tags'))
const Categories = lazy(() => import('./component/admin/pages/Categories'))
const CategoryDetail = lazy(() => import('./component/admin/pages/CategoryDetail'))
const Settings = lazy(() => import('./component/admin/pages/Settings'))
import { Toaster } from './components/ui/sonner'
const Blogs = lazy(() => import('./component/admin/pages/Blogs'))
const BlogNew = lazy(() => import('./component/admin/pages/BlogNew'))
import ProtectedRoute from './component/admin/ProtectedRoute'
import NotFound from './component/admin/NotFound'
const AdminPostDetail = lazy(() => import('./component/admin/pages/AdminPostDetail'))

const App = () => {
  return (
    <>
   
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogSingle />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/tag/:slug" element={<TagPage />} />
        <Route path="/author/:slug" element={<Author />} />
        <Route path="/admin/signin" element={<AdminSignin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/tags" element={<ProtectedRoute><AdminLayout><Tags /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute><AdminLayout><Categories /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/categories/:slug" element={<ProtectedRoute><AdminLayout><CategoryDetail /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/Blogs" element={<ProtectedRoute><AdminLayout><Blogs /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/blogs/new" element={<ProtectedRoute><AdminLayout><BlogNew /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><Settings /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/blogs/:slug" element={<ProtectedRoute><AdminLayout><AdminPostDetail /></AdminLayout></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    <Toaster position="top-right" richColors />
    </>
  )
}

export default App