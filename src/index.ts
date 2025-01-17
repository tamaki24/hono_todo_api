import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import todoRoutes from "./interface/routes/todoRoutes.js";
import authRoutes from "./interface/routes/authRoutes.js";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.route("/todos", todoRoutes);
app.route("/auth", authRoutes);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port,
});
