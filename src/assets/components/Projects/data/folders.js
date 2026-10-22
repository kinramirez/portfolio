// One folder = one project made of several connected systems.
// The number of papers on the card follows systems.length.
export const FOLDERS = [
  {
    title: "Mama Lou's (MML)",
    desc: "A connected restaurant booking platform made of three apps that work together: one for customers, one for restaurants, and one for talents.",
    tags: ["React", "TypeScript", "Tailwind", "TanStack Query"],
    emoji: "🍴",
    accent: "#ffb547",
    flow: "Customers book → Restaurants manage → Talents get involved",
    systems: [
      {
        name: "Customers",
        role: "For diners",
        url: "https://mml-customers.myiiap.com/home",
        summary: "The public-facing app where customers discover restaurants and book a table.",
        steps: [
          "Open the app and browse or search for a restaurant.",
          "Pick a date, time, and number of guests, then submit your booking.",
          "Track the status of your booking from your account.",
          "Message the restaurant if you need to change or ask something.",
        ],
      },
      {
        name: "Restaurants",
        role: "For restaurant admins",
        url: "https://mml-restaurants.myiiap.com/home",
        summary: "The admin app where restaurants receive and manage the bookings made by customers.",
        steps: [
          "Log in with your restaurant admin account.",
          "Review incoming bookings and accept or decline them.",
          "Use the booking list and print reports to prepare for the day.",
          "Reply to customers through the built-in messaging.",
        ],
      },
      {
        name: "Talents",
        role: "For talents",
        url: "https://mml-talents.myiiap.com/home",
        summary: "The app for talents who are connected to the restaurants on the platform.",
        steps: [
          "Open the app and log in or create your talent account.",
          "Set up your profile so restaurants can find you.",
          "Check the restaurants and events you are linked to.",
          "Keep your details up to date so bookings stay accurate.",
        ],
      },
    ],
  },
];