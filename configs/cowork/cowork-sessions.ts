// configs/cowork-sessions.ts
import { SessionsAccordionProps } from "../../components/ui/SessionsAccordion";

export const coworkSessionsConfig: SessionsAccordionProps = {
  heroLine1: "Passes",
  heroLine2: "& Pricing",
  subtext:
    "Cowork is designed to be flexible. Work for a short stretch, stay for the day, or come back regularly. Choose what fits your schedule.",
  footnote: "Details on passes, rentals, and current rates are available here.",
  starSrc: "/images/star.png",
  accentColor: "text-cowork",
  accentBg: "bg-cowork",
  items: [
    {
      label: "Short Stay Pass",
      content: {
        format: "",
        body: "For brief work sessions",
        note: "",
      },
    },
    {
      label: "Day Pass",
      content: {
        format: "",
        body: "For a full day of access.",
        note: "",
      },
    },
    {
      label: "Weekly & Monthly Passes",
      content: {
        format: "",
        body: "For regular use.",
        note: "",
      },
    },
    {
      label: "Meeting Room Rental",
      content: {
        format: "",
        body: "For calls, meetings, or small group work.",
        note: "",
      },
    },
    {
      label: "Office Rental",
      content: {
        format: "",
        body: "For small teams needing a dedicated space.",
        note: "",
      },
    },
    {
      label: "Pricing",
      content: {
        format: "",
        body: "Details on passes, rentals, and current rates are available here.",
        note: "→ View passes & pricing (opens a new page: /cowork/pricing )",
      },
    },
  ],
};
