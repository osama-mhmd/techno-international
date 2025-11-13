import Image from "next/image";

export default function Nav() {
  return (
    <nav className="absolute top-0 w-full uppercase">
      <div className="max-w-6xl mx-auto flex justify-between px-4 py-8 items-center">
        <Image width={68} height={68} alt="Logo" src="/partial-logo.png" />
        <ul className="flex gap-6 *:flex *:items-center *:gap-2">
          <li>About us</li>
          <li>
            Solutions
            <ThreeBars />
          </li>
          <li>
            Services
            <ThreeBars />
          </li>
          <li>Manufacturing</li>
          <li>Partnerships</li>
          <li>Media centre</li>
          <li>Contact</li>
        </ul>
        <ul className="flex gap-2">
          <li>EN</li>
          <li className="text-[#BCBEC0]">FR</li>
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
      <path d="M24.13 0H0V0.92H24.13V0Z" fill="white" />
      <path d="M24.13 4.65945H0V5.57945H24.13V4.65945Z" fill="white" />
      <path d="M24.13 9.48001H0V10.4H24.13V9.48001Z" fill="white" />
    </svg>
  );
}
