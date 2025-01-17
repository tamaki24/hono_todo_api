import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { TodoRepository } from "../../../src/infrastructure/prisma/repositories/todoRepository.js";
import { teardownTestDatabase } from "../../utils/testDatabase.js";

describe("TodoRepository Integration", () => {
	let prisma: PrismaClient;
	let repository: TodoRepository;

	beforeAll(async () => {
		prisma = new PrismaClient();
		repository = new TodoRepository();
	});

	afterAll(async () => {
		await teardownTestDatabase();
		await prisma.$disconnect();
	});

	it("should create and retrieve a todo", async () => {
		const todo = await repository.create("Test Todo");
		expect(todo.title).toBe("Test Todo");

		const retrieved = await repository.findById(todo.id);
		expect(retrieved).toEqual(todo);
	});
});
