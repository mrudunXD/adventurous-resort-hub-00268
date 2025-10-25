import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Play, Clock, ExternalLink, Sparkles } from "lucide-react";

const tutorials = [
  {
    title: "Getting started with Yield Intelligence",
    length: "6 min",
    summary: "Tour the intelligence hub, interpret the advisory cards, and trigger the field timeline.",
    link: "https://player.vimeo.com/video/987654321",
  },
  {
    title: "Design a hedge plan in under 5 minutes",
    length: "8 min",
    summary: "Layer forward contracts, adjust coverage ratios, and understand the risk simulator.",
    link: "https://player.vimeo.com/video/987654322",
  },
  {
    title: "Export market & weather reports",
    length: "5 min",
    summary: "Download multi-lingual PDFs, share snapshots with partners, and sync with WhatsApp.",
    link: "https://player.vimeo.com/video/987654323",
  },
];

const SupportTutorials: React.FC = () => {
  return (
    <div className="space-y-10 animate-fade-in">
      <section className="rounded-3xl border border-border/50 bg-card/95 p-6 md:p-10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
              <Sparkles className="h-4 w-4" /> Support centre
            </span>
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Video tutorials</h1>
              <p className="text-muted-foreground">
                Master AgriShield workflows with bite-sized tutorials from our product team. Each clip blends walkthroughs with real farmer examples.
              </p>
            </div>
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">New lessons drop every fortnight</Badge>
          </div>
          <Button variant="outline" className="gap-2" asChild>
            <a href="https://www.youtube.com/@agrishield" target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" /> Explore full playlist
            </a>
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <Card key={tutorial.title} className="soft-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Video className="h-5 w-5 text-primary" /> {tutorial.title}
              </CardTitle>
              <CardDescription className="text-xs uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" /> {tutorial.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>{tutorial.summary}</p>
              <Button variant="outline" className="gap-2" asChild>
                <a href={tutorial.link} target="_blank" rel="noreferrer">
                  <Play className="h-4 w-4" /> Watch tutorial
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SupportTutorials;
