import { Link, useLocation } from "react-router-dom";
import { Home, Image as ImageIcon, CalendarCheck, Phone, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const items = [
  { name: "Home", href: "/", icon: Home },
  { name: "Gallery", href: "/gallery", icon: ImageIcon },
  { name: "Book", href: "/booking", icon: CalendarCheck },
  { name: "Contact", href: "/contact", icon: Phone },
];

const moreItems = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "AI Design Studio", href: "/ai-design-studio" },
  { name: "Videos", href: "/videos" },
  { name: "Reviews", href: "/reviews" },
  { name: "Career", href: "/career" },
  { name: "FAQ", href: "/faq" },
  { name: "Bulk Orders", href: "/bulk-orders" },
  { name: "Blog", href: "/blog" },
  { name: "Track Order", href: "/track-order" },
];

const BottomNav = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Spacer so content isn't hidden behind the fixed bar */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
      <nav
        aria-label="Primary mobile navigation"
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-gray-900/95 backdrop-blur-md border-t border-gold/20 pb-[env(safe-area-inset-bottom)]"
      >
        <ul className="grid grid-cols-5 h-16">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex flex-col items-center justify-center h-full gap-1 text-[11px] font-montserrat transition-colors ${
                    active ? "text-gold" : "text-gray-300 hover:text-gold"
                  }`}
                  aria-label={item.name}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open more navigation"
                  className="flex flex-col items-center justify-center h-full w-full gap-1 text-[11px] font-montserrat text-gray-300 hover:text-gold transition-colors"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                  <span>More</span>
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="bg-gray-900 border-gold/20 max-h-[70vh] overflow-y-auto">
                <nav aria-label="More navigation" className="grid grid-cols-2 gap-2 mt-6 pb-[env(safe-area-inset-bottom)]">
                  {moreItems.map((m) => (
                    <Link
                      key={m.name}
                      to={m.href}
                      onClick={() => setOpen(false)}
                      className="text-white hover:text-gold font-montserrat py-3 px-4 rounded-lg hover:bg-gold/10 transition-colors text-center"
                    >
                      {m.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default BottomNav;
