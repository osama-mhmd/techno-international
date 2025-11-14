import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

const reveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function SlideFade({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal
      className={className}
      cascade
      keyframes={reveal}
      duration={500}
      triggerOnce
    >
      {children}
    </Reveal>
  );
}
