import type { Core } from "@strapi/strapi";

type SeedEvent = {
  title: string;
  slug: string;
  startsAt: string;
  endsAt?: string;
  venue: string;
  summary: string;
  description: string;
};

type SeedNews = {
  title: string;
  slug: string;
  date: string;
  summary: string;
  body: string;
};

type SeedListing = {
  name: string;
  slug: string;
  category:
    | "business"
    | "community-group"
    | "church"
    | "association"
    | "service"
    | "other";
  summary: string;
  locality?: string;
  contactPhone?: string;
  contactEmail?: string;
  websiteUrl?: string;
};

/** Launch starter copy — create-if-missing by slug; never overwrite admin edits. */
const LAUNCH_EVENTS: SeedEvent[] = [
  {
    title: "Community Meet & Greet",
    slug: "community-meet-greet",
    startsAt: "2026-09-15T18:00:00.000Z",
    endsAt: "2026-09-15T20:00:00.000Z",
    venue: "Peterborough Central Library",
    summary: "An evening to welcome new members and reconnect with familiar faces.",
    description:
      "Join Nigerian Community Peterborough for an informal meet and greet. Whether you are new to Peterborough or have been part of NCP for years, come along, share refreshments, and hear about upcoming activities. Families and friends are welcome. For directions or to let us know you are coming, contact Theresa on the NCP EXCO line.",
  },
  {
    title: "NCP Autumn Family Day",
    slug: "ncp-autumn-family-day",
    startsAt: "2026-10-11T13:00:00.000Z",
    endsAt: "2026-10-11T17:00:00.000Z",
    venue: "Nene Park, Peterborough",
    summary: "Outdoor afternoon of games, food, and community for all ages.",
    description:
      "Spend an autumn afternoon with NCP at Nene Park. Expect light games for children, music, and space to meet other Nigerian families in Peterborough. Bring a picnic blanket; refreshments will be available. Volunteers are welcome — message the EXCO line if you can help on the day.",
  },
];

const LAUNCH_NEWS: SeedNews[] = [
  {
    title: "Welcome to the new NCP website",
    slug: "welcome-new-ncp-website",
    date: "2026-08-23",
    summary: "Our digital home is live — events, news, and ways to get involved in one place.",
    body: `Nigerian Community Peterborough now has an official website.

This is where you will find upcoming events, community news, membership registration, our business and community directory, and how to support NCP through donations.

We will keep updating the site as activities grow. If you spot something that needs correcting, or you have a photo or listing to share, email Theresa at theresa.okogwa@naijacp.co.uk or call the NCP EXCO line.`,
  },
  {
    title: "Membership registration is open",
    slug: "membership-registration-open",
    date: "2026-08-24",
    summary: "Create a free NCP member account and tell us how you want to get involved.",
    body: `Membership of Nigerian Community Peterborough is free.

You can register on this website with your name, email, phone, area, and how you would like to take part — as a member, volunteer, business listing, or other. There is no approval wait: once you register, your account is active.

After you join, you can update your profile any time. Admins will use membership details only to run community activities and keep you informed. Questions? Contact Theresa Okogwa at theresa.okogwa@naijacp.co.uk.`,
  },
];

/**
 * Starter directory — NCP org + one existing business, plus one NCP programme
 * placeholder per remaining Market category so empty-state chips can be exercised.
 * Do not invent private shops; client adds real listings + photo rights via NH-9.
 */
