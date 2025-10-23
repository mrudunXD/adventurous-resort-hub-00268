import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, PlayCircle, Award, CheckCircle, Lock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LearningCenter: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const modules = [
    {
      id: 1,
      title: "Understanding Yield Intelligence",
      description: "Learn how AI predicts crop yields using weather, soil, and satellite data",
      duration: "15 min",
      progress: 100,
      completed: true,
      lessons: 4,
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
      lessons: 5,
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
      lessons: 4,
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
      lessons: 6,
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
      lessons: 5,
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Learning Center</h1>
        <p className="text-muted-foreground mt-1">Master yield optimization and price protection</p>
      </div>

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

      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList>
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
                          {module.lessons} lessons
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
                    onClick={() => setSelectedModule(module.id.toString())}
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
    </div>
  );
};

export default LearningCenter;
