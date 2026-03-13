// configs/cowork-sessions.ts
import { SessionsAccordionProps } from "../../components/ui/SessionsAccordion";

export const coworkSessionsConfig: SessionsAccordionProps = {
  heroLine1: "Passes",
  heroLine2: "& Pricing",
  subtext:
    "Cowork is designed to be flexible. Work for a short stretch, stay for the day, or come back regularly. Choose what fits your schedule.",
  footnote: "To reserve a spot in advance, get in touch.",
  starSrc: "/images/star.png",
  accentColor: "text-cowork",
  accentBg: "bg-cowork",
  items: [
    {
      label: "Day Pass",
      content: {
        format: "NPR 500: Full-day use.",
        body: "Includes access to shared desks and call booths during open hours. Available on a first-come basis for walk-ins. Call booths are intended for calls or quiet, focused work.",
        note: "*To reserve a spot in advance, get in touch.",
      },
    },
    {
      label: "Weekly Pass",
      content: {
        format: "NPR 2,000: Daily use for 7 days.",
        body: "Includes access to shared desks and call booths during open hours. Available on a first-come basis for walk-ins. Call booths are intended for calls or quiet, focused work.",
        note: "*To reserve a spot in advance, get in touch.",
      },
    },
    {
      label: "Monthly Pass",
      content: {
        format: "NPR 6,000: Daily use for one month.",
        body: "Includes access to shared desks and call booths during open hours. Available on a first-come basis for walk-ins. Call booths are intended for calls or quiet, focused work.",
        note: "*To reserve a spot in advance, get in touch.",
      },
    },
    {
      label: "Meeting Room",
      content: {
        format:
          "4–6 people: NPR 500 / short stay (up to 2 hours) · NPR 1,500 / day.",
        body: "For meetings, group discussions, or longer calls. Coffee and tea included.",
        note: "*Available for booking in advance.",
      },
    },
    {
      label: "Private Office",
      content: {
        format: "4–6 people: NPR 5,000 / week · NPR 15,000 / month.",
        body: "For small teams or individuals needing a dedicated room. Longer-term use or custom arrangements can be discussed.",
        note: "*Get in touch for custom arrangements.",
      },
    },
  ],
};
