import type { Context } from "hono";

export const handleValidationError = (c: Context, message: string) => {
	return c.json({ message }, 400);
};
