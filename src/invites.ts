// The four invitation models. Every name, venue and date here is made up for the prototype.
// Dates are relative: `daysAway` is counted from the visitor's first visit, so the countdown never runs out.

export type Ornament = 'mandala' | 'balloons' | 'kolam' | 'rings';
export type Melody = 'raga' | 'playful' | 'calm' | 'romantic';

export interface InviteEvent {
  name: string;
  icon: string;
  /** Days after the main date (negative = before). */
  dayOffset: number;
  start: string; // "HH:MM" 24h
  end: string;
  venue: string;
  area: string;
  note?: string;
}

export interface Invite {
  slug: string;
  kind: string;
  usedFor: string;
  names: string;
  theme: {
    brand: string; brandDark: string; brandSoft: string; accent: string; accentSoft: string;
    paper: string; line: string; ink: string; inkSoft: string; inkMuted: string;
    display: string; script: string;
    /** Background of the envelope / opening screen */
    cover: string;
  };
  ornament: Ornament;
  melody: Melody;
  daysAway: number;
  opening: { pre: string; button: string };
  hero: { blessing: string; pre: string; post: string; line: string };
  message: { title: string; text: string };
  events: InviteEvent[];
  story?: { title: string; items: { when: string; text: string }[] };
  gallery: string[];
  rsvp: { title: string; text: string; pickEvents: boolean; maxGuests: number };
  hosts: string;
}

