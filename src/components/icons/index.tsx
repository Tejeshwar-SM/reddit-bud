import {
    FacebookLogoIcon,
    HouseSimpleIcon,
    InstagramLogoIcon,
} from "@phosphor-icons/react";

export const Icons = {
    House: HouseSimpleIcon,
    Facebook: FacebookLogoIcon,
    Instagram: InstagramLogoIcon,
};

export type IconName = keyof typeof Icons;
