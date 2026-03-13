// configs/artcafe-events.ts
import {EventsSectionProps} from "../../components/ui/EventsSection";

export const artCafeEventsConfig: EventsSectionProps = {
    heading: "Upcoming Events",
    subheading:
        "The Art Cafe is a place to show up and be part of what's happening. Events, clubs, and community gatherings happen here regularly.",
    caption: "See what's coming up on the calendar",
    calendarLabel: "View Calendar",
    calendarHref: "/calendar",
    calendarIconSrc: "/icons/calendar.svg",
    accentColor: "artcafe",
    events: [
        {
            date: "06",
            month: "Nov",
            title: "Jholey screening",
            description:
                "From rooftop screenings to zine-making jams, podcast labs to pop-up cafés, Sattya is always in motion.",
            href: "/events/jholey-screening",
        },
        {
            date: "25",
            month: "Oct",
            title: "Children's Photography Workshop",
            description:
                "Does your child hold on to your camera, smart phone and click, click click and never lets go? Do you think he/she has talent in photography and could lean more? Then you should definitely check this out!!",
            href: "/events/childrens-photography-workshop",
        },
        {
            date: "21",
            month: "Nov",
            title: "Environmental Graffiti Workshop",
            description:
                "Come and join us for a day of creative and sustainable activism!",
            href: "/events/environmental-graffiti-workshop",
        },
        {
            date: "2",
            month: "Mar",
            title: "Sustainable Workshop @Hariyo Chowk",
            description:
                "Hariyo Chowk wants to teach you 2 valuable 2 day workshops on sustainable practices that can make your life easier and save you money in Kathmandu!",
            href: "/events/jholey-screening",
        },
    ],
};