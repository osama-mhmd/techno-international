import { Button } from "../components/ui/button";

export default function Footer() {
  return (
    <footer
      className="pt-32 pb-40 flex flex-col text-center items-center bg-[url(/footer.png)] bg-contain bg-bottom"
      style={{
        backgroundOrigin: "content-box",
        backgroundRepeat: "no-repeat",
      }}
    >
      <p className="font-bold text-[1.75rem] text-muted pb-5">Contact</p>
      <p className="text-4xl font-oswald">
        LET’S SHAPE THE FUTURE
        <br />
        OF DEFENSE TOGETHER.
      </p>
      <p className="underline pt-16 pb-10">info@technoig.com</p>
      <p className="underline px-4">
        Offices in Egypt, UAE, Hungary, South Africa, Central Africa
      </p>
      <p className="underline pb-16">+207 29801663</p>
      <Button variant="outline" arrow="has">
        Get in touch
      </Button>
    </footer>
  );
}
