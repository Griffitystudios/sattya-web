// // configs/stay/properties.ts
import { PropertyBookingProps } from "../../components/sections/stay/PropertyBooking";

const sharedAmenities = [
    { icon: "wifi", label: "Fast WiFi ~390 Mbps" },
    { icon: "power", label: "Power backup" },
    { icon: "shower", label: "Reliable hot water" },
    { icon: "washer", label: "Washing machine" },
    { icon: "kitchen", label: "Well-equipped kitchen" },
    { icon: "balcony", label: "Three balconies/terraces" },
    { icon: "parking", label: "Secure parking" },
    { icon: "cleaning", label: "Shared space cleaning included" },
    { icon: "cafe", label: "Art Cafe next door" },
    { icon: "cowork", label: "Coworking next door" },
    { icon: "makerspace", label: "Makerspace next door" },
    { icon: "lock", label: "Secure building" },
];
const allRooms = [
    {
        name: "Marigold Room",
        subtitle: "Master Bedroom",
        bed: "Queen bed (60 × 78 in)",
        bathroom: "Private bathroom",
        size: "152 sq ft (14.1 sq m)",
        description: "Built-in closets and small desk space. A comfortable option for longer stays.",
    },
    {
        name: "Tulsi Room",
        subtitle: "Mid-Sized Room",
        bed: "Queen bed (60 × 78 in)",
        bathroom: "Shared bathroom",
        size: "110 sq ft (10.2 sq m)",
        description: "Built-in storage. A good balance of space and value.",
    },
    {
        name: "Aasha Room",
        subtitle: "Small Room",
        bed: "Double bed (53 × 74 in)",
        bathroom: "Shared bathroom",
        size: "90 sq ft (8.4 sq m)",
        description: "Best suited for one person (can fit two). A compact, affordable option.",
    },
];

const sharedNotes = [
    "Utilities, Wi-Fi, and shared space cleaning are all included — no extra monthly costs.",
    "Private room cleaning is available if you want it.",
    "If you end up staying longer, we can adjust things once you're settled in.",
    "Your stay directly supports Sattya and the creative work happening next door.",
    "The apartment is on the second floor — there is no elevator.",
    "Occasional power cuts are normal in Nepal. The building has backup power with lighting and a charging point in each room. Wi-Fi continues to work during outages.",
    "To keep the shared living dynamic comfortable, stays begin with a maximum of one month. Longer stays are very welcome once it feels like a good fit.",
];

const sharedGoodFor = [
    "Are in Kathmandu for a few weeks or longer.",
    "Work remotely or want a steady, comfortable base.",
    "Are artists, creatives, researchers, filmmakers, or community-minded.",
    "Enjoy having their own space, but don't mind shared living.",
    "Are easygoing, respectful, and open to a bit of conversation or connection.",
    "Might drop into the cafe, a workshop, or just spend time around Sattya.",
];

const neighborhoodSection = {
    title: "Location & Neighborhood",
    content: `Located in the popular neighborhood of Jawalakhel, between Sattya Media Arts Collective and Alliance Française. The area is lively and walkable, with restaurants, cafes, music venues, grocery stores, boutique food shops, and a great gym nearby.

Next door is Sattya Media Arts Collective, with coworking, an art cafe, makerspace, events, film screenings, and workshops. You're welcome to drop by if something is happening — with no expectation to participate.

A local Nepali spot across the street for affordable dal bhat and snacks. From morning yoga to late-night nightlife, there's plenty to explore.`,
};

const guestAccessShared = {
    title: "Guest Access",
    content: `Guests have their own private bedroom and are welcome to use all shared areas of the apartment, including the living room, dining area, kitchen, balconies or terraces, and laundry facilities.

The apartment is shared with a small number of other residents. Shared spaces are meant to be used comfortably and with consideration for everyone.

You're free to come and go as you like, and to treat the apartment as a relaxed home base during your stay.`,
};

