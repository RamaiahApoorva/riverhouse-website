// Events data — edit this file to add, remove, or change events. Nothing else needs to change.
//
// To add a new event, copy one of the objects below and fill in the fields.
// Events move from "Upcoming" to "Past" automatically once their `date` has passed —
// you don't need to move them between lists yourself.
//
// Fields:
//   id          — unique short slug, no spaces (used internally, doesn't show on the page)
//   name        — event name
//   date        — the event's date as 'YYYY-MM-DD' (used to sort and to decide upcoming vs past —
//                 always required, even if dateDisplay is set)
//   dateDisplay — (optional) text shown instead of the full date, e.g. 'October 2026' — use this
//                 for private/invite-only events where you don't want the exact date public
//   time        — (optional) display text, e.g. '7:00 PM' — leave out entirely to hide it on the card
//   venue       — (optional) venue name / location — leave out entirely to hide it on the card
//   description — 1–2 sentences
//   ctaLabel    — (optional) button text, e.g. 'RSVP', 'Book', 'Register Interest'
//   ctaUrl      — (optional) where the button links to — leave both ctaLabel and ctaUrl out entirely
//                 to hide the button (e.g. for invite-only events with no public sign-up)
//   image       — (past events only, optional) path to a single photo, e.g. '/events/photo.jpg'
//   images      — (past events only, optional) array of photo paths for a gallery, e.g.
//                 ['/events/1.jpg', '/events/2.jpg'] — put the actual files in the `public/events/` folder

export const events = [
  {
    id: 'seat-at-the-table',
    name: 'A Seat at the Table',
    date: '2026-10-14',
    dateDisplay: 'October 2026',
    description: "Meeting off the mat. An opportunity for us to get together, dinner under the stars, surrounded by people who care. A River House community social, by the community for the community, the first to say - thank you. Built on real conversation and good company — the kind of evening that stays with you. For the River House Community.",
    ctaLabel: 'Find Out More',
    ctaUrl: 'mailto:hello.riverhousestudio@gmail.com?subject=A%20Seat%20at%20the%20Table&body=Hi%20Kimmy%2C%0D%0A%0D%0AI%20am%20intrigued%20to%20find%20out%20more%20about%20River%20House%20and%20A%20Seat%20at%20the%20Table.%0D%0A%0D%0AWould%20love%20to%20find%20out%20more.%0D%0A%0D%0ABest%2C',
  },
  {
    id: 'pilates-x-padel',
    name: 'Pilates x Padel',
    date: '2026-10-17',
    time: '11:00am - 3:00pm',
    venue: 'The Wilds, Barking Riverside',
    description: "Move, pause, play and connect. Start on the mat, take it to the court, then slow down with guided mindfulness before gathering for a grazing lunch and good conversation. An intimate day in the company of like-minded women. Women's only event.",
    ctaLabel: 'Register Interest',
    ctaUrl: 'mailto:hello.riverhousestudio@gmail.com?subject=The%20River%20House%20Studio%20x%20TheCollective%20Wellness%20day&body=Hi%20River%20House%20Studio%20team%2C%0D%0A%0D%0AI%20would%20love%20to%20register%20my%20interest%20in%20the%20Pilates%20x%20Padel%20Wellness%20Day%20with%20theCOLLECTIVE%20on%2017%20October.%0D%0A%0D%0APlease%20let%20me%20know%20the%20next%20steps%20to%20secure%20my%20place.%0D%0A%0D%0AThank%20you!',
  },
  {
    id: 'ariyani',
    name: 'The Atelier Edit with Ariyani',
    date: '2026-11-05',
    time: '5:30pm - 8:00pm',
    venue: 'Mayfair, London',
    description: 'A refined evening in the heart of Mayfair, hosted in partnership with theCOLLECTIVE. Join Ariyani for an intimate gathering of considered detail and quiet luxury — an evening curated for those who appreciate the finer things.',
    ctaLabel: 'Book',
    ctaUrl: 'https://www.thecollectivemembers.co.uk/events/the-atelier-edit?utm_campaign=9ea7c4ce-b294-4b93-843b-6d62ea0dfedf&utm_source=so&utm_medium=mail&cid=4ef24d41-bcbf-4a9a-b9dc-9f000a2d694b',
  },
  {
    id: 'sound-meditation-jamie-jean-burns',
    name: 'Sound Meditation & Sound Healing with Jamie Jean Burns',
    date: '2026-08-28',
    time: 'Time TBC',
    venue: 'The Wilds, Barking Riverside',
    description: 'A deeply restful closing ritual to end the block 1 and 2.',
    images: ['/events/sound-meditation-1.jpg', '/events/sound-meditation-2.jpg', '/events/sound-meditation-3.jpg'],
  },
  {
    id: 'la-vie-mayfair',
    name: 'The River House Method x La Vie Mayfair',
    date: '2026-09-13',
    time: 'Time TBC',
    venue: 'La Vie Mayfair',
    description: 'Kimmy took over La Vie Mayfair, hosting The River House Method for a morning in the park with the ladies.',
    image: '/events/la-vie-mayfair.jpg',
  },
]
