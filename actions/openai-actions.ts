"use server";

import { ActionState } from "@/types";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue, StreamableValue } from "ai/rsc";

export async function generateOpenAIResponseAction(userQuery: string): Promise<ActionState<StreamableValue<any, any>>> {
  try {
    // Создаём объект для потоковой передачи ответа. Он позволит нам
    // по мере получения текста от модели обновлять результат, который
    // затем будет использован в интерфейсе для отображения ответа в реальном времени.
    const stream = createStreamableValue();

    // Формируем системный промпт (инструкцию для модели).
    // Здесь мы задаём роль ассистента и просим отвечать в markdown формате,
    // а также добавляем текущую дату для контекста.
    const systemPrompt = `You are a helpful assistant. Respond in markdown format.

Today's date is ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.`;

    // Запускаем асинхронную операцию в анонимной функции, чтобы поток данных
    // мог обновляться независимо от основного потока выполнения.
    (async () => {
      // Вызываем streamText для получения ответа от OpenAI.
      // - model: указываем какую модель используем (здесь "gpt-4o")
      // - system: передаём системный промпт
      // - messages: передаём сообщение пользователя
      const { textStream } = await streamText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        messages: [{ role: "user", content: userQuery }]
      });

      // Перебираем поступающие части ответа (потоково),
      // обновляя наш stream по мере прихода каждого фрагмента текста.
      for await (const text of textStream) {
        stream.update(text);
      }

      // Когда ответ закончен, сигнализируем, что поток закрыт.
      stream.done();
    })();

    // Возвращаем успешный результат с потоковым значением ответа.
    return {
      isSuccess: true,
      message: "Successfully generated OpenAI response",
      data: stream.value
    };
  } catch (error) {
    console.error("Error generating OpenAI response:", error);
    // В случае ошибки возвращаем состояние с флагом isSuccess: false
    // и сообщением об ошибке.
    return {
      isSuccess: false,
      message: "Failed to generate OpenAI response"
    };
  }
}
