import { SVGProps } from "react";

export const SvgIcon = ({
  width,
  height,
  size,
  viewBox,
  children,
  ...props
}: SVGIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox || "0 0 24 24"}
      width={size || width || 24}
      height={size || height || 24}
      {...props}
    >
      {children}
    </svg>
  );
};

export interface SVGIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}