import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "@/lib/buttonClassName";
import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant, size, ...props }, ref) {
    return (
      <button
        className={cn(buttonClassName(variant, size), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
