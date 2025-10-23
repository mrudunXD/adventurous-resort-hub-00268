import express from "express";
import { registerRoutes } from "./routes";
import { setupVite } from "./vite";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register routes and start server
registerRoutes(app).then((server) => {
  setupVite(app, server);

  const PORT = parseInt(process.env.PORT || "5000", 10);
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
});
