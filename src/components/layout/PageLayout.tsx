import { Outlet } from "react-router-dom";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageLayout() {
  return (
    <div className="grain-overlay flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 lg:px-10 lg:py-14">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
