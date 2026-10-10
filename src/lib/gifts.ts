// Shared gift-certificate catalog and helpers.
// The postcard is the hello; the memoir is the life.

export interface GiftTier {
  id: string;
  name: string;
  price: string;
  amountCents: number;
  unit: string;
  turnaround: string;
  badge?: string;
  desc: string;
  giftBlurb: string;
}

export const GIFT_TIERS: GiftTier[] = [
  {
    id: "videopostcard",
    name: "VideoPostcard",
    price: "$79",
    amountCents: 7900,
    unit: "gift",
    turnaround: "3 to 5 Days",
    badge: "The Hello",
    desc: "A 60-second musical video postcard woven from restored family photos — the perfect hello before the memoir.",
    giftBlurb:
      "The giftable hello: three cherished photos restored and woven into a 60-second musical video postcard they can share with everyone.",
  },
  {
    id: "rescue",
    name: "Memory Rescue",
    price: "$49",
    amountCents: 4900,
    unit: "per photo",
    turnaround: "48 Hours",
    badge: "Front Door",
    desc: "Single photo archival restoration with facial fidelity preservation.",
    giftBlurb:
      "One faded, torn, or water-stained photo brought back to life — museum-grade restoration, ready to frame.",
  },
  {
    id: "shoebox",
    name: "The Shoebox",
    price: "$149",
    amountCents: 14900,
    unit: "package",
    turnaround: "3 to 4 Days",
    badge: "Most Popular Gift",
    desc: "5 photos restored + 60-second video tribute with original acoustic music.",
    giftBlurb:
      "Five family photos restored and woven into a moving 60-second video tribute with original music.",
  },
  {
    id: "memoir",
    name: "The Memoir Film",
    price: "$997",
    amountCents: 99700,
    unit: "one-time",
    turnaround: "2 Weeks",
    badge: "Documentary",
    desc: "Guided remote Zoom oral history interview, 10–15 min film, 25 restored photos.",
    giftBlurb:
      "A broadcast-quality personal documentary: a guided life-story interview woven with restored photos into a 10–15 minute film.",
  },
  {
    id: "biography",
    name: "The Biography",
    price: "$2,997",
    amountCents: 299700,
    unit: "one-time",
    turnaround: "3 to 4 Weeks",
    badge: "Archival Legacy",
    desc: "Multi-session family interviews, full archival treatment, 25–35 min definitive film.",
    giftBlurb:
      "The definitive film of a life: multi-session interviews and full archival treatment in a 25–35 minute biography.",
  },
];

export function giftTierById(id: string): GiftTier | undefined {
  return GIFT_TIERS.find((t) => t.id === id);
}

// Codes look like FM-7X2K9P — no ambiguous characters (0/O, 1/I/L).
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function generateGiftCode(): string {
  let suffix = "";
  // crypto.getRandomValues is available in Node 20+ and edge runtimes.
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  for (const b of bytes) suffix += CODE_ALPHABET[b % CODE_ALPHABET.length];
  return `FM-${suffix}`;
}

export const GIFT_POLICY_VERSION = "2026-10-09";
