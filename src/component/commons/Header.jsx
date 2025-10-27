// src/components/Header.jsx
import { useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Phone,
  Facebook,
  Mail,
  MessageCircleMore,
  Menu,
  ChevronDown,
  User2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";

/* ------------------------------------------------
   Health & Wellness Navigation Data
-------------------------------------------------*/
const SERVICES = [
  { label: "Nutrition Counseling", to: "/services/nutrition-counseling" },
  { label: "Fitness Training", to: "/services/fitness-training" },
  { label: "Mental Health Therapy", to: "/services/mental-health-therapy" },
  { label: "Wellness Coaching", to: "/services/wellness-coaching" },
  { label: "Yoga & Meditation Classes", to: "/services/yoga-meditation" },
  { label: "Weight Management", to: "/services/weight-management" },
  { label: "Preventive Health Screening", to: "/services/preventive-screening" },
  { label: "Stress Management", to: "/services/stress-management" },
  { label: "Sleep Consultation", to: "/services/sleep-consultation" },
  { label: "Corporate Wellness Programs", to: "/services/corporate-wellness" },
  { label: "Online Health Coaching", to: "/services/online-coaching" },
  { label: "Health Assessment", to: "/services/health-assessment" },
  { label: "Chronic Disease Management", to: "/services/chronic-disease" },
  { label: "Holistic Health Services", to: "/services/holistic-health" },
];

const BLOG = [
  { label: "Nutrition & Diet", to: "/category/nutrition-diet" },
  { label: "Fitness & Exercise", to: "/category/fitness-exercise" },
  { label: "Mental Health", to: "/category/mental-health" },
  { label: "Preventive Health", to: "/category/preventive-health" },
  { label: "Wellness & Lifestyle", to: "/category/wellness-lifestyle" },
  { label: "Weight Loss Tips", to: "/category/weight-loss-tips" },
  { label: "Heart Health", to: "/category/heart-health" },
  { label: "Women's Health", to: "/category/womens-health" },
  { label: "Men's Health", to: "/category/mens-health" },
  { label: "Healthy Recipes", to: "/category/healthy-recipes" },
];

/* ------------------------------------------------
   Small helpers (no TS)
-------------------------------------------------*/
function cn(...args) {
  return args.filter(Boolean).join(" ");
}

// tiny teal underline bar for health theme
function Underline({ active }) {
  return (
    <span
      className={cn(
        "block h-1 rounded bg-teal-600 transition-all duration-200",
        active ? "w-12 mt-1" : "w-0"
      )}
    />
  );
}

function DesktopNavLink({ to, children }) {
  const location = useLocation();
  const active = useMemo(() => location.pathname === to, [location.pathname, to]);

  return (
    <div className="flex flex-col items-start">
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(
            "text-[17px] font-semibold text-gray-700 hover:text-teal-600",
            (isActive || active) && "text-black"
          )
        }
      >
        {children}
      </NavLink>
      <Underline active={active} />
    </div>
  );
}

// Used inside dropdowns so child items get light-teal active bg
function ChildMenuLink({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "block w-full rounded px-2 py-2 text-[15px] text-gray-800",
          "hover:bg-teal-50 hover:text-teal-700",
          isActive && "bg-teal-50 text-teal-700"
        )
      }
    >
      {label}
    </NavLink>
  );
}

