interface BreadcrumbsProps {
  onNavigate: (target: string, label: string) => void;
}

export function Breadcrumbs({ onNavigate }: BreadcrumbsProps) {
  const crumbs = [
    { label: 'Home', target: 'product-top', current: false },
    { label: 'Bags', target: 'related-collection', current: false },
    { label: 'Messenger Bags', target: 'product-details-tabs', current: false },
    { label: 'The Heritage Messenger', target: 'product-top', current: true },
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-5 pb-3 sm:pt-6 sm:pb-4"
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#77736C]">
        {crumbs.map((crumb, index) => (
          <li key={crumb.label} className="inline-flex items-center gap-2">
            {index > 0 && (
              <span aria-hidden="true" className="text-[#B5AEA4]">
                /
              </span>
            )}
            {crumb.current ? (
              <span aria-current="page" className="text-[#24221F] font-medium">
                {crumb.label}
              </span>
            ) : (
              <a
                href={`#${crumb.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(crumb.target, crumb.label);
                }}
                className="hover:text-[#8A542F] transition-colors focus-visible:outline-none focus-visible:underline"
              >
                {crumb.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
