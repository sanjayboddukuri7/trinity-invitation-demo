import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CalendarPlus, Check, Clock, ImageIcon, MapPin, Minus, Navigation, Plus, Share2, Users, Volume2, VolumeX, MessageCircle, ArrowUpRight,
} from 'lucide-react';
import { INVITES, type Invite } from './invites';
import { OrnamentArt } from './ornaments';
import { Music } from './music';
import {
  Icon, ModelBar, Reveal, START_PROJECT_URL, TRINITY_URL, TrinityCredit, calendarUrl, eventTimes, fmtDate, fmtShort, fmtTime, loadRsvps,
  mapsUrl, saveRsvp, scrollToId, useCountdown, useTheme, type Rsvp,
} from './shared';

export function Invitation({ invite }: { invite: Invite }) {
  useTheme(invite.theme);
  const index = INVITES.indexOf(invite);
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const music = useRef<Music | null>(null);

  useEffect(() => {
    document.title = `${invite.names} · ${invite.kind} invitation — Trinity Invitation (Prototype)`;
    music.current = new Music(invite.melody);
    return () => music.current?.stop();
  }, [invite]);

  const open = () => {
    setOpened(true);
    music.current?.start(); // started by a tap, so browsers allow sound
    setPlaying(true);
  };
  const toggleMusic = () => {
    if (!music.current) return;
    if (music.current.playing) music.current.stop();
    else music.current.start();
    setPlaying(music.current.playing);
  };

  return (
    <div className="min-h-screen bg-paper">
      <ModelBar invite={invite} index={index} total={INVITES.length} prev={INVITES[index - 1]} next={INVITES[index + 1]} />
      <AnimatePresence>{!opened && <Envelope invite={invite} onOpen={open} />}</AnimatePresence>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pb-28">
        <Hero invite={invite} />
        <Message invite={invite} />
        <Events invite={invite} />
        {invite.story && <Story invite={invite} />}
        <Gallery invite={invite} />
        <RsvpSection invite={invite} />
        <Footer invite={invite} next={INVITES[index + 1]} />
      </main>

      {opened && (
        <div className="fixed bottom-4 inset-x-0 z-40 px-4 pointer-events-none">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
            <button onClick={toggleMusic} aria-pressed={playing} aria-label={playing ? 'Mute music' : 'Play music'}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white/95 border border-line shadow-soft grid place-items-center text-brand">
              {playing ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <div className="flex gap-2 pointer-events-auto">
              <button onClick={() => scrollToId('rsvp')} className="btn-primary h-12">RSVP</button>
              <ShareButton invite={invite} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ShareButton({ invite }: { invite: Invite }) {
  const text = `You're invited! ${invite.names} · ${invite.kind}. Open the invitation: ${window.location.href}`;
  return (
    <a href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer"
      className="btn h-12 bg-[#25D366] text-[#062b14]" aria-label="Share on WhatsApp">
      <Share2 className="w-4 h-4" /> <span className="hidden sm:inline">Share on WhatsApp</span><span className="sm:hidden">Share</span>
    </a>
  );
}

/* ---------- envelope ---------- */

function Envelope({ invite, onOpen }: { invite: Invite; onOpen: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center text-white overflow-hidden"
      style={{ background: invite.theme.cover }}
      exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } }}>
      <div className="absolute top-0 inset-x-0 text-[11px] font-sans py-2 bg-black/20 flex justify-center gap-3">
        <span className="font-bold tracking-[0.14em] text-[#f6c66b]">PROTOTYPE</span>
        <span className="text-white/80">Sample invitation by Trinity Tech</span>
        <a href="#/" className="underline underline-offset-2 text-white/90">All models</a>
      </div>
      <OrnamentArt kind={invite.ornament} className="absolute w-[560px] h-[560px] opacity-[0.12] text-white" />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="relative">
        <OrnamentArt kind={invite.ornament} className="w-28 h-28 mx-auto text-[rgb(var(--accent))]" />
        <p className="mt-6 font-display text-lg sm:text-xl text-white/85 italic">{invite.opening.pre}</p>
        <h1 className="mt-3 font-script text-6xl sm:text-7xl leading-tight drop-shadow-sm">{invite.names}</h1>
        <motion.button onClick={onOpen} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-white text-[rgb(var(--brand-dark))] px-7 h-12 font-sans font-semibold shadow-soft">
          {invite.opening.button}
        </motion.button>
        <p className="mt-4 text-xs text-white/60 font-sans">Tap to open · music will play</p>
      </motion.div>
    </motion.div>
  );
}

/* ---------- sections ---------- */

function Countdown({ target }: { target: Date }) {
  const c = useCountdown(target);
  return (
    <div className="mt-8 grid grid-cols-4 gap-2 max-w-sm mx-auto">
      {[{ v: c.days, l: 'Days' }, { v: c.hours, l: 'Hours' }, { v: c.mins, l: 'Minutes' }, { v: c.secs, l: 'Seconds' }].map(x => (
        <div key={x.l} className="rounded-2xl bg-white border border-line py-3 shadow-soft">
          <div className="font-display text-3xl font-bold text-brand tabular-nums leading-none">{String(x.v).padStart(2, '0')}</div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-ink-muted mt-1.5 font-sans">{x.l}</div>
        </div>
      ))}
    </div>
  );
}

function Hero({ invite }: { invite: Invite }) {
  const main = useMemo(() => {
    const ev = invite.events.find(e => e.dayOffset === 0) ?? invite.events[0];
    return eventTimes(invite, ev).start;
  }, [invite]);
  return (
    <section className="relative pt-14 pb-10 text-center">
      <OrnamentArt kind={invite.ornament} className="absolute left-1/2 -translate-x-1/2 top-4 w-[420px] h-[420px] text-brand opacity-[0.07] pointer-events-none" />
      <Reveal>
        <p className="text-sm font-semibold tracking-[0.1em] text-accent font-sans">{invite.hero.blessing}</p>
        <OrnamentArt kind={invite.ornament} className="w-24 h-24 mx-auto mt-5 text-brand" />
        <p className="mt-5 font-display text-xl text-ink-soft italic">{invite.hero.pre}</p>
        <h1 className="mt-2 font-script text-[64px] sm:text-[84px] leading-[1.05] text-brand">{invite.names}</h1>
        <p className="mt-2 font-display text-xl text-ink-soft">{invite.hero.post}</p>
        <div className="mt-7 inline-flex flex-col items-center gap-1 border-y border-accent/60 py-3 px-6">
          <span className="font-display text-2xl sm:text-3xl font-semibold">{fmtDate(main)}</span>
          <span className="text-sm text-ink-muted font-sans">{invite.events.length > 1 ? `${invite.events.length} celebrations · see the schedule below` : fmtTime(main)}</span>
        </div>
        <Countdown target={main} />
        <p className="mt-8 font-display text-lg italic text-ink-soft">“{invite.hero.line}”</p>
      </Reveal>
    </section>
  );
}

function Heading({ children }: { children: string }) {
  return (
    <div className="text-center mb-8">
      <h2 className="font-display text-4xl font-semibold text-brand">{children}</h2>
      <div className="mt-3 flex items-center justify-center gap-2 text-accent">
        <span className="h-px w-12 bg-accent/60" /><span className="w-1.5 h-1.5 rotate-45 bg-accent" /><span className="h-px w-12 bg-accent/60" />
      </div>
    </div>
  );
}

function Message({ invite }: { invite: Invite }) {
  return (
    <section className="py-10">
      <Reveal className="card p-7 sm:p-9 text-center">
        <h2 className="font-display text-3xl font-semibold text-brand">{invite.message.title}</h2>
        <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">{invite.message.text}</p>
        <p className="mt-5 font-script text-3xl text-accent">{invite.hosts.replace(/^With love, /, '')}</p>
      </Reveal>
    </section>
  );
}

function Events({ invite }: { invite: Invite }) {
  return (
    <section className="py-10" id="events">
      <Heading>{invite.events.length > 1 ? 'The celebrations' : 'The celebration'}</Heading>
      <div className="space-y-4">
        {invite.events.map((e, i) => {
          const { start, end } = eventTimes(invite, e);
          return (
            <Reveal key={e.name} delay={i * 0.06}>
              <article className="card p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="w-12 h-12 rounded-2xl bg-brand-soft text-brand grid place-items-center shrink-0"><Icon name={e.icon} /></span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-2xl font-semibold leading-tight">{e.name}</h3>
                    <div className="mt-2 space-y-1 text-sm text-ink-soft">
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-accent shrink-0" /> {fmtShort(start)} · {fmtTime(start)} – {fmtTime(end)}</div>
                      <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" /> <span>{e.venue}, {e.area}</span></div>
                    </div>
                    {e.note && <p className="mt-3 text-sm rounded-xl bg-accent-soft text-ink px-3 py-2">{e.note}</p>}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a href={calendarUrl(invite, e)} target="_blank" rel="noreferrer" className="btn-soft h-10"><CalendarPlus className="w-4 h-4" /> Add to calendar</a>
                      <a href={mapsUrl(e)} target="_blank" rel="noreferrer" className="btn-ghost h-10"><Navigation className="w-4 h-4" /> Directions</a>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
      <p className="mt-3 text-center text-xs text-ink-muted font-sans">Venues are samples, so Directions opens the area on Google Maps.</p>
    </section>
  );
}

function Story({ invite }: { invite: Invite }) {
  const s = invite.story!;
  return (
    <section className="py-10">
      <Heading>{s.title}</Heading>
      <ol className="relative border-l-2 border-accent/50 ml-4 space-y-8">
        {s.items.map((it, i) => (
          <Reveal key={it.when} delay={i * 0.08}>
            <li className="pl-7 relative">
              <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-brand ring-4 ring-paper" />
              <div className="font-display text-xl font-semibold text-brand">{it.when}</div>
              <p className="mt-1 text-ink-soft">{it.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Gallery({ invite }: { invite: Invite }) {
  const tints = ['bg-brand/80', 'bg-accent/80', 'bg-brand-dark/80', 'bg-accent/60', 'bg-brand/60', 'bg-brand-dark/60'];
  return (
    <section className="py-10">
      <Heading>Moments</Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {invite.gallery.map((caption, i) => (
          <Reveal key={caption} delay={(i % 3) * 0.06}>
            <figure className={`relative aspect-[4/5] rounded-2xl overflow-hidden ${tints[i % tints.length]} text-white`}>
              <OrnamentArt kind={invite.ornament} className="absolute -right-8 -bottom-8 w-40 h-40 opacity-25 text-white" />
              <ImageIcon className="absolute top-3 left-3 w-5 h-5 opacity-70" />
              <figcaption className="absolute bottom-3 left-3 right-3 font-display text-lg font-semibold leading-tight">{caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-ink-muted font-sans">Your real photos and videos go here.</p>
    </section>
  );
}

function RsvpSection({ invite }: { invite: Invite }) {
  const [list, setList] = useState<Rsvp[]>(() => loadRsvps(invite.slug));
  const [done, setDone] = useState<Rsvp | null>(null);
  const [name, setName] = useState('');
  const [coming, setComing] = useState(true);
  const [guests, setGuests] = useState(1);
  const [events, setEvents] = useState<string[]>(invite.events.map(e => e.name));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    if (name.trim().length < 2) return setError('Please enter your name.');
    if (coming && invite.rsvp.pickEvents && events.length === 0) return setError('Pick at least one event.');
    const r: Rsvp = { name: name.trim(), coming, guests: coming ? guests : 0, events: coming ? events : [], message: message.trim(), at: new Date().toISOString() };
    setList(saveRsvp(invite.slug, r));
    setDone(r);
    setError('');
  };

  return (
    <section className="py-10" id="rsvp">
      <Heading>{invite.rsvp.title}</Heading>
      <Reveal className="card p-6 sm:p-8">
        {done ? (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4" role="status">
            <span className="w-14 h-14 mx-auto rounded-full bg-brand text-white grid place-items-center"><Check className="w-7 h-7" /></span>
            <h3 className="mt-4 font-display text-3xl font-semibold">{done.coming ? `See you there, ${done.name}!` : `We'll miss you, ${done.name}.`}</h3>
            <p className="mt-2 text-ink-soft">
              {done.coming ? `We've saved ${done.guests} ${done.guests === 1 ? 'seat' : 'seats'} for you.` : 'Thank you for letting us know.'}
            </p>
            <p className="mt-3 text-xs text-ink-muted font-sans">Prototype: your reply is saved only in this browser. Nothing is sent to anyone.</p>
            <button onClick={() => setDone(null)} className="btn-ghost mt-5">Send another reply</button>
          </motion.div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-5 font-sans">
            <p className="text-center text-ink-soft font-display text-lg">{invite.rsvp.text}</p>
            <label className="block">
              <span className="text-sm font-semibold">Your name</span>
              <input value={name} onChange={e => setName(e.target.value)} autoComplete="name" placeholder="Your name"
                className="mt-1.5 w-full h-12 rounded-xl border border-line bg-white px-4 text-[15px] focus:border-brand outline-none" />
            </label>
            <div>
              <span className="text-sm font-semibold">Will you attend?</span>
              <div className="mt-1.5 grid grid-cols-2 gap-2" role="radiogroup">
                {[{ v: true, l: 'Joyfully accept' }, { v: false, l: 'Regretfully decline' }].map(o => (
                  <button key={o.l} type="button" role="radio" aria-checked={coming === o.v} onClick={() => setComing(o.v)}
                    className={`h-12 rounded-xl border text-sm font-semibold transition-colors ${coming === o.v ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink-soft hover:border-brand/50'}`}>
                    {o.l}
                  </button>
                ))}
              </div>
            </div>
            {coming && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold flex items-center gap-2"><Users className="w-4 h-4 text-accent" /> Number of guests</span>
                <div className="flex items-center gap-1 rounded-full border border-line bg-white p-1">
                  <button type="button" onClick={() => setGuests(g => Math.max(1, g - 1))} aria-label="Fewer guests" className="w-9 h-9 rounded-full hover:bg-brand-soft grid place-items-center"><Minus className="w-4 h-4" /></button>
                  <span className="w-8 text-center font-semibold tabular-nums" aria-live="polite">{guests}</span>
                  <button type="button" onClick={() => setGuests(g => Math.min(invite.rsvp.maxGuests, g + 1))} aria-label="More guests" className="w-9 h-9 rounded-full hover:bg-brand-soft grid place-items-center"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
            )}
            {coming && invite.rsvp.pickEvents && (
              <fieldset>
                <legend className="text-sm font-semibold">Which events will you attend?</legend>
                <div className="mt-2 grid sm:grid-cols-2 gap-2">
                  {invite.events.map(e => {
                    const on = events.includes(e.name);
                    return (
                      <label key={e.name} className={`flex items-center gap-3 rounded-xl border px-3 h-12 cursor-pointer ${on ? 'border-brand bg-brand-soft' : 'border-line bg-white'}`}>
                        <input type="checkbox" checked={on} onChange={() => setEvents(list => (on ? list.filter(x => x !== e.name) : [...list, e.name]))} className="accent-[rgb(var(--brand))] w-4 h-4" />
                        <span className="text-sm font-medium">{e.name}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            )}
            <label className="block">
              <span className="text-sm font-semibold">A message for the hosts <span className="font-normal text-ink-muted">(optional)</span></span>
              <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} maxLength={300} placeholder="Your wishes…"
                className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] focus:border-brand outline-none resize-none" />
            </label>
            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
            <button type="submit" className="btn-primary w-full h-12 text-[15px]">Send my reply</button>
          </form>
        )}
      </Reveal>
      <HostView invite={invite} list={list} />
    </section>
  );
}

/** Shows the host what they would see: a live summary of replies. */
function HostView({ invite, list }: { invite: Invite; list: Rsvp[] }) {
  const coming = list.filter(r => r.coming);
  const guests = coming.reduce((n, r) => n + r.guests, 0);
  return (
    <Reveal className="mt-5">
      <details className="rounded-3xl border border-dashed border-brand/40 bg-white/60 p-5 font-sans">
        <summary className="cursor-pointer font-semibold text-brand-dark">Host view: see the RSVP summary</summary>
        <p className="mt-2 text-xs text-ink-muted">In a real invitation only the hosts see this. In this prototype it shows the replies sent from this browser.</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[{ v: list.length, l: 'Replies' }, { v: coming.length, l: 'Attending' }, { v: guests, l: 'Total guests' }].map(x => (
            <div key={x.l} className="rounded-2xl bg-brand-soft py-3">
              <div className="font-display text-3xl font-bold text-brand">{x.v}</div>
              <div className="text-[11px] text-ink-muted">{x.l}</div>
            </div>
          ))}
        </div>
        {invite.rsvp.pickEvents && coming.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-sm">
            {invite.events.map(e => {
              const n = coming.filter(r => r.events.includes(e.name)).reduce((s, r) => s + r.guests, 0);
              return <li key={e.name} className="flex justify-between"><span>{e.name}</span><b>{n} guests</b></li>;
            })}
          </ul>
        )}
        {list.length > 0 ? (
          <ul className="mt-4 divide-y divide-line text-sm">
            {list.slice(0, 6).map(r => (
              <li key={r.name + r.at} className="py-2.5">
                <div className="flex justify-between gap-3">
                  <b>{r.name}</b>
                  <span className={r.coming ? 'text-green-700' : 'text-ink-muted'}>{r.coming ? `Coming · ${r.guests}` : 'Not coming'}</span>
                </div>
                {r.message && <p className="text-ink-soft mt-0.5 flex gap-1.5"><MessageCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" /> {r.message}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-ink-muted">No replies yet. Send one above to see it here.</p>
        )}
      </details>
    </Reveal>
  );
}

function Footer({ invite, next }: { invite: Invite; next?: Invite }) {
  return (
    <footer className="pt-10 text-center">
      <OrnamentArt kind={invite.ornament} className="w-16 h-16 mx-auto text-accent" />
      <p className="mt-3 font-script text-4xl text-brand">{invite.hosts}</p>
      <div className="mt-10 card p-6 font-sans">
        <p className="text-sm text-ink-soft">
          This is a sample <b className="text-ink">{invite.kind.toLowerCase()}</b> invitation from{' '}
          <a href="#/" className="font-semibold text-brand hover:underline">Trinity Invitation (Prototype)</a> by{' '}
          <a href={TRINITY_URL} target="_blank" rel="noreferrer" className="font-semibold text-brand hover:underline">Trinity Tech</a>.
          The names, venues and dates are made up.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <a href={START_PROJECT_URL} target="_blank" rel="noreferrer" className="btn-primary">Get an invitation like this <ArrowUpRight className="w-4 h-4" /></a>
          {next ? <a href={`#/${next.slug}`} className="btn-ghost">Next: {next.kind} →</a> : <a href="#/" className="btn-ghost">All models</a>}
        </div>
        <div className="mt-5"><TrinityCredit /></div>
      </div>
    </footer>
  );
}
