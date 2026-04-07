import { RouteShell } from "@/components/RouteShell";
import { AppLayout } from "@/layouts/AppLayout";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/projects"
            element={
              <RouteShell
                title="Projects"
                subtitle="Shell for the project index and discovery view."
              />
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <RouteShell
                title="Project Detail"
                subtitle="Dynamic shell for project case-study pages."
              />
            }
          />
          <Route
            path="/services"
            element={
              <RouteShell
                title="Services"
                subtitle="Shell for services overview."
              />
            }
          />
          <Route
            path="/services/design"
            element={
              <RouteShell
                title="Design Services"
                subtitle="Static shell for the design services group."
              />
            }
          />
          <Route
            path="/services/consulting"
            element={
              <RouteShell
                title="Consulting Services"
                subtitle="Static shell for the consulting services group."
              />
            }
          />
          <Route
            path="/services/:group/:slug"
            element={
              <RouteShell
                title="Service Detail"
                subtitle="Dynamic shell for service pages by group and slug."
              />
            }
          />
          <Route
            path="/research-innovation"
            element={
              <RouteShell
                title="Research and Innovation"
                subtitle="Shell for research and innovation index content."
              />
            }
          />
          <Route
            path="/research-innovation/:slug"
            element={
              <RouteShell
                title="Research Detail"
                subtitle="Dynamic shell for research and innovation entries."
              />
            }
          />
          <Route
            path="/about"
            element={
              <RouteShell
                title="About"
                subtitle="Shell for the studio story and positioning page."
              />
            }
          />
          <Route
            path="/people"
            element={
              <RouteShell
                title="People"
                subtitle="Shell for leadership and team directory."
              />
            }
          />
          <Route
            path="/people/:slug"
            element={
              <RouteShell
                title="Person Profile"
                subtitle="Dynamic shell for individual people pages."
              />
            }
          />
          <Route
            path="/news"
            element={
              <RouteShell
                title="News"
                subtitle="Shell for news and editorial index."
              />
            }
          />
          <Route
            path="/news/:slug"
            element={
              <RouteShell
                title="News Detail"
                subtitle="Dynamic shell for single news stories."
              />
            }
          />
          <Route
            path="/awards"
            element={
              <RouteShell
                title="Awards"
                subtitle="Shell for recognitions and achievements."
              />
            }
          />
          <Route
            path="/careers"
            element={
              <RouteShell
                title="Careers"
                subtitle="Shell for careers overview and culture."
              />
            }
          />
          <Route
            path="/careers/open-roles"
            element={
              <RouteShell
                title="Open Roles"
                subtitle="Shell for careers open roles listing."
              />
            }
          />
          <Route
            path="/careers/:slug"
            element={
              <RouteShell
                title="Career Detail"
                subtitle="Dynamic shell for individual career pages."
              />
            }
          />
          <Route
            path="/contact"
            element={
              <RouteShell
                title="Contact"
                subtitle="Shell for inquiry, brief, and conversation entry."
              />
            }
          />
          <Route
            path="/terms"
            element={
              <RouteShell
                title="Terms"
                subtitle="Shell for terms and conditions content."
              />
            }
          />
          <Route
            path="/privacy"
            element={
              <RouteShell
                title="Privacy"
                subtitle="Shell for privacy and data policy content."
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
