export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#EDE8DF] bg-white">
      <div className="max-w-[430px] mx-auto px-5 py-10">
        {/* Cozy closing message */}
        <div className="text-center mb-6">
          <p
            className="font-display italic text-[#7D7268]"
            style={{ fontSize: "18px" }}
          >
            Thank you for choosing Plumpy
          </p>
          <p
            className="font-display italic text-[#C5B9AC] mt-1"
            style={{ fontSize: "13px" }}
          >
            Every dish made with care
          </p>
        </div>

        {/* Logo */}
        <div className="text-center mb-7">
          <div
            className="font-display text-[22px] font-semibold text-[#2A2218]"
            style={{ letterSpacing: "-0.01em" }}
          >
            plumpy
          </div>
          <div className="font-body text-[9px] uppercase tracking-[0.3em] text-[#C5D14A] mt-0.5">
            RESTAURANT
          </div>
          <p className="font-body text-[13px] text-[#7D7268] mt-2 leading-relaxed">
            Comfort food for everyday dine & delivery
          </p>
        </div>

        {/* Info */}
        <div className="space-y-2 text-center mb-7">
          <p className="font-body text-[13px] text-[#7D7268]">
            Dubai Hills Business Park, building 3
          </p>
          <p className="font-body text-[13px] text-[#7D7268]">
            Delivery: 7 AM — 11 PM
          </p>
          <a
            href="tel:+971585955828"
            className="block font-body text-[13px] text-[#2A2218] font-medium hover:text-[#C5D14A] transition-colors duration-150"
          >
            +971 58 595 5828
          </a>
          <a
            href="mailto:founders@plumpy-restaurant.com"
            className="block font-body text-[13px] text-[#7D7268] hover:text-[#2A2218] transition-colors duration-150"
          >
            founders@plumpy-restaurant.com
          </a>
        </div>

        {/* Divider dots */}
        <div className="flex items-center justify-center gap-2 mb-7 text-[#C5B9AC]">
          <span>·</span>
          <span>·</span>
          <span>·</span>
        </div>

        {/* Order on */}
        <div className="mb-7">
          <p className="font-body text-[11px] uppercase tracking-[0.15em] text-[#7D7268] text-center mb-3">
            Order on
          </p>
          <div className="flex gap-2 justify-center">
            <a
              href="https://deliveroo.ae/menu/dubai/jafilia/plumpy-ponchiki-restaurant"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[13px] font-medium bg-[#00CCBC] text-white rounded-full px-4 py-2 transition-opacity hover:opacity-90"
            >
              Deliveroo
            </a>
            <a
              href="https://www.talabat.com/uae/plumpy-restaurant"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[13px] font-medium bg-[#FF6A00] text-white rounded-full px-4 py-2 transition-opacity hover:opacity-90"
            >
              Talabat
            </a>
            <span className="font-body text-[13px] font-medium bg-[#F4F0E8] text-[#7D7268] rounded-full px-4 py-2">
              Careem
            </span>
          </div>
        </div>

        {/* Social */}
        <div className="flex justify-center gap-5 mb-8">
          <a
            href="https://www.instagram.com/plumpyrestaurant"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#7D7268] hover:text-[#2A2218] transition-colors duration-150"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="0.8"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/plumpyrestaurant"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-[#7D7268] hover:text-[#2A2218] transition-colors duration-150"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@plumpyrestaurant"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="text-[#7D7268] hover:text-[#2A2218] transition-colors duration-150"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@plumpyrestaurant"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-[#7D7268] hover:text-[#2A2218] transition-colors duration-150"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
              <polygon
                fill="white"
                stroke="none"
                points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
              />
            </svg>
          </a>
        </div>

        {/* QR hint */}
        <p className="font-body text-[11px] text-[#C5B9AC] text-center italic mb-5">
          Scan our QR to see our menu anytime
        </p>

        {/* Copyright */}
        <p className="font-body text-[11px] text-center text-[#C5B9AC]">
          © 2026 Plumpy Restaurant
        </p>
      </div>
    </footer>
  );
}
