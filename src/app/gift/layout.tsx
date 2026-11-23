import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Give a Gift — ForeverMemoirs",
  description:
    "Buy any tier as a gift. Your recipient gets a beautiful certificate instantly — and redeems it whenever they're ready, even after the holidays.",
};

export default function GiftLayout({ children }: { children: React.ReactNode }) {
  return children;
}
