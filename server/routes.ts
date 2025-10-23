import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Update user language preference
  app.post('/api/user/language', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { language } = req.body;
      
      const languageSchema = z.object({
        language: z.enum(["en", "hi", "te", "kn", "ta", "mr", "gu", "bn", "pa"]),
      });
      
      const validation = languageSchema.safeParse({ language });
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid language code" });
      }

      const user = await storage.updateUserLanguage(userId, language);
      res.json(user);
    } catch (error) {
      console.error("Error updating user language:", error);
      res.status(500).json({ message: "Failed to update language" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
