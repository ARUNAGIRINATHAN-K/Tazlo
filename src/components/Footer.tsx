interface FooterProps {
  onNavigateSection: (target: string) => void;
  onOpenPolicy: (topic: string) => void;
}

export function Footer({ onNavigateSection, onOpenPolicy }: FooterProps) {
  const columns = [
    {
      heading: 'Shop',
      links: [
        { label: 'Messenger Bags', action: () => onNavigateSection('product-top') },
        { label: 'Totes', action: () => onNavigateSection('related-collection') },
        { label: 'Wallets', action: () => onNavigateSection('related-collection') },
        { label: 'Accessories', action: () => onNavigateSection('related-collection') },
      ],
    },
    {
      heading: 'About',
      links: [
        { label: 'Our Story', action: () => onNavigateSection('craftsmanship') },
        { label: 'Craftsmanship', action: () => onNavigateSection('craftsmanship') },
        { label: 'Journal', action: () => onNavigateSection('newsletter') },
      ],
    },
    {
      heading: 'Customer Care',
      links: [
        { label: 'Contact Us', action: () => onOpenPolicy('Contact Us') },
        { label: 'Shipping', action: () => onOpenPolicy('Shipping') },
        { label: 'Returns', action: () => onOpenPolicy('Returns') },
        { label: 'Warranty', action: () => onOpenPolicy('Warranty') },
        { label: 'FAQ', action: () => onOpenPolicy('FAQ') },
      ],
    },
    {
      heading: 'Social',
      links: [
        { label: 'Instagram', action: () => onOpenPolicy('Instagram') },
        { label: 'Pinterest', action: () => onOpenPolicy('Pinterest') },
        { label: 'Facebook', action: () => onOpenPolicy('Facebook') },
      ],
    },
  ];

  return (
    <footer className="bg-[#24221F] text-[#F7F5F0] pt-14 sm:pt-16 pb-24 md:pb-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <p className="font-serif text-2xl tracking-[0.26em] uppercase text-[#F7F5F0]">
              TAZLO
            </p>
            <p className="text-sm text-[#D6CFC4] max-w-xs leading-relaxed">
              Leather goods crafted with intention.
            </p>
            <p className="text-xs text-[#B5AEA4]">
              Atelier &amp; Concierge:{' '}
              <a
                href="mailto:care@tazlo.in"
                className="text-[#F7F5F0] underline underline-offset-4 hover:text-[#B49A70] transition-colors"
              >
                care@tazlo.in
              </a>
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.heading} className="space-y-3">
                <h3 className="text-[11px] uppercase tracking-[0.18em] text-[#B49A70]">
                  {col.heading}
                </h3>
                <ul className="space-y-2 text-sm text-[#D6CFC4]">
                  {col.links.map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={item.action}
                        className="hover:text-white transition-colors text-left focus-visible:outline-none focus-visible:underline"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Legal & Payment Strip */}
        <div className="pt-8 border-t border-[#3A3630] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9E978D]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© 2026 TAZLO Leather Atelier. All rights reserved.</span>
            <button
              type="button"
              onClick={() => onOpenPolicy('Privacy Policy')}
              className="hover:text-[#F7F5F0] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenPolicy('Terms of Service')}
              className="hover:text-[#F7F5F0] transition-colors"
            >
              Terms
            </button>
          </div>

          <div className="flex items-center gap-2">
            {['UPI', 'Visa', 'Mastercard', 'RuPay'].map((method) => (
              <span
                key={method}
                className="px-2 py-0.5 text-[10px] tracking-[0.06em] uppercase border border-[#3A3630] text-[#D6CFC4]"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
