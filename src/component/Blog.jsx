import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './commons/Header'
import Footer from './commons/Footer'
import BackToTop from './commons/BackToTop'
import RightSidebar from './commons/RightSidebar'
import { CATEGORIES as SIDEBAR_CATEGORIES, FEATURED as SIDEBAR_FEATURED, TOP_WEEK as SIDEBAR_TOP_WEEK, TAGS as SIDEBAR_TAGS } from './data/rightSidebar'
import { Plus, Loader2, Facebook as FbIcon, Twitter as XIcon, Instagram, Linkedin, MessageCircle } from 'lucide-react'

// Health & Wellness Blog Posts
export const DUMMY_POSTS = [
  {
    id: 1,
    slug: 'mediterranean-diet-guide',
    coverImage:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop',
    title: 'The Complete Mediterranean Diet Guide: Transform Your Health Naturally',
    excerpt:
      'Discover the science-backed benefits of the Mediterranean diet, meal plans, recipes, and practical tips for sustainable healthy eating.',
    category: 'Nutrition & Diet',
    publishedAt: '2025-01-15',
    readTime: '8 min read',
  },
  {
    id: 2,
    slug: 'mental-health-mindfulness',
    coverImage:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600&auto=format&fit=crop',
    title: 'Mindfulness and Mental Health: A Beginner\'s Guide to Inner Peace',
    excerpt:
      'Learn evidence-based mindfulness techniques to reduce stress, anxiety, and improve your overall mental wellbeing.',
    category: 'Mental Health',
    publishedAt: '2025-01-12',
    readTime: '6 min read',
  },
  {
    id: 3,
    slug: 'hiit-workout-beginners',
    coverImage:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1600&auto=format&fit=crop',
    title: 'HIIT Workouts for Beginners: Maximum Results in Minimum Time',
    excerpt:
      'High-Intensity Interval Training explained: workout plans, safety tips, and how to get started even if you\'re new to exercise.',
    category: 'Fitness & Exercise',
    publishedAt: '2025-01-10',
    readTime: '7 min read',
  },
  {
    id: 4,
    slug: 'sleep-hygiene-better-rest',
    coverImage:
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1600&auto=format&fit=crop',
    title: 'Sleep Hygiene 101: Science-Backed Tips for Better Rest',
    excerpt:
      'Struggling with sleep? Discover proven strategies to improve sleep quality, establish healthy routines, and wake up refreshed.',
    category: 'Wellness & Lifestyle',
    publishedAt: '2025-01-08',
    readTime: '6 min read',
  },
  {
    id: 5,
    slug: 'heart-health-prevention',
    coverImage:
      'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=1600&auto=format&fit=crop',
    title: 'Heart Health: Prevention Strategies That Actually Work',
    excerpt:
      'Protect your heart with lifestyle changes, nutrition tips, exercise recommendations, and early warning signs to watch for.',
    category: 'Preventive Health',
    publishedAt: '2025-01-05',
    readTime: '9 min read',
  },
  {
    id: 6,
    slug: 'plant-based-nutrition',
    coverImage:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop',
    title: 'Plant-Based Nutrition: Complete Guide to Healthy Vegan Living',
    excerpt:
      'Everything you need to know about plant-based eating: protein sources, meal plans, supplements, and nutritional balance.',
    category: 'Nutrition & Diet',
    publishedAt: '2025-01-03',
    readTime: '10 min read',
  },
  {
    id: 7,
    slug: 'yoga-flexibility-strength',
    coverImage:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop',
    title: 'Yoga for Flexibility and Strength: 30-Day Beginner Program',
    excerpt:
      'Transform your body and mind with this comprehensive yoga guide. Poses, sequences, and modifications for all levels.',
    category: 'Fitness & Exercise',
    publishedAt: '2025-01-01',
    readTime: '8 min read',
  },
  {
    id: 8,
    slug: 'managing-stress-naturally',
    coverImage:
      'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1600&auto=format&fit=crop',
    title: 'Managing Stress Naturally: Holistic Approaches That Work',
    excerpt:
      'Combat chronic stress with natural remedies, breathing techniques, lifestyle adjustments, and proven relaxation methods.',
    category: 'Mental Health',
    publishedAt: '2024-12-28',
    readTime: '7 min read',
  },
  {
    id: 9,
    slug: 'immune-system-boost',
    coverImage:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1600&auto=format&fit=crop',
    title: 'Boost Your Immune System: Natural Ways to Stay Healthy Year-Round',
    excerpt:
      'Strengthen your immunity with nutrition, supplements, sleep, exercise, and lifestyle habits backed by science.',
    category: 'Preventive Health',
    publishedAt: '2024-12-25',
    readTime: '8 min read',
  },
  {
    id: 10,
    slug: 'gut-health-microbiome',
    coverImage:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1600&auto=format&fit=crop',
    title: 'Gut Health and the Microbiome: Your Complete Guide to Digestive Wellness',
    excerpt:
      'Understand the gut-brain connection, probiotics, prebiotics, and how to optimize your digestive health naturally.',
    category: 'Nutrition & Diet',
    publishedAt: '2024-12-22',
    readTime: '9 min read',
  },
  {
    id: 11,
    slug: 'weight-training-women',
    coverImage:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop',
    title: 'Weight Training for Women: Building Strength Without Bulk',
    excerpt:
      'Debunk myths and discover how strength training transforms your body, boosts metabolism, and improves overall health.',
    category: 'Fitness & Exercise',
    publishedAt: '2024-12-20',
    readTime: '7 min read',
  },
  {
    id: 12,
    slug: 'anxiety-coping-strategies',
    coverImage:
      'https://images.unsplash.com/photo-1494252713559-f26074f7babe?q=80&w=1600&auto=format&fit=crop',
    title: 'Anxiety Relief: Practical Coping Strategies for Daily Life',
    excerpt:
      'Evidence-based techniques to manage anxiety, from cognitive behavioral strategies to grounding exercises and breathing methods.',
    category: 'Mental Health',
    publishedAt: '2024-12-18',
    readTime: '6 min read',
  },
  {
    id: 13,
    slug: 'diabetes-prevention-guide',
    coverImage:
      'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1600&auto=format&fit=crop',
    title: 'Type 2 Diabetes Prevention: Your Action Plan for Healthy Blood Sugar',
    excerpt:
      'Prevent or reverse prediabetes with diet, exercise, stress management, and lifestyle modifications that work.',
    category: 'Preventive Health',
    publishedAt: '2024-12-15',
    readTime: '10 min read',
  },
  {
    id: 14,
    slug: 'intermittent-fasting-guide',
    coverImage:
      'https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1600&auto=format&fit=crop',
    title: 'Intermittent Fasting: Complete Guide to Safe and Effective Fasting',
    excerpt:
      'Explore different fasting methods, health benefits, potential risks, and how to start intermittent fasting safely.',
    category: 'Nutrition & Diet',
    publishedAt: '2024-12-12',
    readTime: '8 min read',
  },
  {
    id: 15,
    slug: 'hydration-health-benefits',
    coverImage:
      'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1600&auto=format&fit=crop',
    title: 'The Power of Hydration: How Water Transforms Your Health',
    excerpt:
      'Learn how proper hydration affects energy, skin, digestion, and cognition. Plus tips to drink more water daily.',
    category: 'Wellness & Lifestyle',
    publishedAt: '2024-12-10',
    readTime: '5 min read',
  },
  {
    id: 16,
    slug: 'running-for-beginners',
    coverImage:
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1600&auto=format&fit=crop',
    title: 'Running for Beginners: Couch to 5K Training Plan',
    excerpt:
      'Start your running journey right with proper form, training schedules, injury prevention, and motivation strategies.',
    category: 'Fitness & Exercise',
    publishedAt: '2024-12-08',
    readTime: '7 min read',
  },
  {
    id: 17,
    slug: 'depression-understanding-support',
    coverImage:
      'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?q=80&w=1600&auto=format&fit=crop',
    title: 'Understanding Depression: Signs, Support, and Path to Recovery',
    excerpt:
      'Recognize symptoms of depression, find professional help, and discover coping strategies for mental health recovery.',
    category: 'Mental Health',
    publishedAt: '2024-12-05',
    readTime: '9 min read',
  },
  {
    id: 18,
    slug: 'bone-health-osteoporosis',
    coverImage:
      'https://images.unsplash.com/photo-1591382696684-38c427c7547f?q=80&w=1600&auto=format&fit=crop',
    title: 'Bone Health and Osteoporosis Prevention: Build Strong Bones for Life',
    excerpt:
      'Protect your bones with calcium-rich foods, vitamin D, weight-bearing exercises, and lifestyle choices that matter.',
    category: 'Preventive Health',
    publishedAt: '2024-12-03',
    readTime: '8 min read',
  },
]

