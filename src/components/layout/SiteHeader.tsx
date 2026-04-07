import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { navigation, studioName } from "../../data/siteContent";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-base-300/60 bg-base-100/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <NavLink
          to="/"
          className="font-display text-2xl tracking-tight text-base-content"
        >
          {studioName}
        </NavLink>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-2">
            {navigation.map((item, index) => (
              <motion.li
                key={item.to}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-primary text-primary-content"
                        : "text-base-content/75 hover:bg-base-200 hover:text-base-content"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