export const properties: Record<string, PropertyBookingProps> = {

    "large-room": {
        name: "Marigold Room",
        badge: "Single Room",
        tagline: "master bedroom at sattya",
        description: "The largest bedroom in a shared three-bedroom apartment in central Jawalakhel, right next door to Sattya Media Arts Collective. Queen bed, private bathroom, built-in closets, and a small desk. A comfortable base for guests who want to settle into Kathmandu while staying loosely connected to creative work and community.",
        iframeSrc: "https://booking.hospitable.com/widget/a1544d7d-18eb-4731-9904-40596caf07be/2206868",
        location: "Jawalakhel, Lalitpur, Kathmandu",
        size: "152 sq ft (14.1 sq m)",
        maxGuests: 2,
        bedrooms: 1,
        bathrooms: 1,
        images: ["/images/stay/img1.png", "/images/stay/img2.png", "/images/stay/img3.png", "/images/stay/img3.png", "/images/stay/img3.png"],
        rooms: [allRooms[0]],
        amenities: [
            { icon: "bathroom_private", label: "Private bathroom" },
            { icon: "closet", label: "Built-in closets" },
            { icon: "desk", label: "Desk space" },
            ...sharedAmenities,
        ],
        sections: [
            {
                title: "The Space",
                content: `The Marigold Room includes a queen bed (60 × 78 in), built-in closet storage, a small desk area, and a private bathroom. The room offers about 152 sq ft (14.1 sq m) of floor space, not including the bathroom or built-in storage.

As the largest bedroom in the apartment, it offers extra space and privacy within the shared home.

Guests share generous common spaces, including a cozy living room, large dining area, well-equipped kitchen, washing machine, and three balconies. Shared areas are cleaned regularly. The apartment has a lived-in, welcoming feel and is located on the second floor of a new, well-managed building.`,
            },
            neighborhoodSection,
            guestAccessShared,
        ],
        notes: sharedNotes,
        goodFor: sharedGoodFor,
    },

    "mid-size-room": {
        name: "Tulsi Room",
        badge: "Single Room",
        tagline: "mid-sized room at sattya",
        description: "A comfortable bedroom in a shared three-bedroom apartment in central Jawalakhel, right next door to Sattya Media Arts Collective. Queen bed, built-in storage, and a shared bathroom — shared with only one other room and cleaned daily.",
        iframeSrc: "https://booking.hospitable.com/widget/a1544d7d-18eb-4731-9904-40596caf07be/2206870",
        location: "Jawalakhel, Lalitpur, Kathmandu",
        size: "110 sq ft (10.2 sq m)",
        maxGuests: 2,
        bedrooms: 1,
        bathrooms: 1,
        images: ["/images/stay/img1.png", "/images/stay/img2.png", "/images/stay/img3.png", "/images/stay/img3.png", "/images/stay/img3.png"],
        rooms: [allRooms[1]],
        amenities: [
            { icon: "shower", label: "Shared bathroom (1 other room)" },
            { icon: "closet", label: "Built-in storage" },
            { icon: "desk", label: "Small desk area" },
            ...sharedAmenities,
        ],
        sections: [
            {
                title: "The Space",
                content: `The Tulsi Room includes a queen bed (60 × 78 in), built-in closet storage, a small desk area, and access to a shared bathroom located right next door. The bathroom is shared with only one other room and is cleaned daily. The room offers about 110 sq ft (10.2 sq m) of floor space, not including built-in storage.

Guests share generous common spaces, including a cozy living room, large dining area, well-equipped kitchen, washing machine, and three balconies. Shared areas are cleaned regularly. The apartment has a lived-in, welcoming feel and is located on the second floor of a new, well-managed building.`,
            },
            neighborhoodSection,
            guestAccessShared,
        ],
        notes: sharedNotes,
        goodFor: sharedGoodFor,
    },

    "small-room": {
        name: "Aasha Room",
        badge: "Single Room",
        tagline: "cozy room at sattya",
        description: "A compact, affordable private room within the Sattya Apartment. Double bed, best suited for one person (can fit two). Shared bathroom with one other room. The most affordable option for solo stays in Jawalakhel.",
        iframeSrc: "https://booking.hospitable.com/widget/a1544d7d-18eb-4731-9904-40596caf07be/2206872",
        location: "Jawalakhel, Lalitpur, Kathmandu",
        size: "90 sq ft (8.4 sq m)",
        maxGuests: 2,
        bedrooms: 1,
        bathrooms: 1,
        images: ["/images/stay/img1.png", "/images/stay/img2.png", "/images/stay/img3.png", "/images/stay/img3.png", "/images/stay/img3.png"],
        rooms: [allRooms[2]],
        amenities: [
            { icon: "shower", label: "Shared bathroom (1 other room)" },
            { icon: "solo", label: "Best for solo stays" },
            { icon: "desk", label: "Small desk area" },
            ...sharedAmenities,
        ],
        sections: [
            {
                title: "The Space",
                content: `The Aasha Room includes a double bed (53 × 74 in) and about 90 sq ft (8.4 sq m) of floor space. It's best suited for one person but can comfortably fit two. The shared bathroom is right nearby, shared with only one other room and cleaned daily.

Guests share generous common spaces, including a cozy living room, large dining area, well-equipped kitchen, washing machine, and three balconies. Shared areas are cleaned regularly.`,
            },
            neighborhoodSection,
            guestAccessShared,
        ],
        notes: sharedNotes,
        goodFor: sharedGoodFor,
    },

    "sattya-apartment": {
        badge: "Entire Apartment",
        name: "Sattya Apartment",
        tagline: "entire three-bedroom home",
        description: "A full three-bedroom apartment in Jawalakhel, right next door to Sattya Media Arts Collective. Two queen bedrooms, one double bedroom, two bathrooms, a well-equipped kitchen, and spacious living and dining areas. At 116 sq m it offers real space to settle in, not just pass through.",
        location: "Jawalakhel, Lalitpur, Kathmandu",
        size: "116 sq m (1,250 sq ft)",
        maxGuests: 6,
        bedrooms: 3,
        bathrooms: 2,
        images: ["/images/stay/img1.png", "/images/stay/img2.png", "/images/stay/img3.png", "/images/stay/img3.png", "/images/stay/img3.png"],
        rooms: allRooms,
        amenities: sharedAmenities,
        iframeSrc: "https://booking.hospitable.com/widget/a1544d7d-18eb-4731-9904-40596caf07be/2206874",
        sections: [
            {
                title: "The Space",
                content: `The Sattya Apartment is a full three-bedroom home in central Jawalakhel. At 116 sq m (1,250 sq ft), it offers real space to settle in, not just pass through.

The apartment includes two queen bedrooms and one double bedroom, sleeping up to six guests, along with two bathrooms, a well-equipped kitchen, a spacious living room, and a large dining area.

The largest bedroom (152 sq ft) features a queen bed and private bathroom. The second bedroom (110 sq ft) has a queen bed and shares a bathroom with just one other room. The third bedroom (90 sq ft) has a double bed — slightly more compact, best suited for solo travelers or couples.

Shared spaces are comfortable and practical, with room to cook, work, or relax. Three balconies, a washing machine, fast fiber internet (~390 Mbps), power backup, and reliable hot water.

Located on the second floor of a new, well-managed building with a welcoming, lived-in feel.`,
            },
            {
                title: "Room Layout",
                content: `Master bedroom: 11.9 sq m (128 sq ft)
Mid-sized bedroom: 12 sq m (132 sq ft)
Smaller bedroom: 10.5 sq m (113 sq ft)
Living room: 18.54 sq m (200 sq ft)
Dining area: 11 sq m (120 sq ft)
Kitchen: 5.5 sq m (59 sq ft)
Each bathroom: approx. 3.5 sq m (39 sq ft)

The balcony off the living room includes the inverter and laundry setup. The street-facing balcony connects to the dining area. The third balcony is in the building hallway and used exclusively by this apartment.`,
            },
            neighborhoodSection,
            {
                title: "Guest Access",
                content: `You will have full private access to the entire apartment during your stay. Self check-in is available for late night arrivals — clear instructions are sent in advance.

You're free to come and go as you like, and to treat the apartment as a relaxed home base while you're in Kathmandu.`,
            },
            {
                title: "House Culture",
                content: `The Sattya Apartment is at its best when everyone feels comfortable and at home. People who enjoy staying here tend to be thoughtful with shared spaces, easygoing about different routines, and respectful of one another.

Longer stays are very welcome. The intention is simply to support a good shared vibe and a home that feels easy to live in.`,
            },
        ],
        notes: [
            "Utilities, Wi-Fi, and shared space cleaning are all included — no extra monthly costs.",
            "Private room cleaning is available if you want it.",
            "The apartment is on the second floor — there is no elevator.",
            "Occasional power cuts are normal in Nepal. The building has backup power with lighting and a charging point in each room. Wi-Fi continues to work during outages.",
            "Your stay directly supports Sattya and the creative work happening next door.",
        ],
        goodFor: [
            "Families, friends, remote workers, or small teams who want comfort, space, and location.",
            "Groups who want their own space while staying loosely connected to creative community.",
            "Anyone looking for something that feels more like a home than a hotel.",
        ],
    },
    "sattya-residence": {
        name: "Sattya Residence",
        badge: "Private Apartment",
        tagline: "private one-bedroom apartment",
        description:
            "A quiet, well-appointed private one-bedroom apartment on the 3rd floor of Sattya. Functions as a fully private apartment — the founder's home when in residence, available at select times for short- or mid-term stays. AC for both heating and cooling, dedicated workspace, and privacy while staying closely connected to the shared spaces and activity at Sattya.",
        iframeSrc: "https://booking.hospitable.com/widget/WIDGET_ID/RESIDENCE_PROPERTY_ID",
        location: "Jawalakhel, Lalitpur, Kathmandu",
        size: "TBC",
        maxGuests: 2,
        bedrooms: 1,
        bathrooms: 1,
        images: [
            "/images/stay/img2.png",
            "/images/stay/img1.png",
            "/images/stay/img3.png",
            "/images/stay/img4.png",
            "/images/stay/img5.png",
            "/images/stay/img6.png",
            "/images/stay/img7.png",
        ],
        rooms: [
            {
                name: "Sattya Residence",
                subtitle: "Private One-Bedroom Apartment",
                bed: "Queen bed",
                bathroom: "Private bathroom",
                size: "TBC",
                description: "A fully private apartment with living area, kitchen, and dedicated workspace. AC for heating and cooling.",
            },
        ],
        amenities: [
            { icon: "ac", label: "AC for heating and cooling" },
            { icon: "bathroom_private", label: "Private bathroom" },
            { icon: "desk", label: "Dedicated workspace" },
            { icon: "kitchen", label: "Full kitchen" },
            { icon: "wifi", label: "Strong Wi-Fi" },
            { icon: "power", label: "Power backup" },
            { icon: "shower", label: "Reliable hot water" },
            { icon: "lock", label: "Secure building" },
            { icon: "cafe", label: "Art Cafe downstairs" },
            { icon: "cowork", label: "Coworking downstairs" },
            { icon: "makerspace", label: "Makerspace downstairs" },
            { icon: "parking", label: "Secure parking" },
        ],
        sections: [
            {
                title: "The Space",
                content: `The Sattya Residence is a private one-bedroom apartment on the 3rd floor of the Sattya building. While it's part of the building, it functions as a fully private apartment — not a shared space.

The apartment is well equipped for comfortable day-to-day living and focused time. It includes a private bedroom, living area, full kitchen, and a dedicated workspace. AC provides both heating and cooling, making it comfortable year-round.

It has a calm, settled feel — a good place to focus, rest, and work, while being just a short walk from everything Sattya offers.`,
            },
            {
                title: "Access to Sattya",
                content: `The Sattya Residence sits directly above the Sattya Media Arts Collective. Coworking, the Art Cafe, Makerspace, workshops, film screenings, and informal gatherings are all just downstairs.

You're welcome to drop into Sattya's spaces during open hours. There's no expectation to participate — it's simply available when you want it.`,
            },
            {
                title: "Availability",
                content: `This space serves as the founder's home when in residence and is available as a short- or mid-term stay at select times.

Availability is limited — if you're interested, reach out early to check dates.`,
            },
            neighborhoodSection,
            {
                title: "Guest Access",
                content: `You will have full private access to the entire apartment during your stay. Self check-in is available for late night arrivals — clear instructions are sent in advance.

You're free to come and go as you like. The Sattya team is right downstairs if anything needs attention.`,
            },
        ],
        notes: [
            "This space is available when not being used as a private residence — availability is limited.",
            "AC provides both heating and cooling — comfortable year-round.",
            "Occasional power cuts are normal in Nepal. The building has backup power and Wi-Fi continues to work during outages.",
            "The apartment is on the 3rd floor — there is no elevator.",
            "Your stay directly supports Sattya and the creative work happening in the building.",
        ],
        goodFor: [
            "Visiting artists, curators, and creative professionals.",
            "Researchers or remote workers who want privacy with easy access to community.",
            "Solo travelers or couples looking for a quiet, well-equipped base in Kathmandu.",
            "People who want privacy but enjoy having a creative community nearby when they want it."
        ],
    },
};