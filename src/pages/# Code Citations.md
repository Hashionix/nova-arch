# Code Citations

## License: unknown

https://github.com/DefinitelyTyped/DefinitelyTyped/blob/3dbe8163b4b989f62b85ea671b23f59b2f78cd39/types/react-dragtastic/index.d.ts

````
Good — I have everything. Here's the full implementation across 11 files.

---

## 1. Extend `Office` type — [src/types/content.ts](src/types/content.ts#L152-L159)

```typescript
export type Office = ContentEntryBase & {
  city: string;
  country: string;
  region: "Americas" | "EMEA" | "APAC";
  addressLine: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
};
````

---

## 2. Update seed offices — [src/content/seed.ts](src/content/seed.ts#L75)

Replace the seven office objects' fields with contact details appended inline. Only the new lines are shown per office; all existing fields stay:

```typescript
// New York
city: "New York",
country: "USA",
region: "Americas",
addressLine: "11 Mercer Street, Manhattan",
phone: "+1 212 431 5900",
email: "nyc@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=11+Mercer+Street+Manhattan+New+York",

// Copenhagen
city: "Copenhagen",
country: "Denmark",
region: "EMEA",
addressLine: "47 Vestergade, Copenhagen K",
phone: "+45 33 12 5900",
email: "cph@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=47+Vestergade+Copenhagen+K+Denmark",

// Singapore
city: "Singapore",
country: "Singapore",
region: "APAC",
addressLine: "8 Robinson Road",
phone: "+65 6221 5900",
email: "sin@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=8+Robinson+Road+Singapore",

// Nairobi
city: "Nairobi",
country: "Kenya",
region: "EMEA",
addressLine: "3 Riverside Drive",
phone: "+254 20 262 5900",
email: "nbi@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=3+Riverside+Drive+Nairobi+Kenya",

// London
city: "London",
country: "UK",
region: "EMEA",
addressLine: "21 Clerkenwell Road",
phone: "+44 20 7253 5900",
email: "lon@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=21+Clerkenwell+Road+London+UK",

// Toronto
city: "Toronto",
country: "Canada",
region: "Americas",
addressLine: "145 Wellington Street West",
phone: "+1 416 977 5900",
email: "yyz@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=145+Wellington+Street+West+Toronto+Canada",

// Sao Paulo
city: "Sao Paulo",
country: "Brazil",
region: "Americas",
addressLine: "118 Avenida Paulista",
phone: "+55 11 3162 5900",
email: "sao@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=118+Avenida+Paulista+Sao+Paulo+Brazil",
```

---

## 3. Create `src/lib/featureFlags.ts`

```typescript
/**
 * Feature flags driven by Vite environment variables.
 * Set in .env.local to enable — never hard-code "true" in .env for flags
 * that gate unfinished flows.
 *
 * VITE_CONTACT_FORM_ENABLED=true   → shows the inquiry form on /contact
 */
export const FEATURE_FLAGS = {
  contactForm: import.meta.env.VITE_CONTACT_FORM_ENABLED === "true",
} as const;
```

---

## 4. Create `src/features/newsletter/newsletterProvider.ts`

```typescript
// ─── Interface ────────────────────────────────────────────────────────────────

export interface NewsletterProvider {
  subscribe(email: string): Promise<void>;
}

// ─── Local mock ───────────────────────────────────────────────────────────────

class LocalNewsletterProvider implements NewsletterProvider {
  async subscribe(email: string): Promise<void> {
    await new Promise<void>((res) => setTimeout(res, 450));
    // In a real integration, remove this log and ship the remote adapter
    if (import.meta.env.DEV) {
      console.info("[Newsletter] Subscribed (local mock):", email);
    }
  }
}

// ─── Remote provider ──────────────────────────────────────────────────────────
// Activated when VITE_NEWSLETTER_API_URL is set.
//
// Point this at your own backend proxy that handles the Mailchimp / Brevo /
// SendGrid call — external ESP APIs require server-side requests because they
// use secret API keys that must not be exposed in the browser bundle.
//
// Minimal expected contract:
//   POST <VITE_NEWSLETTER_API_URL>
//   Body: { email: string }
//   Success: 2xx (body ignored)
//   Failure: non-2xx — message in JSON { error: string } if available

class RemoteNewsletterProvider implements NewsletterProvider {
  constructor(private readonly apiUrl: string) {}

