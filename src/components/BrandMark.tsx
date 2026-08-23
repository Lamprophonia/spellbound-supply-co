export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 100 100" role="img" aria-label="SSC monogram">
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="39" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M50 8v84M8 50h84" stroke="currentColor" strokeWidth="0.8" opacity=".5" />
      <text x="50" y="59" textAnchor="middle" fontSize="29" fontFamily="Georgia, serif" fontWeight="700">
        SSC
      </text>
      <path d="M26 29c8-7 40-7 48 0M26 71c8 7 40 7 48 0" fill="none" stroke="currentColor" />
    </svg>
  )
}
