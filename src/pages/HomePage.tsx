import { CTASection } from "@/components/CTASection";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { MediaFrame } from "@/components/MediaFrame";
import { SectionHeading } from "@/components/SectionHeading";
import { TagList } from "@/components/TagList";
import { FadeInSection } from "@/components/motion/FadeInSection";
import { PageSeo } from "@/components/seo/PageSeo";
import {
  getInnovationPractices,
  getOffices,
  getProjects,
  getServicesByGroup,
  getSiteConfig,
  getTestimonials,
} from "@/content/repository";
import { buttonClassName } from "@/lib/buttonClassName";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin, PlayCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export function HomePage() {
  const config = getSiteConfig();
  const offices = getOffices();
  const featuredProjects = getProjects().slice(0, 4);
  const designServices = getServicesByGroup("design").slice(0, 5);
  const consultingServices = getServicesByGroup("consulting").slice(0, 5);
  const innovationTeaser = getInnovationPractices()[0];
  const testimonials = getTestimonials().slice(0, 2);

  const heroStatements = useMemo(
    () => [
      "Designing strategic clarity.",
      "Building resilient experiences.",
      "Accelerating transformation with craft.",
    ],
    [],
  );

  const [activeStatementIndex, setActiveStatementIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStatementIndex(
        (current) => (current + 1) % heroStatements.length,
      );
    }, 3200);

    return () => window.clearInterval(interval);
  }, [heroStatements.length]);

  return (
    <>
      <PageSeo title={config.seo.title} description={config.seo.description} />

      <Container
        as="section"
        className="grid gap-10 pb-8 pt-8 lg:grid-cols-[1.2fr,1fr] lg:items-end"
      >
        <div className="space-stack-md">
          <Eyebrow>Global Design and Consulting Studio</Eyebrow>
          <div className="min-h-[3.75rem] md:min-h-[4.5rem]">
            <AnimatePresence mode="wait">
              <motion.h1
                key={heroStatements[activeStatementIndex]}
                className="type-display"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {heroStatements[activeStatementIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>
          <p className="max-w-prose text-lg leading-relaxed text-muted">
            {config.summary} We align business ambition with editorial product
            thinking, helping teams move from uncertainty to confident
            execution.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className={buttonClassName("solid", "lg")} to="/projects">
              View Projects
            </Link>
            <Link className={buttonClassName("outline", "lg")} to="/contact">
              Start a Conversation
            </Link>
          </div>
        </div>
        <MediaFrame
          aspect="4-3"
          src={config.heroMedia.src}
          alt={config.heroMedia.alt}
        />
      </Container>

      <FadeInSection>
        <Container as="section" className="space-stack-md py-8">
          <SectionHeading
            eyebrow="Locations"
            title="A connected studio across key markets"
            description="We collaborate across seven offices with shared delivery standards and local expertise."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((office) => (
              <Card key={office.id} className="space-stack-sm p-5">
                <p className="font-display text-xl">{office.city}</p>
                <p className="text-sm text-muted">{office.country}</p>
                <p className="inline-flex items-center gap-1 text-xs text-base-content/60">
                  <MapPin size={13} />
                  {office.region}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </FadeInSection>

      <FadeInSection>
        <Container as="section" className="space-stack-md py-8">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Selected work shaping measurable outcomes"
            description="Four current programs where strategic intent became operational impact."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <motion.article
                key={project.id}
                className="surface-panel overflow-hidden"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <MediaFrame
                  aspect="16-9"
                  src={project.heroMedia.src}
                  alt={project.heroMedia.alt}
                  className="rounded-none border-0"
                />
                <div className="space-stack-sm p-6">
                  <h3 className="font-display text-2xl">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {project.summary}
                  </p>
                  <TagList items={project.tags.slice(0, 3)} />
                  <Link
                    className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                    to={`/projects/${project.slug}`}
                  >
                    Open case study <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </FadeInSection>

      <FadeInSection>
        <Container as="section" className="space-stack-md py-8">
          <SectionHeading
            eyebrow="Pathways"
            title="Two integrated pathways: Design and Consulting"
            description="Choose the pathway that matches your current challenge, with the flexibility to combine both."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="space-stack-md p-7">
              <h3 className="font-display text-3xl">Design</h3>
              <p className="text-muted">
                Identity, experience, and systems that scale with consistency.
              </p>
              <TagList items={designServices.map((service) => service.title)} />
              <Link
                className={buttonClassName("outline", "md")}
                to="/services/design"
              >
                Explore Design Services
              </Link>
            </Card>
            <Card className="space-stack-md p-7">
              <h3 className="font-display text-3xl">Consulting</h3>
              <p className="text-muted">
                Roadmaps, operating models, and measurable transformation
                delivery.
              </p>
              <TagList
                items={consultingServices.map((service) => service.title)}
              />
              <Link
                className={buttonClassName("outline", "md")}
                to="/services/consulting"
              >
                Explore Consulting Services
              </Link>
            </Card>
          </div>
        </Container>
      </FadeInSection>

      <FadeInSection>
        <Container as="section" className="py-8">
          <Card className="space-stack-md p-8 md:p-10">
            <SectionHeading
              eyebrow="Research & Innovation"
              title={innovationTeaser.title}
              description={innovationTeaser.summary}
            />
            <MediaFrame
              aspect="16-9"
              src={innovationTeaser.heroMedia.src}
              alt={innovationTeaser.heroMedia.alt}
            />
            <div className="flex flex-wrap gap-3">
              <Link
                className={buttonClassName("soft", "md")}
                to="/research-innovation"
              >
                Explore all practices
              </Link>
              <Link
                className={buttonClassName("outline", "md")}
                to={`/research-innovation/${innovationTeaser.slug}`}
              >
                Open practice
              </Link>
            </div>
          </Card>
        </Container>
      </FadeInSection>

      <FadeInSection>
        <Container as="section" className="space-stack-md py-8">
          <SectionHeading
            eyebrow="Careers"
            title="People stories and open opportunities"
            description="A glimpse of how our team works, grows, and contributes across disciplines."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <motion.article
                key={testimonial.id}
                className="surface-panel overflow-hidden"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="media-16-9 flex items-center justify-center bg-base-200">
                  <div className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium">
                    <PlayCircle size={16} />
                    Employee Story Placeholder
                  </div>
                </div>
                <div className="space-stack-sm p-6">
                  <h3 className="font-display text-2xl">{testimonial.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">
                    “{testimonial.quote}”
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      className={buttonClassName("soft", "sm")}
                      to="/careers/open-roles"
                    >
                      View open roles
                    </Link>
                    {testimonial.relatedIds.people?.[0] ? (
                      <Link
                        className={buttonClassName("text", "sm")}
                        to={`/people/${testimonial.relatedIds.people[0]}`}
                      >
                        Meet the team member
                      </Link>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </FadeInSection>

      <Container as="section" className="py-12">
        <CTASection
          eyebrow="Contact"
          title="Have a transformation mandate in motion?"
          description="Share your context and constraints. We will respond with a focused recommendation and next-step plan."
          primaryAction={{ label: "Contact the studio", to: "/contact" }}
          secondaryAction={{ label: "See latest work", to: "/projects" }}
        />
      </Container>
    </>
  );
}
