// configs/cowork.ts

import { VibeGridProps } from "../../components/ui/Vibegrid";

export const coworkVibeConfig: VibeGridProps = {
  bgColor: "bg-cowork",
  textColor: "text-white",
  textOpacity: "text-white/90",
  items: [
    {
      icon: "/images/cowork/call-booths.svg",
      title: "Call Booths",
      description: "For meetings and quiet calls.",
    },
    {
      icon: "/images/cowork/messy.svg",
      title: "Flexible Use",
      description: "Short or longer stays.",
    },
    {
      icon: "/images/cowork/meeting-room.svg",
      title: "Meeting Room",
      description: "Space to talk things through.",
    },
    {
      icon: "/images/cowork/stay.svg",
      title: "Kitchenette",
      description: "Space to refresh and recharge.",
    },
    {
      icon: "/images/cowork/desk.svg",
      title: "Desk",
      description: "Shared workspaces for focused days.",
    },
    {
      icon: "/images/cowork/printer.svg",
      title: "Printing",
      description: "Basics available when you need them.",
    },
  ],
  floatingItems: [
    {
      icon: "/images/cowork/spaces_logo.svg",
      alt: "Featured 2",
      position: "top-right",
    },
  ],
};
