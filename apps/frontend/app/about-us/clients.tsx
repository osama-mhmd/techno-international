import Image from "next/image";
import { cn } from "../../lib/utils";

export default function Clients() {
  return (
    <div className="bg-[repeating-linear-gradient(to_right,#6D6E71_0_1px,transparent_1px_415px)]">
      <div className="container grid md:grid-cols-2 px-8 py-20">
        <div>
          <h1>
            OUR CLIENTS
            <br />& PARTNERS
          </h1>
          <p className="font-medium text-3xl mt-5 max-w-2xl">
            Partnerships are the cornerstone of our success. We collaborate with
            governments, ministries of defense, and leading defense
            manufacturers to strengthen security worldwide.
          </p>
        </div>
        <div className="pt-8 md:pt-36">
          <ul>
            <Client name="UK Ministry of defence" className="border-t" />
            <Client name="CÔTE D’IVOIRE MINISTRY OF DEFENCE" />
            <Client name="BURKINA FASO MINISTRY OF DEFENCE" />
            <Client name="CHAD MINISTRY OF DEFENCE" />
            <Client name="JORDAN MINISTRY OF DEFENCE" />
            <Client name="ZAMBIA MINISTRY OF DEFENCE" />
            <Client name="UGANDA MINISTRY OF DEFENCE" expanded={true}>
              Techno International Group partners with the Uganda Ministry of
              Defence to enhance national security and regional stability. We
              provide advanced equipment, strategic consulting, and training
              programs, ensuring Uganda’s armed forces remain prepared and mis
              <Image
                width={104}
                height={104}
                alt="Ughana Ministry of defence"
                src="/ughanda-ministry-of-defence.png"
              />
            </Client>
            <Client name="MALAWI MINISTRY OF DEFENCE" />
            <Client name="AZERSILAH MINISTRY OF DEFENCE" />
            <Client name="TURKISH MILITARY PRODUCTION MINISTRY" />
            <Client name="GHANA MINISTRY OF DEFENCE" />
            <Client name="DEMOCRATIC REPUBLIC OF CONGO MINISTRY OF DEFENCE" />
            <Client name="NIGERIA MINISTRY OF DEFENCE" />
            <Client name="NIGER MINISTRY OF DEFENCE" />
            <Client name="SOUTH AFRICA MINISTRY OF DEFENCE" />
            <Client name="LIBYA MINISTRY OF DEFENCE" />
            <Client name="REPUBLIC OF CENTRAL AFRICA MINISTRY OF DEFENCE" />
          </ul>
        </div>
      </div>
    </div>
  );
}

interface ClientProps {
  name: string;
  className?: string;
  children?: React.ReactNode;
  expanded?: boolean;
}

function Client({ name, className, children, expanded }: ClientProps) {
  return (
    <li className={cn("py-4 border-b border-muted cursor-pointer", className)}>
      <div className="flex gap-4 items-center font-oswald uppercase text-2xl">
        {expanded ? <MinusSign /> : <PlusSign />}
        {name}
      </div>
      {expanded && (
        <div className="text-muted text-xl py-8 flex flex-col gap-7 ps-14">
          {children}
        </div>
      )}
    </li>
  );
}

function PlusSign() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.7803 0V39.57"
        stroke="#808285"
        strokeWidth="0.63"
        strokeMiterlimit="10"
      />
      <path
        d="M39.57 19.79H0"
        stroke="#808285"
        strokeWidth="0.63"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
function MinusSign() {
  return (
    <svg
      width="40"
      height="1"
      viewBox="0 0 40 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.57 0.314941H0"
        stroke="#808285"
        strokeWidth="0.63"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
