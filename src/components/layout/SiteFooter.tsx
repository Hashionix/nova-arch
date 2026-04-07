import { Link } from "react-router-dom";
import { footerBlurb, navigation, studioName } from "../../data/siteContent";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-base-300/70 bg-base-200/70">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 lg:grid-cols-3 lg:px-10">
        <div>
          <p className="font-display text-2xl">{studioName}</p>
          <p className="mt-3 max-w-sm text-sm text-base-content/75">
            {footerBlurb}
          </p>
        </div>
        <nav aria-label="Footer" className="lg:justify-self-center">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link
                  className="text-sm font-medium hover:text-primary"
                  to={item.to}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-base-content/65 lg:justify-self-end">
          © {year} {studioName}
        </p>
      </div>
    </footer>
  );
}
