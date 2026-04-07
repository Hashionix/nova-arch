import { getSiteConfig } from "@/content/repository";
import {
  featuredPathways,
  footerGroups,
  legalLinks,
  mainNavigation,
  socialPlaceholders,
  studioEmail,
} from "@/content/siteShell";
import { cn } from "@/lib/cn";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export function AppLayout() {
  const config = getSiteConfig();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="grain-overlay min-h-screen bg-base-100 text-base-content">
      <a href="#main-content" className="skip-link focus-visible:translate-y-0">
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-base-300/75 bg-base-100/90 backdrop-blur-xl">
        <div className="container-editorial flex items-center justify-between gap-6 py-4">
          <div className="flex items-center gap-3">
            <NavLink
              className="font-display text-2xl leading-none tracking-tight"
              to="/"
            >
              {config.studioName}
            </NavLink>
            <div className="hidden items-center gap-2 lg:flex">
              {featuredPathways.map((pathway) => (
                <NavLink
                  key={pathway.to}
                  to={pathway.to}
                  className="rounded-full border border-base-300 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-base-content/75 hover:border-base-content/25 hover:text-base-content"
                >
                  {pathway.label}
                </NavLink>
              ))}
            </div>
          </div>

          <nav className="hidden md:block" aria-label="Main navigation">
            <ul className="flex items-center gap-1">
              {mainNavigation.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "rounded-full px-4 py-2 text-sm font-semibold transition",
                        isActive
                          ? "bg-neutral text-base-100"
                          : "text-base-content/75 hover:bg-base-200 hover:text-base-content",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="btn btn-ghost btn-circle md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu-panel"
            onClick={() => setMenuOpen((state) => !state)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          aria-hidden={!menuOpen}
          className={cn(
            "absolute inset-0 bg-neutral/25 transition-opacity",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMenuOpen(false)}
        />
        <aside
          id="mobile-menu-panel"
          aria-label="Mobile navigation"
          className={cn(
            "absolute right-0 top-0 h-full w-[86%] max-w-sm border-l border-base-300 bg-base-100 p-6 shadow-2xl transition-transform",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="mb-6 flex items-center justify-between">
            <p className="font-display text-xl">Menu</p>
            <button
              type="button"
              className="btn btn-ghost btn-circle"
              onClick={() => setMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav aria-label="Mobile main navigation">
            <ul className="space-y-2">
              {mainNavigation.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-2 text-sm font-semibold hover:bg-base-200"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 border-t border-base-300 pt-6">
            <p className="text-xs uppercase tracking-[0.18em] text-base-content/60">
              Featured Pathways
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {featuredPathways.map((pathway) => (
                <NavLink
                  key={pathway.to}
                  to={pathway.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-base-300 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em]"
                >
                  {pathway.label}
                </NavLink>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <main
        id="main-content"
        className="container-editorial py-10 md:py-14"
        tabIndex={-1}
      >
        <Outlet />
      </main>

      <footer className="border-t border-base-300 bg-base-200/45">
        <div className="container-editorial py-14">
          <div className="grid gap-10 lg:grid-cols-[1.3fr,1fr,1fr,1fr]">
            <div className="space-y-4">
              <h2 className="font-display text-3xl">{config.studioName}</h2>
              <p className="max-w-sm text-sm leading-relaxed text-base-content/75">
                {config.summary}
              </p>
              <a
                className="inline-flex text-sm font-semibold underline decoration-base-300 underline-offset-4 hover:decoration-base-content"
                href={`mailto:${studioEmail}`}
              >
                {studioEmail}
              </a>
              <div className="flex flex-wrap gap-2 pt-1">
                {socialPlaceholders.map((social) => (
                  <button
                    key={social}
                    type="button"
                    className="rounded-full border border-base-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-base-content/75"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>

            {footerGroups.map((group) => (
              <div key={group.heading}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/65">
                  {group.heading}
                </h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item.to}>
                      <Link
                        className="text-sm text-base-content/75 transition hover:text-base-content"
                        to={item.to}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 border-t border-base-300 pt-8 md:grid-cols-[1.2fr,auto] md:items-end">
            <section className="rounded-2xl border border-base-300 bg-base-100 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/65">
                Newsletter
              </p>
              <p className="mt-2 text-sm text-base-content/75">
                Placeholder block for future editorial newsletter capture and
                subscriber messaging.
              </p>
            </section>

            <div className="space-y-3 text-sm text-base-content/70 md:text-right">
              <div className="flex items-center gap-4 md:justify-end">
                {legalLinks.map((link) => (
                  <Link
                    key={link.to}
                    className="hover:text-base-content"
                    to={link.to}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <p>
                © {new Date().getFullYear()} North Axis Studio. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
