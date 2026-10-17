export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="font-serif text-[1.65rem] tracking-[0.18em]">RAJAL</span>
      <span className="mt-1.5 text-[0.5rem] font-medium tracking-[0.46em]">DISTILLERY</span>
    </span>
  );
}
