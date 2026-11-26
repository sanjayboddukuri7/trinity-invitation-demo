import { useEffect, useLayoutEffect, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import {
  Sun, Music, Heart, Sparkles, PartyPopper, Flame, Utensils, Gem, CalendarDays, ArrowLeft, ArrowRight, LayoutGrid, MessageCircle,
  type LucideIcon,
} from 'lucide-react';
import type { Invite, InviteEvent } from './invites';

export const TRINITY_URL = 'https://trinity-tech.vercel.app';
export const START_PROJECT_URL = `${TRINITY_URL}/project?category=${encodeURIComponent('Event / Wedding Invitation')}`;
export const trinityWhatsapp = (about: string) =>
  `https://wa.me/917075452718?text=${encodeURIComponent(`Hi Trinity Tech, I saw ${about} in Trinity Invitation (Prototype) and would like a digital invitation.`)}`;

const ICONS: Record<string, LucideIcon> = {
  sun: Sun, music: Music, heart: Heart, sparkles: Sparkles, party: PartyPopper, flame: Flame, utensils: Utensils, gem: Gem,
};
export function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const I = ICONS[name] ?? CalendarDays;
  return <I className={className} aria-hidden />;
}

/* ---------- routing: "#/wedding" -> "wedding" ---------- */

const parse = () => window.location.hash.replace(/^#\/?/, '').split('/')[0] || '';
export function useRoute(): string {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const on = () => {
      setRoute(parse());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: reduce ? 'auto' : 'smooth' });
}

/* ---------- theme ---------- */

type Theme = Invite['theme'];
export function useTheme(t: Theme | null) {
  useLayoutEffect(() => {
    if (!t) return;
    const vars: Record<string, string> = {
      brand: t.brand, 'brand-dark': t.brandDark, 'brand-soft': t.brandSoft, accent: t.accent, 'accent-soft': t.accentSoft,
      paper: t.paper, line: t.line, ink: t.ink, 'ink-soft': t.inkSoft, 'ink-muted': t.inkMuted,
      'font-display': t.display, 'font-script': t.script,
    };
    const root = document.documentElement.style;
    Object.entries(vars).forEach(([k, v]) => root.setProperty(`--${k}`, v));
    return () => Object.keys(vars).forEach(k => root.removeProperty(`--${k}`));
  }, [t]);
}

/* ---------- animation ---------- */

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ---------- dates (fixed per visitor so they stay in the future) ---------- */

const KEY = (slug: string, what: string) => `trinity-invitation-demo:${slug}:${what}`;

export function mainDate(invite: Invite): Date {
  let ms = 0;
  try {
    ms = Number(localStorage.getItem(KEY(invite.slug, 'date')));
  } catch { /* ignore */ }
  // keep the date until a day after the last event, then roll forward
  if (!ms || ms + 2 * 86_400_000 < Date.now()) {
    const d = new Date();
    d.setDate(d.getDate() + invite.daysAway);
    d.setHours(0, 0, 0, 0);
    ms = d.getTime();
    try {
      localStorage.setItem(KEY(invite.slug, 'date'), String(ms));
    } catch { /* ignore */ }
  }
  return new Date(ms);
}

export function eventTimes(invite: Invite, e: InviteEvent) {
  const base = mainDate(invite);
  const at = (hhmm: string) => {
    const [h, m] = hhmm.split(':').map(Number);
    const d = new Date(base);
    d.setDate(d.getDate() + e.dayOffset);
    d.setHours(h, m, 0, 0);
    return d;
  };
  return { start: at(e.start), end: at(e.end) };
}

export const fmtDate = (d: Date) => d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
export const fmtShort = (d: Date) => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
export const fmtTime = (d: Date) => d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });

const gcal = (d: Date) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}00`;

export function calendarUrl(invite: Invite, e: InviteEvent) {
  const { start, end } = eventTimes(invite, e);
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${e.name} · ${invite.names}`,
    dates: `${gcal(start)}/${gcal(end)}`,
    details: `${e.note ?? ''}\nSample invitation from Trinity Invitation (Prototype) by Trinity Tech.`,
    location: `${e.venue}, ${e.area}`,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

/** Venues are made up, so directions open the area on Google Maps. */
export const mapsUrl = (e: InviteEvent) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.area)}`;

export function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const s = Math.max(0, Math.floor((target.getTime() - now) / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), mins: Math.floor((s % 3600) / 60), secs: s % 60 };
}

/* ---------- RSVPs (browser only) ---------- */

export interface Rsvp {
  name: string;
  coming: boolean;
  guests: number;
  events: string[];
  message: string;
  at: string;
}

export function loadRsvps(slug: string): Rsvp[] {
  try {
    const list = JSON.parse(localStorage.getItem(KEY(slug, 'rsvps')) || '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveRsvp(slug: string, r: Rsvp): Rsvp[] {
  const list = [r, ...loadRsvps(slug).filter(x => x.name.toLowerCase() !== r.name.toLowerCase())];
  try {
    localStorage.setItem(KEY(slug, 'rsvps'), JSON.stringify(list));
  } catch { /* ignore */ }
  return list;
}

/* ---------- Trinity prototype chrome ---------- */

export function ModelBar({ invite, index, total, prev, next }: { invite: Invite; index: number; total: number; prev?: Invite; next?: Invite }) {
  return (
    <div role="note" className="bg-gradient-to-r from-[#b8741a] via-[#e8a33d] to-[#f6d28a] text-[#1b1407] text-[12.5px] font-sans">
      <div className="wrap py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
        <a href="#/" className="inline-flex items-center gap-1.5 font-semibold hover:underline underline-offset-2">
          <LayoutGrid className="w-3.5 h-3.5" /> All invitation models
        </a>
        <span className="flex items-center gap-2">
          <span className="rounded-full bg-[#1b1407] text-[#f6c66b] px-2 py-0.5 text-[10.5px] font-bold tracking-[0.14em]">PROTOTYPE</span>
          <span>Model {index + 1} of {total}: <b>{invite.kind}</b> invitation</span>
        </span>
        <span className="flex items-center gap-3 font-semibold">
          {prev && <a href={`#/${prev.slug}`} className="inline-flex items-center gap-1 hover:underline underline-offset-2"><ArrowLeft className="w-3.5 h-3.5" /> Prev</a>}
          {next && <a href={`#/${next.slug}`} className="inline-flex items-center gap-1 hover:underline underline-offset-2">Next <ArrowRight className="w-3.5 h-3.5" /></a>}
        </span>
      </div>
    </div>
  );
}

export function TrinityCredit({ dark = false }: { dark?: boolean }) {
  return (
    <a href={TRINITY_URL} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 text-xs font-sans ${dark ? 'text-white/60' : 'text-ink-muted'}`}>
      <img src="/mark.png" alt="" className="w-6 h-5 object-contain" />
      <span className={`font-brand tracking-[0.14em] ${dark ? 'text-white' : 'text-ink'}`}>TRINITY TECH</span>
      <span>· Build. Innovate. Transform.</span>
    </a>
  );
}

export function TrinityWhatsApp({ about }: { about: string }) {
  return (
    <a href={trinityWhatsapp(about)} target="_blank" rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-[#062b14] px-4 h-11 font-semibold text-sm font-sans">
      <MessageCircle className="w-4 h-4" /> Ask Trinity Tech
    </a>
  );
}
