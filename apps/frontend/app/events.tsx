import Image from "next/image";

export default function Events() {
  return (
    <div className="bg-[#F1F2F2] text-black bg-[repeating-linear-gradient(to_right,#e5e5e5_0_1px,transparent_1px_415px)]">
      <div className="container px-8 pt-32">
        <span className="text-sm text-secondary uppercase leading-0">
          {"//"}Media centre
        </span>
        <p className="text-xl mb-8 uppercase">Industry events</p>
        <p className="text-3xl pb-48">
          At Techno International Group, we believe that leadership in defense
          and security extends beyond delivering equipment and expertise — it’s
          about being at the heart of global conversations that shape the future
          of defense. That’s why we actively participat
        </p>
        <hr />
      </div>

      <div className="py-16">
        <Event
          title="International Airshows & Defense Summits – 2024"
          description="Actively present at global airshows, Techno showcases advanced aircraft, UAV, and drone solutions while forging strategic international partnerships."
          eventName="egypt-airshow"
        />
        <Event
          title="Egypt Defense Expo (EDEX) – 2023"
          description="Showcasing advanced defense innovations at EDEX, reinforcing our commitment to regional partners across Africa and the Middle East."
          eventName="egypt-defence-expo-2023"
          logoOffset={false}
        />
        <Event
          title="Egypt Defense Expo (EDEX) – 2021"
          description="Showcasing advanced defense innovations at EDEX, reinforcing our commitment to regional partners across Africa and the Middle East."
          eventName="egypt-defence-expo-2021"
        />
      </div>
      <div className="container px-8 pb-44">
        <hr />
        <div className="flex pt-16 gap-4 font-oswald">
          <Image
            width={182}
            height={182}
            alt="Egypt defence expo 2025"
            src="/egypt-defence-expo-2025-event.png"
            className="-translate-x-2 -translate-y-6"
          />
          <div>
            <p className="text-xl">LEADING THE FUTURE OF DEFENSE</p>
            <p className="text-6xl sm:text-8xl mt-8">AT EDEX 2025.</p>
          </div>
        </div>
        <p className="text-4xl font-medium py-10 max-w-6xl">
          This year, Techno proudly joins the region’s most influential defense
          exhibition — EDEX 2025 — as a headline sponsor and strategic partner.
          Across a commanding presence of over 1,400 sqm, we unveil our latest
          advancements spanning land, air, and sea. From next-generation armored
          vehicles to autonomous aerial systems and maritime innovations, Techno
          reaffirms its commitment to powering global defense and regional
          readiness.
        </p>
        <p className="text-4xl text-secondary underline">
          VISIT US AT
          <br />
          BOOTH 14 - HALL 3
        </p>
      </div>
    </div>
  );
}

interface EventProps {
  title: string;
  description: string;
  eventName: string;
  logoOffset?: boolean;
}

function Event({
  title,
  description,
  eventName,
  logoOffset = true,
}: EventProps) {
  return (
    <div className="container-left grid grid-cols-1 md:grid-cols-2 mb-28">
      <div className="flex flex-col justify-between mb-8">
        <div>
          <p className="text-lg font-bold">{title}</p>
          <p className="text-muted font-medium max-w-sm pt-3 pb-2">
            {description}
          </p>
          <Image
            width={185}
            height={100}
            alt="Event logo"
            src={`/${eventName}-event.png`}
            className={logoOffset ? "-translate-x-2.5" : ""}
          />
        </div>
        <p className="uppercase underline flex items-center gap-2 font-bold mt-8 lg:mt-0">
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
        </p>
      </div>

      <div className="overflow-x-auto flex gap-3 pb-10 image-scrollbar">
        <div className="min-w-xl h-80 relative">
          <Image
            fill
            alt="Event attachment - some planes flying in the sky"
            src={`/${eventName}-event-1.png`}
            className="shrink-0 object-cover"
          />
        </div>
        <div className="min-w-xl h-80 relative">
          <Image
            fill
            alt="Event attachment - some planes lying on the ground"
            src={`/${eventName}-event-2.png`}
            className="shrink-0 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
