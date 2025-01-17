import { describe, it, expect, beforeEach, vi } from "vitest";
import { TodoUseCase } from "../../../src/application/todo/todoUseCase.js";
import type { ITodoRepository } from "../../../src/domain/repositories/ITodoRepository.js";

describe("TodoUseCase", () => {
	let todoUseCase: TodoUseCase;
	let mockRepository: ITodoRepository;

	beforeEach(() => {
		mockRepository = {
			findAll: vi.fn(),
			findById: vi.fn(),
			create: vi.fn(),
			update: vi.fn(),
			delete: vi.fn(),
		};
		todoUseCase = new TodoUseCase(mockRepository);
	});

	it("should create a todo", async () => {
		const mockTodo = {
			id: 1,
			title: "Test Todo",
			completed: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		vi.mocked(mockRepository.create).mockResolvedValue(mockTodo);

		const result = await todoUseCase.createTodo("Test Todo");
		expect(result).toEqual(mockTodo);
	});
});
