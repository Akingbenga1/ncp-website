import Link from "next/link";

const variants = [
  { href: "/", label: "Home 1" },
  { href: "/home-2", label: "Home 2" },
  { href: "/home-3", label: "Home 3" },
  { href: "/home-4", label: "Home 4" },
] as const;

type HeroVariantNavProps = {
  current: "/" | "/home-2" | "/home-3" | "/home-4";
  tone?: "light" | "dark" | "pill";
};

export function HeroVariantNav({
  current,
  tone = "light",
}: HeroVariantNavProps) {
  return (
    <nav
      className={`hero-variant-nav hero-variant-nav--${tone}`}
      aria-label="Home hero variants"
    >
      <ul>
        {variants.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={item.href === current ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
