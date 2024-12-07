"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Claude?",
    answer:
      "Claude is a next-generation AI assistant that helps you create, write, and analyze with confidence. It's designed to be your intelligent partner in getting work done.",
  },
  {
    question: "How is my data protected?",
    answer:
      "We take privacy seriously. All data is encrypted end-to-end, and we never share your information with third parties. Your conversations and documents remain completely private.",
  },
  {
    question: "What can I use Claude for?",
    answer:
      "Claude excels at a wide range of tasks including writing, analysis, coding, and research. You can use it for content creation, data analysis, answering questions, and solving complex problems.",
  },
  {
    question: "Which plan should I choose?",
    answer:
      "Start with our Free plan to explore Claude's capabilities. For more advanced features and higher usage limits, our Pro plan is recommended. Enterprise users should contact us for custom solutions.",
  },
  {
    question: "Can I use Claude for my business?",
    answer:
      "Yes! Many businesses use Claude for various purposes. Our Enterprise plan offers additional security features, custom contracts, and dedicated support to meet your organization's needs.",
  },
]

export default function FAQ() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-4xl font-semibold tracking-tight text-zinc-900">
            Frequently asked questions
          </h2>
          <p className="text-lg text-zinc-500">
            Everything you need to know about Claude and how it works.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-zinc-200 py-2"
              >
                <AccordionTrigger className="text-left text-lg font-medium text-zinc-900 hover:text-zinc-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-zinc-500">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-base text-zinc-500">
            Still have questions?{" "}
            <a
              href="#"
              className="font-medium text-black hover:text-zinc-800"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 