import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "editorial";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  editorial: "max-w-editorial",
};

export function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  size = "lg",
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn("container-editorial", sizeClasses[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
