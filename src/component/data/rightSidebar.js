// Shared sidebar data for categories/featured/top week

export const CATEGORIES = [
  {
    key: 'passport',
    title: 'Passport Services',
    count: 12,
    image:
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200&auto=format&fit=crop',
    to: '/category/passport-services',
  },
  {
    key: 'oci',
    title: 'OCI Card Services',
    count: 8,
    image:
      'https://mlvrpw5wpdmq.i.optimole.com/w:768/h:558/q:mauto/ig:avif/https://documitra.com/blog/wp-content/uploads/2025/08/OCI-2.1-1.png',
    to: '/category/oci-card-services',
  },
  {
    key: 'nri-legal',
    title: 'Legal & Financial Insights for NRI',
    count: 6,
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    to: '/category/legal-financial-insights-for-nri',
  },
  {
    key: 'indian-visa',
    title: 'Indian Visa Travel Tips and Tricks',
    count: 16,
    image:
      'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop',
    to: '/category/indian-visa-travel-tips-and-tricks',
  },
  {
    key: 'apostille',
    title: 'Apostille and Attestation',
    count: 3,
    image:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop',
    to: '/category/apostille-and-attestation',
  },
]

export const FEATURED = [
  {
    title: "Sun, Sand, and Serenity: Europe's Best‑Kept Beaches",
    author: 'Anvit',
    date: 'July 28, 2025',
    to: '/blog/europes-best-kept-beaches',
  },
  {
    title: 'Essential Guide to Travel Insurance for Your Next Trip Abroad: Don’t Skip This!',
    author: 'Anvit',
    date: 'July 17, 2025',
    to: '/blog/travel-insurance-guide',
  },
  {
    title: 'Your Guide to Indian Passport Renewal Abroad:',
    author: 'Anvit',
    date: 'July 1, 2025',
    to: '/blog/guide-indian-passport-renewal',
  },
  {
    title: 'India’s e‑Passport: Everything You Need to Know',
    author: 'Nikita',
    date: 'June 24, 2025',
    to: '/blog/india-e-passport',
  },
  {
    title: 'New OCI Portal: What Applicants Need to Know',
    author: 'Nikita',
    date: 'June 20, 2025',
    to: '/blog/new-oci-portal',
  },
]

export const TOP_WEEK = FEATURED.slice(0, 5)

export const TAGS = [
  'Passport Services',
  'Indian Passport Renewal',
  'Lost or Damaged Passport',
  'Minor Passport Renewal',
  'e‑Passport',
  'OCI Card Services',
  'New OCI Portal',
  'OCI Application Tips',
  'Indian Visa',
  'e‑Visa vs Paper Visa',
  'Business e‑Visa',
  'Schengen Visa',
  'UK Visa',
  'Japan e‑Visa',
  'Travel Insurance',
  'Trusted Traveler Programs',
  'I‑94 Stay Limits',
  'Europe Travel Tips',
  'USA Travel Tips',
  'Apostille',
  'Attestation',
  'Document Checklist',
  'Appointment Booking',
  'Biometrics',
  'Photo Requirements',
  'Processing Time',
  'Fees & Payments',
  'Consulate Guidelines',
]


