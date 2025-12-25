const BASE_URL = "https://mixo-fe-backend-task.vercel.app";

export async function getCampaigns() {
  const res = await fetch(`${BASE_URL}/campaigns`);
  if (!res.ok) throw new Error("Failed to fetch campaigns");
  return res.json();
}

export async function getAggregateInsights() {
  const res = await fetch(`${BASE_URL}/campaigns/insights`);
  if (!res.ok) throw new Error("Failed to fetch insights");
  return res.json();
}

export async function getCampaignInsights(id: string) {
  const res = await fetch(`${BASE_URL}/campaigns/${id}/insights`);
  if (!res.ok) throw new Error("Failed to fetch campaign insights");
  return res.json();
}
