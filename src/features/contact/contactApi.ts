import type { ContactFormValues } from "./contactSchema";

type ContactSubmissionResult = {
  id: number;
};

export async function submitContactRequest(
  payload: ContactFormValues,
): Promise<ContactSubmissionResult> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Unable to submit your request. Please try again.");
  }

  return response.json() as Promise<ContactSubmissionResult>;
}
