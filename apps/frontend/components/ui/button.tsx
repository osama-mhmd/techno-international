import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import ChevronRight from "../icons/chevron-right";

const buttonVariants = cva(
  "px-3 py-2 uppercase cursor-pointer inline-flex gap-2 items-center",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
        outline: "border border-white",
      },
      arrow: {
        default: "",
        has: "gap-2 group",
      },
    },
    defaultVariants: {
      variant: "default",
      arrow: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  ref?: React.ForwardedRef<HTMLButtonElement>;
}

const Button = ({
  className,
  variant,
  arrow,
  children,
  ref,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, className, arrow }))}
      ref={ref}
      {...props}
    >
      {children}
      {arrow == "has" && <ChevronRight />}
    </button>
  );
};

Button.displayName = "Button";

export { Button, buttonVariants };
