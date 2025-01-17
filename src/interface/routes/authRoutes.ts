import { Hono } from "hono";
import { AuthRepository } from "../../infrastructure/supabase/repositories/authRepository.js";
import { AuthUseCase } from "../../application/auth/authUseCase.js";

const app = new Hono();

const authRepository = new AuthRepository();
const authUseCase = new AuthUseCase(authRepository);

// サインイン
app.post("/signin", async (c) => {
	const { email, password } = await c.req.json();

	try {
		const session = await authUseCase.signIn(email, password);
		return c.json({ session });
	} catch (error) {
		if (error instanceof Error) {
			return c.json({ error: error.message }, 400);
		}
		return c.json({ error: "An unexpected error occurred" }, 500);
	}
});

// サインアップ
app.post("/signup", async (c) => {
	const { email, password } = await c.req.json();

	try {
		const { user } = await authUseCase.signUp(email, password);
		return c.json({ user });
	} catch (error) {
		if (error instanceof Error) {
			return c.json({ error: error.message }, 400);
		}
		return c.json({ error: "An unexpected error occurred" }, 500);
	}
});

// ログアウト
app.post("/logout", async (c) => {
	const token = c.req.header("Authorization")?.replace("Bearer ", "");

	if (!token) {
		return c.json({ error: "Authorization token is missing" }, 401);
	}

	try {
		await authUseCase.signOut().then(() => {
			return c.json({ message: "Logged out successfully" });
		});
	} catch (error) {
		if (error instanceof Error) {
			return c.json({ error: error.message }, 400);
		}
		return c.json({ error: "An unexpected error occurred" }, 500);
	}
});

export default app;
