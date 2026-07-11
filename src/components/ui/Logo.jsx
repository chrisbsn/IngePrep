export default function Logo({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g stroke="#D8DCE3" strokeWidth="1">
        <line x1="12" y1="3" x2="12" y2="29" />
        <line x1="22" y1="3" x2="22" y2="29" />
        <line x1="3" y1="9" x2="29" y2="9" />
        <line x1="3" y1="19" x2="29" y2="19" />
      </g>
      <line
        x1="9"
        y1="23"
        x2="21"
        y2="10"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="9" cy="23" r="2.2" fill="currentColor" />
      <path d="M25 6 L17 8 L23 15 Z" fill="var(--color-coral-500)" />
    </svg>
  )
}
