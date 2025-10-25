import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
  Award,
  CalendarDays,
  CheckCircle,
  Clock3,
  Lock,
  PlayCircle,
  Sparkles,
  Users,
  BookOpen
} from 'lucide-react';

type LessonStatus = 'completed' | 'in-progress' | 'locked';

type Lesson = {
  id: string;
  title: string;
  type: 'video' | 'case' | 'quiz' | 'lab' | 'note';
  duration: string;
  status: LessonStatus;
  summary: string;
  competency: string;
};

type Module = {
  id: number;
  title: string;
  description: string;
  duration: string;
  progress: number;
  completed: boolean;
  language: string[];
  icon: string;
  quiz: { total: number; passed: number };
  lessons: Lesson[];
};

type CertificateMilestone = {
  title: string;
  focus: string;
  duration: string;
  status: 'completed' | 'active' | 'upcoming';
  outcome: string;
};

const initialModules: Module[] = [
  {
    id: 1,
    title: "Understanding Yield Intelligence",
    description: "Learn how AI predicts crop yields using weather, soil, and satellite data",
    duration: "15 min",
    progress: 100,
    completed: true,
    lessons: [
      {
        id: "1-1",
        title: "Yield model basics",
        type: "video",
        duration: "04:30",
        status: "completed",
        summary: "How satellite indices combine with ground truth plots to estimate yield.",
        competency: "Satellite interpretation"
      },
      {
        id: "1-2",
        title: "Moisture & canopy signals",
        type: "case",
        duration: "03:40",
        status: "completed",
        summary: "Identify stress signals early using Sakhi's NDVI overlays.",
        competency: "Crop scouting"
      },
      {
        id: "1-3",
        title: "Soil lab integration",
        type: "video",
        duration: "03:20",
        status: "completed",
        summary: "Sync soil test reports and calibrate yield variance bands.",
        competency: "Soil analytics"
      },
      {
        id: "1-4",
        title: "Apply insights on field",
        type: "quiz",
        duration: "03:00",
        status: "completed",
        summary: "Answer scenario questions to validate crop management steps.",
        competency: "Decision making"
      }
    ],
    language: ["English", "Hindi", "Marathi"],
    icon: "🌱",
    quiz: { total: 5, passed: 5 }
  },
  {
    id: 2,
    title: "What is Price Hedging?",
    description: "Protect your income by locking prices before harvest",
    duration: "20 min",
    progress: 60,
    completed: false,
    lessons: [
      {
        id: "2-1",
        title: "Forward vs spot",
        type: "video",
        duration: "05:10",
        status: "completed",
        summary: "Compare mandis with forward contracts using recent arrivals data.",
        competency: "Market literacy"
      },
      {
        id: "2-2",
        title: "Hedge ratio drill",
        type: "lab",
        duration: "04:30",
        status: "completed",
        summary: "Practice calculating hedge coverage for mixed acreage.",
        competency: "Risk math"
      },
      {
        id: "2-3",
        title: "Cashflow storyboard",
        type: "case",
        duration: "03:50",
        status: "completed",
        summary: "Layer payouts and expenses to see cashflow stability gains.",
        competency: "Financial planning"
      },
      {
        id: "2-4",
        title: "Simulate price swings",
        type: "lab",
        duration: "03:20",
        status: "in-progress",
        summary: "Adjust hedge ratios to absorb market volatility.",
        competency: "Scenario planning"
      },
      {
        id: "2-5",
        title: "Module knowledge check",
        type: "quiz",
        duration: "02:40",
        status: "locked",
        summary: "Quick quiz to validate understanding before certification.",
        competency: "Certification"
      }
    ],
    language: ["English", "Hindi"],
    icon: "💰",
    quiz: { total: 5, passed: 3 }
  },
  {
    id: 3,
    title: "Market Price Forecasting",
    description: "Understand how to read and use 30 & 90-day price predictions",
    duration: "18 min",
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "3-1",
        title: "Forecast dashboard tour",
        type: "video",
        duration: "04:20",
        status: "in-progress",
        summary: "Navigate probability bands and seasonal trend markers.",
        competency: "Dashboard navigation"
      },
      {
        id: "3-2",
        title: "Signal confidence",
        type: "note",
        duration: "03:10",
        status: "locked",
        summary: "Interpret confidence scores using arrival spreads.",
        competency: "Signal analysis"
      },
      {
        id: "3-3",
        title: "Field application story",
        type: "case",
        duration: "04:40",
        status: "locked",
        summary: "Case study on aligning sowing with market peaks.",
        competency: "Market timing"
      },
      {
        id: "3-4",
        title: "Capstone quiz",
        type: "quiz",
        duration: "04:10",
        status: "locked",
        summary: "Multiple choice quiz to validate readiness.",
        competency: "Certification"
      }
    ],
    language: ["English", "Hindi", "Gujarati"],
    icon: "📈",
    quiz: { total: 5, passed: 0 }
  },
  {
    id: 4,
    title: "Virtual Forward Contracts",
    description: "Step-by-step guide to creating and managing hedge contracts",
    duration: "25 min",
    progress: 0,
    completed: false,
    lessons: [
      {
        id: "4-1",
        title: "Contract builder walkthrough",
        type: "video",
        duration: "05:00",
        status: "in-progress",
        summary: "Create a virtual contract using Sakhi's hedging hub.",
        competency: "Platform mastery"
      },
      {
        id: "4-2",
        title: "Approval workflow",
        type: "note",
        duration: "03:00",
        status: "locked",
        summary: "Understand verification and approval with FPO desks.",
        competency: "Compliance"
      },
      {
        id: "4-3",
        title: "Settlement scenarios",
        type: "case",
        duration: "04:30",
        status: "locked",
        summary: "Walk through payout vs default scenarios.",
        competency: "Risk mitigation"
      },
      {
        id: "4-4",
        title: "Action lab",
        type: "lab",
        duration: "05:20",
        status: "locked",
        summary: "Submit your first contract draft to the mentoring desk.",
        competency: "Hands-on practice"
      },
      {
        id: "4-5",
        title: "Module checkpoint",
        type: "quiz",
        duration: "03:00",
        status: "locked",
        summary: "Quick check to unlock certification credits.",
        competency: "Certification"
      }
    ],
    language: ["English", "Hindi"],
    icon: "📝",
    quiz: { total: 5, passed: 0 }
  },
  {
    id: 5,
    title: "Soil Health & Crop Advisory",
    description: "Optimize inputs using AI-powered recommendations",
    duration: "22 min",
    progress: 30,
    completed: false,
    lessons: [
      {
        id: "5-1",
        title: "Soil profile essentials",
        type: "video",
        duration: "04:20",
        status: "completed",
        summary: "Decode pH, EC and organic carbon insights for your plot.",
        competency: "Soil literacy"
      },
      {
        id: "5-2",
        title: "Nutrient scheduling",
        type: "lab",
        duration: "03:45",
        status: "in-progress",
        summary: "Craft a nutrition calendar using Sakhi's calculators.",
        competency: "Input planning"
      },
      {
        id: "5-3",
        title: "Pest watchlist",
        type: "case",
        duration: "04:00",
        status: "locked",
        summary: "Spot stress indicators using leaf imagery and trap alerts.",
        competency: "Crop scouting"
      },
      {
        id: "5-4",
        title: "Field notebook",
        type: "note",
        duration: "03:30",
        status: "locked",
        summary: "Document learnings and sync with advisory desk.",
        competency: "Record keeping"
      },
      {
        id: "5-5",
        title: "Diagnostic quiz",
        type: "quiz",
        duration: "03:10",
        status: "locked",
        summary: "Assess readiness for advanced soil programmes.",
        competency: "Certification"
      }
    ],
    language: ["English", "Hindi", "Telugu"],
    icon: "🌾",
    quiz: { total: 5, passed: 1 }
  }
];

