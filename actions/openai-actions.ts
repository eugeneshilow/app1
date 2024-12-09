"use server";

import { ActionState } from "@/types";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue, StreamableValue } from "ai/rsc";

export async function generateOpenAIResponseAction(userQuery: string): Promise<ActionState<StreamableValue<any, any>>> {
  try {
    const stream = createStreamableValue();

    const systemPrompt = `You are a helpful assistant. Respond in markdown format.

Today's date is ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.`;

    (async () => {
      const { textStream } = await streamText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        messages: [{ role: "user", content: userQuery }]
      });

      for await (const text of textStream) {
        stream.update(text);
      }

      stream.done();
    })();

    return {
      isSuccess: true,
      message: "Successfully generated OpenAI response",
      data: stream.value
    };
  } catch (error) {
    console.error("Error generating OpenAI response:", error);
    return {
      isSuccess: false,
      message: "Failed to generate OpenAI response"
    };
  }
}