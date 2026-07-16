import Image from "next/image";

export function BrandLockup({ className = "" }: { className?: string }) {
  return <span className={`brand-lockup ${className}`}>
    <span className="brand-art brand-logo-art"><Image src="/project-econ-pe-logo.png" alt="" width={1024} height={1024} priority unoptimized /></span>
  </span>;
}
