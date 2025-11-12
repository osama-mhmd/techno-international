import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <main>
      <div className="bg-[url(/landing-page.png)] bg-cover bg-black/25 py-16 bg-blend-multiply">
        <div className="container h-screen flex flex-col justify-center mx-auto items-start gap-4 max-w-6xl">
          <h1>
            GLOBAL LEADERS IN <br />
            DEFENSE & SECURITY SOLUTIONS
          </h1>
          <p className="text-2xl max-w-[40ch]">
            Empowering nations with cutting-edge equipment, advanced technology,
            and trusted expertise.
          </p>
          <Button className="mt-4" arrow="has">
            Expolre
          </Button>
        </div>
      </div>
      <div>
        <div className="container mx-auto flex flex-col gap-12 py-16">
          <hr />
          <div className="grid grid-cols-[40%_60%]">
            <p className="text-secondary text-[1.25rem] text-center">
              {"//"}DEFINING TECHNO
            </p>
            <div>
              <p className="text-4xl">
                Techno International Group is a premier provider of defense and
                security solutions, dedicated to enhancing national security and
                operational readiness across the globe. With decades of
                experience and a network of over 4,000 experts across Africa and
                beyond, we deliver comprehensive, mission-ready solutions
                tailored to armed forces, law enforcement agencies, and
                government institutions.
              </p>
              <div className="flex gap-2 mt-6">
                <Button variant="outline" arrow="has">
                  Explore
                </Button>
                <Button variant="outline">Download company profile</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
