import type { Localized } from "./apps";

/**
 * Blog post catalog — the single source of truth for every post.
 *
 * Adding a post = one entry here + an image under /public/blog/<slug>/ if it
 * has one. No layout code changes. Never rename a published slug (URLs are
 * the contract); if forced, add a redirect in next.config.ts.
 *
 * Read this file only through the accessors in lib/posts.ts so a future move
 * to a DB/CMS touches one file.
 */

export type BlogPost = {
  /** URL segment. Stable, English, lowercase-kebab. */
  slug: string;
  /** ISO date. Posts are listed newest first. */
  publishedDate: string;
  /** Path under /public, or omitted for a text-only post. */
  coverImage?: string;
  title: Localized<string>;
  /** One or two sentences — used as the index teaser and the meta description. */
  summary: Localized<string>;
  /** Paragraphs, in order. Keep each paragraph plain text — no embedded markup. */
  body: Localized<string[]>;
};

export const posts: BlogPost[] = [
  {
    slug: "couple-app-long-distance-relationships",
    publishedDate: "2026-08-24",
    title: { en: "The Couple App Built for Long-Distance Relationships" },
    summary: {
      en: "Why a couple app that understands time zones — not just another video call — is what actually closes the distance between long-distance partners.",
    },
    body: {
      en: [
        "Long-distance couples don't lack tools. They have video calls, group chats, shared calendars — a full stack of apps that promise closeness and mostly deliver scheduling. What's missing isn't communication. It's the ordinary hours in between: the walk to work, the second coffee, the five minutes staring out a train window. A couple app built specifically for distance has to solve for that gap, not just make calling easier.",
        "The core problem with long distance is time itself. If you're six or nine hours apart, your morning is their evening, and by the time you're both free to talk, the day you actually wanted to share has already happened and gotten summarized down to \"it was fine.\" A good couple app should treat that time difference as the actual design problem, not an inconvenience to work around with better scheduling.",
        "This is where HourStory works differently from a messaging app repurposed for couples. Every moment you capture is stamped in your own local hour, not a shared clock — so your 9am in Lisbon sits honestly beside their 3pm in Toronto, and neither of you has to do the math to know what part of the other's day you're looking at. You're not scheduling a catch-up. You're watching a day happen, on the timeline it actually happened in.",
        "It also solves the specific cruelty of being asleep for someone else's whole day. If you wake up to six hours you missed, HourStory turns them into a short film instead of a wall of texts to scroll through — the coffee, the commute, the light at their desk, replayed in order over your own morning coffee. That's the difference between catching up and actually being there for a day you weren't awake for.",
        "None of this requires giving up the tools you already use. A couple app for long distance isn't meant to replace your calls — it's meant to fill the eighteen hours a day those calls can't cover. HourStory sits quietly in the background of an ordinary Tuesday, one hourly nudge at a time, so that when you do talk, you're not starting from \"so what did I miss,\" you're starting from something you already watched happen.",
        "If distance is the shape of your relationship right now, the right couple app should feel less like another notification and more like a window that's always slightly open. That's what HourStory is built to be — free to download, built for exactly two people, and paired in under a minute.",
      ],
    },
  },
  {
    slug: "couple-app-different-shifts",
    publishedDate: "2026-08-17",
    title: { en: "The Couple App for Couples on Opposite Shifts" },
    summary: {
      en: "Night shifts, early starts, opposite calendars — the right couple app doesn't need you awake at the same time to keep your days connected.",
    },
    body: {
      en: [
        "Shift work does something specific to a relationship: it doesn't remove time together, it removes overlap. A nurse on nights and a partner working nine-to-five can share a bed, a home, even a coffee at the door as one of you leaves and the other gets in — and still go days without a real conversation. A couple app for this situation has to work without assuming you're both awake at once, which is exactly what most messaging apps quietly assume.",
        "The usual advice — schedule a call, protect your evenings — sounds right until you actually try to run a relationship on it. Schedules change. Overtime happens. And \"we'll catch up tomorrow\" becomes the sentence that quietly eats a week. What opposite-shift couples actually need isn't a better calendar. It's a way to hand someone your day even when you can't hand them the conversation.",
        "HourStory was built around exactly that gap. Instead of asking you to narrate your shift after the fact, it nudges you once an hour to capture whatever's actually happening — the quiet ward at 3am, the empty office at lunch, the walk home while the sky is doing something the other person will never see live. None of it needs a reply in the moment. It just needs to exist, waiting.",
        "The part that matters most for shift work is what happens when you wake up. Instead of a backlog of unread messages, your partner's whole shift plays back as a short film — in order, in minutes, over your own breakfast. It's the closest thing to having been there that a couple app can honestly offer, and it costs neither of you the sleep a phone call would.",
        "There's also a quieter feature that matters more than it sounds: you're allowed to miss hours. Slept through a chunk of the day? Mark it and move on. A couple app that guilts you for the hours you were unconscious isn't built for real shift work — HourStory just picks the story back up.",
        "If your calendars barely touch, the right couple app doesn't try to force a shared schedule onto two lives that don't have one. It gives you a way to be present in hours the other person is asleep for — which, for a lot of shift-work couples, turns out to be most of the relationship.",
      ],
    },
  },
  {
    slug: "couple-app-frequent-travel",
    publishedDate: "2026-08-10",
    title: { en: "The Couple App for Couples Who Travel for Work" },
    summary: {
      en: "Business trips don't have to flatten a week into \"so, what did I miss.\" The right couple app keeps you woven into each other's days from any airport.",
    },
    body: {
      en: [
        "Business travel has a predictable shape: you leave, life keeps happening on both ends, and you come home to a week you have to reconstruct in a single conversation. The partner who stayed has to decide what's worth mentioning. The partner who traveled has to ask enough questions to feel caught up without it turning into an interview. A couple app built for this rhythm should remove the reconstruction entirely, not just make the debrief conversation faster.",
        "What actually gets lost on a work trip usually isn't the big things — anyone remembers to mention a promotion or a doctor's appointment. It's the small hours: the dog stealing your side of the couch, the delayed gate, the hotel window looking out at a city neither of you knows well. Those are exactly the details too small to text and too easy to forget by the time you're both free to talk.",
        "HourStory is built to catch those hours as they happen instead of relying on either of you to remember them later. One nudge an hour, a photo or a five-second video, sent or queued the moment you have signal. It doesn't need a long message — a coffee shop and a caption is the whole point.",
        "Travel is also where most couple apps quietly fall apart, because they assume constant connectivity. HourStory doesn't: it's offline-first, so a flight in airplane mode doesn't lose your gate, your delayed layover, or the skyline from seat 14A — everything queues and sends the second you land. A couple app for frequent travelers has to treat no signal for six hours as the normal case, not the exception.",
        "The other thing that matters on a trip is being able to react to a specific hour, not just the trip as a whole. A comment lands on the actual photo of the skyline, not buried three messages deep in a thread about flight delays. It turns \"how was the trip\" into something you've already half-answered together before you've even landed.",
        "If your calendar has more departure gates than dinners at home, the right couple app isn't the one that reminds you to call. It's the one that keeps the two of you inside the same story even when one of you is thirty thousand feet up — so coming home stops feeling like catching up, and starts feeling like walking back into a day you were already part of.",
      ],
    },
  },
  {
    slug: "couple-app-military-deployment",
    publishedDate: "2026-08-03",
    title: { en: "The Couple App Military Couples Use to Stay Close" },
    summary: {
      en: "Unpredictable schedules, limited bandwidth, long silences that are nobody's fault — what a couple app actually needs to offer military families.",
    },
    body: {
      en: [
        "Deployment doesn't just create distance — it creates unpredictability, which is harder. Calls get cancelled without warning. Bandwidth is precious and sometimes nonexistent. Silences stretch for reasons that have nothing to do with how much two people miss each other. A couple app built for military families has to work inside those constraints instead of pretending they don't exist.",
        "Most communication tools assume a reliable connection and a shared moment to use it. Neither is guaranteed on deployment. What's needed instead is something that can hold a moment until it's possible to send it, and that doesn't demand bandwidth a base or a ship rarely has to spare — because \"we'll talk when I can\" only works if there's a way to keep the in-between from disappearing entirely.",
        "HourStory compresses what it sends before it sends it, and queues offline, so a single photo of a sunrise over the base or a text moment scribbled at chow gets through in conditions where a video call never would. It's built around the assumption that connectivity will be rare and worth using well, not constant.",
        "What it gives back on the other end matters just as much. The partner at home isn't waiting for updates that may not come — they're capturing their own hours too, the first day of school, the garden, the version of an ordinary Tuesday that deployment makes precious. Every one of those hours is there, hearted and waiting, whenever a connection allows either of you to look.",
        "Privacy matters more here than almost anywhere else. A couple app used across a deployment should be locked down by default — an app lock, a private mode, a story that belongs to exactly two people and no one else. HourStory treats that as a baseline, not a setting to dig for.",
        "And then there's what deployment eventually ends with: coming home. A year kept in small, dated hours becomes something you can actually walk through together — not a gap you have to explain, but a story you both already know, one you just haven't watched side by side yet. That's what a couple app owes a military family: not a way to talk more, but a way to make sure nothing that happened gets lost before you're back on the same couch.",
      ],
    },
  },
  {
    slug: "couple-app-new-relationships",
    publishedDate: "2026-07-27",
    title: { en: "The Couple App for the First Months of a Relationship" },
    summary: {
      en: "Early in a relationship, the fastest way to feel close isn't a highlight reel — it's a couple app that shows someone your ordinary day, one hour at a time.",
    },
    body: {
      en: [
        "Early in a relationship, you're curious about everything — what their desk looks like, what mug they use every morning, what their walk to work actually looks like. Most of that curiosity has nowhere to go except a slow accumulation of stories over dinner, months of conversation to reconstruct what a partner's ordinary Tuesday even looks like. A couple app built for new relationships can shortcut that entirely, by just showing you.",
        "The instinct with a new couple is usually to reach for something social — a shared account, a joint photo album, the digital equivalent of introducing someone to your friends. But what actually builds closeness fast isn't a highlight reel. It's the unremarkable stuff: the chaotic desk, the sandwich place you keep mentioning, the walk home nobody thought to photograph before. A good couple app for a new relationship should be built for the ordinary, not the impressive.",
        "HourStory works well here precisely because it doesn't ask for anything performative. One nudge an hour, answer or skip, no streak to protect and nothing to curate. Three weeks in, that adds up to actually knowing someone's coffee order, their bus stop, the exact light in their kitchen at eight in the morning — the kind of texture that used to take months of stories to build.",
        "It's also, practically, the easiest kind of couple app to start using together, since it takes one invite link and a couple of minutes to pair. New couples get a taste of what that looks like with a short trial of the full app, free — enough time to decide if a daily ritual like this is something you actually want, rather than something you have to commit to sight unseen.",
        "There's a small mechanic worth mentioning: streaks. Not the addictive kind, just a quiet marker of a shared habit compounding — day seven feels sweet, day one hundred starts to feel like something real. For a new couple, that's often the first shared ritual that isn't tied to seeing each other in person, which matters more than it sounds like it should.",
        "If you're in the part of a relationship where you want to know everything and there's no polite way to ask for all of it at once, a couple app built around ordinary hours does something a highlight reel never could — it lets someone else's day become familiar before you've even had time to get used to their name in your phone.",
      ],
    },
  },
  {
    slug: "couple-app-married-couples",
    publishedDate: "2026-07-20",
    title: { en: "The Couple App for Busy Married Couples" },
    summary: {
      en: "Living together doesn't guarantee you see each other's days. A couple app built for busy married couples brings back the hours you've started summarizing as \"fine.\"",
    },
    body: {
      en: [
        "Marriage solves a lot of the problems long-distance and new relationships have to work around — you share a home, a bed, usually an evening. What it doesn't automatically solve is actually seeing each other's days. Between work, kids, and the logistics of running a shared life, it's entirely possible to live with someone for a decade and still summarize your entire day as \"fine\" every single evening. A couple app for married couples has to solve for proximity without connection, which is a stranger problem than distance.",
        "The hours that go missing in a long marriage aren't the big ones — anniversaries and appointments make it onto a shared calendar just fine. It's the middle of the day that disappears: the 2pm slump, the funny thing someone said in a meeting, the song that came on in the car. Those used to be the exact things new couples texted each other about constantly, and somewhere around year five or ten, they quietly stop being mentioned at all.",
        "HourStory brings that middle-of-the-day texture back without adding another thing to a calendar that's already full. One gentle nudge an hour, a photo or a voice note, no pressure to narrate anything — just enough to give your partner the two-thirds of your day you currently compress into one word.",
        "What makes it work for a married couple specifically is that you already have the evening. HourStory doesn't ask you to carve out new time — it gives you something to do with time you already share, replaying the day's story together on the couch instead of asking \"how was your day\" and getting the same three-word answer you got yesterday.",
        "There's also a longer arc to it: monthly and yearly recaps that turn a year of ordinary Tuesdays into something closer to a montage — the kind of thing you don't think you'll care about until you're watching it a year later. For a couple whose relationship has mostly turned into logistics, that's a quiet way to remember it was never just that.",
        "If you live with your partner and still feel like you're catching up on their day every evening, the right couple app isn't another scheduling tool. It's a way to actually see the hours you're already sharing a roof with — which, for most married couples, turns out to be the thing that went missing first.",
      ],
    },
  },
];