export const INVITES: Invite[] = [
  {
    slug: 'wedding',
    kind: 'Wedding',
    usedFor: 'Weddings with haldi, mehendi, muhurtham and reception',
    names: 'Arjun & Meera',
    theme: {
      brand: '122 28 43', brandDark: '92 18 32', brandSoft: '246 228 228', accent: '201 151 59', accentSoft: '250 240 220',
      paper: '252 246 236', line: '236 220 198', ink: '46 20 22', inkSoft: '88 52 52', inkMuted: '140 108 100',
      display: '"Cormorant Garamond", Georgia, serif', script: '"Great Vibes", cursive',
      cover: 'linear-gradient(160deg, #7A1C2B 0%, #4A0F1A 100%)',
    },
    ornament: 'mandala',
    melody: 'raga',
    daysAway: 24,
    opening: { pre: 'You are invited to the wedding of', button: 'Open invitation' },
    hero: {
      blessing: '॥ Sri Ganeshaya Namaha ॥',
      pre: 'Together with their families',
      post: 'request the honour of your presence at their wedding',
      line: 'Two hearts, one journey, and all of you to bless it.',
    },
    message: {
      title: 'A note from us',
      text: 'Our families have been friends for over twenty years, and now they become one. Nothing would make us happier than celebrating this day with the people we love most. Please come, bless us, and dance with us at the sangeet.',
    },
    events: [
      { name: 'Haldi', icon: 'sun', dayOffset: -1, start: '09:30', end: '12:30', venue: "Bride's residence", area: 'Banjara Hills, Hyderabad', note: 'Dress code: shades of yellow' },
      { name: 'Mehendi & Sangeet', icon: 'music', dayOffset: -1, start: '18:30', end: '23:00', venue: 'Sample Gardens', area: 'Gachibowli, Hyderabad', note: 'Dress code: colourful & festive' },
      { name: 'Wedding · Muhurtham', icon: 'heart', dayOffset: 0, start: '10:00', end: '13:30', venue: 'Sample Convention Hall', area: 'Madhapur, Hyderabad', note: 'Muhurtham at 10:42 am · lunch follows' },
      { name: 'Reception', icon: 'sparkles', dayOffset: 0, start: '19:00', end: '22:30', venue: 'Sample Convention Hall', area: 'Madhapur, Hyderabad', note: 'Dress code: formal' },
    ],
    story: {
      title: 'Our story',
      items: [
        { when: '2019', text: 'We met at a friend\'s wedding and argued about biryani all evening.' },
        { when: '2022', text: 'Countless coffee dates later, we finally agreed: Hyderabadi biryani wins.' },
        { when: '2026', text: 'Arjun proposed at the same place we first met. Meera said yes before he finished.' },
      ],
    },
    gallery: ['First meeting', 'Engagement', 'Pre-wedding shoot', 'Families together', 'Our favourite trip', 'Just us'],
    rsvp: { title: 'Will you join us?', text: 'Please let us know by one week before the wedding.', pickEvents: true, maxGuests: 6 },
    hosts: 'With love, the Reddy and Sharma families',
  },
  {
    slug: 'birthday',
    kind: 'First birthday',
    usedFor: 'Birthdays, kids\' parties and milestone celebrations',
    names: 'Aanya turns 1!',
    theme: {
      brand: '236 72 153', brandDark: '190 24 93', brandSoft: '252 231 243', accent: '20 184 166', accentSoft: '204 251 241',
      paper: '255 249 245', line: '250 222 230', ink: '55 30 60', inkSoft: '95 70 100', inkMuted: '150 125 150',
      display: '"Fredoka", "Inter", sans-serif', script: '"Fredoka", "Inter", sans-serif',
      cover: 'linear-gradient(160deg, #F9A8D4 0%, #EC4899 55%, #14B8A6 100%)',
    },
    ornament: 'balloons',
    melody: 'playful',
    daysAway: 12,
    opening: { pre: 'Someone special is turning one…', button: 'Open the party invite' },
    hero: {
      blessing: '🎈 You\'re invited! 🎈',
      pre: 'Come party with us!',
      post: 'Cake, games, a magic show and lots of fun',
      line: 'One year of giggles, first steps and endless love.',
    },
    message: {
      title: 'From Aanya\'s parents',
      text: 'This year flew by in a blur of sleepless nights and the best smiles of our lives. Come celebrate our little one with cake, games, a magic show and lots of noise. Kids of all ages are welcome!',
    },
    events: [
      { name: 'Birthday party', icon: 'party', dayOffset: 0, start: '18:00', end: '21:30', venue: 'Sample Party Hall', area: 'Kondapur, Hyderabad', note: 'Cake cutting at 7:00 pm · magic show at 7:30 pm' },
    ],
    story: {
      title: 'All about Aanya',
      items: [
        { when: 'First word', text: '"Amma", followed very closely by "No!"' },
        { when: 'Favourite toy', text: 'A yellow rubber duck named Biscuit.' },
        { when: 'Superpower', text: 'Turning any room into a mess in under a minute.' },
      ],
    },
    gallery: ['Day one', 'First smile', 'First bath', 'Crawling!', 'First steps', 'Ready to party'],
    rsvp: { title: 'Can you come?', text: 'Tell us how many grown-ups and little ones are coming.', pickEvents: false, maxGuests: 8 },
    hosts: 'With love, Kiran & Divya',
  },
  {
    slug: 'housewarming',
    kind: 'Housewarming (Gruhapravesam)',
    usedFor: 'Housewarmings, poojas and family functions',
    names: 'The Rao Family',
    theme: {
      brand: '180 83 42', brandDark: '140 60 28', brandSoft: '250 232 220', accent: '79 121 66', accentSoft: '226 238 220',
      paper: '255 248 240', line: '240 222 204', ink: '52 32 22', inkSoft: '96 70 56', inkMuted: '148 122 106',
      display: '"Playfair Display", Georgia, serif', script: '"Great Vibes", cursive',
      cover: 'linear-gradient(160deg, #C2602F 0%, #8C3C1C 100%)',
    },
    ornament: 'kolam',
    melody: 'calm',
    daysAway: 9,
    opening: { pre: 'You are warmly invited to our', button: 'Open invitation' },
    hero: {
      blessing: '॥ Om Sri Lakshmi Narasimhaya Namaha ॥',
      pre: 'With the blessings of the Almighty',
      post: 'invite you to the Gruhapravesam of our new home',
      line: 'A new home, made complete by your blessings.',
    },
    message: {
      title: 'Please bless our new home',
      text: 'After years of dreaming and planning, our new home is finally ready. We are starting this new chapter with a Satyanarayana pooja, and we would be honoured to have you with us for the pooja and lunch.',
    },
    events: [
      { name: 'Gruhapravesam & Pooja', icon: 'flame', dayOffset: 0, start: '07:00', end: '11:00', venue: 'Our new home', area: 'Sample Colony, Vijayawada', note: 'Auspicious time: 7:18 am' },
      { name: 'Lunch', icon: 'utensils', dayOffset: 0, start: '12:30', end: '15:00', venue: 'Our new home', area: 'Sample Colony, Vijayawada', note: 'Traditional vegetarian meal on banana leaf' },
    ],
    gallery: ['The house', 'Living room', 'Pooja room', 'Garden', 'Rooftop view', 'Family'],
    rsvp: { title: 'Will you be there?', text: 'It helps us plan the lunch. Thank you!', pickEvents: true, maxGuests: 10 },
    hosts: 'Venkat Rao, Lakshmi & family',
  },
  {
    slug: 'engagement',
    kind: 'Engagement',
    usedFor: 'Engagements, anniversaries and receptions',
    names: 'Rahul & Priya',
    theme: {
      brand: '30 42 74', brandDark: '20 28 54', brandSoft: '228 232 244', accent: '212 165 154', accentSoft: '248 234 230',
      paper: '249 245 243', line: '230 222 220', ink: '28 30 48', inkSoft: '70 72 96', inkMuted: '128 126 146',
      display: '"Cormorant Garamond", Georgia, serif', script: '"Great Vibes", cursive',
      cover: 'linear-gradient(160deg, #1E2A4A 0%, #3B2F4A 60%, #D4A59A 140%)',
    },
    ornament: 'rings',
    melody: 'romantic',
    daysAway: 16,
    opening: { pre: 'Save the date for the engagement of', button: 'Open invitation' },
    hero: {
      blessing: 'Save the date',
      pre: 'We are getting engaged!',
      post: 'and we want you there',
      line: 'She said yes. Now it\'s official.',
    },
    message: {
      title: 'A little celebration',
      text: 'We are keeping it close: family, our dearest friends and a lot of good food. Join us as we exchange rings and start counting down to the big day.',
    },
    events: [
      { name: 'Ring ceremony', icon: 'gem', dayOffset: 0, start: '18:00', end: '19:30', venue: 'Sample Banquet', area: 'Jubilee Hills, Hyderabad', note: 'Dress code: pastels' },
      { name: 'Dinner & music', icon: 'music', dayOffset: 0, start: '19:30', end: '22:30', venue: 'Sample Banquet', area: 'Jubilee Hills, Hyderabad', note: 'Live band from 8:00 pm' },
    ],
    story: {
      title: 'How it happened',
      items: [
        { when: '2021', text: 'Same college, different departments, one shared umbrella in the rain.' },
        { when: '2024', text: 'Long distance for two years: Bengaluru and Pune, a lot of video calls.' },
        { when: '2026', text: 'Rahul proposed on Priya\'s birthday with a ring hidden in her cake.' },
      ],
    },
    gallery: ['College days', 'The proposal', 'The ring', 'Trip to Goa', 'With family', 'Us'],
    rsvp: { title: 'Celebrate with us?', text: 'Kindly reply so we can save your seat.', pickEvents: false, maxGuests: 4 },
    hosts: 'With love, Rahul & Priya',
  },
];

export const getInvite = (slug: string) => INVITES.find(i => i.slug === slug);