  async subscribe(email: string): Promise<void> {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      let message = `Newsletter API responded with ${response.status}`;
      try {
        const body = (await response.json()) as { error?: string };
        if (body.error) message = body.error;
      } catch {
        // ignore parse error — use generic message
      }
      throw new Error(message);
    }
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────

function createNewsletterProvider(): NewsletterProvider {
  const apiUrl = (
    import.meta.env.VITE_NEWSLETTER_API_URL as string | undefined
  )?.trim();
  return apiUrl
    ? new RemoteNewsletterProvider(apiUrl)
    : new LocalNewsletterProvider();
}

export const newsletterProvider: NewsletterProvider =
  createNewsletterProvider();
```

---

## 5. Create `src/features/newsletter/useNewsletterSignup.ts`

```typescript
import { useMutation } from "@tanstack/react-query";
import { newsletterProvider } from "./newsletterProvider";

export function useNewsletterSignup() {
  return useMutation({
    mutationFn: (email: string) => newsletterProvider.subscribe(email),
  });
}
```

---

## 6. Create `src/features/contact/contactProvider.ts`

```typescript
import type { ContactFormValues } from "./contactSchema";

// ─── Interface ────────────────────────────────────────────────────────────────

export interface ContactProvider {
  submit(values: ContactFormValues): Promise<void>;
}

// ─── Local mock ───────────────────────────────────────────────────────────────

class LocalContactProvider implements ContactProvider {
  async submit(values: ContactFormValues): Promise<void> {
    await new Promise<void>((res) => setTimeout(res,
```

## License: unknown

https://github.com/DefinitelyTyped/DefinitelyTyped/blob/3dbe8163b4b989f62b85ea671b23f59b2f78cd39/types/react-dragtastic/index.d.ts

````
Good — I have everything. Here's the full implementation across 11 files.

---

## 1. Extend `Office` type — [src/types/content.ts](src/types/content.ts#L152-L159)

```typescript
export type Office = ContentEntryBase & {
  city: string;
  country: string;
  region: "Americas" | "EMEA" | "APAC";
  addressLine: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
};
````

---

## 2. Update seed offices — [src/content/seed.ts](src/content/seed.ts#L75)

Replace the seven office objects' fields with contact details appended inline. Only the new lines are shown per office; all existing fields stay:

```typescript
// New York
city: "New York",
country: "USA",
region: "Americas",
addressLine: "11 Mercer Street, Manhattan",
phone: "+1 212 431 5900",
email: "nyc@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=11+Mercer+Street+Manhattan+New+York",

// Copenhagen
city: "Copenhagen",
country: "Denmark",
region: "EMEA",
addressLine: "47 Vestergade, Copenhagen K",
phone: "+45 33 12 5900",
email: "cph@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=47+Vestergade+Copenhagen+K+Denmark",

// Singapore
city: "Singapore",
country: "Singapore",
region: "APAC",
addressLine: "8 Robinson Road",
phone: "+65 6221 5900",
email: "sin@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=8+Robinson+Road+Singapore",

// Nairobi
city: "Nairobi",
country: "Kenya",
region: "EMEA",
addressLine: "3 Riverside Drive",
phone: "+254 20 262 5900",
email: "nbi@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=3+Riverside+Drive+Nairobi+Kenya",

// London
city: "London",
country: "UK",
region: "EMEA",
addressLine: "21 Clerkenwell Road",
phone: "+44 20 7253 5900",
email: "lon@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=21+Clerkenwell+Road+London+UK",

// Toronto
city: "Toronto",
country: "Canada",
region: "Americas",
addressLine: "145 Wellington Street West",
phone: "+1 416 977 5900",
email: "yyz@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=145+Wellington+Street+West+Toronto+Canada",

// Sao Paulo
city: "Sao Paulo",
country: "Brazil",
region: "Americas",
addressLine: "118 Avenida Paulista",
phone: "+55 11 3162 5900",
email: "sao@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=118+Avenida+Paulista+Sao+Paulo+Brazil",
```

---

## 3. Create `src/lib/featureFlags.ts`

```typescript
/**
 * Feature flags driven by Vite environment variables.
 * Set in .env.local to enable — never hard-code "true" in .env for flags
 * that gate unfinished flows.
 *
 * VITE_CONTACT_FORM_ENABLED=true   → shows the inquiry form on /contact
 */
export const FEATURE_FLAGS = {
  contactForm: import.meta.env.VITE_CONTACT_FORM_ENABLED === "true",
} as const;
```

---

## 4. Create `src/features/newsletter/newsletterProvider.ts`

```typescript
// ─── Interface ────────────────────────────────────────────────────────────────

export interface NewsletterProvider {
  subscribe(email: string): Promise<void>;
}

// ─── Local mock ───────────────────────────────────────────────────────────────

class LocalNewsletterProvider implements NewsletterProvider {
  async subscribe(email: string): Promise<void> {
    await new Promise<void>((res) => setTimeout(res, 450));
    // In a real integration, remove this log and ship the remote adapter
    if (import.meta.env.DEV) {
      console.info("[Newsletter] Subscribed (local mock):", email);
    }
  }
}

// ─── Remote provider ──────────────────────────────────────────────────────────
// Activated when VITE_NEWSLETTER_API_URL is set.
//
// Point this at your own backend proxy that handles the Mailchimp / Brevo /
// SendGrid call — external ESP APIs require server-side requests because they
// use secret API keys that must not be exposed in the browser bundle.
//
// Minimal expected contract:
//   POST <VITE_NEWSLETTER_API_URL>
//   Body: { email: string }
//   Success: 2xx (body ignored)
//   Failure: non-2xx — message in JSON { error: string } if available

class RemoteNewsletterProvider implements NewsletterProvider {
  constructor(private readonly apiUrl: string) {}

  async subscribe(email: string): Promise<void> {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      let message = `Newsletter API responded with ${response.status}`;
      try {
        const body = (await response.json()) as { error?: string };
        if (body.error) message = body.error;
      } catch {
        // ignore parse error — use generic message
      }
      throw new Error(message);
    }
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────

function createNewsletterProvider(): NewsletterProvider {
  const apiUrl = (
    import.meta.env.VITE_NEWSLETTER_API_URL as string | undefined
  )?.trim();
  return apiUrl
    ? new RemoteNewsletterProvider(apiUrl)
    : new LocalNewsletterProvider();
}

export const newsletterProvider: NewsletterProvider =
  createNewsletterProvider();
```

---

## 5. Create `src/features/newsletter/useNewsletterSignup.ts`

```typescript
import { useMutation } from "@tanstack/react-query";
import { newsletterProvider } from "./newsletterProvider";

export function useNewsletterSignup() {
  return useMutation({
    mutationFn: (email: string) => newsletterProvider.subscribe(email),
  });
}
```

---

## 6. Create `src/features/contact/contactProvider.ts`

```typescript
import type { ContactFormValues } from "./contactSchema";

// ─── Interface ────────────────────────────────────────────────────────────────

export interface ContactProvider {
  submit(values: ContactFormValues): Promise<void>;
}

// ─── Local mock ───────────────────────────────────────────────────────────────

class LocalContactProvider implements ContactProvider {
  async submit(values: ContactFormValues): Promise<void> {
    await new Promise<void>((res) => setTimeout(res,
```

## License: unknown

https://github.com/pouyakary/gerda/blob/f922891d5f249e681ddad5ee66bd7bbe2127aa46/server/kernel/space-finder.ts

````
Good — I have everything. Here's the full implementation across 11 files.

---

## 1. Extend `Office` type — [src/types/content.ts](src/types/content.ts#L152-L159)

```typescript
export type Office = ContentEntryBase & {
  city: string;
  country: string;
  region: "Americas" | "EMEA" | "APAC";
  addressLine: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
};
````

---

## 2. Update seed offices — [src/content/seed.ts](src/content/seed.ts#L75)

Replace the seven office objects' fields with contact details appended inline. Only the new lines are shown per office; all existing fields stay:

```typescript
// New York
city: "New York",
country: "USA",
region: "Americas",
addressLine: "11 Mercer Street, Manhattan",
phone: "+1 212 431 5900",
email: "nyc@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=11+Mercer+Street+Manhattan+New+York",

// Copenhagen
city: "Copenhagen",
country: "Denmark",
region: "EMEA",
addressLine: "47 Vestergade, Copenhagen K",
phone: "+45 33 12 5900",
email: "cph@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=47+Vestergade+Copenhagen+K+Denmark",

// Singapore
city: "Singapore",
country: "Singapore",
region: "APAC",
addressLine: "8 Robinson Road",
phone: "+65 6221 5900",
email: "sin@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=8+Robinson+Road+Singapore",

// Nairobi
city: "Nairobi",
country: "Kenya",
region: "EMEA",
addressLine: "3 Riverside Drive",
phone: "+254 20 262 5900",
email: "nbi@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=3+Riverside+Drive+Nairobi+Kenya",

// London
city: "London",
country: "UK",
region: "EMEA",
addressLine: "21 Clerkenwell Road",
phone: "+44 20 7253 5900",
email: "lon@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=21+Clerkenwell+Road+London+UK",

// Toronto
city: "Toronto",
country: "Canada",
region: "Americas",
addressLine: "145 Wellington Street West",
phone: "+1 416 977 5900",
email: "yyz@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=145+Wellington+Street+West+Toronto+Canada",

// Sao Paulo
city: "Sao Paulo",
country: "Brazil",
region: "Americas",
addressLine: "118 Avenida Paulista",
phone: "+55 11 3162 5900",
email: "sao@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=118+Avenida+Paulista+Sao+Paulo+Brazil",
```

---

## 3. Create `src/lib/featureFlags.ts`

```typescript
/**
 * Feature flags driven by Vite environment variables.
 * Set in .env.local to enable — never hard-code "true" in .env for flags
 * that gate unfinished flows.
 *
 * VITE_CONTACT_FORM_ENABLED=true   → shows the inquiry form on /contact
 */
export const FEATURE_FLAGS = {
  contactForm: import.meta.env.VITE_CONTACT_FORM_ENABLED === "true",
} as const;
```

---

## 4. Create `src/features/newsletter/newsletterProvider.ts`

```typescript
// ─── Interface ────────────────────────────────────────────────────────────────

export interface NewsletterProvider {
  subscribe(email: string): Promise<void>;
}

// ─── Local mock ───────────────────────────────────────────────────────────────

class LocalNewsletterProvider implements NewsletterProvider {
  async subscribe(email: string): Promise<void> {
    await new Promise<void>((res) => setTimeout(res, 450));
    // In a real integration, remove this log and ship the remote adapter
    if (import.meta.env.DEV) {
      console.info("[Newsletter] Subscribed (local mock):", email);
    }
  }
}

// ─── Remote provider ──────────────────────────────────────────────────────────
// Activated when VITE_NEWSLETTER_API_URL is set.
//
// Point this at your own backend proxy that handles the Mailchimp / Brevo /
// SendGrid call — external ESP APIs require server-side requests because they
// use secret API keys that must not be exposed in the browser bundle.
//
// Minimal expected contract:
//   POST <VITE_NEWSLETTER_API_URL>
//   Body: { email: string }
//   Success: 2xx (body ignored)
//   Failure: non-2xx — message in JSON { error: string } if available

class RemoteNewsletterProvider implements NewsletterProvider {
  constructor(private readonly apiUrl: string) {}

  async subscribe(email: string): Promise<void> {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      let message = `Newsletter API responded with ${response.status}`;
      try {
        const body = (await response.json()) as { error?: string };
        if (body.error) message = body.error;
      } catch {
        // ignore parse error — use generic message
      }
      throw new Error(message);
    }
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────

function createNewsletterProvider(): NewsletterProvider {
  const apiUrl = (
    import.meta.env.VITE_NEWSLETTER_API_URL as string | undefined
  )?.trim();
  return apiUrl
    ? new RemoteNewsletterProvider(apiUrl)
    : new LocalNewsletterProvider();
}

export const newsletterProvider: NewsletterProvider =
  createNewsletterProvider();
```

---

## 5. Create `src/features/newsletter/useNewsletterSignup.ts`

```typescript
import { useMutation } from "@tanstack/react-query";
import { newsletterProvider } from "./newsletterProvider";

export function useNewsletterSignup() {
  return useMutation({
    mutationFn: (email: string) => newsletterProvider.subscribe(email),
  });
}
```

---

## 6. Create `src/features/contact/contactProvider.ts`

```typescript
import type { ContactFormValues } from "./contactSchema";

// ─── Interface ────────────────────────────────────────────────────────────────

export interface ContactProvider {
  submit(values: ContactFormValues): Promise<void>;
}

// ─── Local mock ───────────────────────────────────────────────────────────────

class LocalContactProvider implements ContactProvider {
  async submit(values: ContactFormValues): Promise<void> {
    await new Promise<void>((res) => setTimeout(res, 600));
    if (import.meta.env.DEV) {
      console.info("[Contact] Inquiry submitted (local mock):", values);
    }
  }
}

// ─── Remote provider ──────────────────────────────────────────────────────────
// Activated when VITE_CONTACT_API_URL is set.
//
// Expected contract:
//   POST <VITE_CONTACT_API_URL>
//   Body: ContactFormValues as JSON
//   Success: 2xx
//   Failure: non-2xx — { error: string } if available

class RemoteContactProvider implements ContactProvider {
  constructor(private readonly apiUrl: string) {}

  async submit(values: ContactFormValues): Promise<void> {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      let message = `Contact API responded with ${response.status}`;
      try {
        const body = (await response.json()) as { error?: string };
        if (body.error) message = body.error;
      } catch {
        // ignore
      }
      throw new Error(message);
    }
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────

function createContactProvider(): ContactProvider {
  const apiUrl = (
    import.meta.env.VITE_CONTACT_API_URL as string | undefined
  )?.trim();
  return apiUrl
    ? new RemoteContactProvider(apiUrl)
    : new LocalContactProvider();
}

export const contactProvider: ContactProvider = createContactProvider();
```

---

## 7. Create `src/features/contact/useContactInquiry.ts`

```typescript
import { useMutation } from "@tanstack/react-query";
import type { ContactFormValues } from "./contactSchema";
import { contactProvider } from "./contactProvider";

export function useContactInquiry(options?: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: (values: ContactFormValues) => contactProvider.submit(values),
    onSuccess: options?.onSuccess,
  });
}
```

---

## 8. Create `src/components/contact/NewsletterSignup.tsx`

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNewsletterSignup } from "@/features/newsletter/useNewsletterSignup";
import { buttonClassName } from "@/lib/buttonClassName";
import { cn } from "@/lib/cn";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

type NewsletterSignupProps = {
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function NewsletterSignup({
  className,
  eyebrow = "Studio Notes",
  title = "Monthly thinking from our teams.",
  description = "Strategy, craft, and field observations — delivered once a month. No noise.",
}: NewsletterSignupProps) {
  const emailId = useId();
  const errorId = useId();

  const { register, handleSubmit, reset, formState } =
    useForm<NewsletterFormValues>({
      resolver: zodResolver(newsletterSchema),
    });

  const mutation = useNewsletterSignup();

  const onSubmit = (values: NewsletterFormValues) => {
    mutation.mutate(values.email, {
      onSuccess: () => reset(),
    });
  };

  return (
    <section className={cn("surface-panel space-y-5 p-6 md:p-8", className)}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/50">
          {eyebrow}
        </p>
        <p className="mt-2 font-serif text-xl font-light">{title}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {description}
        </p>
      </div>

      {mutation.isSuccess ? (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-2.5 text-sm font-medium text-base-content"
        >
          <CheckCircle2 size={16} className="text-green-600" aria-hidden />
          You are subscribed. Thank you.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="Newsletter signup"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label htmlFor={emailId} className="sr-only">
                Email address
              </label>
              <input
                id={emailId}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-describedby={formState.errors.email ? errorId : undefined}
                aria-invalid={!!formState.errors.email}
                className={cn(
                  "input input-bordered w-full rounded-full text-sm",
                  formState.errors.email && "input-error",
                )}
                {...register("email")}
              />
            </div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className={cn(buttonClassName("solid", "md"), "shrink-0")}
            >
              {mutation.isPending ? (
                <>
                  <Loader2
                    size={14}
                    className="mr-2 animate-spin"
                    aria-hidden
                  />
                  Subscribing…
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>

          {formState.errors.email && (
            <p id={errorId} role="alert" className="mt-2 text-xs text-error">
              {formState.errors.email.message}
            </p>
          )}

          {mutation.isError && (
            <p
              role="alert"
              aria-live="assertive"
              className="mt-2 text-xs text-error"
            >
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Subscription failed. Please try again."}
            </p>
          )}

          <p className="mt-3 text-xs text-base-content/40">
            No spam. Unsubscribe at any time.
          </p>
        </form>
      )}
    </section>
  );
}
```

---

## 9. Create `src/components/contact/InquiryForm.tsx`

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  budgetOptions,
  contactFormCopy,
  projectTypeOptions,
} from "@/data/siteContent";
import { useContactInquiry } from "@/features/contact/useContactInquiry";
import {
  type ContactFormValues,
  contactSchema,
} from "@/features/contact/contactSchema";

type InquiryFormProps = {
  className?: string;
};

export function InquiryForm({ className }: InquiryFormProps) {
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

  const mutation = useContactInquiry({ onSuccess: () => form.reset() });

  if (mutation.isSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-start gap-3 rounded-2xl border border-base-300 bg-base-100 p-6"
      >
        <CheckCircle2
          size={18}
          className="mt-0.5 shrink-0 text-green-600"
          aria-hidden
        />
        <div>
          <p className="font-semibold">Brief received</p>
          <p className="mt-0.5 text-sm text-muted">{contactFormCopy.success}</p>
        </div>
      </div>
    );
  }

  return (
    <form
      className={className}
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      noValidate
      aria-label="Project inquiry form"
    >
      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.nameLabel}
              <span className="ml-1 text-error" aria-hidden>
                *
              </span>
            </span>
            <input
              className="input input-bordered"
              type="text"
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!form.formState.errors.name}
              {...form.register("name")}
            />
            <span className="mt-1 min-h-5 text-xs text-error" role="alert">
              {form.formState.errors.name?.message}
            </span>
          </label>

          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.emailLabel}
              <span className="ml-1 text-error" aria-hidden>
                *
              </span>
            </span>
            <input
              className="input input-bordered"
              type="email"
              autoComplete="email"
              aria-required="true"
              aria-invalid={!!form.formState.errors.email}
              {...form.register("email")}
            />
            <span className="mt-1 min-h-5 text-xs text-error" role="alert">
              {form.formState.errors.email?.message}
            </span>
          </label>
        </div>