const LAUNCH_LISTINGS: SeedListing[] = [
  {
    name: "Nigerian Community Peterborough",
    slug: "nigerian-community-peterborough",
    category: "community-group",
    locality: "Peterborough",
    contactPhone: "+44 7737 742387",
    contactEmail: "theresa.okogwa@naijacp.co.uk",
    summary:
      "NCP connects Nigerian families and friends across Peterborough through events, news, membership, and community support. Contact Theresa Okogwa or the EXCO line to get involved, suggest a directory listing, or ask about volunteering.",
  },
  {
    name: "Mama T's Kitchen & Catering",
    slug: "mama-ts-kitchen-catering",
    category: "business",
    locality: "PE1 Central, Peterborough",
    contactPhone: "+44 7737 742387",
    contactEmail: "theresa.okogwa@naijacp.co.uk",
    summary:
      "Authentic Nigerian party jollof, goat meat pepper soup, puff-puff trays, fried plantain, and bespoke event catering across Cambridgeshire. Food for naming ceremonies, family celebrations, and weekend takeaway.",
  },
  {
    name: "Peterborough Nigerian Christian Fellowship",
    slug: "peterborough-nigerian-christian-fellowship",
    category: "church",
    locality: "Peterborough",
    contactPhone: "+44 7737 742387",
    contactEmail: "theresa.okogwa@naijacp.co.uk",
    summary:
      "Sunday fellowship and midweek prayer for Nigerian families in Peterborough. Contact NCP for gathering times and how to join.",
  },
  {
    name: "NCP Women's Network",
    slug: "ncp-womens-network",
    category: "association",
    locality: "Peterborough",
    contactPhone: "+44 7737 742387",
    contactEmail: "theresa.okogwa@naijacp.co.uk",
    summary:
      "Peer support, skills sharing, and social gatherings for women in the NCP community. Ask Theresa how to take part.",
  },
  {
    name: "NCP New Arrival Advice",
    slug: "ncp-new-arrival-advice",
    category: "service",
    locality: "Peterborough",
    contactPhone: "+44 7737 742387",
    contactEmail: "theresa.okogwa@naijacp.co.uk",
    summary:
      "Signposting for families new to Peterborough — housing, schools, and community welcome. NCP does not give legal advice; we help you find the right door.",
  },
  {
    name: "NCP Youth Circle",
    slug: "ncp-youth-circle",
    category: "other",
    locality: "Peterborough",
    contactPhone: "+44 7737 742387",
    contactEmail: "theresa.okogwa@naijacp.co.uk",
    summary:
      "Informal youth hangouts and mentoring alongside NCP family events. Message the EXCO line if a young person in your household wants to join.",
  },
];

async function ensureEvent(
  strapi: Core.Strapi,
  seed: SeedEvent,
): Promise<"created" | "exists"> {
  const existing = await strapi.documents("api::event.event").findMany({
    filters: { slug: seed.slug },
    pageSize: 1,
  });

  if (existing.length > 0) return "exists";

  await strapi.documents("api::event.event").create({
    data: {
      title: seed.title,
      slug: seed.slug,
      startsAt: seed.startsAt,
      ...(seed.endsAt ? { endsAt: seed.endsAt } : {}),
      venue: seed.venue,
      summary: seed.summary,
      description: seed.description,
    },
    status: "published",
  });

  return "created";
}

async function ensureNews(
  strapi: Core.Strapi,
  seed: SeedNews,
): Promise<"created" | "exists"> {
  const existing = await strapi
    .documents("api::news-article.news-article")
    .findMany({
      filters: { slug: seed.slug },
      pageSize: 1,
    });

  if (existing.length > 0) return "exists";

  await strapi.documents("api::news-article.news-article").create({
    data: {
      title: seed.title,
      slug: seed.slug,
      date: seed.date,
      summary: seed.summary,
      body: seed.body,
    },
    status: "published",
  });

  return "created";
}

async function ensureListing(
  strapi: Core.Strapi,
  seed: SeedListing,
): Promise<"created" | "exists"> {
  const existing = await strapi.documents("api::listing.listing").findMany({
    filters: { slug: seed.slug },
    pageSize: 1,
  });

  if (existing.length > 0) return "exists";

  await strapi.documents("api::listing.listing").create({
    data: {
      name: seed.name,
      slug: seed.slug,
      category: seed.category,
      summary: seed.summary,
      ...(seed.locality ? { locality: seed.locality } : {}),
      ...(seed.contactPhone ? { contactPhone: seed.contactPhone } : {}),
      ...(seed.contactEmail ? { contactEmail: seed.contactEmail } : {}),
      ...(seed.websiteUrl ? { websiteUrl: seed.websiteUrl } : {}),
    },
    status: "published",
  });

  return "created";
}

/**
 * Seed launch Events, News Articles, and starter Listings if missing.
 * Idempotent by slug — safe on every Strapi boot.
 */
export async function seedLaunchContent(strapi: Core.Strapi) {
  let eventsCreated = 0;
  let newsCreated = 0;
  let listingsCreated = 0;

  for (const event of LAUNCH_EVENTS) {
    const result = await ensureEvent(strapi, event);
    if (result === "created") eventsCreated += 1;
  }

  for (const article of LAUNCH_NEWS) {
    const result = await ensureNews(strapi, article);
    if (result === "created") newsCreated += 1;
  }

  for (const listing of LAUNCH_LISTINGS) {
    const result = await ensureListing(strapi, listing);
    if (result === "created") listingsCreated += 1;
  }

  if (eventsCreated > 0 || newsCreated > 0 || listingsCreated > 0) {
    strapi.log.info(
      `Launch seed: created ${eventsCreated} event(s), ${newsCreated} news article(s), ${listingsCreated} listing(s)`,
    );
  }
}