/* ------------------------------------------------
   Component
-------------------------------------------------*/
export default function Header() {
  const [blogOpen, setBlogOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const onServices = location.pathname.startsWith("/services");
  const onBlog = location.pathname.startsWith("/blog");

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-lg backdrop-blur-lg">
      {/* Top health strip */}
      <div className="w-full bg-gradient-to-r from-emerald-600 via-green-600 to-lime-600 text-white">
        <div className="flex w-full items-center justify-between px-2 sm:px-2 md:px-2 lg:px-16 xl:px-24 2xl:px-36 py-2">
          <div className="flex items-center gap-3 text-[14px] font-semibold">
            <Phone className="h-4 w-4" />
            <span className="tracking-wide">🌿 24/7 Health Helpline - +1(800)WELLNESS</span>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/80 text-white hover:bg-white/10"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Email"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/80 text-white hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/80 text-white hover:bg-white/10"
            >
              <MessageCircleMore className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="flex w-full items-center justify-between px-2 sm:px-2 md:px-2 lg:px-16 xl:px-24 2xl:px-36 py-5 lg:py-6 border-b border-slate-200 bg-white">
        {/* Logo */}
        {/* Mobile menu trigger (left of logo) */}
        <div className="lg:hidden mr-3">
          <Sheet>
            <SheetTrigger aria-label="Open menu">
              <Menu className="h-5 w-5 text-gray-700 lg:h-6 lg:w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="border-b px-4 py-3">
                <SheetTitle className="flex items-center gap-2">
                  {/* <img src="/logo1.jpg" alt="WellnessHub" className="block h-6 w-auto object-contain" /> */}
                  <span className="font-extrabold text-black">Wellness<span className="text-emerald-600">Hub</span></span>
                </SheetTitle>
              </SheetHeader>

              <div className="max-h-[calc(100vh-140px)] overflow-y-auto px-2 py-2">
                <nav className="flex flex-col">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        cn(
                          "rounded px-3 py-3 text-[15px] font-medium hover:bg-gray-50",
                          isActive && "bg-emerald-50 text-emerald-700"
                        )
                      }
                    >
                      Home
                    </NavLink>

                  {/* Services accordion */}
                  <Accordion type="single" collapsible>
                    <AccordionItem value="services" className="border-b-0">
                      <AccordionTrigger className="px-3 py-3 text-[15px]">
                        Services
                      </AccordionTrigger>
                      <AccordionContent className="pb-2">
                        <div className="flex flex-col gap-1 pl-4">
                          {SERVICES.map((it) => (
                            <NavLink
                              key={it.to}
                              to={it.to}
                              className={({ isActive }) =>
                                cn(
                                  "rounded px-2 py-2 text-sm",
                                  "hover:bg-emerald-50 hover:text-emerald-800",
                                  isActive && "bg-emerald-50 text-emerald-800"
                                )
                              }
                            >
                              {it.label}
                            </NavLink>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
{/* 
                  <NavLink
                    to="/resources"
                    className={({ isActive }) =>
                      cn(
                        "rounded px-3 py-3 text-[15px] font-medium hover:bg-gray-50",
                        isActive && "bg-emerald-50 text-emerald-700"
                      )
                    }
                  >
                    Resources
                  </NavLink> */}

                  {/* Blog accordion (parent label navigates to /blog) */}
                  <Accordion type="single" collapsible>
                    <AccordionItem value="blog" className="border-b-0">
                      <AccordionTrigger className="px-3 py-3 text-[15px] flex w-full">
                        <Link
                          to="/blog"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 text-left"
                        >
                          Blog
                        </Link>
                      </AccordionTrigger>
                      <AccordionContent className="pb-2">
                        <div className="flex flex-col gap-1 pl-4">
                          {BLOG.map((it) => (
                            <NavLink
                              key={it.to}
                              to={it.to}
                              className={({ isActive }) =>
                                cn(
                                  "rounded px-2 py-2 text-sm",
                                  "hover:bg-emerald-50 hover:text-emerald-700",
                                  isActive && "bg-emerald-50 text-emerald-700"
                                )
                              }
                            >
                              {it.label}
                            </NavLink>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <NavLink
                    to="/faqs"
                    className={({ isActive }) =>
                      cn(
                        "rounded px-3 py-3 text-[15px] font-medium hover:bg-gray-50",
                        isActive && "bg-teal-50 text-teal-700"
                      )
                    }
                  >
                    FAQ's
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      cn(
                        "rounded px-3 py-3 text-[15px] font-medium hover:bg-gray-50",
                        isActive && "bg-teal-50 text-teal-700"
                      )
                    }
                  >
                    Contact
                  </NavLink>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      cn(
                        "rounded px-3 py-3 text-[15px] font-medium hover:bg-gray-50",
                        isActive && "bg-teal-50 text-teal-700"
                      )
                    }
                  >
                    About Us
                  </NavLink>
                </nav>
              </div>

              <SheetFooter className="border-t px-4 py-3">
                <div className="flex w-full items-center justify-between gap-2">
                  <Link to="/admin/signin" className="w-1/2">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full rounded-md"
                  >
                    Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" className="w-1/2">
                    <Button size="lg" className="w-full rounded-md bg-teal-600 hover:bg-teal-700">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        <Link to="/" className="flex items-center gap-3 group">
          {/* <div className="relative">
            <img src="/logo1.jpg" alt="Wellness Hub" className="block h-10 md:h-11 lg:h-12 xl:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-lime-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div> */}
          <span className="text-xl md:text-2xl lg:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-emerald-600 to-lime-600">
            Wellness<span className="text-emerald-600">Hub</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          <DesktopNavLink to="/">Home</DesktopNavLink>

          {/* Services */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <DropdownMenu open={servicesOpen} onOpenChange={setServicesOpen}>
              <DropdownMenuTrigger className="flex items-center gap-1 text-[17px] font-semibold text-gray-700 hover:text-emerald-600 focus:outline-none transition-colors">
                Services <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80">
                <div className="py-1">
                  {SERVICES.map((item) => (
                    <DropdownMenuItem key={item.to} asChild className="p-0">
                      <ChildMenuLink to={item.to} label={item.label} />
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Underline active={onServices} />
          </div>

          {/* Resources */}
          {/* <DesktopNavLink to="/resources">Resources</DesktopNavLink> */}

          {/* Blog */}
          <div
            className="relative"
            onMouseEnter={() => setBlogOpen(true)}
            onMouseLeave={() => setBlogOpen(false)}
          >
            <DropdownMenu open={blogOpen} onOpenChange={setBlogOpen}>
              <DropdownMenuTrigger asChild>
                <NavLink to="/blog" className="flex items-center gap-1 text-[17px] font-semibold text-gray-700 hover:text-emerald-600 focus:outline-none transition-colors">
                Blog <ChevronDown className="h-4 w-4" />
                </NavLink>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80">
                <div className="py-1">
                  {BLOG.map((item) => (
                    <DropdownMenuItem key={item.to} asChild className="p-0">
                      <ChildMenuLink to={item.to} label={item.label} />
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Underline active={onBlog} />
          </div>

          {/* <DesktopNavLink to="/faqs">FAQ&apos;s</DesktopNavLink>
          <DesktopNavLink to="/contact">Contact</DesktopNavLink>
          <DesktopNavLink to="/about">About Us</DesktopNavLink> */}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-6">
          <NavLink
            to="/admin/signin"
            className="text-[17px] font-semibold text-gray-700 hover:text-emerald-600 transition-colors"
          >
            SignIn
          </NavLink>
          <Link to="/signup">
            <Button size="lg" className="rounded-full bg-gradient-to-r from-emerald-600 to-lime-600 text-white hover:from-emerald-700 hover:to-lime-700 shadow-lg hover:shadow-xl hover:shadow-emerald-300/40 transition-all duration-300 hover:scale-105 h-11 w-[170px] text-[16px] font-bold">
              Sign up
            </Button>
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50 focus:outline-none">
              <span className="rounded-full bg-emerald-600 p-2 text-white">
                <User2 className="h-4 w-4" />
              </span>
              <span className="inline text-[14px] lg:text-[16px] font-medium text-gray-700">Account</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem asChild>
                <Link to="/admin/signin" className="text-[16px]">Sign In</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/signup" className="text-[16px]">Sign Up</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* removed bottom blue bar */}
    </header>
  );
}
