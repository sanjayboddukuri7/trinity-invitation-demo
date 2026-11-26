# Trinity Invitation (Prototype)

A prototype by [Trinity Tech](https://trinity-tech.vercel.app) that explains **what a digital invitation is** and shows **4 working invitation models**.

## Home page

- What a digital invitation is, with a WhatsApp-style example of an invite being shared and guests replying
- Printed card vs digital invitation
- Cards for each model, plus "another occasion?" for custom requests
- What every invitation includes and how it works (we design it → you share the link → guests reply)

## The 4 models

| # | Model | Made-up hosts | Events |
|---|---|---|---|
| 1 | Wedding | Arjun & Meera | Haldi, Mehendi & Sangeet, Muhurtham, Reception |
| 2 | First birthday | Aanya turns 1! | Birthday party |
| 3 | Housewarming (Gruhapravesam) | The Rao Family | Pooja, Lunch |
| 4 | Engagement | Rahul & Priya | Ring ceremony, Dinner & music |

Every invitation has:

- An envelope opening screen with animation
- Background music generated in the browser (Web Audio, no audio files) with a mute button
- Live countdown and full event schedule with time, venue and dress code
- **Add to calendar** (Google Calendar) and **Directions** (Google Maps) for each event
- Story timeline and a photo gallery section
- RSVP form: attending or not, number of guests, which events, a message
- A **host view** showing the RSVP summary
- Share on WhatsApp

Names, venues and dates are made up; dates are counted from the visitor's first visit so the countdown never runs out. RSVPs are saved only in the visitor's browser: nothing is sent anywhere.

## Edit or add an invitation

All content is in `src/invites.ts`: names, theme colours and fonts, ornament (`mandala`, `balloons`, `kolam`, `rings`), music style (`raga`, `playful`, `calm`, `romantic`), events, story, gallery captions and RSVP options.

## Run locally

```
npm install
npm run dev
```

Opens on http://127.0.0.1:3400.

## Deploy on Vercel

Import this repository as a new Vercel project (framework: Vite). Build command `npm run build`, output folder `dist`. No environment variables needed.
