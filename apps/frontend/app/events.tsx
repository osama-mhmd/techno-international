import Image from "next/image";
import SlideFade from "../components/slide-fade";
import { GetContent } from "../lib/get-content";
import { Skeleton } from "../components/ui/skeleton";

export default function Events({
  content,
  isLoading,
}: {
  content: GetContent;
  isLoading: boolean;
}) {
  return (
    <div className="bg-[#F1F2F2] text-black bg-[repeating-linear-gradient(to_right,#e5e5e5_0_1px,transparent_1px_415px)]">
      <SlideFade>
        <div className="container px-8 pt-32">
          <span className="text-sm text-secondary uppercase leading-0">
            {"//"}Media centre
          </span>
          <p className="text-xl mb-8 uppercase">Industry events</p>
          <div className="text-3xl pb-48">
            {isLoading && <Skeleton className="w-full max-w-xl h-36" />}
            {content("events", "events_introduction")}
          </div>
          <hr />
        </div>
      </SlideFade>

      <div className="py-16">
        <Event
          isLoading={isLoading}
          title={content("events", "event_1_title")}
          description={content("events", "event_1_description")}
          eventName="egypt-airshow"
          imgsAlts={[
            "Some planes making a show in the sky",
            "Some planes in the airport",
          ]}
        />
        <Event
          isLoading={isLoading}
          title={content("events", "event_2_title")}
          description={content("events", "event_2_description")}
          eventName="egypt-defence-expo-2023"
          logoOffset={false}
          imgsAlts={[
            "A car with a gun made by Techno",
            "A car with a rocket launcher made by Techno",
          ]}
        />
        <Event
          title={content("events", "event_3_title")}
          description={content("events", "event_3_description")}
          eventName="egypt-defence-expo-2021"
          imgsAlts={[
            "A drone made by Amstone",
            "A prototype for a plane made by Amstone",
          ]}
          isLoading={isLoading}
        />
      </div>
      <SlideFade>
        <div className="container px-8 pb-44">
          <hr />
          <div className="flex flex-col xs:flex-row pt-16 gap-4 font-oswald">
            <Image
              width={182}
              height={182}
              alt="Egypt defence expo 2025"
              src="/egypt-defence-expo-2025-event.png"
              className="-translate-x-2 -translate-y-6"
            />
            <div>
              <p className="text-xl">LEADING THE FUTURE OF DEFENSE</p>
              <p className="text-6xl sm:text-8xl xs:mt-8">AT EDEX 2025.</p>
            </div>
          </div>
          <div className="text-2xl xs:text-4xl font-medium py-10 max-w-6xl">
            {isLoading && <Skeleton className="w-full h-96" />}
            {content("events", "edex_2025_topic")}
          </div>
          <p className="text-4xl text-secondary underline">
            VISIT US AT
            <br />
            BOOTH 14 - HALL 3
          </p>
        </div>
      </SlideFade>
    </div>
  );
}

interface EventProps {
  title: string;
  description: string;
  eventName: string;
  logoOffset?: boolean;
  imgsAlts: string[];
  isLoading: boolean;
}

function Event({
  title,
  description,
  eventName,
  logoOffset = true,
  imgsAlts,
  isLoading,
}: EventProps) {
  return (
    <SlideFade>
      <div className="container-left grid grid-cols-1 md:grid-cols-2 mb-28">
        <div className="flex flex-col items-start justify-between mb-8">
          <div>
            <div className="text-lg font-bold">
              {isLoading && <Skeleton className="w-36 h-6" />}
              {title}
            </div>
            <div className="text-muted font-medium max-w-sm pt-3 pb-2">
              {isLoading && <Skeleton className="w-full h-36" />}
              {description}
            </div>
            <Image
              width={185}
              height={100}
              alt="Event logo"
              src={`/${eventName}-event.png`}
              className={logoOffset ? "-translate-x-2.5" : ""}
            />
          </div>
          <button className="uppercase underline flex items-center gap-2 font-bold mt-8 lg:mt-0 cursor-pointer">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.940964 0.35498H9.44097V8.85504"
                stroke="#C3996C"
                strokeWidth="0.71"
                strokeMiterlimit="10"
              />
              <path
                d="M0.251022 9.54498L9.44102 0.35498"
                stroke="#C3996C"
                strokeWidth="0.71"
                strokeMiterlimit="10"
              />
            </svg>
            Visit full event details
          </button>
        </div>

        <div className="overflow-x-auto flex gap-3 pb-10 image-scrollbar">
          <div className="min-w-xl h-80 relative">
            <Image
              fill
              alt={`Event attachment - ${imgsAlts[0]}`}
              src={`/${eventName}-event-1.png`}
              className="shrink-0 object-cover"
            />
          </div>
          <div className="min-w-xl h-80 relative">
            <Image
              fill
              alt={`Event attachment - ${imgsAlts[1]}`}
              src={`/${eventName}-event-2.png`}
              className="shrink-0 object-cover"
            />
          </div>
        </div>
      </div>
    </SlideFade>
  );
}
