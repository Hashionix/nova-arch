import { Link } from "react-router-dom";
import { PageSeo } from "../components/seo/PageSeo";

export function NotFoundPage() {
  return (
    <section className="py-20 text-center">
      <PageSeo
        title="Page Not Found"
        description="The page you are looking for does not exist."
      />
      <p className="text-sm uppercase tracking-[0.2em] text-primary/80">404</p>
      <h1 className="mt-4 font-display text-5xl">Page Not Found</h1>
      <p className="mx-auto mt-4 max-w-md text-base-content/75">
        The page you requested is unavailable. Return to the homepage to
        continue browsing the studio.
      </p>
      <Link className="btn btn-primary mt-8 rounded-full px-8" to="/">
        Go Home
      </Link>
    </section>
  );
}
