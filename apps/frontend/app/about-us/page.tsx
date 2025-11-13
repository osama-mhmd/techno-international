import Image from "next/image";
import { Button } from "../../components/ui/button";
import Clients from "./clients";

export default function AboutUs() {
  return (
    <main>
      <div className="bg-[url(/about-us.png)] h-[815px] bg-cover">
        <div className="container flex items-end h-full py-10">
          <p className="text-2xl text-secondary uppercase">{"//"}About us</p>
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
      <div className="bg-[#F1F2F2] text-black">
        <div className="container pt-28 pb-44">
          <p className="text-xl text-secondary">{"//"}CORE VALUES</p>
          <p className="font-medium text-4xl pt-2.5 pb-20">
            At Techno International Group, our work is guided by a set of non-
            negotiable values that define who we are and how we serve.
          </p>
          <div className="flex gap-y-4 justify-between flex-wrap">
            <CoreValue
              title="INTEGRITY"
              description="We uphold the highest ethical standards and ensure full compliance with international regulations."
            />
            <CoreValue
              title="INNOVATION"
              description="We harness cutting-edge technologies to deliver superior defense capabilities."
            />
            <CoreValue
              title="COMMITMENT"
              description="We are dedicated to meeting the evolving needs of our partners with professionalism and precision."
            />
            <CoreValue
              title="EXCELLENCE"
              description="We strive for unmatched quality in every product, service, and collaboration."
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[20%_10%_70%] grid-rows-[780px]">
        <div className="uppercase font-oswald text-center text-3xl p-16 bg-[url(/global-presence-1.png)] bg-cover bg-bottom">
          Global presence
        </div>
        <div className="flex items-end justify-center bg-white p-6 py-8">
          <svg
            width="133"
            height="133"
            viewBox="0 0 133 133"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 5.2998H127.06V132.36"
              stroke="#231F20"
              strokeWidth="10.6"
              strokeMiterlimit="10"
            />
            <path
              d="M6.02051 126.34L127.061 5.2998"
              stroke="#231F20"
              strokeWidth="10.6"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
        <div className="relative bg-[url(/global-presence-2.png)] bg-cover"></div>
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

function CoreValue({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border-t max-w-80">
      <p className="text-3xl font-oswald pt-4 pb-2.5">{title}</p>
      <p className="text-[#808285] font-medium text-2xl">{description}</p>
    </div>
  );
}
