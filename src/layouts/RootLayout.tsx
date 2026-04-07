import { primaryNavigation } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { NavLink, Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <div className="grain-overlay min-h-screen">
      <header className="border-b border-base-300/70 bg-base-100/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <NavLink className="font-display text-2xl tracking-tight" to="/">
            North Axis Studio
          </NavLink>
          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center gap-1">
              {primaryNavigation.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        "rounded-full px-4 py-2 text-sm font-semibold transition",
                        isActive
                          ? "bg-primary text-primary-content"
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
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
        <Outlet />
      </main>
    </div>
  );
}
