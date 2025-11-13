"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import Link from "next/link";

export default function Nav() {
  const pathname = usePathname();

  const inAboutPage = pathname == "/about-us";

  return (
    <nav
      className={cn("absolute top-0 w-full uppercase", {
        "text-black": inAboutPage,
      })}
    >
      <div className="max-w-6xl mx-auto flex justify-between px-4 py-8 items-center">
        <Link href="/">
          {inAboutPage ? (
            <Image width={68} height={68} alt="Logo" src="/full-logo.png" />
          ) : (
            <Image width={68} height={68} alt="Logo" src="/partial-logo.png" />
          )}
        </Link>
        <ul className="flex gap-6 *:flex *:items-center *:gap-2">
          <li>
            <Link href="/about-us">About us</Link>
          </li>
          <li>
            <Link href="#">Solutions</Link>
            <ThreeBars />
          </li>
          <li>
            <Link href="#">Services</Link>
            <ThreeBars />
          </li>
          <li>
            <Link href="#">Manufacturing</Link>
          </li>
          <li>
            <Link href="#">Partnerships</Link>
          </li>
          <li>
            <Link href="#">Media centre</Link>
          </li>
          <li>
            <Link href="#">Contact</Link>
          </li>
        </ul>
        <ul className="flex gap-2">
          <li>EN</li>
          <li className={`text-[${inAboutPage ? "#939598" : "#BCBEC0"}]`}>
            FR
          </li>
        </ul>
      </div>
    </nav>
  );
}

function ThreeBars() {
  return (
    <svg
      width="25"
      height="11"
      viewBox="0 0 25 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M24.13 0H0V0.92H24.13V0Z" fill="currentColor" />
      <path d="M24.13 4.65945H0V5.57945H24.13V4.65945Z" fill="currentColor" />
      <path d="M24.13 9.48001H0V10.4H24.13V9.48001Z" fill="currentColor" />
    </svg>
  );
}
