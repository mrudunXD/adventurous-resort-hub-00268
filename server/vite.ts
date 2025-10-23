import type { Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function setupVite(app: Express, server: any) {
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: { server },
    },
    appType: "spa",
  });

  app.use(vite.middlewares);

  // Catch-all route for SPA - serve index.html for all non-API routes
  app.use((req, res, next) => {
    // Skip API routes
    if (req.originalUrl.startsWith('/api/')) {
      return next();
    }

    const url = req.originalUrl;

    fs.readFile(
      path.resolve(__dirname, "..", "index.html"),
      "utf-8",
      async (err, data) => {
        if (err) {
          vite.ssrFixStacktrace(err);
          return next(err);
        }

        try {
          const template = await vite.transformIndexHtml(url, data);
          res.status(200).set({ "Content-Type": "text/html" }).end(template);
        } catch (e) {
          vite.ssrFixStacktrace(e as Error);
          next(e);
        }
      }
    );
  });
}
