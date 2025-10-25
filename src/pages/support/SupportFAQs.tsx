import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FileQuestion, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does the hedging advisor work?",
    answer:
      "Sakhi analyses mandi arrivals, futures spreads, and weather signals to recommend hedge ratios. The guidance refreshes every 30 minutes and is tailored to your registered crops.",
  },
  {
    question: "Can I change my registered plots?",
    answer:
      "Yes. Visit the Profile page and update farm plot details. Changes sync to the risk engine instantly so future advisories reflect the latest acreage.",
  },
  {
    question: "What file formats can I export?",
    answer:
      "Insights are available as PDF and CSV. Download buttons across Yield Intelligence, Market Forecast, and Weather Forecast will prompt you to choose the format you prefer.",
  },
  {
    question: "Is emergency help available after hours?",
    answer:
      "The helpline operates 24×7. Tap the Emergency Helpline action from the top bar to dial our priority line for urgent agronomy support.",
  },
];

const SupportFAQs: React.FC = () => {
  return (
    <div className="space-y-10 animate-fade-in">
      <section className="rounded-3xl border border-border/50 bg-card/95 p-6 md:p-10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
              <HelpCircle className="h-4 w-4" /> Support centre
            </span>
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Frequently asked questions</h1>
              <p className="text-muted-foreground">
                Quick answers curated by our agronomy and risk desks. Still stuck? Reach out to support and we will walk you through.
              </p>
            </div>
          </div>
          <Button variant="outline" className="gap-2" asChild>
            <a href="mailto:support@agrishield.in">
              <FileQuestion className="h-4 w-4" /> Submit a new question
            </a>
          </Button>
        </div>
      </section>

      <Card className="soft-card hover-lift">
        <CardHeader>
          <CardTitle className="text-lg">Knowledge base</CardTitle>
          <CardDescription>Tap a question to expand the detailed guidance.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`} className="rounded-2xl border border-border/40 bg-background/80 px-4">
                <AccordionTrigger className="text-left text-base font-medium text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportFAQs;
