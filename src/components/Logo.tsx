export default function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="64" height="64" rx="12" fill="#15110d" />
      <rect x="1" y="1" width="62" height="62" rx="11" stroke="#f5b041" strokeOpacity="0.45" strokeWidth="2" />
      <line x1="14" y1="32" x2="24" y2="32" stroke="#f5b041" strokeWidth="2.5" />
      <line x1="40" y1="32" x2="50" y2="32" stroke="#f5b041" strokeWidth="2.5" />
      <line x1="32" y1="14" x2="32" y2="24" stroke="#f5b041" strokeWidth="2.5" />
      <line x1="32" y1="40" x2="32" y2="50" stroke="#f5b041" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="8" fill="#3a2608" stroke="#f5b041" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="3" fill="#ffd28a" />
      <circle cx="14" cy="32" r="3.5" fill="#15110d" stroke="#ffc766" strokeWidth="2" />
      <circle cx="50" cy="32" r="3.5" fill="#15110d" stroke="#ffc766" strokeWidth="2" />
      <circle cx="32" cy="14" r="3.5" fill="#15110d" stroke="#ffc766" strokeWidth="2" />
      <circle cx="32" cy="50" r="3.5" fill="#15110d" stroke="#ffc766" strokeWidth="2" />
    </svg>
  )
}