const achievements = [
  { title: "First Module Complete", icon: "🎓", unlocked: true },
  { title: "Quiz Master", icon: "🏆", unlocked: true },
  { title: "5 Modules Done", icon: "⭐", unlocked: false },
  { title: "Hedging Expert", icon: "💎", unlocked: false }
];

const playlists = [
  {
    title: "Getting started with Sakhi",
    length: "3 lessons",
    icon: <Sparkles className="w-4 h-4" />,
    description: "Personalise Sakhi, record voice notes and sync reminders.",
    cta: "Play intro"
  },
  {
    title: "AI Agronomy Masterclass",
    length: "6 lessons",
    icon: <BookOpen className="w-4 h-4" />,
    description: "Soil nutrition, pest diagnosis and irrigation strategies.",
    cta: "Start course"
  },
  {
    title: "Market resilience toolkit",
    length: "4 lessons",
    icon: <Users className="w-4 h-4" />,
    description: "Pool contracts, hedge together and unlock FPO perks.",
    cta: "View toolkit"
  }
];

const liveSessions = [
  {
    title: "Seasonal hedging clinic",
    date: "Fri, 7 Nov",
    time: "5:00 – 6:00 PM",
    mentor: "Arjun (Risk Analyst)",
    spots: "28 spots left"
  },
  {
    title: "Soil health lab walk-through",
    date: "Wed, 12 Nov",
    time: "4:00 – 5:30 PM",
    mentor: "Dr. Meera (Soil Scientist)",
    spots: "12 spots left"
  }
];

