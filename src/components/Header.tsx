import { useState } from 'react';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onNavigateSection: (sectionId: string) => void;
}

const NAV_LINKS = [
  { label: 'Shop', target: 'product-top' },
  { label: 'Bags', target: 'related-collection' },
  { label: 'Accessories', target: 'related-collection' },
  { label: 'Our Craft', target: 'craftsmanship' },
  { label: 'Journal', target: 'newsletter' },
];

export function Header({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAccount,
  onNavigateSection,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(target);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-sm border-b border-[#E7E2DA]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Mobile Left: Hamburger Menu */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="p-2 -ml-2 text-[#24221F] hover:text-[#8A542F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Zone 1: TAZLO Wordmark (Centered on mobile, Left on desktop) */}
        <a
          href="#product-top"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('product-top');
          }}
          className="font-serif text-xl sm:text-2xl font-medium tracking-[0.26em] text-[#24221F] uppercase whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
        >
          TAZLO
        </a>

        {/* Zone 2: Center Navigation Links (Desktop) */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 lg:gap-9 text-[13px] tracking-[0.06em] uppercase text-[#24221F]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={`#${link.target}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.target);
              }}
              className="relative py-1 whitespace-nowrap shrink-0 text-[#24221F] hover:text-[#8A542F] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#8A542F] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Right Utility Icons */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search catalog"
            className="hidden sm:inline-flex items-center justify-center p-2 text-[#24221F] hover:text-[#8A542F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
          >
            <Search className="w-[18px] h-[18px] stroke-[1.5]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onOpenAccount}
            aria-label="Account and orders"
            className="hidden sm:inline-flex items-center justify-center p-2 text-[#24221F] hover:text-[#8A542F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
          >
            <User className="w-[18px] h-[18px] stroke-[1.5]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Shopping bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            className="relative inline-flex items-center gap-1.5 p-2 -mr-1 text-[#24221F] hover:text-[#8A542F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
          >
            <ShoppingBag className="w-[18px] h-[18px] stroke-[1.5]" aria-hidden="true" />
            <span
              data-testid="header-cart-count"
              className="tabular-nums text-xs font-medium min-w-[16px] text-center"
            >
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E7E2DA] bg-[#F7F5F0] px-4 py-5 space-y-4">
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={`#${link.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.target);
                }}
                className="text-sm uppercase tracking-[0.08em] py-1.5 text-[#24221F] hover:text-[#8A542F] border-b border-[#E7E2DA]/60"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-[#24221F] py-2"
            >
              <Search className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAccount();
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-[#24221F] py-2"
            >
              <User className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
              Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