        <label className="form-control">
          <span className="label-text font-medium">
            {contactFormCopy.organizationLabel}
            <span className="ml-1 text-error" aria-hidden>
              *
            </span>
          </span>
          <input
            className="input input-bordered"
            type="text"
            autoComplete="organization"
            aria-required="true"
            aria-invalid={!!form.formState.errors.organization}
            {...form.register("organization")}
          />
          <span className="mt-1 min-h-5 text-xs text-error" role="alert">
            {form.formState.errors.organization?.message}
          </span>
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.projectTypeLabel}
              <span className="ml-1 text-error" aria-hidden>
                *
              </span>
            </span>
            <select
              className="select select-bordered"
              aria-required="true"
              aria-invalid={!!form.formState.errors.projectType}
              {...form.register("projectType")}
            >
              <option value="">{contactFormCopy.selectPlaceholder}</option>
              {projectTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="mt-1 min-h-5 text-xs text-error" role="alert">
              {form.formState.errors.projectType?.message}
            </span>
          </label>

          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.budgetLabel}
              <span className="ml-1 text-error" aria-hidden>
                *
              </span>
            </span>
            <select
              className="select select-bordered"
              aria-required="true"
              aria-invalid={!!form.formState.errors.budget}
              {...form.register("budget")}
            >
              <option value="">{contactFormCopy.selectPlaceholder}</option>
              {budgetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="mt-1 min-h-5 text-xs text-error" role="alert">
              {form.formState.errors.budget?.message}
            </span>
          </label>
        </div>

        <label className="form-control">
          <span className="label-text font-medium">
            {contactFormCopy.briefLabel}
            <span className="ml-1 text-error" aria-hidden>
              *
            </span>
          </span>
          <p className="mt-0.5 text-xs text-muted">
            Share context, timeline, and what success looks like for you.
          </p>
          <textarea
            className="textarea textarea-bordered mt-1.5 min-h-36"
            aria-required="true"
            aria-invalid={!!form.formState.errors.message}
            {...form.register("message")}
          />
          <span className="mt-1 min-h-5 text-xs text-error" role="alert">
            {form.formState.errors.message?.message}
          </span>
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="btn btn-primary rounded-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader2 size={14} className="mr-2 animate-spin" aria-hidden />
              {contactFormCopy.submitSending}
            </>
          ) : (
            contactFormCopy.submitIdle
          )}
        </button>
        <p className="text-xs text-muted">
          Fields marked{" "}
          <span className="text-error" aria-hidden>
            *
          </span>{" "}
          are required.
        </p>
      </div>

      {mutation.isError && (
        <p
          role="alert"
          aria-live="assertive"
          className="mt-4 text-sm text-error"
        >
          {contactFormCopy.error}
        </p>
      )}
    </form>
  );
}
```

---

## 10. Replace `src/pages/ContactPage.tsx`

```tsx
import {
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { Eyebrow } from "@/components/Eyebrow";
import { SectionHeading } from "@/components/SectionHeading";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { NewsletterSignup } from "@/components/contact/NewsletterSignup";
import { FadeInSection } from "@/components/motion/FadeInSection";
import { PageSeo } from "@/components/seo/PageSeo";
import { getOffices } from "@/content/repository";
import { studioEmail } from "@/content/siteShell";
import { FEATURE_FLAGS } from "@/lib/featureFlags";
import type { Office } from "@/types/content";

// ─── Region badge ─────────────────────────────────────────────────────────────

const REGION_COLOURS: Record<Office["region"], string> = {
  Americas: "bg-sky-100 text-sky-800 border-sky-200",
  EMEA: "bg-violet-100 text-violet-800 border-violet-200",
  APAC: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

// ─── Office card ──────────────────────────────────────────────────────────────

function OfficeCard({ office }: { office: Office }) {
  return (
    <article className="surface-panel flex flex-col gap-5 p-6">
      {/* Header */}
      <div className="space-y-1.5">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${REGION_COLOURS[office.region]}`}
        >
          {office.region}
        </span>
        <p className="font-serif text-lg font-light leading-snug">
          {office.city}
        </p>
        <p className="text-xs text-muted">{office.country}</p>
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 text-sm text-muted">
        <MapPin
          size={13}
          className="mt-0.5 shrink-0 text-base-content/40"
          aria-hidden
        />
        <span>{office.addressLine}</span>
      </div>

      {/* Contact links */}
      <ul className="space-y-2">
        {office.phone && (
          <li>
            <a
              href={`tel:${office.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-base-content"
            >
              <Phone size={13} className="shrink-0 text-base-content/40" aria-hidden />
              {office.phone}
            </a>
          </li>
        )}
        {office.email && (
          <li>
            <a
              href={`mailto:${office.email}`}
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-base-content"
            >
              <Mail size={13} className="shrink-0 text-base-content/40" aria-hidden />
              {office.email}
            </a>
          </li>
        )}
      </ul>

      {/* Map link */}
      <div className="mt-auto border-t border-base-300 pt-4">
        {office.mapUrl ? (
          <a
            href={office.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold underline-offset-2 hover:underline"
          >
            View on map
            <ExternalLink size={11} aria-hidden />
          </a>
        ) : (
          <span className="text-xs text-base-content/30">Map unavailable</span>
        )}
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ContactPage() {
  const offices = getOffices();

  return (
    <>
      <PageSeo
        title="Contact — North Axis Studio"
        description="Get in touch with North Axis Studio.
```

## License: unknown

https://github.com/pouyakary/gerda/blob/f922891d5f249e681ddad5ee66bd7bbe2127aa46/server/kernel/space-finder.ts

````
Good — I have everything. Here's the full implementation across 11 files.

---

## 1. Extend `Office` type — [src/types/content.ts](src/types/content.ts#L152-L159)

```typescript
export type Office = ContentEntryBase & {
  city: string;
  country: string;
  region: "Americas" | "EMEA" | "APAC";
  addressLine: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
};
````

---

## 2. Update seed offices — [src/content/seed.ts](src/content/seed.ts#L75)

Replace the seven office objects' fields with contact details appended inline. Only the new lines are shown per office; all existing fields stay:

```typescript
// New York
city: "New York",
country: "USA",
region: "Americas",
addressLine: "11 Mercer Street, Manhattan",
phone: "+1 212 431 5900",
email: "nyc@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=11+Mercer+Street+Manhattan+New+York",

// Copenhagen
city: "Copenhagen",
country: "Denmark",
region: "EMEA",
addressLine: "47 Vestergade, Copenhagen K",
phone: "+45 33 12 5900",
email: "cph@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=47+Vestergade+Copenhagen+K+Denmark",

// Singapore
city: "Singapore",
country: "Singapore",
region: "APAC",
addressLine: "8 Robinson Road",
phone: "+65 6221 5900",
email: "sin@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=8+Robinson+Road+Singapore",

// Nairobi
city: "Nairobi",
country: "Kenya",
region: "EMEA",
addressLine: "3 Riverside Drive",
phone: "+254 20 262 5900",
email: "nbi@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=3+Riverside+Drive+Nairobi+Kenya",

// London
city: "London",
country: "UK",
region: "EMEA",
addressLine: "21 Clerkenwell Road",
phone: "+44 20 7253 5900",
email: "lon@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=21+Clerkenwell+Road+London+UK",

// Toronto
city: "Toronto",
country: "Canada",
region: "Americas",
addressLine: "145 Wellington Street West",
phone: "+1 416 977 5900",
email: "yyz@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=145+Wellington+Street+West+Toronto+Canada",

// Sao Paulo
city: "Sao Paulo",
country: "Brazil",
region: "Americas",
addressLine: "118 Avenida Paulista",
phone: "+55 11 3162 5900",
email: "sao@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=118+Avenida+Paulista+Sao+Paulo+Brazil",
```

---

## 3. Create `src/lib/featureFlags.ts`

```typescript
/**
 * Feature flags driven by Vite environment variables.
 * Set in .env.local to enable — never hard-code "true" in .env for flags
 * that gate unfinished flows.
 *
 * VITE_CONTACT_FORM_ENABLED=true   → shows the inquiry form on /contact
 */
export const FEATURE_FLAGS = {
  contactForm: import.meta.env.VITE_CONTACT_FORM_ENABLED === "true",
} as const;
```

---

## 4. Create `src/features/newsletter/newsletterProvider.ts`

```typescript
// ─── Interface ────────────────────────────────────────────────────────────────

export interface NewsletterProvider {
  subscribe(email: string): Promise<void>;
}

// ─── Local mock ───────────────────────────────────────────────────────────────

class LocalNewsletterProvider implements NewsletterProvider {
  async subscribe(email: string): Promise<void> {
    await new Promise<void>((res) => setTimeout(res, 450));
    // In a real integration, remove this log and ship the remote adapter
    if (import.meta.env.DEV) {
      console.info("[Newsletter] Subscribed (local mock):", email);
    }
  }
}

// ─── Remote provider ──────────────────────────────────────────────────────────
// Activated when VITE_NEWSLETTER_API_URL is set.
//
// Point this at your own backend proxy that handles the Mailchimp / Brevo /
// SendGrid call — external ESP APIs require server-side requests because they
// use secret API keys that must not be exposed in the browser bundle.
//
// Minimal expected contract:
//   POST <VITE_NEWSLETTER_API_URL>
//   Body: { email: string }
//   Success: 2xx (body ignored)
//   Failure: non-2xx — message in JSON { error: string } if available

class RemoteNewsletterProvider implements NewsletterProvider {
  constructor(private readonly apiUrl: string) {}

  async subscribe(email: string): Promise<void> {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      let message = `Newsletter API responded with ${response.status}`;
      try {
        const body = (await response.json()) as { error?: string };
        if (body.error) message = body.error;
      } catch {
        // ignore parse error — use generic message
      }
      throw new Error(message);
    }
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────

function createNewsletterProvider(): NewsletterProvider {
  const apiUrl = (
    import.meta.env.VITE_NEWSLETTER_API_URL as string | undefined
  )?.trim();
  return apiUrl
    ? new RemoteNewsletterProvider(apiUrl)
    : new LocalNewsletterProvider();
}

export const newsletterProvider: NewsletterProvider =
  createNewsletterProvider();
```

---

## 5. Create `src/features/newsletter/useNewsletterSignup.ts`

```typescript
import { useMutation } from "@tanstack/react-query";
import { newsletterProvider } from "./newsletterProvider";

export function useNewsletterSignup() {
  return useMutation({
    mutationFn: (email: string) => newsletterProvider.subscribe(email),
  });
}
```

---

## 6. Create `src/features/contact/contactProvider.ts`

```typescript
import type { ContactFormValues } from "./contactSchema";

// ─── Interface ────────────────────────────────────────────────────────────────

export interface ContactProvider {
  submit(values: ContactFormValues): Promise<void>;
}

// ─── Local mock ───────────────────────────────────────────────────────────────

class LocalContactProvider implements ContactProvider {
  async submit(values: ContactFormValues): Promise<void> {
    await new Promise<void>((res) => setTimeout(res, 600));
    if (import.meta.env.DEV) {
      console.info("[Contact] Inquiry submitted (local mock):", values);
    }
  }
}

// ─── Remote provider ──────────────────────────────────────────────────────────
// Activated when VITE_CONTACT_API_URL is set.
//
// Expected contract:
//   POST <VITE_CONTACT_API_URL>
//   Body: ContactFormValues as JSON
//   Success: 2xx
//   Failure: non-2xx — { error: string } if available

class RemoteContactProvider implements ContactProvider {
  constructor(private readonly apiUrl: string) {}

  async submit(values: ContactFormValues): Promise<void> {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      let message = `Contact API responded with ${response.status}`;
      try {
        const body = (await response.json()) as { error?: string };
        if (body.error) message = body.error;
      } catch {
        // ignore
      }
      throw new Error(message);
    }
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────

function createContactProvider(): ContactProvider {
  const apiUrl = (
    import.meta.env.VITE_CONTACT_API_URL as string | undefined
  )?.trim();
  return apiUrl
    ? new RemoteContactProvider(apiUrl)
    : new LocalContactProvider();
}

export const contactProvider: ContactProvider = createContactProvider();
```

---

## 7. Create `src/features/contact/useContactInquiry.ts`

```typescript
import { useMutation } from "@tanstack/react-query";
import type { ContactFormValues } from "./contactSchema";
import { contactProvider } from "./contactProvider";

export function useContactInquiry(options?: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: (values: ContactFormValues) => contactProvider.submit(values),
    onSuccess: options?.onSuccess,
  });
}
```

---

## 8. Create `src/components/contact/NewsletterSignup.tsx`

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNewsletterSignup } from "@/features/newsletter/useNewsletterSignup";
import { buttonClassName } from "@/lib/buttonClassName";
import { cn } from "@/lib/cn";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

type NewsletterSignupProps = {
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function NewsletterSignup({
  className,
  eyebrow = "Studio Notes",
  title = "Monthly thinking from our teams.",
  description = "Strategy, craft, and field observations — delivered once a month. No noise.",
}: NewsletterSignupProps) {
  const emailId = useId();
  const errorId = useId();

  const { register, handleSubmit, reset, formState } =
    useForm<NewsletterFormValues>({
      resolver: zodResolver(newsletterSchema),
    });

  const mutation = useNewsletterSignup();

  const onSubmit = (values: NewsletterFormValues) => {
    mutation.mutate(values.email, {
      onSuccess: () => reset(),
    });
  };

  return (
    <section className={cn("surface-panel space-y-5 p-6 md:p-8", className)}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/50">
          {eyebrow}
        </p>
        <p className="mt-2 font-serif text-xl font-light">{title}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {description}
        </p>
      </div>

      {mutation.isSuccess ? (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-2.5 text-sm font-medium text-base-content"
        >
          <CheckCircle2 size={16} className="text-green-600" aria-hidden />
          You are subscribed. Thank you.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="Newsletter signup"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label htmlFor={emailId} className="sr-only">
                Email address
              </label>
              <input
                id={emailId}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-describedby={formState.errors.email ? errorId : undefined}
                aria-invalid={!!formState.errors.email}
                className={cn(
                  "input input-bordered w-full rounded-full text-sm",
                  formState.errors.email && "input-error",
                )}
                {...register("email")}
              />
            </div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className={cn(buttonClassName("solid", "md"), "shrink-0")}
            >
              {mutation.isPending ? (
                <>
                  <Loader2
                    size={14}
                    className="mr-2 animate-spin"
                    aria-hidden
                  />
                  Subscribing…
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>

          {formState.errors.email && (
            <p id={errorId} role="alert" className="mt-2 text-xs text-error">
              {formState.errors.email.message}
            </p>
          )}

          {mutation.isError && (
            <p
              role="alert"
              aria-live="assertive"
              className="mt-2 text-xs text-error"
            >
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Subscription failed. Please try again."}
            </p>
          )}

          <p className="mt-3 text-xs text-base-content/40">
            No spam. Unsubscribe at any time.
          </p>
        </form>
      )}
    </section>
  );
}
```

---

## 9. Create `src/components/contact/InquiryForm.tsx`

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  budgetOptions,
  contactFormCopy,
  projectTypeOptions,
} from "@/data/siteContent";
import { useContactInquiry } from "@/features/contact/useContactInquiry";
import {
  type ContactFormValues,
  contactSchema,
} from "@/features/contact/contactSchema";

type InquiryFormProps = {
  className?: string;
};

export function InquiryForm({ className }: InquiryFormProps) {
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

  const mutation = useContactInquiry({ onSuccess: () => form.reset() });

  if (mutation.isSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-start gap-3 rounded-2xl border border-base-300 bg-base-100 p-6"
      >
        <CheckCircle2
          size={18}
          className="mt-0.5 shrink-0 text-green-600"
          aria-hidden
        />
        <div>
          <p className="font-semibold">Brief received</p>
          <p className="mt-0.5 text-sm text-muted">{contactFormCopy.success}</p>
        </div>
      </div>
    );
  }

  return (
    <form
      className={className}
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      noValidate
      aria-label="Project inquiry form"
    >
      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.nameLabel}
              <span className="ml-1 text-error" aria-hidden>
                *
              </span>
            </span>
            <input
              className="input input-bordered"
              type="text"
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!form.formState.errors.name}
              {...form.register("name")}
            />
            <span className="mt-1 min-h-5 text-xs text-error" role="alert">
              {form.formState.errors.name?.message}
            </span>
          </label>

          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.emailLabel}
              <span className="ml-1 text-error" aria-hidden>
                *
              </span>
            </span>
            <input
              className="input input-bordered"
              type="email"
              autoComplete="email"
              aria-required="true"
              aria-invalid={!!form.formState.errors.email}
              {...form.register("email")}
            />
            <span className="mt-1 min-h-5 text-xs text-error" role="alert">
              {form.formState.errors.email?.message}
            </span>
          </label>
        </div>

        <label className="form-control">
          <span className="label-text font-medium">
            {contactFormCopy.organizationLabel}
            <span className="ml-1 text-error" aria-hidden>
              *
            </span>
          </span>
          <input
            className="input input-bordered"
            type="text"
            autoComplete="organization"
            aria-required="true"
            aria-invalid={!!form.formState.errors.organization}
            {...form.register("organization")}
          />
          <span className="mt-1 min-h-5 text-xs text-error" role="alert">
            {form.formState.errors.organization?.message}
          </span>
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.projectTypeLabel}
              <span className="ml-1 text-error" aria-hidden>
                *
              </span>
            </span>
            <select
              className="select select-bordered"
              aria-required="true"
              aria-invalid={!!form.formState.errors.projectType}
              {...form.register("projectType")}
            >
              <option value="">{contactFormCopy.selectPlaceholder}</option>
              {projectTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="mt-1 min-h-5 text-xs text-error" role="alert">
              {form.formState.errors.projectType?.message}
            </span>
          </label>

          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.budgetLabel}
              <span className="ml-1 text-error" aria-hidden>
                *
              </span>
            </span>
            <select
              className="select select-bordered"
              aria-required="true"
              aria-invalid={!!form.formState.errors.budget}
              {...form.register("budget")}
            >
              <option value="">{contactFormCopy.selectPlaceholder}</option>
              {budgetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="mt-1 min-h-5 text-xs text-error" role="alert">
              {form.formState.errors.budget?.message}
            </span>
          </label>
        </div>

        <label className="form-control">
          <span className="label-text font-medium">
            {contactFormCopy.briefLabel}
            <span className="ml-1 text-error" aria-hidden>
              *
            </span>
          </span>
          <p className="mt-0.5 text-xs text-muted">
            Share context, timeline, and what success looks like for you.
          </p>
          <textarea
            className="textarea textarea-bordered mt-1.5 min-h-36"
            aria-required="true"
            aria-invalid={!!form.formState.errors.message}
            {...form.register("message")}
          />
          <span className="mt-1 min-h-5 text-xs text-error" role="alert">
            {form.formState.errors.message?.message}
          </span>
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="btn btn-primary rounded-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader2 size={14} className="mr-2 animate-spin" aria-hidden />
              {contactFormCopy.submitSending}
            </>
          ) : (
            contactFormCopy.submitIdle
          )}
        </button>
        <p className="text-xs text-muted">
          Fields marked{" "}
          <span className="text-error" aria-hidden>
            *
          </span>{" "}
          are required.
        </p>
      </div>

      {mutation.isError && (
        <p
          role="alert"
          aria-live="assertive"
          className="mt-4 text-sm text-error"
        >
          {contactFormCopy.error}
        </p>
      )}
    </form>
  );
}
```

---

## 10. Replace `src/pages/ContactPage.tsx`

```tsx
import {
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { Eyebrow } from "@/components/Eyebrow";
import { SectionHeading } from "@/components/SectionHeading";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { NewsletterSignup } from "@/components/contact/NewsletterSignup";
import { FadeInSection } from "@/components/motion/FadeInSection";
import { PageSeo } from "@/components/seo/PageSeo";
import { getOffices } from "@/content/repository";
import { studioEmail } from "@/content/siteShell";
import { FEATURE_FLAGS } from "@/lib/featureFlags";
import type { Office } from "@/types/content";

// ─── Region badge ─────────────────────────────────────────────────────────────

const REGION_COLOURS: Record<Office["region"], string> = {
  Americas: "bg-sky-100 text-sky-800 border-sky-200",
  EMEA: "bg-violet-100 text-violet-800 border-violet-200",
  APAC: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

// ─── Office card ──────────────────────────────────────────────────────────────

function OfficeCard({ office }: { office: Office }) {
  return (
    <article className="surface-panel flex flex-col gap-5 p-6">
      {/* Header */}
      <div className="space-y-1.5">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${REGION_COLOURS[office.region]}`}
        >
          {office.region}
        </span>
        <p className="font-serif text-lg font-light leading-snug">
          {office.city}
        </p>
        <p className="text-xs text-muted">{office.country}</p>
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 text-sm text-muted">
        <MapPin
          size={13}
          className="mt-0.5 shrink-0 text-base-content/40"
          aria-hidden
        />
        <span>{office.addressLine}</span>
      </div>

      {/* Contact links */}
      <ul className="space-y-2">
        {office.phone && (
          <li>
            <a
              href={`tel:${office.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-base-content"
            >
              <Phone size={13} className="shrink-0 text-base-content/40" aria-hidden />
              {office.phone}
            </a>
          </li>
        )}
        {office.email && (
          <li>
            <a
              href={`mailto:${office.email}`}
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-base-content"
            >
              <Mail size={13} className="shrink-0 text-base-content/40" aria-hidden />
              {office.email}
            </a>
          </li>
        )}
      </ul>

      {/* Map link */}
      <div className="mt-auto border-t border-base-300 pt-4">
        {office.mapUrl ? (
          <a
            href={office.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold underline-offset-2 hover:underline"
          >
            View on map
            <ExternalLink size={11} aria-hidden />
          </a>
        ) : (
          <span className="text-xs text-base-content/30">Map unavailable</span>
        )}
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ContactPage() {
  const offices = getOffices();

  return (
    <>
      <PageSeo
        title="Contact — North Axis Studio"
        description="Get in touch with North Axis Studio.
```

## License: unknown

https://github.com/pouyakary/gerda/blob/f922891d5f249e681ddad5ee66bd7bbe2127aa46/server/kernel/space-finder.ts

````
Good — I have everything. Here's the full implementation across 11 files.

---

## 1. Extend `Office` type — [src/types/content.ts](src/types/content.ts#L152-L159)

```typescript
export type Office = ContentEntryBase & {
  city: string;
  country: string;
  region: "Americas" | "EMEA" | "APAC";
  addressLine: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
};
````

---

## 2. Update seed offices — [src/content/seed.ts](src/content/seed.ts#L75)

Replace the seven office objects' fields with contact details appended inline. Only the new lines are shown per office; all existing fields stay:

```typescript
// New York
city: "New York",
country: "USA",
region: "Americas",
addressLine: "11 Mercer Street, Manhattan",
phone: "+1 212 431 5900",
email: "nyc@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=11+Mercer+Street+Manhattan+New+York",

// Copenhagen
city: "Copenhagen",
country: "Denmark",
region: "EMEA",
addressLine: "47 Vestergade, Copenhagen K",
phone: "+45 33 12 5900",
email: "cph@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=47+Vestergade+Copenhagen+K+Denmark",

// Singapore
city: "Singapore",
country: "Singapore",
region: "APAC",
addressLine: "8 Robinson Road",
phone: "+65 6221 5900",
email: "sin@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=8+Robinson+Road+Singapore",

// Nairobi
city: "Nairobi",
country: "Kenya",
region: "EMEA",
addressLine: "3 Riverside Drive",
phone: "+254 20 262 5900",
email: "nbi@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=3+Riverside+Drive+Nairobi+Kenya",

// London
city: "London",
country: "UK",
region: "EMEA",
addressLine: "21 Clerkenwell Road",
phone: "+44 20 7253 5900",
email: "lon@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=21+Clerkenwell+Road+London+UK",

// Toronto
city: "Toronto",
country: "Canada",
region: "Americas",
addressLine: "145 Wellington Street West",
phone: "+1 416 977 5900",
email: "yyz@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=145+Wellington+Street+West+Toronto+Canada",

// Sao Paulo
city: "Sao Paulo",
country: "Brazil",
region: "Americas",
addressLine: "118 Avenida Paulista",
phone: "+55 11 3162 5900",
email: "sao@northaxis.studio",
mapUrl: "https://www.google.com/maps/search/?api=1&query=118+Avenida+Paulista+Sao+Paulo+Brazil",
```

---

## 3. Create `src/lib/featureFlags.ts`

```typescript
/**
 * Feature flags driven by Vite environment variables.
 * Set in .env.local to enable — never hard-code "true" in .env for flags
 * that gate unfinished flows.
 *
 * VITE_CONTACT_FORM_ENABLED=true   → shows the inquiry form on /contact
 */
export const FEATURE_FLAGS = {
  contactForm: import.meta.env.VITE_CONTACT_FORM_ENABLED === "true",
} as const;
```

---

## 4. Create `src/features/newsletter/newsletterProvider.ts`

```typescript
// ─── Interface ────────────────────────────────────────────────────────────────

export interface NewsletterProvider {
  subscribe(email: string): Promise<void>;
}

// ─── Local mock ───────────────────────────────────────────────────────────────

class LocalNewsletterProvider implements NewsletterProvider {
  async subscribe(email: string): Promise<void> {
    await new Promise<void>((res) => setTimeout(res, 450));
    // In a real integration, remove this log and ship the remote adapter
    if (import.meta.env.DEV) {
      console.info("[Newsletter] Subscribed (local mock):", email);
    }
  }
}

// ─── Remote provider ──────────────────────────────────────────────────────────
// Activated when VITE_NEWSLETTER_API_URL is set.
//
// Point this at your own backend proxy that handles the Mailchimp / Brevo /
// SendGrid call — external ESP APIs require server-side requests because they
// use secret API keys that must not be exposed in the browser bundle.
//
// Minimal expected contract:
//   POST <VITE_NEWSLETTER_API_URL>
//   Body: { email: string }
//   Success: 2xx (body ignored)
//   Failure: non-2xx — message in JSON { error: string } if available

class RemoteNewsletterProvider implements NewsletterProvider {
  constructor(private readonly apiUrl: string) {}

  async subscribe(email: string): Promise<void> {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      let message = `Newsletter API responded with ${response.status}`;
      try {
        const body = (await response.json()) as { error?: string };
        if (body.error) message = body.error;
      } catch {
        // ignore parse error — use generic message
      }
      throw new Error(message);
    }
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────

function createNewsletterProvider(): NewsletterProvider {
  const apiUrl = (
    import.meta.env.VITE_NEWSLETTER_API_URL as string | undefined
  )?.trim();
  return apiUrl
    ? new RemoteNewsletterProvider(apiUrl)
    : new LocalNewsletterProvider();
}

export const newsletterProvider: NewsletterProvider =
  createNewsletterProvider();
```

---

## 5. Create `src/features/newsletter/useNewsletterSignup.ts`

```typescript
import { useMutation } from "@tanstack/react-query";
import { newsletterProvider } from "./newsletterProvider";

export function useNewsletterSignup() {
  return useMutation({
    mutationFn: (email: string) => newsletterProvider.subscribe(email),
  });
}
```

---

## 6. Create `src/features/contact/contactProvider.ts`

```typescript
import type { ContactFormValues } from "./contactSchema";

// ─── Interface ────────────────────────────────────────────────────────────────

export interface ContactProvider {
  submit(values: ContactFormValues): Promise<void>;
}

// ─── Local mock ───────────────────────────────────────────────────────────────

class LocalContactProvider implements ContactProvider {
  async submit(values: ContactFormValues): Promise<void> {
    await new Promise<void>((res) => setTimeout(res, 600));
    if (import.meta.env.DEV) {
      console.info("[Contact] Inquiry submitted (local mock):", values);
    }
  }
}

// ─── Remote provider ──────────────────────────────────────────────────────────
// Activated when VITE_CONTACT_API_URL is set.
//
// Expected contract:
//   POST <VITE_CONTACT_API_URL>
//   Body: ContactFormValues as JSON
//   Success: 2xx
//   Failure: non-2xx — { error: string } if available

class RemoteContactProvider implements ContactProvider {
  constructor(private readonly apiUrl: string) {}

  async submit(values: ContactFormValues): Promise<void> {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      let message = `Contact API responded with ${response.status}`;
      try {
        const body = (await response.json()) as { error?: string };
        if (body.error) message = body.error;
      } catch {
        // ignore
      }
      throw new Error(message);
    }
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────

function createContactProvider(): ContactProvider {
  const apiUrl = (
    import.meta.env.VITE_CONTACT_API_URL as string | undefined
  )?.trim();
  return apiUrl
    ? new RemoteContactProvider(apiUrl)
    : new LocalContactProvider();
}

export const contactProvider: ContactProvider = createContactProvider();
```

---

## 7. Create `src/features/contact/useContactInquiry.ts`

```typescript
import { useMutation } from "@tanstack/react-query";
import type { ContactFormValues } from "./contactSchema";
import { contactProvider } from "./contactProvider";

export function useContactInquiry(options?: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: (values: ContactFormValues) => contactProvider.submit(values),
    onSuccess: options?.onSuccess,
  });
}
```

---

## 8. Create `src/components/contact/NewsletterSignup.tsx`

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNewsletterSignup } from "@/features/newsletter/useNewsletterSignup";
import { buttonClassName } from "@/lib/buttonClassName";
import { cn } from "@/lib/cn";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

type NewsletterSignupProps = {
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function NewsletterSignup({
  className,
  eyebrow = "Studio Notes",
  title = "Monthly thinking from our teams.",
  description = "Strategy, craft, and field observations — delivered once a month. No noise.",
}: NewsletterSignupProps) {
  const emailId = useId();
  const errorId = useId();

  const { register, handleSubmit, reset, formState } =
    useForm<NewsletterFormValues>({
      resolver: zodResolver(newsletterSchema),
    });

  const mutation = useNewsletterSignup();

  const onSubmit = (values: NewsletterFormValues) => {
    mutation.mutate(values.email, {
      onSuccess: () => reset(),
    });
  };

  return (
    <section className={cn("surface-panel space-y-5 p-6 md:p-8", className)}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/50">
          {eyebrow}
        </p>
        <p className="mt-2 font-serif text-xl font-light">{title}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {description}
        </p>
      </div>

      {mutation.isSuccess ? (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-2.5 text-sm font-medium text-base-content"
        >
          <CheckCircle2 size={16} className="text-green-600" aria-hidden />
          You are subscribed. Thank you.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="Newsletter signup"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label htmlFor={emailId} className="sr-only">
                Email address
              </label>
              <input
                id={emailId}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-describedby={formState.errors.email ? errorId : undefined}
                aria-invalid={!!formState.errors.email}
                className={cn(
                  "input input-bordered w-full rounded-full text-sm",
                  formState.errors.email && "input-error",
                )}
                {...register("email")}
              />
            </div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className={cn(buttonClassName("solid", "md"), "shrink-0")}
            >
              {mutation.isPending ? (
                <>
                  <Loader2
                    size={14}
                    className="mr-2 animate-spin"
                    aria-hidden
                  />
                  Subscribing…
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>

          {formState.errors.email && (
            <p id={errorId} role="alert" className="mt-2 text-xs text-error">
              {formState.errors.email.message}
            </p>
          )}

          {mutation.isError && (
            <p
              role="alert"
              aria-live="assertive"
              className="mt-2 text-xs text-error"
            >
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Subscription failed. Please try again."}
            </p>
          )}

          <p className="mt-3 text-xs text-base-content/40">
            No spam. Unsubscribe at any time.
          </p>
        </form>
      )}
    </section>
  );
}
```

---

## 9. Create `src/components/contact/InquiryForm.tsx`

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  budgetOptions,
  contactFormCopy,
  projectTypeOptions,
} from "@/data/siteContent";
import { useContactInquiry } from "@/features/contact/useContactInquiry";
import {
  type ContactFormValues,
  contactSchema,
} from "@/features/contact/contactSchema";

type InquiryFormProps = {
  className?: string;
};

export function InquiryForm({ className }: InquiryFormProps) {
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

  const mutation = useContactInquiry({ onSuccess: () => form.reset() });

  if (mutation.isSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-start gap-3 rounded-2xl border border-base-300 bg-base-100 p-6"
      >
        <CheckCircle2
          size={18}
          className="mt-0.5 shrink-0 text-green-600"
          aria-hidden
        />
        <div>
          <p className="font-semibold">Brief received</p>
          <p className="mt-0.5 text-sm text-muted">{contactFormCopy.success}</p>
        </div>
      </div>
    );
  }

  return (
    <form
      className={className}
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      noValidate
      aria-label="Project inquiry form"
    >
      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.nameLabel}
              <span className="ml-1 text-error" aria-hidden>
                *
              </span>
            </span>
            <input
              className="input input-bordered"
              type="text"
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!form.formState.errors.name}
              {...form.register("name")}
            />
            <span className="mt-1 min-h-5 text-xs text-error" role="alert">
              {form.formState.errors.name?.message}
            </span>
          </label>

          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.emailLabel}
              <span className="ml-1 text-error" aria-hidden>
                *
              </span>
            </span>
            <input
              className="input input-bordered"
              type="email"
              autoComplete="email"
              aria-required="true"
              aria-invalid={!!form.formState.errors.email}
              {...form.register("email")}
            />
            <span className="mt-1 min-h-5 text-xs text-error" role="alert">
              {form.formState.errors.email?.message}
            </span>
          </label>
        </div>

        <label className="form-control">
          <span className="label-text font-medium">
            {contactFormCopy.organizationLabel}
            <span className="ml-1 text-error" aria-hidden>
              *
            </span>
          </span>
          <input
            className="input input-bordered"
            type="text"
            autoComplete="organization"
            aria-required="true"
            aria-invalid={!!form.formState.errors.organization}
            {...form.register("organization")}
          />
          <span className="mt-1 min-h-5 text-xs text-error" role="alert">
            {form.formState.errors.organization?.message}
          </span>
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.projectTypeLabel}
              <span className="ml-1 text-error" aria-hidden>
                *
              </span>
            </span>
            <select
              className="select select-bordered"
              aria-required="true"
              aria-invalid={!!form.formState.errors.projectType}
              {...form.register("projectType")}
            >
              <option value="">{contactFormCopy.selectPlaceholder}</option>
              {projectTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="mt-1 min-h-5 text-xs text-error" role="alert">
              {form.formState.errors.projectType?.message}
            </span>
          </label>

          <label className="form-control">
            <span className="label-text font-medium">
              {contactFormCopy.budgetLabel}
              <span className="ml-1 text-error" aria-hidden>
                *
              </span>
            </span>
            <select
              className="select select-bordered"
              aria-required="true"
              aria-invalid={!!form.formState.errors.budget}
              {...form.register("budget")}
            >
              <option value="">{contactFormCopy.selectPlaceholder}</option>
              {budgetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="mt-1 min-h-5 text-xs text-error" role="alert">
              {form.formState.errors.budget?.message}
            </span>
          </label>
        </div>

        <label className="form-control">
          <span className="label-text font-medium">
            {contactFormCopy.briefLabel}
            <span className="ml-1 text-error" aria-hidden>
              *
            </span>
          </span>
          <p className="mt-0.5 text-xs text-muted">
            Share context, timeline, and what success looks like for you.
          </p>
          <textarea
            className="textarea textarea-bordered mt-1.5 min-h-36"
            aria-required="true"
            aria-invalid={!!form.formState.errors.message}
            {...form.register("message")}
          />
          <span className="mt-1 min-h-5 text-xs text-error" role="alert">
            {form.formState.errors.message?.message}
          </span>
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="btn btn-primary rounded-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader2 size={14} className="mr-2 animate-spin" aria-hidden />
              {contactFormCopy.submitSending}
            </>
          ) : (
            contactFormCopy.submitIdle
          )}
        </button>
        <p className="text-xs text-muted">
          Fields marked{" "}
          <span className="text-error" aria-hidden>
            *
          </span>{" "}
          are required.
        </p>
      </div>

      {mutation.isError && (
        <p
          role="alert"
          aria-live="assertive"
          className="mt-4 text-sm text-error"
        >
          {contactFormCopy.error}
        </p>
      )}
    </form>
  );
}
```

---

## 10. Replace `src/pages/ContactPage.tsx`

```tsx
import {
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "@/components/Container";
import { CTASection } from "@/components/CTASection";
import { Eyebrow } from "@/components/Eyebrow";
import { SectionHeading } from "@/components/SectionHeading";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { NewsletterSignup } from "@/components/contact/NewsletterSignup";
import { FadeInSection } from "@/components/motion/FadeInSection";
import { PageSeo } from "@/components/seo/PageSeo";
import { getOffices } from "@/content/repository";
import { studioEmail } from "@/content/siteShell";
import { FEATURE_FLAGS } from "@/lib/featureFlags";
import type { Office } from "@/types/content";

// ─── Region badge ─────────────────────────────────────────────────────────────

const REGION_COLOURS: Record<Office["region"], string> = {
  Americas: "bg-sky-100 text-sky-800 border-sky-200",
  EMEA: "bg-violet-100 text-violet-800 border-violet-200",
  APAC: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

// ─── Office card ──────────────────────────────────────────────────────────────

function OfficeCard({ office }: { office: Office }) {
  return (
    <article className="surface-panel flex flex-col gap-5 p-6">
      {/* Header */}
      <div className="space-y-1.5">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${REGION_COLOURS[office.region]}`}
        >
          {office.region}
        </span>
        <p className="font-serif text-lg font-light leading-snug">
          {office.city}
        </p>
        <p className="text-xs text-muted">{office.country}</p>
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 text-sm text-muted">
        <MapPin
          size={13}
          className="mt-0.5 shrink-0 text-base-content/40"
          aria-hidden
        />
        <span>{office.addressLine}</span>
      </div>

      {/* Contact links */}
      <ul className="space-y-2">
        {office.phone && (
          <li>
            <a
              href={`tel:${office.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-base-content"
            >
              <Phone size={13} className="shrink-0 text-base-content/40" aria-hidden />
              {office.phone}
            </a>
          </li>
        )}
        {office.email && (
          <li>
            <a
              href={`mailto:${office.email}`}
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-base-content"
            >
              <Mail size={13} className="shrink-0 text-base-content/40" aria-hidden />
              {office.email}
            </a>
          </li>
        )}
      </ul>

      {/* Map link */}
      <div className="mt-auto border-t border-base-300 pt-4">
        {office.mapUrl ? (
          <a
            href={office.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold underline-offset-2 hover:underline"
          >
            View on map
            <ExternalLink size={11} aria-hidden />
          </a>
        ) : (
          <span className="text-xs text-base-content/30">Map unavailable</span>
        )}
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ContactPage() {
  const offices = getOffices();

  return (
    <>
      <PageSeo
        title="Contact — North Axis Studio"
        description="Get in touch with North Axis Studio.
```
