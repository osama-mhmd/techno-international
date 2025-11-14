import ChevronRight from "../components/icons/chevron-right";
import { Skeleton } from "../components/ui/skeleton";
import { GetContent } from "../lib/get-content";
import { cn } from "../lib/utils";

export default function Services({
  content,
  isLoading,
}: {
  content: GetContent;
  isLoading: boolean;
}) {
  return (
    <div className="grid xl:grid-cols-[30%_40%_30%] 2xl:grid-cols-[20%_60%_20%] min-h-screen">
      <Service
        title={content("services", "service_1_heading")}
        isLoading={isLoading}
        imgUrl={"solutions"}
      >
        <div className="py-4 text-xl">
          {isLoading && <Skeleton className="w-fulll h-12" />}
          {content("services", "service_1_description")}
        </div>
        <AirLandSea />
      </Service>
      <Service
        title={content("services", "service_2_heading")}
        imgUrl="manufacturing"
        className="bg-right"
        isLoading={isLoading}
      >
        <div className="h-full flex flex-col justify-end py-16 gap-6">
          <AirLandSea />
          <div className="text-4xl font-medium max-w-[24ch]">
            {isLoading && <Skeleton className="w-fulll h-12" />}
            {content("services", "service_2_description")}
          </div>
          <div className="text-[1.35rem] font-medium leading-6 max-w-prose">
            {isLoading && <Skeleton className="w-fulll h-36" />}
            {content("services", "service_2_content")}
          </div>
        </div>
      </Service>
      <Service
        title={content("services", "service_3_heading")}
        imgUrl="logistics"
        isLoading={isLoading}
      >
        <div className="py-4 text-xl">
          {isLoading && <Skeleton className="w-fulll h-12" />}
          {content("services", "service_3_description")}
        </div>
        <AirLandSea />
      </Service>
    </div>
  );
}

function Service({
  title,
  children,
  className,
  imgUrl,
  isLoading,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
  imgUrl: string;
  isLoading?: boolean;
}) {
  return (
    <div
      style={{
        backgroundImage: `url(/services-${imgUrl}.png)`,
      }}
      className={cn(
        `grid grid-rows-[auto_1fr] p-3 xs:p-9 bg-black/35 bg-blend-multiply bg-cover bg-center`,
        className
      )}
    >
      <ServiceHeader isLoading={isLoading} title={title} />
      <div className="flex flex-col h-162 sm:h-132 xl:h-auto">
        <div className="h-full">{children}</div>
        <ServiceExpolre />
      </div>
    </div>
  );
}

function ServiceHeader({
  title,
  isLoading,
}: {
  title: string;
  isLoading?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-bold">
          {title}
          {isLoading && <Skeleton className="w-36 h-12" />}
        </h2>
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
