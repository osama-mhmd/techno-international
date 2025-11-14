import ChevronRight from "../components/icons/chevron-right";
import { GetContent } from "../lib/get-content";
import { cn } from "../lib/utils";

export default function Services({ content }: { content: GetContent }) {
  return (
    <div className="grid xl:grid-cols-[30%_40%_30%] 2xl:grid-cols-[20%_60%_20%] min-h-screen">
      <Service title={content("services", "service_1_heading") ?? "solutions"}>
        <p className="py-4 text-xl">
          {content("services", "service_1_description") ??
            "PROVEN POWER. BATTLE-TESTED SOLUTIONS."}
        </p>
        <AirLandSea />
      </Service>
      <Service title="manufacturing" className="bg-right">
        <div className="h-full flex flex-col justify-end py-16 gap-6">
          <AirLandSea />
          <p className="text-4xl font-medium">
            BUILT FROM PRECISION. <br />
            FORGED FOR PERFORMANCE.
          </p>
          <p className="text-[1.35rem] font-medium leading-6 max-w-prose">
            Techno Logistics ensures that every mission moves without
            hesitation. Through seamless coordination, global reach, and
            military-grade efficiency, we deliver equipment, maintenance, and
            support — wherever the mission demands. From the factory floor to
            the frontline, we make readiness a constant.
          </p>
        </div>
      </Service>
      <Service title="logistics">
        <p className="py-4 text-xl">ENGINEERED FOR UNINTERRUPTED SUPPLY.</p>
        <AirLandSea />
      </Service>
    </div>
  );
}

function Service({
  title,
  children,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      style={{
        backgroundImage: `url(/services-${title}.png)`,
      }}
      className={cn(
        `grid grid-rows-[auto_1fr] p-9 bg-black/35 bg-blend-multiply bg-cover bg-center`,
        className
      )}
    >
      <ServiceHeader title={title} />
      <div className="flex flex-col h-162 sm:h-132 xl:h-auto">
        <div className="h-full">{children}</div>
        <ServiceExpolre />
      </div>
    </div>
  );
}

function ServiceHeader({ title }: { title: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-bold">{title}</h2>
        <ChevronRight size={50} />
      </div>
      <hr />
    </div>
  );
}

function AirLandSea() {
  return (
    <div className="uppercase font-oswald border *:not-last:border-r *:inline-block *:p-1.5 *:px-2 w-fit">
      <div>Air</div>
      <div>Land</div>
      <div>Sea</div>
    </div>
  );
}

function ServiceExpolre() {
  return (
    <button className="cursor-pointer text-2xl flex items-center gap-4">
      EXPLORE
      <ChevronRight size={35} />
    </button>
  );
}
