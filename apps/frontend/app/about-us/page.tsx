import Image from "next/image";
import { Button } from "../../components/ui/button";
import Clients from "./clients";

export default function AboutUs() {
  return (
    <main>
      <div className="bg-[url(/about-us.png)] h-[815px] bg-cover">
        <div className="container flex items-end h-full py-10">
          <p className="text-2xl text-[#C3996C] uppercase">{"//"}About us</p>
        </div>
      </div>
      <div className="bg-[url(/about-us-2nd-section.png)] bg-cover pt-20 pb-40 text-black">
        <div className="container">
          <h1>
            GLOBAL LEADERS IN
            <br />
            DEFENSE & SECURITY SOLUTIONS
          </h1>
          <p className="text-3xl font-medium mt-5 max-w-3xl">
            Techno International Group stands as a premier provider of defense
            and security solutions, committed to strengthening national security
            and advancing operational readiness worldwide. We deliver more than
            products — we deliver confidence, resilience, and innovation that
            empower nations to protect their sovereignty and citizens.
          </p>
          <div className="grid grid-cols-2 mt-24 gap-6">
            <div>
              <div className="w-full max-w-2xl h-192 relative bg-[url(/flag.png)] bg-cover bg-center"></div>
            </div>
            <div>
              <p className="text-3xl font-medium mb-14">
                With decades of experience and a robust presence across 30+
                countries, our operations are supported by a global network of
                over 4,000 defense and security experts. From military equipment
                and advanced technologies to strategic consulting and training,
                we offer mission-ready solutions tailored to the unique needs of
                armed forces, law enforcement agencies, and government
                institutions.
              </p>
              <Button>Download company profile</Button>
            </div>
          </div>
        </div>
      </div>
      <Clients />
      <div className="grid grid-cols-2 bg-white text-black">
        <OurVision>
          To reinforce national defense capabilities by delivering
          state-of-the-art military equipment, innovative security solutions,
          and expert consultancy services that safeguard nations and support
          mission success.
        </OurVision>
        <div className="relative h-[960px]">
          <Image
            fill
            alt="Plane"
            className="object-cover object-center"
            src="/our-vision-1.png"
          />
        </div>
        <div className="relative h-[960px]">
          <Image
            fill
            alt="Plane"
            className="object-cover object-right"
            src="/our-vision-2.png"
          />
        </div>
        <OurVision>
          To be recognized as the world’s most trusted defense partner,
          providing advanced solutions that empower military and law enforcement
          agencies, while driving global stability and security.
        </OurVision>
      </div>
    </main>
  );
}

function OurVision({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between p-24">
      <div>
        <h2 className="pb-5">OUR VISION</h2>
        <Image width={68} height={68} alt="Logo" src="/full-logo-black.png" />
      </div>
      <p className="font-medium text-xl mt-5">{children}</p>
    </div>
  );
}
