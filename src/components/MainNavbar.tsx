import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "AI Design Studio", href: "/ai-design-studio" },
    { name: "Videos", href: "/videos" },
    { name: "Reviews", href: "/reviews" },
    { name: "Career", href: "/career" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
    { name: "Bulk Orders", href: "/bulk-orders" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav className="fixed top-16 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center w-full space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white hover:text-gold font-montserrat font-medium transition-colors duration-300 relative group py-2"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden text-white hover:text-gold transition-colors ml-auto">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-gray-900 border-gold/20 w-[280px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-white hover:text-gold font-montserrat font-medium py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-gold/10"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;