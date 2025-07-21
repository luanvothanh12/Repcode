import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    "https://api.github.com/repos/hussiiii/repcode",
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "repcode-app",
      },
    }
  );

  if (!response.ok) {
    return res.status(500).json({ stars: 0 });
  }

  const data = await response.json();
  return res.status(200).json({ stars: data.stargazers_count });
}
