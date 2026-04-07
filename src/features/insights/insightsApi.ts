import type { Insight } from "../../types/content";

type RemoteInsight = {
  id: number;
  title: string;
  body: string;
};

export async function fetchInsights(): Promise<Insight[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=3",
  );

  if (!response.ok) {
    throw new Error("Could not load insights at this moment.");
  }

  const payload = (await response.json()) as RemoteInsight[];

  return payload.map((entry) => ({
    id: entry.id,
    title: entry.title,
    summary: entry.body,
  }));
}
