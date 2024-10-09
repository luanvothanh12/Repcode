import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { question, solution, userSolution, userMessage, apiKey } = req.body;

  const openai = new OpenAI({
    apiKey: apiKey,
  });

  const messages: any = [
    { role: "system", content: "You are a helpful assistant. I am going to send you a Leetcode problem, the expected solution, and my solution. I need some help with it." },
    { role: "user", content: `Problem: ${question}\nExpected Solution: ${solution}\nMy Solution: ${userSolution}\nWhat I need help with: ${userMessage}\n\nProvide feedback on the my solution in 2-3 sentences. If there are any issues, explain what they are and how to fix them. Also, if my code is incorrect, can you please show me the correct code? You dont have to post the full code, if there's a small mistake then just providing the correct relevent code snippet will do. Remember: regardless of your response, please keep it as brief and concise as you can. And if my solution code is correct, then there's no need for you to show me the correct code then, of course. Also, somewhere in your response please mention the runtime.` }
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens: 300,
    });

    if (completion.choices && completion.choices.length > 0) {
        const message = completion.choices[0].message?.content?.trim() || "No response from AI.";
        res.status(200).json({ message });
      } else {
        res.status(500).json({ error: "No choices returned from AI." });
      }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error communicating with OpenAI:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error("Unknown error:", error);
      res.status(500).json({ error: "Unknown error" });
    }
  }
};
