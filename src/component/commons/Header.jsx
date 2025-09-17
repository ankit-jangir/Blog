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
   Data (match your screenshot structure)
-------------------------------------------------*/
const SERVICES = [
  { label: "OCI", to: "/services/oci" },
  { label: "Visa", to: "/services/visa" },
  { label: "Passport", to: "/services/passport" },
  { label: "Surrender of Indian Passport", to: "/services/surrender-passport" },
  { label: "PAN Card", to: "/services/pan-card" },
  { label: "Visa Extension", to: "/services/visa-extension" },
  { label: "Indian Consular Services", to: "/services/indian-consular" },
  { label: "EAD Card", to: "/services/ead-card" },
  { label: "Green Card", to: "/services/green-card" },
  { label: "US Citizenship", to: "/services/us-citizenship" },
  { label: "NRI Services", to: "/services/nri" },
  { label: "Forms and Formats", to: "/services/forms" },
  { label: "Apostille of Documents", to: "/services/apostille" },
  { label: "Global Entry Program GEP", to: "/services/gep" },
];

const BLOG = [
  { label: "Passport Services", to: "/blog/passport" },
  { label: "OCI Card Services", to: "/blog/oci" },
  { label: "Indian Visa Travel Tips and Tricks", to: "/blog/indian-visa" },
  { label: "Europe Visa Travel Tips and Tricks", to: "/blog/europe-visa" },
  { label: "North America Visa Travel Tips and Tricks", to: "/blog/north-america" },
  { label: "Asia Pacific Visa Travel Tips and Tricks", to: "/blog/asia-pacific" },
  { label: "Apostille and Attestation", to: "/blog/apostille" },
  { label: "Legal & Financial Insights for NRI", to: "/blog/legal" },
  { label: "News & Updates by Documitra", to: "/blog/news" },
  { label: "Other Travel Tips and Tricks", to: "/blog/other" },
];

/* ------------------------------------------------
   Small helpers (no TS)
-------------------------------------------------*/
function cn(...args) {
  return args.filter(Boolean).join(" ");
}

// tiny blue underline bar like screenshot
function Underline({ active }) {
  return (
    <span
      className={cn(
        "block h-1 rounded bg-blue-800 transition-all duration-200",
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
            "text-[17px] font-semibold text-gray-700 hover:text-blue-800",
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

// Used inside dropdowns so child items get light-blue active bg
function ChildMenuLink({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "block w-full rounded px-2 py-2 text-[15px] text-gray-800",
          "hover:bg-blue-50 hover:text-blue-800",
          isActive && "bg-blue-50 text-blue-800"
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
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* Top blue strip */}
      <div className="w-full bg-blue-900 text-white">
        <div className="flex w-full items-center justify-between px-2 sm:px-2 md:px-2 lg:px-16 xl:px-24 2xl:px-36 py-1 lg:py-2">
          <div className="flex items-center gap-3 text-[15px] font-medium">
            <Phone className="h-4 w-4" />
            <span className="tracking-wide">Toll Free - +1(877)291-1311</span>
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
      <div className="flex w-full items-center justify-between px-2 sm:px-2 md:px-2 lg:px-16 xl:px-24 2xl:px-36 py-3 lg:py-5 shadow-md border-b border-blue-100/60">
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
                  <img src="/logo1.jpg" alt="Documitra" className="block h-6 w-auto object-contain" />
                  <span className="font-extrabold text-black">DOC<span className="text-blue-800">U</span>MITRA</span>
                </SheetTitle>
              </SheetHeader>

              <div className="max-h-[calc(100vh-140px)] overflow-y-auto px-2 py-2">
                <nav className="flex flex-col">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      cn(
                        "rounded px-3 py-3 text-[15px] font-medium hover:bg-gray-50",
                        isActive && "bg-blue-50 text-blue-800"
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
                                  "hover:bg-blue-50 hover:text-blue-800",
                                  isActive && "bg-blue-50 text-blue-800"
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
                    to="/photos"
                    className={({ isActive }) =>
                      cn(
                        "rounded px-3 py-3 text-[15px] font-medium hover:bg-gray-50",
                        isActive && "bg-blue-50 text-blue-800"
                      )
                    }
                  >
                    Photos
                  </NavLink>

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
                                  "hover:bg-blue-50 hover:text-blue-800",
                                  isActive && "bg-blue-50 text-blue-800"
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
                        isActive && "bg-blue-50 text-blue-800"
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
                        isActive && "bg-blue-50 text-blue-800"
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
                        isActive && "bg-blue-50 text-blue-800"
                      )
                    }
                  >
                    About Us
                  </NavLink>
                </nav>
              </div>

              <SheetFooter className="border-t px-4 py-3">
                <div className="flex w-full items-center justify-between gap-2">
                  <Link to="/signin" className="w-1/2">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full rounded-md"
                  >
                    Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" className="w-1/2">
                    <Button size="lg" className="w-full rounded-md bg-blue-800 hover:bg-blue-900">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo1.jpg" alt="Documitra" className="block h-8 md:h-9 lg:h-10 xl:h-12 w-auto object-contain" />
          <span className="hidden">
            DOC<span className="text-blue-800">U</span>MITRA
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
              <DropdownMenuTrigger className="flex items-center gap-1 text-[17px] font-semibold text-gray-700 hover:text-blue-800 focus:outline-none">
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

          {/* Photos */}
          <DesktopNavLink to="/photos">Photos</DesktopNavLink>

          {/* Blog */}
          <div
            className="relative"
            onMouseEnter={() => setBlogOpen(true)}
            onMouseLeave={() => setBlogOpen(false)}
          >
            <DropdownMenu open={blogOpen} onOpenChange={setBlogOpen}>
              <DropdownMenuTrigger asChild>
                <NavLink to="/blog" className="flex items-center gap-1 text-[17px] font-semibold text-gray-700 hover:text-blue-800 focus:outline-none">
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

          <DesktopNavLink to="/faqs">FAQ&apos;s</DesktopNavLink>
          <DesktopNavLink to="/contact">Contact</DesktopNavLink>
          <DesktopNavLink to="/about">About Us</DesktopNavLink>
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-6">
          <NavLink
            to="/signin"
            className="text-[17px] font-semibold text-gray-700 hover:text-blue-800"
          >
            SignIn
          </NavLink>
          <Link to="/signup">
            <Button size="lg" className="rounded-full bg-blue-800 text-white hover:bg-blue-900 h-11 w-[170px] text-[16px]">
              Sign up
            </Button>
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50 focus:outline-none">
              <span className="rounded-full bg-blue-800 p-2 text-white">
                <User2 className="h-4 w-4" />
              </span>
              <span className="inline text-[14px] lg:text-[16px] font-medium text-gray-700">Account</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem asChild>
                <Link to="/signin" className="text-[16px]">Sign In</Link>
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
