function DangerTriangle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
       className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21C5.50558 21 2.95666 20.5387 2.54353 18.2033C2.13039 15.8679 4.77383 11.4774 5.58842 10.0285C8.31257 5.18408 10.1637 3 12 3C13.8363 3 15.6874 5.18408 18.4116 10.0285C19.2262 11.4774 21.8696 15.8679 21.4565 18.2033C21.0444 20.5387 18.4944 21 12 21Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.5V12.395"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9955 15.895H12.0045"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export default DangerTriangle;
