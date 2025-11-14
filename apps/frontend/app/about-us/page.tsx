"use client";

import Image from "next/image";
import { Button } from "../../components/ui/button";
import Clients from "./clients";
import { usePageContent } from "../../hooks/use-page-content";
import SlideFade from "../../components/slide-fade";
import { Skeleton } from "../../components/ui/skeleton";

export default function AboutUs() {
  const { content, isLoading } = usePageContent("about_us");

  return (
    <main>
      <div className="bg-[url(/about-us.png)] h-[815px] bg-cover">
        <div className="container px-8 flex items-end h-full py-10">
          <p className="text-2xl text-secondary uppercase">{"//"}About us</p>
        </div>
      </div>
      <div className="bg-[url(/about-us-2nd-section.png)] bg-cover brightness-110 bg-left pt-20 pb-40 text-black">
        <div className="container px-8">
          <h1>
            GLOBAL LEADERS IN
            <br />
            DEFENSE & SECURITY SOLUTIONS
          </h1>
          <div className="text-3xl font-medium mt-5 w-full max-w-3xl">
            {content("team", "description")}
            {isLoading && <Skeleton className="w-full h-24" />}
          </div>
          <div className="grid md:grid-cols-2 md:mt-24 gap-6">
            <div>
              <div className="w-full max-w-2xl h-132 lg:h-192 relative bg-[url(/flag.png)] bg-no-repeat bg-bottom bg-size-[175%] md:bg-size-[225%]"></div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-medium mb-6 lg:mb-14">
                {content("team", "image_caption")}
                {isLoading && <Skeleton className="w-full h-162" />}
              </div>
              <Button>Download company profile</Button>
            </div>
          </div>
        </div>
      </div>
      <Clients />
      <div className="grid sm:grid-cols-2 bg-white text-black">
        <OurVision>
          {content("vision", "vision_1")}
          {isLoading && <Skeleton className="w-full h-36" />}
        </OurVision>
        <div className="relative h-[960px]">
          <Image
            fill
            alt="Plane"
            className="object-cover object-center"
            src="/our-vision-1.png"
          />
        </div>
        <div className="relative h-[960px] row-start-4 sm:row-start-auto">
          <Image
            fill
            alt="Plane"
            className="object-cover object-right"
            src="/our-vision-2.png"
          />
        </div>
        <OurVision>
          {content("vision", "vision_1")}
          {isLoading && <Skeleton className="w-full h-36" />}
        </OurVision>
      </div>
      <div className="bg-[#F1F2F2] text-black">
        <div className="container px-8 pt-28 pb-44">
          <p className="text-xl text-secondary">{"//"}CORE VALUES</p>
          <p className="font-medium text-4xl pt-2.5 pb-20">
            At Techno International Group, our work is guided by a set of non-
            negotiable values that define who we are and how we serve.
          </p>
          <div className="flex gap-y-4 justify-between flex-wrap">
            <SlideFade>
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
            </SlideFade>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[20%_10%_70%] grid-rows-[200px_200px_200px] sm:grid-rows-[780px]">
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
      <div>
        <div className="container px-8 pt-24 pb-64">
          <div className="flex flex-wrap gap-y-8 justify-between gap-4">
            <SlideFade>
              <div>
                <h1>
                  COMPLIANCE &<br />
                  QUALITY ASSURANCE
                </h1>
                <div className="font-medium text-3xl pt-5 max-w-2xl">
                  {content("compliance", "description")}
                  {isLoading && <Skeleton className="w-full h-24" />}
                </div>
              </div>
            </SlideFade>
            <div>
              <Image width={150} height={150} alt="Logo" src="/full-logo.png" />
            </div>
          </div>
          <hr className="my-16 border-muted" />
          <div className="grid lg:grid-cols-2 gap-6">
            <Image
              width={860}
              height={490}
              alt="A photo of a solider explaining the mission for the team"
              src="/compliance-and-quality-assurance.png"
            />
            <SlideFade>
              <div className="flex flex-col justify-between items-start">
                <div className="text-3xl w-full pb-4 font-medium">
                  {content("compliance", "image_caption")}
                  {isLoading && <Skeleton className="w-full h-42" />}
                </div>
                <Button variant="outline">Download company profile</Button>
              </div>
            </SlideFade>
          </div>
        </div>
      </div>
    </main>
  );
}

function OurVision({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between p-12 sm:p-24">
      <div>
        <h2 className="pb-5">OUR VISION</h2>
        <Image width={68} height={68} alt="Logo" src="/full-logo-black.png" />
      </div>
      <div className="font-medium text-xl mt-5">{children}</div>
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
      <p className="text-muted font-medium text-2xl">{description}</p>
    </div>
  );
}
