import Link from "next/link";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const logoVariants = cva("flex items-center shrink-0 select-none relative", {
  variants: {
    size: {
      xs: "h-6 w-auto",
      sm: "h-8 w-auto",
      md: "h-10 w-auto",
      lg: "h-16 w-auto",
      xl: "h-24 w-auto",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface CompanyLogoProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof logoVariants> {}

export default function CompanyLogo({
  className,
  size,
  ...props
}: CompanyLogoProps) {
  return (
    <Link href="/" className={cn(logoVariants({ size, className }))} {...props}>
      <Image
        src="/images/svg/logo.svg"
        alt="Allbrick Pavers' Logo"
        width={200}
        height={200}
        className="h-full w-auto object-contain"
        priority
      />
    </Link>
  );
}
