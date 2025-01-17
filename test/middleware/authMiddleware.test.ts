import { describe, it, expect, vi } from "vitest";
import type { Context } from "hono";
import authMiddleware from "../../src/interface/middlewares/authMiddleware.js";

describe("Auth Middleware", () => {
	it("should return 401 when no token is provided", async () => {
		const mockContext = {
			req: {
				header: vi.fn().mockReturnValue(undefined),
			},
			json: vi.fn().mockReturnValue({ response: true }),
		} as unknown as Context;

		await authMiddleware(mockContext, async () => {});
		expect(mockContext.json).toHaveBeenCalledWith(
			{ error: "Unauthorized" },
			401,
		);
	});
});
