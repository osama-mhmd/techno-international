"use client";

import Image from "next/image";
import { Button } from "../components/ui/button";
import Services from "./services";
import Events from "./events";
import { usePageContent } from "../hooks/use-page-content";

export default function Home() {
  const { content } = usePageContent("landing");

  return (
    <main>
      <div className="bg-[url(/landing-page.png)] bg-cover bg-black/25 py-16 bg-blend-multiply">
        <div className="container px-8 h-screen flex flex-col justify-center mx-auto items-start gap-4 max-w-6xl">
          <h1>
            GLOBAL LEADERS IN
            <br />
            DEFENSE & SECURITY SOLUTIONS
          </h1>
          <p className="text-2xl max-w-[40ch]">
            {content("landing_view", "description")}
          </p>
          <Button className="mt-4" arrow="has">
            {content("landing_view", "button_text")}
          </Button>
        </div>
      </div>
      <div>
        <div className="container px-8 mx-auto flex flex-col gap-12 pt-16 pb-32">
          <hr />
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-[40%_60%]">
            <p className="text-secondary text-xl text-center">
              {"//"}
              {content("define_techno", "heading") ?? "DEFINING TECHNO"}
            </p>
            <div>
              <p className="text-3xl sm:text-4xl">
                {content("define_techno", "description")}
              </p>
              <div className="flex items-start flex-col md:flex-row gap-2 mt-6">
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
