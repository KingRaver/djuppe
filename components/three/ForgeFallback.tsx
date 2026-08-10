type ForgeFallbackProps = {
  /** Set once the WebGL forge is live, so the two ribbons never show through each other. */
  dimmed?: boolean;
};

export function ForgeFallback({ dimmed = false }: ForgeFallbackProps) {
  return (
    <svg className="hero-static" data-dimmed={dimmed ? "true" : undefined} viewBox="0 0 1000 820" aria-hidden="true">
      <defs>
        <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#25292b" />
          <stop offset="0.35" stopColor="#c3c6c3" />
          <stop offset="0.48" stopColor="#4e5457" />
          <stop offset="0.72" stopColor="#202426" />
          <stop offset="1" stopColor="#777c7d" />
        </linearGradient>
        <linearGradient id="heat" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a593d" />
          <stop offset="0.4" stopColor="#664b6d" />
          <stop offset="0.7" stopColor="#355f7a" />
          <stop offset="1" stopColor="#a8744b" />
        </linearGradient>
        <filter id="shadow"><feGaussianBlur stdDeviation="28" /></filter>
      </defs>
      <ellipse cx="545" cy="677" rx="310" ry="62" fill="#000" opacity=".6" filter="url(#shadow)" />
      <path d="M168 448C118 229 343 91 563 174c171 65 302 284 190 451-95 142-330 65-413-58-91-135 71-314 234-302 137 10 214 150 171 257" stroke="#030404" strokeWidth="112" opacity=".65" transform="translate(18 25)" />
      <path d="M168 448C118 229 343 91 563 174c171 65 302 284 190 451-95 142-330 65-413-58-91-135 71-314 234-302 137 10 214 150 171 257" stroke="url(#steel)" strokeWidth="84" />
      <path d="M337 205c28-19 58-33 90-40" stroke="url(#heat)" strokeWidth="89" opacity=".8" />
      <path d="M699 650c25-13 45-30 61-51" stroke="url(#heat)" strokeWidth="88" opacity=".62" />
      <path d="M168 448C118 229 343 91 563 174c171 65 302 284 190 451-95 142-330 65-413-58-91-135 71-314 234-302 137 10 214 150 171 257" stroke="#ecf0ed" strokeWidth="2" opacity=".45" />
      <path d="M425 164l20 86M696 653l-60-65" stroke="#e4c0a5" strokeWidth="7" opacity=".75" />
    </svg>
  );
}
