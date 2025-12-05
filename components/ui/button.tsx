import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "rounded-md bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "rounded-md bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "rounded-md border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "rounded-md hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        classic:
          "text-white bg-gradient-to-b from-[#0091ff] to-[#0081f1] hover:from-[#0081f1] hover:to-[#006adc] rounded-[4px] border border-[#0080f180] shadow-[inset_0_0.5px_0_0.5px_rgba(255,255,255,0.25),inset_0_-1px_0_0_rgba(0,0,0,0.15),0_1px_2px_0_rgba(0,0,0,0.15)] active:shadow-[inset_0_0.5px_0_0.5px_rgba(255,255,255,0.25),inset_0_-1px_0_0_rgba(0,0,0,0.15)]",
        berkeley:
          "text-white bg-[#003262] hover:bg-[#00254a] rounded-md font-semibold shadow-sm hover:shadow-md transition-all",
        gold:
          "text-[#003262] bg-[#FDB515] hover:bg-[#e5a313] rounded-md font-semibold shadow-sm hover:shadow-md transition-all",
        grass:
          "text-white bg-gradient-to-b from-[#2e8e40] to-[#1c8033] hover:from-[#1c8033] hover:to-[#1a7f31] rounded-[4px] border border-[#49ff6b86] shadow-[inset_0_0.5px_0_0.5px_rgba(255,255,255,0.25),inset_0_-1px_0_0_rgba(0,0,0,0.15),0_1px_2px_0_rgba(0,0,0,0.15)] active:shadow-[inset_0_0.5px_0_0.5px_rgba(255,255,255,0.25),inset_0_-1px_0_0_rgba(0,0,0,0.15)]",
        minecraft: "minecraft-button rounded-none !transition-none",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        xl: "h-12 px-8 has-[>svg]:px-5",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