const resources = [
  {
    title: "30-day hedging action plan",
    type: "PDF",
    size: "1.4 MB",
    description: "Templates, checklist and SMS scripts to stay on track."
  },
  {
    title: "Voice training prompts",
    type: "Notion",
    size: "Shared",
    description: "Ready-made farmer prompts to capture high-quality intents."
  },
  {
    title: "Spray window calendar",
    type: "Spreadsheet",
    size: "220 KB",
    description: "Auto-adjusting schedule based on forecast and growth stage."
  }
];

const certificatePath: CertificateMilestone[] = [
  {
    title: "Foundation badge",
    focus: "Complete two core modules & pass quizzes",
    duration: "Week 1",
    status: "completed",
    outcome: "Unlocks community forum access"
  },
  {
    title: "Applied strategist",
    focus: "Finish hedging module labs and submit action plan",
    duration: "Week 2",
    status: "active",
    outcome: "Eligible for FPO premium pricing"
  },
  {
    title: "Field mentor",
    focus: "Host a peer session & score 85% in market forecasting",
    duration: "Week 3",
    status: "upcoming",
    outcome: "Access to beta features & mentor stipend"
  },
  {
    title: "AgriShield Pro certificate",
    focus: "Complete capstone assessment & farm audit",
    duration: "Week 4",
    status: "upcoming",
    outcome: "Certificate shareable with lenders & FPOs"
  }
];

