import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FadeInSection } from "../components/motion/FadeInSection";
import { PageSeo } from "../components/seo/PageSeo";
import { PageIntro } from "../components/templates/PageIntro";
import {
  budgetOptions,
  contactFormCopy,
  contactIntro,
  contactSeo,
  projectTypeOptions,
} from "../data/siteContent";
import { submitContactRequest } from "../features/contact/contactApi";
import {
  type ContactFormValues,
  contactSchema,
} from "../features/contact/contactSchema";

export function ContactPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      projectType: "",
      budget: "",
      message: "",
    },
  });

  const inquiryMutation = useMutation({
    mutationFn: submitContactRequest,
    onSuccess: () => {
      form.reset();
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    inquiryMutation.mutate(values);
  };

  return (
    <>
      <PageSeo title={contactSeo.title} description={contactSeo.description} />
      <PageIntro
        eyebrow={contactIntro.eyebrow}
        title={contactIntro.title}
        summary={contactIntro.summary}
      />
      <FadeInSection className="mt-14 rounded-3xl border border-base-300 bg-base-100 p-6 md:p-8">
        <form
          className="grid gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.nameLabel}
            </span>
            <input
              className="input input-bordered"
              type="text"
              {...form.register("name")}
            />
            <span className="mt-1 min-h-5 text-xs text-error">
              {form.formState.errors.name?.message}
            </span>
          </label>

          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.emailLabel}
            </span>
            <input
              className="input input-bordered"
              type="email"
              {...form.register("email")}
            />
            <span className="mt-1 min-h-5 text-xs text-error">
              {form.formState.errors.email?.message}
            </span>
          </label>

          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.organizationLabel}
            </span>
            <input
              className="input input-bordered"
              type="text"
              {...form.register("organization")}
            />
            <span className="mt-1 min-h-5 text-xs text-error">
              {form.formState.errors.organization?.message}
            </span>
          </label>

          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.projectTypeLabel}
            </span>
            <select
              className="select select-bordered"
              {...form.register("projectType")}
            >
              <option value="">{contactFormCopy.selectPlaceholder}</option>
              {projectTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="mt-1 min-h-5 text-xs text-error">
              {form.formState.errors.projectType?.message}
            </span>
          </label>

          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.budgetLabel}
            </span>
            <select
              className="select select-bordered"
              {...form.register("budget")}
            >
              <option value="">{contactFormCopy.selectPlaceholder}</option>
              {budgetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="mt-1 min-h-5 text-xs text-error">
              {form.formState.errors.budget?.message}
            </span>
          </label>

          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.briefLabel}
            </span>
            <textarea
              className="textarea textarea-bordered min-h-36"
              {...form.register("message")}
            />
            <span className="mt-1 min-h-5 text-xs text-error">
              {form.formState.errors.message?.message}
            </span>
          </label>

          <button
            type="submit"
            className="btn btn-primary mt-2 w-full rounded-full md:w-fit"
            disabled={inquiryMutation.isPending}
          >
            {inquiryMutation.isPending
              ? contactFormCopy.submitSending
              : contactFormCopy.submitIdle}
          </button>

          {inquiryMutation.isSuccess && (
            <p className="text-sm text-success">{contactFormCopy.success}</p>
          )}
          {inquiryMutation.isError && (
            <p className="text-sm text-error">{contactFormCopy.error}</p>
          )}
        </form>
      </FadeInSection>
    </>
  );
}
