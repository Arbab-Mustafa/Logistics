"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function Navbarx() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/admin/orders",
      label: "Orders",
    },
    {
      href: "/admin/testimonials",
      label: "Testimonials",
    },
    {
      href: "/admin/products",
      label: "Products",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gray-800 shadow-sm">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="mr-4">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-green-500">Admin Panel</span>
          </Link>
        </div>
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-500",
                pathname === route.href ? "text-green-500" : "text-gray-200",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button  className="bg-gray-700 border-gray-600">
              <Menu className="h-5 w-5 text-green-500" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gray-800 text-gray-100">
            <nav className="flex flex-col space-y-6 mt-10">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-green-500",
                    pathname === route.href ? "text-green-500" : "text-gray-200",
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
