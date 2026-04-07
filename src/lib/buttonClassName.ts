import { cn } from "@/lib/cn";

export type ButtonVariant = "solid" | "soft" | "outline" | "text";
export type ButtonSize = "sm" | "md" | "lg";

const baseClassName =
  "inline-flex items-center justify-center rounded-full border text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variantClassMap: Record<ButtonVariant, string> = {
  solid:
    "border-neutral bg-neutral px-5 py-2.5 text-base-100 hover:bg-neutral/90",
  soft: "border-base-300 bg-base-200 px-5 py-2.5 text-base-content hover:bg-base-300",
  outline:
    "border-base-content/25 bg-transparent px-5 py-2.5 text-base-content hover:bg-base-200",
  text: "border-transparent bg-transparent px-0 py-2 text-base-content underline-offset-4 hover:underline",
};

const sizeClassMap: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5",
  lg: "h-12 px-6 text-base",
};

export function buttonClassName(
  variant: ButtonVariant = "solid",
  size: ButtonSize = "md",
) {
  return cn(baseClassName, variantClassMap[variant], sizeClassMap[size]);
}
