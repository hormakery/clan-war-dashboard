import { SvgProps } from "react-native-svg";

import { Logo } from "./logo";
import { User } from "./user";
import { Error } from "./error";

export const appIcons = {
  logo: Logo,
  user: User,
  error: Error,
};

export type IconType = keyof typeof appIcons

export type IconProps = SvgProps & {
  size?: number;
  name: IconType;
  color?: string;
  isOnlyIcon?: boolean;
};
