import type { Context, Next } from "hono";
import { supabase } from "../../infrastructure/supabase/supabase.js";

// 認証ミドルウェア
export default async function authMiddleware(c: Context, next: Next) {
	const token = c.req.header("Authorization")?.replace("Bearer ", "");

	if (!token) {
		return c.json({ error: "Unauthorized" }, 401);
	}

	const { data, error } = await supabase.auth.getUser(token);

	if (error || !data.user) {
		return c.json({ error: "Invalid token" }, 401);
	}

	c.set("user", data.user);
	await next();
}
