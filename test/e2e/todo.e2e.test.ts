import { beforeAll, describe, expect, it } from "vitest";

const BASE_URL = "http://localhost:3000";

describe("Todo E2E Flow", () => {
	let authToken: string;

	beforeAll(async () => {
		// サインインしてトークンを取得
		const signinResponse = await fetch(`${BASE_URL}/auth/signin`, {
			method: "POST",
			body: JSON.stringify({
				email: "test@example.com",
				password: "test123",
			}),
		});
		const response = await signinResponse.json();
		authToken = response.session.session.access_token;
	});

	it("should handle complete todo lifecycle", async () => {
		// TODOを作成
		const createResponse = await fetch(`${BASE_URL}/todos`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${authToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title: "E2E Test Todo" }),
		});
		expect(createResponse.status).toBe(201);
		const todo = await createResponse.json();

		// TODOを取得
		const getResponse = await fetch(`${BASE_URL}/todos/${todo.id}`, {
			headers: { Authorization: `Bearer ${authToken}` },
		});
		expect(getResponse.status).toBe(200);

		// TODOを更新
		const updateResponse = await fetch(`${BASE_URL}/todos/${todo.id}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${authToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ completed: true }),
		});
		expect(updateResponse.status).toBe(200);

		// TODOを削除
		const deleteResponse = await fetch(`${BASE_URL}/todos/${todo.id}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${authToken}` },
		});
		expect(deleteResponse.status).toBe(200);
	});
});
