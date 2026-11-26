import { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, CalendarPlus, Check, CheckCheck, Clock, ImageIcon, MapPin, MessageCircle, Music, Pencil, Printer,
  Send, Share2, Smartphone, Timer, Users, X,
} from 'lucide-react';
import { INVITES, type Invite } from './invites';
import { OrnamentArt } from './ornaments';
import { Reveal, START_PROJECT_URL, TrinityCredit, TrinityWhatsApp, scrollToId, trinityWhatsapp } from './shared';

const FEATURES = [
  { icon: Smartphone, title: 'Opens on any phone', text: 'Guests tap a link on WhatsApp. No app to install.' },
  { icon: Music, title: 'Opening animation & music', text: 'An envelope that opens with soft background music and a mute button.' },
  { icon: Timer, title: 'Live countdown', text: 'Days, hours and minutes to the big day.' },
  { icon: Clock, title: 'Full schedule', text: 'Haldi, mehendi, wedding, reception: each with time, venue and dress code.' },
  { icon: MapPin, title: 'Directions', text: 'One tap opens Google Maps to the venue.' },
  { icon: CalendarPlus, title: 'Add to calendar', text: 'Guests save every event to their phone calendar.' },
  { icon: Users, title: 'RSVP with guest count', text: 'Guests reply in seconds; hosts see who is coming and how many.' },
  { icon: ImageIcon, title: 'Photos & your story', text: 'A gallery and a short story of the couple or family.' },
];