function cn(...args) {
  return args.filter(Boolean).join(' ')
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return ''
  }
}

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[-_/]+/g, ' ')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function titleCase(text) {
  return String(text || '')
    .split(' ')
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
    .join(' ')
}

function toWordsUpper(text) {
  return String(text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toUpperCase())
}

function buildCategoryCounts(posts) {
  const counts = new Map()
  posts.forEach((p) => {
    const key = normalize(p.category)
    counts.set(key, (counts.get(key) || 0) + 1)
  })
  return counts
}

// Fallback images for posts and categories
const DEFAULT_POST_IMAGE =
  'https://picsum.photos/seed/documitra-post/1600/900'
const DEFAULT_CATEGORY_IMAGE =
  'https://picsum.photos/seed/documitra-category/1200/800'

function PostHero({ post }) {
  const href = post?.slug ? `/blog/${post.slug}` : post?.url || '#'
  return (
    <article className="group relative overflow-hidden rounded-[32px] bg-white shadow-2xl border-2 border-emerald-100/60 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)] hover:-translate-y-1 hover:border-emerald-200">
      <Link to={href} className="block">
        <div className="relative h-[420px] lg:h-[480px] overflow-hidden">
        <img
          src={post?.coverImage || DEFAULT_POST_IMAGE}
          alt={post?.title}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          loading="lazy"
        />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
          
          {/* Floating health badge */}
          <div className="absolute top-8 left-8">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-60 animate-pulse"></div>
              <span className="relative inline-flex items-center gap-2.5 text-[11px] font-black tracking-widest text-white uppercase bg-gradient-to-r from-emerald-500 to-emerald-400 px-5 py-3 rounded-2xl shadow-2xl">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            {post?.category || ''}
          </span>
            </div>
          </div>

          {/* Content overlay */}
          <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white/90 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post?.readTime || '5 min read'}
              </div>
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-sm font-medium text-white/80">Featured Article</span>
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-black leading-tight text-white mb-4 drop-shadow-2xl group-hover:text-emerald-300 transition-colors duration-300">
            {post?.title}
          </h2>
            
            <p className="text-[17px] leading-relaxed text-white/90 line-clamp-2 mb-6 drop-shadow-lg max-w-3xl">
              {post?.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-3 text-base font-bold uppercase tracking-wider text-emerald-300 group-hover:gap-4 transition-all duration-300">
                Read Full Article
                <svg className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

function PostCard({ post }) {
  const href = post?.slug ? `/blog/${post.slug}` : post?.url || '#'
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-white shadow-xl border border-emerald-100/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-200/40 hover:-translate-y-2 hover:border-emerald-300">
      <Link to={href} className="block">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
        <img
          src={post?.coverImage || DEFAULT_POST_IMAGE}
          alt={post?.title}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          loading="lazy"
        />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          
          {/* Category badge */}
          <div className="absolute top-5 left-5">
            <span className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-widest text-white uppercase bg-gradient-to-r from-emerald-500 to-emerald-400 px-4 py-2 rounded-xl shadow-lg">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            {post?.category || ''}
          </span>
          </div>

          {/* Read time badge */}
          <div className="absolute bottom-5 right-5">
            <div className="flex items-center gap-2 text-xs font-bold text-white bg-white/20 backdrop-blur-md px-3 py-2 rounded-full">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post?.readTime || '5 min'}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-7">
          <h3 className="text-xl lg:text-2xl font-extrabold leading-tight text-slate-800 transition-colors duration-300 group-hover:text-emerald-600 line-clamp-2 mb-4">
            {post?.title}
          </h3>
          
          <p className="text-[15px] leading-relaxed text-slate-600 line-clamp-3 mb-6">
            {post?.excerpt}
          </p>
          
          <div className="flex items-center justify-between pt-5 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-700">Health Expert</span>
            </div>
            
            <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 group-hover:gap-3 transition-all duration-300">
              Read More
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

function PostFullCard({ post }) {
  const href = post?.slug ? `/blog/${post.slug}` : post?.url || '#'
  return (
    <article className="group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-white via-emerald-50/20 to-emerald-50/10 shadow-2xl border-2 border-emerald-100 transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(16,185,129,0.35)] hover:-translate-y-2 hover:border-emerald-300">
      <Link to={href} className="block">
        {/* Header Section */}
        <div className="p-8 pb-0">
          <div className="flex items-center justify-between mb-5">
            <span className="inline-flex items-center gap-2.5 text-[11px] font-black tracking-widest text-white uppercase bg-gradient-to-r from-emerald-500 to-emerald-400 px-5 py-2.5 rounded-xl shadow-lg">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            {post?.category || ''}
          </span>
            
            <div className="flex items-center gap-2.5 text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post?.readTime || '3 min read'}
            </div>
          </div>
          
          <h3 className="text-3xl lg:text-4xl font-black leading-tight text-slate-900 transition-colors duration-300 group-hover:text-emerald-600 mb-5">
            {post?.title}
          </h3>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-500 blur-md opacity-60"></div>
              <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg">{(post?.author || 'Dr')[0]}</span>
          </div>
        </div>
            <div>
              <p className="font-bold text-slate-800">{post?.author || 'Dr. Health Expert'}</p>
              <p className="text-sm text-slate-500">{post?.publishedAt ? formatDate(post.publishedAt) : 'Health Specialist'}</p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative mx-8 mb-8 overflow-hidden rounded-3xl shadow-2xl">
        <img
          src={post?.coverImage || DEFAULT_POST_IMAGE}
          alt={post?.title}
            className="h-96 lg:h-[500px] w-full object-cover transition-all duration-700 group-hover:scale-110"
          loading="lazy"
        />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-emerald-500/10" />
          
          {/* Overlay CTA */}
          <div className="absolute bottom-6 right-6">
            <span className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-wider text-white bg-emerald-500/90 backdrop-blur-sm px-6 py-3 rounded-xl shadow-2xl group-hover:bg-emerald-500 transition-all duration-300">
              Explore Now
              <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
          </span>
        </div>
        </div>
      </Link>
    </article>
  )
}

function PostOverlayCard({ post }) {
  const href = post?.slug ? `/blog/${post.slug}` : post?.url || '#'
  return (
    <article className="group relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-emerald-100/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-300/50 hover:-translate-y-2">
      <Link to={href} className="block">
        <div className="relative h-96 lg:h-[440px] overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-100">
        <img
          src={post?.coverImage || DEFAULT_POST_IMAGE}
          alt={post?.title}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 opacity-90"
          loading="lazy"
        />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-emerald-600/10" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9 text-white">
          <div className="mb-3 inline-flex items-center gap-2 text-[10px] font-extrabold tracking-widest uppercase bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-emerald-700 shadow-lg">
            <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
            </svg>
            {post?.category || ''}
          </div>
          <h3 className="text-2xl lg:text-3xl font-extrabold leading-tight drop-shadow-lg transition-all duration-300 group-hover:text-emerald-300 mb-3">
            {post?.title}
          </h3>
          <p className="text-sm lg:text-base text-white/90 drop-shadow line-clamp-2 mb-5">
            {post?.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <div className="flex items-center gap-2 text-sm text-white/90">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post?.readTime || '3 min read'}
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-300 transition-all duration-300 group-hover:gap-3">
              Read Now
              <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

function LoadMoreButton({ onClick, disabled, loading }) {
  return (
    <div className="text-center py-8">
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
        className={`group relative inline-flex items-center gap-4 px-12 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-black text-base uppercase tracking-wider shadow-2xl transition-all duration-300 hover:shadow-[0_15px_40px_-10px_rgba(16,185,129,0.5)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${loading ? 'cursor-wait' : 'cursor-pointer'}`}
      aria-busy={loading ? 'true' : 'false'}
    >
        <span className="relative">
          {loading ? 'Loading More Articles...' : 'Load More Health Articles'}
        </span>
      {loading ? (
          <span className="relative inline-flex h-6 w-6">
            <span className="absolute inset-0 rounded-full border-3 border-white/30 border-t-white animate-spin" />
        </span>
      ) : (
          <svg className="h-6 w-6 transition-transform duration-300 group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-300 blur-xl opacity-50 group-hover:opacity-70 transition-opacity -z-10"></div>
    </button>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-64 w-full rounded-2xl bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-40 rounded-xl bg-slate-200" />
        ))}
      </div>
    </div>
  )
}

// Sidebar category tiles (Health categories)
const DUMMY_CATEGORIES = [
  {
    key: 'nutrition',
    title: 'Nutrition & Diet',
    count: 6,
    image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop',
    to: '/category/nutrition-diet',
  },
  {
    key: 'fitness',
    title: 'Fitness & Exercise',
    count: 5,
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop',
    to: '/category/fitness-exercise',
  },
  {
    key: 'mental-health',
    title: 'Mental Health',
    count: 4,
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
    to: '/category/mental-health',
  },
  {
    key: 'preventive',
    title: 'Preventive Health',
    count: 4,
    image:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop',
    to: '/category/preventive-health',
  },
  {
    key: 'wellness',
    title: 'Wellness & Lifestyle',
    count: 3,
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
    to: '/category/wellness-lifestyle',
  },
]

function CategoryCard({ item }) {
  return (
    <Link to={item.to} className="group relative block overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
      <img
        src={item.image}
        alt={item.title}
        className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] sm:h-40"
        loading="lazy"
      />
      {/* overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/35 transition-colors duration-200 group-hover:bg-black/55" />
      {/* centered content */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 text-center text-white">
        {/* default: title + count */}
        <div className="transition-opacity duration-200 group-hover:opacity-0">
          <div className="text-[18px] font-extrabold leading-tight">
            {item.title}
          </div>
          <div className="mt-1 text-[12px] font-semibold text-white/90">{item.count} Posts</div>
        </div>
        {/* hover: view posts */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-[14px] font-bold tracking-wide">
            VIEW POSTS
          </span>
        </div>
      </div>
    </Link>
  )
}

// Featured posts (Health topics)
const DUMMY_FEATURED = [
  {
    title: 'The Complete Mediterranean Diet Guide: Transform Your Health Naturally',
    author: 'Dr. Sarah Johnson',
    date: 'January 15, 2025',
    to: '/blog/mediterranean-diet-guide',
  },
  {
    title: 'Mindfulness and Mental Health: A Beginner\'s Guide to Inner Peace',
    author: 'Dr. Michael Chen',
    date: 'January 12, 2025',
    to: '/blog/mental-health-mindfulness',
  },
  {
    title: 'HIIT Workouts for Beginners: Maximum Results in Minimum Time',
    author: 'Coach Emma Williams',
    date: 'January 10, 2025',
    to: '/blog/hiit-workout-beginners',
  },
  {
    title: 'Sleep Hygiene 101: Science-Backed Tips for Better Rest',
    author: 'Dr. Lisa Martinez',
    date: 'January 8, 2025',
    to: '/blog/sleep-hygiene-better-rest',
  },
  {
    title: 'Heart Health: Prevention Strategies That Actually Work',
    author: 'Dr. James Thompson',
    date: 'January 5, 2025',
    to: '/blog/heart-health-prevention',
  },
]

function FeaturedPosts({ items }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="border-b px-4 py-3 text-[11px] font-semibold tracking-wider text-slate-600">FEATURED POSTS</div>
      <ul className="divide-y">
        {items.map((it, idx) => (
          <li key={idx} className="px-4 py-3">
            <div className="mb-1 flex items-center gap-2 text-[11px] text-slate-500">
              <span className="font-medium text-slate-700">{it.author}</span>
              <span>•</span>
              <span>{formatDate(it.date)}</span>
            </div>
            <Link to={it.to} className="block text-[15px] font-semibold leading-snug text-slate-900 hover:text-blue-800">
              {it.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Top on the week (dummy)
const DUMMY_TOP_WEEK = [...DUMMY_FEATURED].slice(0, 5)

function TopOnTheWeek({ items }) {
  function getThumb(item) {
    const slug = (item.to || '').split('/').filter(Boolean).pop()
    const m = DUMMY_POSTS.find((p) => p.slug === slug)
    return m?.coverImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop'
  }
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="border-b px-4 py-3 text-[11px] font-semibold tracking-wider text-slate-600">TOP ON THE WEEK</div>
      <ul className="divide-y">
        {items.map((it, idx) => (
          <li key={idx} className="group flex items-center gap-3 px-4 py-3">
            <div className="relative h-10 w-10 shrink-0">
              <img
                src={getThumb(it)}
                alt="thumb"
                className="absolute inset-0 h-10 w-10 rounded-xl object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                loading="lazy"
              />
              <span className="absolute inset-0 inline-flex items-center justify-center rounded-xl bg-slate-100 font-semibold text-slate-700 transition-opacity duration-200 group-hover:opacity-0">
                {idx + 1}
              </span>
            </div>
            <Link
              to={it.to}
              className="block text-[15px] font-semibold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-emerald-600"
            >
              {it.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function GetSocial() {
  const items = [
    { label: 'Facebook', href: 'https://facebook.com', Icon: FbIcon },
    { label: 'Twitter', href: 'https://twitter.com', Icon: XIcon },
    { label: 'Instagram', href: 'https://instagram.com', Icon: Instagram },
    { label: 'LinkedIn', href: 'https://linkedin.com', Icon: Linkedin },
    { label: 'Reddit', href: 'https://reddit.com', Icon: MessageCircle },
  ]
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="border-b px-4 py-3 text-[11px] font-semibold tracking-wider text-slate-600">LET’S GET SOCIAL</div>
      <ul className="divide-y">
        {items.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between px-4 py-3 text-[15px] text-slate-800 hover:bg-slate-50"
            >
              <span className="font-semibold group-hover:text-emerald-600 transition-colors duration-200">{label}</span>
              <span className="text-slate-500 transition-transform duration-200 group-hover:scale-110 group-hover:text-emerald-600">
                <Icon className="h-5 w-5" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Blog = ({ filter, sidebarShowCategoryList = false, showCategoryHeader = false }) => {
  const [posts, setPosts] = useState(DUMMY_POSTS)

  // Ensure the initial left section order matches the desired layout:
  // 1) Mediterranean Diet (hero), 2) Mindfulness, 3) HIIT Workouts
  const START_ORDER = [
    'mediterranean-diet-guide',
    'mental-health-mindfulness',
    'hiit-workout-beginners',
    'sleep-hygiene-better-rest',
    'heart-health-prevention',
  ]
  const orderedPosts = useMemo(() => {
    const rank = (p) => {
      const i = START_ORDER.indexOf(p.slug)
      return i === -1 ? START_ORDER.length + (p.id || 0) : i
    }
    return [...posts].sort((a, b) => rank(a) - rank(b))
  }, [posts])
  const [loading] = useState(false)
  const [error] = useState('')

  // If you later enable an API, replace the above state with a fetch and fallback to DUMMY_POSTS on error.

  const filtered = useMemo(() => {
    const base = orderedPosts
    if (!filter) return base
    if (filter.category) {
      const query = normalize(filter.category)
      return base.filter((p) => normalize(p.category).includes(query))
    }
    if (filter.tag) {
      return base.filter((p) => (p.tags || []).some((t) => t.toLowerCase().includes(filter.tag.toLowerCase())))
    }
    return base
  }, [orderedPosts, filter])

  const hero = filtered?.[0]
  const rest = useMemo(() => (filtered || []).slice(1), [filtered])
  // Show 10 total on initial load (1 hero + 9 more)
  const [visibleCount, setVisibleCount] = useState(9)
  const [loadingMore, setLoadingMore] = useState(false)

  // Dynamic sidebar category counts derived from available posts
  const categoryCounts = useMemo(() => buildCategoryCounts(orderedPosts), [orderedPosts])
  const sidebarCategories = useMemo(() => {
    return SIDEBAR_CATEGORIES.map((c) => {
      const key = normalize(c.title)
      const dynamic = categoryCounts.get(key)
      return { ...c, count: typeof dynamic === 'number' ? dynamic : (c.count || 0) }
    })
  }, [categoryCounts])

  function handleLoadMore() {
    if (loadingMore) return
    if (visibleCount >= rest.length) return
    setLoadingMore(true)
    // Simulate async loading
    setTimeout(() => {
      setVisibleCount((c) => Math.min(c + 4, rest.length))
      setLoadingMore(false)
    }, 500)
  }

  // Scroll to top on route/filter change
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      window.scrollTo(0, 0)
    }
  }, [filter?.category, filter?.tag])

  return (
    <div className="w-full bg-gradient-to-br from-white via-emerald-50/30 to-emerald-50/20">
      <Header />
      <main className="min-h-screen w-full">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-600 via-green-500 to-emerald-500 text-white py-16 lg:py-20">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                Health & Wellness Blog
              </div>
              <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-6 drop-shadow-lg">
                Discover Your Path to <span>Better Health</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed drop-shadow">
                Expert insights, evidence-based advice, and inspiring stories to help you live your healthiest life.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
          {loading && <LoadingSkeleton />}
          {!loading && error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>
          )}

          {!loading && !error && (
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px] lg:grid-cols-[minmax(0,1fr)_360px]">
              {/* Left: optional category header + hero + post list */}
              <div className="space-y-6">
                {(!hero && (filtered?.length || 0) === 0) && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
                    No posts found.
                  </div>
                )}
                {showCategoryHeader && filter?.category && (
                  <section className="mt-2">
                    <div className="mb-2 text-[12px] font-semibold tracking-wider text-slate-600">BROWSING CATEGORY</div>
                    <h1 className="heading-tight text-[35px] font-bold text-slate-800 sm:text-[45px] lg:text-[40px]">
                      {titleCase(normalize(filter.category))}
                    </h1>
                    <div className="mt-2 text-[13px] sm:text-[14px] text-slate-500">{filtered.length} posts</div>
                  </section>
                )}
                {hero && <PostHero post={hero} />}

                <div className="space-y-6">
                  {rest.slice(0, visibleCount).map((p, idx) => {
                    // 0,1 -> split; 2 -> full
                    if (idx < 2) return <PostCard key={p.id || p.slug} post={p} />
                    if (idx === 2) return <PostFullCard key={p.id || p.slug} post={p} />

                    // After first three, follow layout: full, split, split, split, overlay (repeat)
                    const pos = (idx - 3) % 5
                    if (pos === 0) return <PostFullCard key={p.id || p.slug} post={p} />
                    if (pos >= 1 && pos <= 3) return <PostCard key={p.id || p.slug} post={p} />
                    return <PostOverlayCard key={p.id || p.slug} post={p} />
                  })}
                </div>
                <div className="py-6">
                  <LoadMoreButton
                    onClick={handleLoadMore}
                    disabled={visibleCount >= rest.length}
                    loading={loadingMore}
                  />
                </div>
              </div>

              <RightSidebar
                categories={sidebarCategories}
                featured={SIDEBAR_FEATURED}
                topWeek={SIDEBAR_TOP_WEEK}
                stickyTopMd={100}
                stickyTopLg={150}
                showCategoryList={sidebarShowCategoryList}
                categoriesPosition={filter?.category ? 'bottom' : 'top'}
                showTags={true}
                tags={SIDEBAR_TAGS}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BackToTop />
        </div>
  )
}

export default Blog