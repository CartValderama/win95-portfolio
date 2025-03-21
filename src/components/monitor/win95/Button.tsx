import { motion } from "framer-motion";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "bg-[#c3c7cb] border border-[#868a8e] border-l-white border-t-white text-black capitalize flex items-center cursor-pointer",
  {
    variants: {
      variant: {
        default: "justify-center px-1",
        tab: "gap-x-[5.5px] px-2",
        ghost:
          "hover:bg-[#000e7a] hover:text-white border-none bg-none px-1 py-1 flex w-full",
        subtle: "hover:bg-white/50 bg-transparent border-none border-b min-w-0",
      },
      size: {
        default: "",
        tab: "min-w-32",
        icon: "border-[1.5px] h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <motion.button
      whileTap={
        variant === "default" || size === "icon"
          ? {
              outline: "1px solid black",
              borderLeftColor: "#868a8e",
              borderTopColor: "#868a8e",
            }
          : undefined
      }
      transition={{ duration: 0 }}
      className={cn(buttonVariants({ variant, size, className }))}
      {...(props as React.ComponentProps<typeof motion.button>)}
    />
  );
}
