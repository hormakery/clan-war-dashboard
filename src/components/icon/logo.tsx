import React from "react";
import Svg, {
  Path,
  Defs,
  Stop,
  SvgProps,
  LinearGradient,
} from "react-native-svg";

export const Logo = (props: SvgProps) => (
  <Svg width={113} height={113} fill="none" {...props}>
    <Path
      d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347Z"
      fill="url(#a)"
    />
    <Path
      d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347Z"
      fill="url(#b)"
      fillOpacity={0.2}
    />
    <Path
      d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.072Z"
      fill="#fcdf99"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={53.974}
        y1={54.974}
        x2={94.163}
        y2={71.829}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#a88761" />
        <Stop offset={1} stopColor="#fcdf99" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={36.156}
        y1={30.578}
        x2={54.484}
        y2={65.081}
        gradientUnits="userSpaceOnUse"
      >
        <Stop />
        <Stop offset={1} stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);