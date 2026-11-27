import { ATELIER_IMAGE, CRAFTSMANSHIP_FEATURES } from '../data/productData';
import { ResilientImage } from './ResilientImage';

export function CraftsmanshipSection() {
  return (
    <section
      id="craftsmanship"
      aria-label="Artisan Craftsmanship"
      className="bg-[#24221F] text-[#F7F5F0] py-16 sm:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-12 lg:space-y-16">
        {/* Asymmetrical Editorial Header + Atelier Photograph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#B49A70]">
              The TAZLO Atelier
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] [text-wrap:balance]">
              Made by Hand.
              <br />
              Made to Become Yours.
            </h2>
            <p className="text-sm sm:text-base leading-[1.7] text-[#D6CFC4] max-w-md tracking-[0.01em]">
              Every stitch is intentional. Every cut is considered. Our artisans transform carefully
              selected leather into objects designed to accompany you for years.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="aspect-[16/9] w-full overflow-hidden border border-[#3A3630] bg-[#1C1A18]">
              <ResilientImage
                src={ATELIER_IMAGE}
                alt="TAZLO master leather artisan hand-stitching saddle brown full-grain leather on a wooden workbench"
                fallbackLabel="TAZLO Leather Atelier"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* 3 Numbered Editorial Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#3A3630]">
          {CRAFTSMANSHIP_FEATURES.map((feature) => (
            <div key={feature.number} className="space-y-2.5">
              <div className="flex items-baseline gap-2.5">
                <span className="font-serif text-xl text-[#B49A70] tabular-nums">
                  {feature.number}
                </span>
                <span className="text-[#534D45]" aria-hidden="true">
                  —
                </span>
                <h3 className="text-sm font-medium uppercase tracking-[0.1em] text-[#F7F5F0]">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm text-[#B5AEA4] leading-[1.7]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