export function Home() {
  useEffect(() => {
    document.title = 'Trinity Invitation (Prototype) — digital invitation models by Trinity Tech';
  }, []);

  return (
    <div className="bg-[#140E0A] text-white font-sans">
      <div role="note" className="bg-gradient-to-r from-[#b8741a] via-[#e8a33d] to-[#f6d28a] text-[#1b1407] text-[12.5px]">
        <div className="wrap py-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
          <span className="rounded-full bg-[#1b1407] text-[#f6c66b] px-2 py-0.5 text-[10.5px] font-bold tracking-[0.14em]">PROTOTYPE</span>
          <span>Sample digital invitations by Trinity Tech. All names, venues and dates are made up.</span>
        </div>
      </div>

      <header className="wrap h-16 flex items-center justify-between gap-4">
        <a href="#/" className="flex items-center gap-2.5">
          <img src="/mark.png" alt="" className="w-10 h-8 object-contain drop-shadow-[0_0_10px_rgba(232,163,61,0.45)]" />
          <span className="leading-none">
            <span className="block font-brand font-bold tracking-[0.12em] text-[15px]">
              TRINITY INVITATION <span className="font-sans tracking-normal text-[#E8A33D] text-[13px]">(Prototype)</span>
            </span>
            <span className="block text-[11px] text-white/50 mt-1">by Trinity Tech</span>
          </span>
        </a>
        <a href={START_PROJECT_URL} target="_blank" rel="noreferrer" className="hidden sm:inline-flex btn h-10 bg-[#E8A33D] text-[#1b1407] hover:bg-[#f6c66b]">
          Get your invitation <ArrowUpRight className="w-4 h-4" />
        </a>
      </header>

      {/* What is it */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_85%_20%,rgba(232,163,61,0.18),transparent_70%)]" />
        <div className="wrap relative pt-10 sm:pt-16 pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <span className="inline-flex rounded-full bg-white/10 text-[#f6c66b] px-3 py-1 text-xs font-semibold">What is a digital invitation?</span>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="mt-5 font-serif text-[42px] sm:text-[60px] leading-[1.05] font-bold">
              Your invitation,<br />
              <span className="bg-gradient-to-r from-[#e8a33d] to-[#f6d28a] bg-clip-text text-transparent">one link away.</span>
            </motion.h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl">
              A digital invitation is a <b className="text-white">beautiful web page for your event that you share as a link on WhatsApp</b>,
              instead of (or along with) a printed card. Guests open it on their phone, see every detail, get directions and reply in seconds.
            </p>
            <p className="mt-3 text-white/60 max-w-xl">
              Below are <b className="text-white">{INVITES.length} sample invitations</b>. Open any one to see it exactly as a guest would, with
              the opening animation, music and RSVP.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => scrollToId('models')} className="btn bg-[#E8A33D] text-[#1b1407] hover:bg-[#f6c66b]">
                See the {INVITES.length} invitations <ArrowDown className="w-4 h-4" />
              </button>
              <TrinityWhatsApp about="the invitation models" />
            </div>
          </div>
          <ChatMockup />
        </div>
      </section>

      {/* Printed vs digital */}
      <section className="bg-[#FBF5EA] text-[#2E1416] py-20 sm:py-24">
        <div className="wrap">
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-[44px] leading-tight font-bold">Printed card or digital invite?</h2>
            <p className="mt-4 text-lg text-[#58343A]">Many families now send both: cards for elders, a link for everyone else.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <Reveal>
              <div className="h-full rounded-3xl bg-white border border-[#ECDCC6] p-7">
                <span className="w-11 h-11 rounded-2xl bg-[#F4ECE0] text-[#8C6C64] grid place-items-center"><Printer className="w-5 h-5" /></span>
                <h3 className="mt-5 font-serif text-2xl font-bold">Printed card</h3>
                <ul className="mt-5 space-y-2.5 text-[15px]">
                  {['Costs money for every card and courier', 'Takes days to print and deliver', 'Can\'t be changed once printed', 'No idea who is actually coming'].map(x => (
                    <li key={x} className="flex gap-2.5"><X className="w-4 h-4 mt-1 text-[#C0897E] shrink-0" />{x}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-3xl bg-[#2E1416] text-white p-7 shadow-[0_20px_60px_-15px_rgba(232,163,61,0.45)]">
                <span className="w-11 h-11 rounded-2xl bg-[#E8A33D] text-[#1b1407] grid place-items-center"><Smartphone className="w-5 h-5" /></span>
                <h3 className="mt-5 font-serif text-2xl font-bold">Digital invitation</h3>
                <ul className="mt-5 space-y-2.5 text-[15px]">
                  {['Share with hundreds of guests in one tap', 'Directions, calendar and schedule built in', 'Update the time or venue any time', 'RSVPs tell you exactly how many to plan for'].map(x => (
                    <li key={x} className="flex gap-2.5"><Check className="w-4 h-4 mt-1 text-[#E8A33D] shrink-0" />{x}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Models */}
      <section id="models" className="py-20 sm:py-28">
        <div className="wrap">
          <Reveal className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
            <span className="inline-flex rounded-full bg-white/10 text-[#f6c66b] px-3 py-1 text-xs font-semibold">Invitation models</span>
            <h2 className="font-serif text-3xl sm:text-[44px] leading-tight font-bold mt-4">Pick an occasion.</h2>
            <p className="mt-4 text-white/60 text-lg">Each invitation has its own colours, artwork and music. Yours gets your names, photos, venues and story.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INVITES.map((inv, i) => <ModelCard key={inv.slug} invite={inv} index={i} />)}
          </div>
          <Reveal className="mt-6">
            <a href={START_PROJECT_URL} target="_blank" rel="noreferrer"
              className="group flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border-2 border-dashed border-white/20 p-6 hover:border-[#E8A33D] transition-colors">
              <div>
                <div className="font-serif text-xl font-bold">Another occasion?</div>
                <p className="text-sm text-white/60 mt-1">Naming ceremony, half-saree function, anniversary, baby shower, college farewell… we design it.</p>
              </div>
              <span className="text-sm font-semibold text-[#f6c66b] group-hover:underline inline-flex items-center gap-1">Start a project <ArrowUpRight className="w-4 h-4" /></span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#FBF5EA] text-[#2E1416] py-20 sm:py-28">
        <div className="wrap">
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-[44px] leading-tight font-bold">What every invitation includes</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 4) * 0.06}>
                <div className="h-full rounded-3xl bg-white border border-[#ECDCC6] p-6">
                  <span className="w-10 h-10 rounded-xl bg-[#FBF1E0] text-[#B9771E] grid place-items-center"><f.icon className="w-5 h-5" /></span>
                  <h3 className="mt-4 font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-[#58343A] leading-relaxed">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <h3 className="text-center font-serif text-2xl font-bold">How it works</h3>
            <ol className="mt-8 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Pencil, t: 'We design it', d: 'Send us names, dates, venues and photos. We build your invitation in your style.' },
                { icon: Send, t: 'You share the link', d: 'Post it on WhatsApp groups, status and messages, or print a QR code on the card.' },
                { icon: CheckCheck, t: 'Guests reply', d: 'They RSVP in seconds and you see exactly who is coming.' },
              ].map((s, i) => (
                <li key={s.t} className="text-center">
                  <span className="mx-auto w-14 h-14 rounded-2xl bg-[#2E1416] text-[#E8A33D] grid place-items-center relative">
                    <s.icon className="w-6 h-6" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#E8A33D] text-[#1b1407] text-xs font-bold grid place-items-center">{i + 1}</span>
                  </span>
                  <h4 className="mt-4 font-semibold text-lg">{s.t}</h4>
                  <p className="mt-1 text-sm text-[#58343A]">{s.d}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24">
        <div className="wrap">
          <Reveal>
            <div className="rounded-[36px] bg-gradient-to-br from-[#2E1A12] to-[#140E0A] border border-white/10 px-6 py-14 sm:p-16 text-center">
              <OrnamentArt kind="mandala" className="w-16 h-16 mx-auto text-[#E8A33D]" />
              <h2 className="font-serif text-3xl sm:text-[44px] leading-tight font-bold mt-5">Planning a function?</h2>
              <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">Trinity Tech designs your digital invitation and gives you a link to share, ready in days.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={START_PROJECT_URL} target="_blank" rel="noreferrer" className="btn bg-[#E8A33D] text-[#1b1407] hover:bg-[#f6c66b]">Start a project <ArrowRight className="w-4 h-4" /></a>
                <a href={trinityWhatsapp('the invitation models')} target="_blank" rel="noreferrer" className="btn bg-[#25D366] text-[#062b14]"><MessageCircle className="w-4 h-4" /> WhatsApp us</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="wrap py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p><b className="text-white">Trinity Invitation (Prototype)</b> is a prototype by Trinity Tech.</p>
          <TrinityCredit dark />
        </div>
      </footer>
    </div>
  );
}

function ModelCard({ invite, index }: { invite: Invite; index: number }) {
  const t = invite.theme;
  return (
    <Reveal delay={(index % 4) * 0.08} className="h-full">
      <a href={`#/${invite.slug}`} className="group h-full rounded-3xl bg-white text-[#2E1416] overflow-hidden flex flex-col hover:-translate-y-1 transition-transform shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
        <div className="relative h-56 grid place-items-center text-center px-4 overflow-hidden text-white" style={{ background: t.cover }}>
          <span className="absolute inset-0 grid place-items-center opacity-15"><OrnamentArt kind={invite.ornament} className="w-72 h-72 text-white" /></span>
          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">{invite.kind}</p>
            <p className="mt-2 text-4xl leading-tight" style={{ fontFamily: t.script }}>{invite.names}</p>
            <span className="mt-4 inline-block rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold" style={{ color: `rgb(${t.brandDark})` }}>
              {invite.opening.button}
            </span>
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: `rgb(${t.brand})` }}>Model {index + 1}</div>
          <h3 className="mt-1 text-lg font-bold">{invite.kind}</h3>
          <p className="mt-1.5 text-sm text-[#58343A] flex-1">{invite.usedFor}</p>
          <p className="mt-3 text-xs text-[#8C6C64]">{invite.events.length} {invite.events.length === 1 ? 'event' : 'events'} · RSVP · music</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: `rgb(${t.brand})` }}>
            Open invitation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

/** A WhatsApp-style chat showing an invitation link being shared and a guest replying. */
function ChatMockup() {
  return (
    <div className="mx-auto w-[300px] sm:w-[330px] rounded-[40px] bg-[#0b0b0b] p-3 shadow-[0_30px_80px_-20px_rgba(232,163,61,0.45)]" aria-label="Example: an invitation link shared on WhatsApp and a guest replying.">
      <div className="rounded-[30px] overflow-hidden bg-[#ECE5DD]">
        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-white/20 grid place-items-center text-sm font-bold">F</span>
          <div className="leading-tight"><div className="text-sm font-semibold">Family group</div><div className="text-[11px] text-white/70">42 members</div></div>
        </div>
        <div className="p-3 space-y-2 min-h-[380px] text-[13px] text-[#111]">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-[#DCF8C6] p-1.5 shadow-sm">
            <div className="rounded-lg overflow-hidden" style={{ background: INVITES[0].theme.cover }}>
              <div className="p-4 text-center text-white">
                <OrnamentArt kind="mandala" className="w-10 h-10 mx-auto text-[#E8B86B]" />
                <div className="mt-1 text-[10px] text-white/70">You are invited to the wedding of</div>
                <div className="text-2xl" style={{ fontFamily: INVITES[0].theme.script }}>Arjun & Meera</div>
              </div>
            </div>
            <div className="px-1.5 pt-1.5 text-[12px]">You're invited! 💐 Open our invitation 👇<br /><span className="text-[#027eb5] underline">trinity-invitation…/wedding</span></div>
            <div className="text-right text-[10px] text-[#667] px-1">10:24 <CheckCheck className="inline w-3.5 h-3.5 text-[#34B7F1]" /></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="max-w-[80%] rounded-xl rounded-tl-sm bg-white p-2 shadow-sm">
            <div className="text-[11px] font-semibold text-[#c2185b]">Lakshmi aunty</div>
            Beautiful! 😍 Just sent my RSVP, 4 of us are coming 🙏
            <div className="text-right text-[10px] text-[#667]">10:31</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }} className="max-w-[80%] rounded-xl rounded-tl-sm bg-white p-2 shadow-sm">
            <div className="text-[11px] font-semibold text-[#1565c0]">Ravi</div>
            Added all 4 events to my calendar 📅 and the map link works 👌
            <div className="text-right text-[10px] text-[#667]">10:40</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.3 }} className="mx-auto w-fit rounded-full bg-white/80 px-3 py-1 text-[11px] text-[#555] flex items-center gap-1">
            <Share2 className="w-3 h-3" /> Shared to 6 groups
          </motion.div>
        </div>
      </div>
    </div>
  );
}
