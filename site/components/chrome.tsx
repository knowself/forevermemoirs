import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-ink/10 bg-parchment">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.jpg" alt="ForeverMemoirs" className="h-10 w-auto" />
          <span className="font-serif text-xl tracking-tight">ForeverMemoirs</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/about" className="hover:text-gold">Our Story</Link>
          <Link href="/order" className="rounded-full bg-ink px-5 py-2 text-parchment hover:bg-gold hover:text-ink">
            Restore a Photo
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-parchment/70">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm">
        <p className="font-serif text-lg text-parchment">No life story should go untold.</p>
        <p className="mt-2">Your films and photos belong to you — always.</p>
        <p className="mt-4 text-parchment/40">© {new Date().getFullYear()} ForeverMemoirs</p>
      </div>
    </footer>
  );
}
