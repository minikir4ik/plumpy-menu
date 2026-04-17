export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#EDE8DF] bg-white">
      <div className="max-w-[430px] mx-auto px-5 py-10">
        {/* Logo */}
        <div className="text-center" style={{ marginBottom: 32 }}>
          <img
            src="/plumpy-logo.png"
            alt="Plumpy Restaurant"
            className="block mx-auto"
            style={{ width: "auto", height: 56, objectFit: "contain" }}
          />
          <p className="font-body text-[13px] text-[#7D7268] mt-3 leading-relaxed">
            Comfort food for everyday dine &amp; delivery
          </p>
        </div>

        {/* Contact info */}
        <div className="text-center" style={{ marginBottom: 32 }}>
          <p className="font-body text-[13px] text-[#7D7268] leading-relaxed">
            Dubai Hills Business Park, building 3
            <br />
            Ground floor, Dubai
          </p>
          <p className="font-body text-[13px] text-[#7D7268] mt-2">
            Delivery: 7 AM — 11 PM
          </p>
          <a
            href="tel:+971585955828"
            className="block font-body text-[14px] text-[#2A2218] font-medium mt-3 hover:text-[#C5D14A] transition-colors duration-150"
          >
            +971 58 595 5828
          </a>
          <a
            href="mailto:founders@plumpy-restaurant.com"
            className="block font-body text-[13px] text-[#7D7268] mt-1 hover:text-[#2A2218] transition-colors duration-150"
          >
            founders@plumpy-restaurant.com
          </a>
        </div>

        {/* Order on */}
        <div style={{ marginBottom: 32 }}>
          <p className="font-body text-[11px] uppercase tracking-[0.2em] text-[#7D7268] text-center mb-3">
            Order on
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <a
              href="https://deliveroo.ae/menu/dubai/jafilia/plumpy-ponchiki-restaurant"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[13px] font-medium bg-[#00CCBC] text-white rounded-full px-4 py-2 transition-opacity hover:opacity-90"
            >
              Deliveroo
            </a>
            <a
              href="https://www.talabat.com/uae/restaurant/711226/plumpy-restaurant-al-wasl"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[13px] font-medium bg-[#FF6A00] text-white rounded-full px-4 py-2 transition-opacity hover:opacity-90"
            >
              Talabat
            </a>
            <a
              href="https://food.careem.com/dubai/plumpy-restaurant"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[13px] font-medium bg-[#3ADBB8] text-white rounded-full px-4 py-2 transition-opacity hover:opacity-90"
            >
              Careem
            </a>
          </div>
        </div>

        {/* Social — Facebook + YouTube only */}
        <div className="flex justify-center gap-5" style={{ marginBottom: 32 }}>
          <a
            href="https://www.facebook.com/PlumpyRestaurant/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-[#7D7268] hover:text-[#2A2218] transition-colors duration-150"
          >
            <svg
              width="22"
              height="22"
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
            href="https://www.youtube.com/@PlumpyRestaurant"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-[#7D7268] hover:text-[#2A2218] transition-colors duration-150"
          >
            <svg
              width="22"
              height="22"
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

        {/* Divider */}
        <div
          className="mx-auto"
          style={{
            height: 1,
            width: 72,
            background: "#EDE8DF",
            marginBottom: 32,
          }}
          aria-hidden="true"
        />

        {/* Closing message — italic Playfair */}
        <div className="text-center" style={{ marginBottom: 32 }}>
          <p
            className="font-display italic text-[#7D7268]"
            style={{ fontSize: "20px", lineHeight: 1.3 }}
          >
            Thank you for choosing Plumpy
          </p>
        </div>

        {/* Copyright */}
        <p className="font-body text-[11px] text-center text-[#C5B9AC]">
          © 2026 Plumpy Restaurant
        </p>
      </div>
    </footer>
  );
}
