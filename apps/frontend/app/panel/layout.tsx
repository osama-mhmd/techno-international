import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Panel",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <Link href="/" className="flex items-center gap-4">
          <Image src="/partial-logo.png" width={50} height={50} alt="Logo" />
          <h3 className="text-center text-2xl">Admin Panel</h3>
          <Image src="/partial-logo.png" width={50} height={50} alt="Logo" />
        </Link>
      </div>
      {children}
    </div>
  );
}
