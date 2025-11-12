import { Button } from "../components/ui/button";

export default function Home() {
  return (
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
  );
}