const LearningCenter: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [certificateOpen, setCertificateOpen] = useState(false);

  const modules = useMemo(() => initialModules, []);

  const resumeModule = useMemo(() => {
    return (
      modules.find((module) => module.progress > 0 && module.progress < 100) ??
      modules.find((module) => !module.completed) ??
      modules[0] ?? null
    );
  }, [modules]);

  const activeModule = useMemo(() => {
    if (!selectedModule) return null;
    return modules.find((module) => module.id.toString() === selectedModule) ?? null;
  }, [modules, selectedModule]);

  const nextLesson = useMemo(() => {
    if (!activeModule) return null;
    return (
      activeModule.lessons.find((lesson) => lesson.status !== 'completed') ??
      activeModule.lessons[activeModule.lessons.length - 1] ??
      null
    );
  }, [activeModule]);

  const certificateStats = useMemo(() => {
    const completed = certificatePath.filter((stage) => stage.status === 'completed').length;
    const activeStage = certificatePath.find((stage) => stage.status === 'active');
    return {
      completed,
      total: certificatePath.length,
      activeTitle: activeStage?.title ?? null,
      activeFocus: activeStage?.focus ?? null,
    };
  }, []);

  const handleResumeLearning = () => {
    if (resumeModule) {
      setSelectedModule(resumeModule.id.toString());
      const lesson = resumeModule.lessons.find((item) => item.status === 'in-progress') ?? resumeModule.lessons[0];
      toast({
        title: `Resuming ${resumeModule.title}`,
        description: lesson ? `Next up: ${lesson.title}` : 'Pick any lesson to continue your journey.',
      });
    } else {
      toast({
        title: 'Learning journey completed',
        description: 'Browse playlists or join a live session to keep the streak alive.',
      });
    }
  };

  const handleViewCertificatePath = () => {
    setCertificateOpen(true);
  };

  const handleContinueModule = (moduleId: number) => {
    const moduleToOpen = modules.find((module) => module.id === moduleId);
    if (!moduleToOpen) return;
    setSelectedModule(moduleId.toString());
    toast({
      title: moduleToOpen.completed ? 'Revisiting module' : 'Continuing module',
      description: moduleToOpen.description,
    });
  };

  const handleLaunchLesson = (lesson: Lesson, module: Module) => {
    if (lesson.status === 'locked') {
      toast({
        title: 'Lesson locked',
        description: 'Complete the previous activities to unlock this lesson.',
      });
      return;
    }

    toast({
      title: `Launching ${lesson.title}`,
      description: `Enjoy the ${lesson.type === 'video' ? 'video lesson' : lesson.type === 'case' ? 'case study' : lesson.type === 'lab' ? 'practice lab' : lesson.type === 'note' ? 'field note' : 'quiz'} from ${module.title}.`,
    });
  };

  const handleSaveSeat = (sessionTitle: string) => {
    toast({ title: 'Seat reserved', description: `${sessionTitle} has been added to your learning calendar.` });
  };

  const handleResourceDownload = (resourceTitle: string) => {
    toast({ title: 'Resource opening', description: `${resourceTitle} will open in a new tab.` });
  };

  const handleDownloadCertificatePath = () => {
    const payload = {
      generatedAt: new Date().toISOString(),
      journey: certificatePath,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sakhi-certificate-roadmap-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast({ title: 'Certificate roadmap saved', description: 'Review milestones offline or share with your mentor.' });
  };

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-border/40 bg-card p-6 md:p-10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="w-4 h-4" /> Curated for you
            </span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">Grow smarter every season</h1>
              <p className="mt-2 text-muted-foreground">
                Watch micro-lessons, practice with guided labs, and unlock badges that prove your expertise in yield optimisation and price protection.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground/80">
              <span className="inline-flex items-center gap-2"><Clock3 className="w-4 h-4" /> Learn in 10-minute capsules</span>
              <span className="inline-flex items-center gap-2"><Users className="w-4 h-4" /> 2.3k growers active</span>
              <span className="inline-flex items-center gap-2"><Award className="w-4 h-4" /> Badges recognised by FPOs</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="gap-2" onClick={handleResumeLearning}>
                <PlayCircle className="w-5 h-5" /> Resume learning
              </Button>
              <Button variant="outline" size="lg" onClick={handleViewCertificatePath}>
                View certificate path
              </Button>
            </div>
          </div>
          <Card className="bg-primary/5 border-primary/30 w-full md:w-80">
            <CardHeader>
              <CardTitle className="text-base">This week</CardTitle>
              <CardDescription>Keep up the streak and unlock your Pro certificate.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Learning streak</span>
                <Badge className="bg-primary text-primary-foreground">4 days</Badge>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Weekly goal</span>
                  <span className="font-medium">60%</span>
                </div>
                <Progress value={60} className="mt-2" />
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success" /> Uploaded first contract practice
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="w-4 h-4 text-primary" /> Next live session on Friday
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Modules Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1/5</div>
            <Progress value={20} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Learning Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5 hrs</div>
            <p className="text-xs text-muted-foreground">Total time invested</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quiz Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">85%</div>
            <p className="text-xs text-muted-foreground">Average score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/4</div>
            <p className="text-xs text-muted-foreground">Badges earned</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList className="bg-muted/40">
          <TabsTrigger value="modules">Learning Modules</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          {modules.map((module) => (
            <Card key={module.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-4xl">{module.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{module.title}</CardTitle>
                        {module.completed && (
                          <Badge className="bg-success text-white">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className="text-xs">
                          {module.lessons.length} lessons
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {module.duration}
                        </Badge>
                        {module.language.map((lang) => (
                          <Badge key={lang} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button 
                    className={module.completed ? "bg-success" : "bg-primary"}
                    onClick={() => handleContinueModule(module.id)}
                  >
                    {module.progress > 0 && !module.completed ? (
                      <>Continue</>
                    ) : module.completed ? (
                      <>Revisit</>
                    ) : (
                      <>Start</>
                    )}
                  </Button>
                </div>
              </CardHeader>
              {module.progress > 0 && (
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} />
                    {module.quiz.total > 0 && (
                      <div className="flex items-center justify-between text-sm pt-2">
                        <span className="text-muted-foreground">Quiz Score</span>
                        <span className="font-medium">
                          {module.quiz.passed}/{module.quiz.total} correct
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className={achievement.unlocked ? "" : "opacity-50"}>
                <CardContent className="pt-6 text-center">
                  <div className="text-6xl mb-4">{achievement.icon}</div>
                  <h3 className="font-semibold mb-2">{achievement.title}</h3>
                  {achievement.unlocked ? (
                    <Badge className="bg-success text-white">
                      <Award className="w-3 h-3 mr-1" />
                      Unlocked
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <Lock className="w-3 h-3 mr-1" />
                      Locked
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Featured playlists</CardTitle>
              <CardDescription>Immersive pathways to level up specific skills.</CardDescription>
            </div>
            <Button variant="ghost" className="gap-2">
              <PlayCircle className="w-4 h-4" /> Browse all
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {playlists.map((playlist) => (
              <div key={playlist.title} className="rounded-xl border border-border/50 bg-card/80 p-4 space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {playlist.icon}
                  {playlist.length}
                </div>
                <h3 className="text-lg font-semibold leading-snug">{playlist.title}</h3>
                <p className="text-sm text-muted-foreground">{playlist.description}</p>
                <Button variant="outline" className="w-full">
                  {playlist.cta}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming live sessions</CardTitle>
            <CardDescription>Reserve your seat and join mentors in real time.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {liveSessions.map((session) => (
              <div key={session.title} className="rounded-xl border border-border/40 bg-secondary/40 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{session.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {session.spots}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" /> {session.date}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock3 className="w-4 h-4" /> {session.time}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" /> {session.mentor}
                </p>
                <Button size="sm" className="w-full" onClick={() => handleSaveSeat(session.title)}>Save seat</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Resource library</CardTitle>
            <CardDescription>Downloads, playbooks and community docs kept up to date.</CardDescription>
          </div>
          <Button variant="outline" className="gap-2">
            <BookOpen className="w-4 h-4" /> Submit your resource
          </Button>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {resources.map((resource) => (
            <div key={resource.title} className="rounded-2xl border border-border/40 bg-muted/30 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                <span>{resource.type}</span>
                <span>{resource.size}</span>
              </div>
              <h3 className="text-base font-semibold text-foreground">{resource.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{resource.description}</p>
              <Button variant="outline" size="sm" className="w-full" onClick={() => handleResourceDownload(resource.title)}>Open</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={!!activeModule} onOpenChange={(open) => !open && setSelectedModule(null)}>
        <DialogContent className="max-w-3xl">
          {activeModule && (
            <>
              <DialogHeader className="space-y-2">
                <DialogTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">{activeModule.icon}</span>
                  {activeModule.title}
                </DialogTitle>
                <DialogDescription className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span>{activeModule.description}</span>
                  <Badge variant="secondary" className="text-xs">{activeModule.duration}</Badge>
                  <Badge variant="outline" className="text-xs">{activeModule.lessons.length} lessons</Badge>
                  <Badge variant="outline" className="text-xs">{activeModule.language.join(' • ')}</Badge>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {nextLesson && (
                  <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.3em] text-primary">Up next</p>
                      <p className="text-sm font-semibold text-foreground">{nextLesson.title}</p>
                      <p className="text-xs text-muted-foreground">{nextLesson.summary}</p>
                    </div>
                    <Button onClick={() => handleLaunchLesson(nextLesson, activeModule)}>
                      {nextLesson.status === 'completed' ? 'Revisit lesson' : 'Launch lesson'}
                    </Button>
                  </div>
                )}
                <div className="space-y-3">
                  {activeModule.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`rounded-2xl border p-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between ${
                        lesson.status === 'locked'
                          ? 'border-border/40 bg-muted/20 opacity-70'
                          : lesson.status === 'completed'
                          ? 'border-success/40 bg-success/10'
                          : 'border-primary/30 bg-card/90'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[11px] uppercase tracking-wide">
                            {lesson.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        </div>
                        <p className="font-semibold text-sm text-foreground">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{lesson.summary}</p>
                        <p className="text-[11px] font-medium text-primary uppercase tracking-[0.2em]">{lesson.competency}</p>
                      </div>
                      <Button
                        size="sm"
                        variant={lesson.status === 'completed' ? 'secondary' : 'outline'}
                        className="mt-2 md:mt-0"
                        onClick={() => handleLaunchLesson(lesson, activeModule)}
                      >
                        {lesson.status === 'completed'
                          ? 'Review'
                          : lesson.status === 'in-progress'
                          ? 'Continue'
                          : 'Unlock lesson'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setSelectedModule(null)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={certificateOpen} onOpenChange={setCertificateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Award className="w-5 h-5 text-primary" /> Certificate journey roadmap
            </DialogTitle>
            <DialogDescription>
              Track your milestones towards the AgriShield Pro credential. Stay on pace to unlock advanced benefits.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary">Progress</p>
                <p className="text-sm text-muted-foreground">
                  {certificateStats.completed}/{certificateStats.total} milestones complete · {certificateStats.activeTitle ? `Current focus: ${certificateStats.activeTitle}` : 'Take on the first milestone to begin'}
                </p>
                {certificateStats.activeFocus && (
                  <p className="text-xs text-primary mt-1">{certificateStats.activeFocus}</p>
                )}
              </div>
              <Button onClick={handleDownloadCertificatePath}>Download plan</Button>
            </div>
            <div className="space-y-3">
              {certificatePath.map((milestone, index) => (
                <div
                  key={milestone.title}
                  className={`rounded-2xl border p-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between ${
                    milestone.status === 'completed'
                      ? 'border-success/40 bg-success/10'
                      : milestone.status === 'active'
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-border/40 bg-muted/20'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={milestone.status === 'completed' ? 'secondary' : 'outline'}
                        className="text-[11px] uppercase tracking-wide"
                      >
                        Week {index + 1}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{milestone.duration}</span>
                    </div>
                    <p className="font-semibold text-sm text-foreground">{milestone.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{milestone.focus}</p>
                    <p className="text-[11px] font-medium text-primary uppercase tracking-[0.2em]">Outcome: {milestone.outcome}</p>
                  </div>
                  <Button
                    size="sm"
                    variant={milestone.status === 'completed' ? 'secondary' : milestone.status === 'active' ? 'default' : 'outline'}
                    className="mt-2 md:mt-0"
                    onClick={() => {
                      toast({
                        title: milestone.status === 'completed' ? 'Milestone unlocked' : 'Milestone details',
                        description: milestone.focus,
                      });
                    }}
                  >
                    {milestone.status === 'completed' ? 'View badge' : milestone.status === 'active' ? 'Work on tasks' : 'Preview tasks'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCertificateOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LearningCenter;
