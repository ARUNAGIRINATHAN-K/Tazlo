import { useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { validateEmailAddress } from '../utils/commerce';

interface NewsletterSectionProps {
  onSubscribeSuccess: (email: string) => void;
}

export function NewsletterSection({ onSubscribeSuccess }: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const check = validateEmailAddress(email);
    if (!check.valid) {
      setError(check.error ?? 'Please enter a valid email.');
      return;
    }

    const cleaned = email.trim();
    setError(null);
    setSubscribedEmail(cleaned);
    setEmail('');
    onSubscribeSuccess(cleaned);
  };

  return (
    <section
      id="newsletter"
      aria-label="Newsletter signup"
      className="border-t border-[#E7E2DA] bg-[#EFECE5]/65 py-14 sm:py-20"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-8 text-center space-y-5">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#8A542F]">
          TAZLO Journal
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#24221F] [text-wrap:balance]">
          Stories, craftsmanship, and things made to last.
        </h2>
        <p className="text-sm sm:text-[15px] text-[#524D46] leading-relaxed">
          Join our community for new collections, artisan stories, and thoughtful offers.
        </p>

        {subscribedEmail ? (
          <div
            data-testid="newsletter-success"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#F7F5F0] border border-[#D6CFC4] text-sm text-[#24221F]"
          >
            <CheckCircle2 className="w-4 h-4 text-[#533621] shrink-0" aria-hidden="true" />
            <span>
              Thank you — <strong>{subscribedEmail}</strong> has been registered (prototype demo).
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto pt-2 space-y-2" noValidate>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter your email address"
                aria-describedby={error ? 'newsletter-error' : undefined}
                className="flex-1 h-11 px-4 bg-[#F7F5F0] border border-[#D6CFC4] text-sm text-[#24221F] placeholder:text-[#9A948B] focus:outline-none focus:border-[#24221F]"
              />
              <button
                type="submit"
                className="h-11 px-6 bg-[#24221F] hover:bg-[#3A3630] text-[#F7F5F0] text-xs font-medium uppercase tracking-[0.14em] whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A542F]"
              >
                Subscribe
              </button>
            </div>
            {error && (
              <p id="newsletter-error" role="alert" className="text-xs text-[#8A2F2F] text-left">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
