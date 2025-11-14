import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const inputVariants = cva(
  "px-3 py-2 inline-flex gap-2 items-center ring-secondary focus:ring-2",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
        outline: "border border-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  ref?: React.ForwardedRef<HTMLInputElement>;
}

const Input = ({ className, variant, ref, ...props }: InputProps) => {
  return (
    <input
      className={cn(inputVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  );
};

Input.displayName = "Button";

export { Input, inputVariants };
