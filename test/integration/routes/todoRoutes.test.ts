import { Hono } from "hono";
import todoRoutes from "../../../src/interface/routes/todoRoutes.js";
import { beforeEach, describe, expect, it } from "vitest";

describe("Todo Routes", () => {
	let app: Hono;

	beforeEach(() => {
		app = new Hono();
		app.route("/todos", todoRoutes);
	});

	it("should create a todo", async () => {
		const res = await app.request("/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer test-token",
			},
			body: JSON.stringify({ title: "Test Todo" }),
		});

		expect(res.status).toBe(201);
		const data = await res.json();
		expect(data.title).toBe("Test Todo");
	});
});
