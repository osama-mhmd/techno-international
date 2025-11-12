import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "px-3 py-2 uppercase cursor-pointer inline-flex gap-2 items-center",
  {
    variants: {
      variant: {
        default: "bg-black",
        destructive: "bg--destructive/90",
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
      {arrow == "has" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={25}
          height={25}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m8.59 18.16l5.66-5.66l-5.66-5.66l-.7.71l4.95 4.95l-4.95 4.95z"
          ></path>
        </svg>
      )}
    </button>
  );
};

Button.displayName = "Button";

export { Button, buttonVariants };
