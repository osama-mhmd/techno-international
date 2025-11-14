"use client";

import Image from "next/image";
import { Button } from "../components/ui/button";
import Services from "./services";
import Events from "./events";
import { usePageContent } from "../hooks/use-page-content";
import SlideFade from "../components/slide-fade";
import { Skeleton } from "../components/ui/skeleton";

export default function Home() {
  const { content, isLoading } = usePageContent("landing");

  return (
    <main>
      <div className="bg-[url(/landing-page.png)] bg-cover bg-black/25 py-16 bg-blend-multiply">
        <div className="container px-8 h-screen flex flex-col justify-center mx-auto items-start gap-4 max-w-6xl">
          <SlideFade>
            <h1>
              GLOBAL LEADERS IN
              <br />
              DEFENSE & SECURITY SOLUTIONS
            </h1>
          </SlideFade>
          <div className="text-2xl max-w-[40ch]">
            {isLoading && <Skeleton className="w-96 h-12" />}
            {content("landing_view", "description")}
          </div>
          <Button className="mt-4" arrow="has">
            {isLoading && "Explore"}
            {content("landing_view", "button_text")}
          </Button>
        </div>
      </div>
      <div>
        <div className="container px-8 mx-auto flex flex-col gap-12 pt-16 pb-32">
          <hr />
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-[40%_60%]">
            <p className="text-secondary text-xl text-center uppercase">
              {"//"}
              {isLoading && "Defining techno"}
              {content("define_techno", "heading") ?? "DEFINING TECHNO"}
            </p>
            <div>
              <div className="text-3xl sm:text-4xl">
                {isLoading && <Skeleton className="w-full h-96" />}
                {content("define_techno", "description")}
              </div>
              <div className="flex items-start md:items-center flex-col md:flex-row gap-2 mt-6">
                <Button variant="outline" arrow="has">
                  Explore
                </Button>
                <Button variant="outline">Download company profile</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Services content={content} />
      <div className="px-14 py-14 bg-[url(/search.png)] bg-cover bg-center">
        <div className="flex justify-between">
          <div>
            <h1>
              Search the
              <br />
              Techno network
            </h1>
            <p className="mt-4 text-xl">
              A global defense and security group shaping
              <br />
              tomorrow across land, air, and sea.
            </p>
          </div>
          <div>
            <Image width={140} height={140} src="/full-logo.png" alt="Logo" />
          </div>
        </div>
        <div className="mt-72 relative">
          <input
            type="text"
            className="w-full border-0 border-b text-xl py-5 bg-transparent border-[#58595B] focus:outline-0 focus:border-white"
            placeholder={content("search", "placeholder")}
          />
          <span className="absolute right-1 bottom-2 select-none underline text-2xl font-oswald">
            {content("search", "button_text")}
          </span>
        </div>
      </div>
      <Events />
    </main>
  );
}
