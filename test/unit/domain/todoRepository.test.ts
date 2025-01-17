import { describe, it, expect, beforeEach } from "vitest";
import type { ITodoRepository } from "../../../src/domain/repositories/ITodoRepository.js";
import type { TodoUpdate, Todo } from "../../../src/types/Todo.js";

class MockTodoRepository implements ITodoRepository {
	private todos: Todo[] = [];

	async findAll() {
		return this.todos;
	}

	async findById(id: number) {
		return this.todos.find((todo) => todo.id === id) || null;
	}

	async create(title: string) {
		const todo = {
			id: this.todos.length + 1,
			title,
			completed: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		this.todos.push(todo);
		return todo;
	}

	async update(id: number, data: TodoUpdate) {
		const index = this.todos.findIndex((todo) => todo.id === id);
		if (index === -1) throw new Error("Todo not found");

		this.todos[index] = {
			...this.todos[index],
			...data,
			updatedAt: new Date(),
		};
		return this.todos[index];
	}

	async delete(id: number) {
		const index = this.todos.findIndex((todo) => todo.id === id);
		if (index === -1) throw new Error("Todo not found");

		const deleted = this.todos[index];
		this.todos.splice(index, 1);
		return deleted;
	}
}

describe("MockTodoRepository", () => {
	let repository: MockTodoRepository;

	beforeEach(() => {
		repository = new MockTodoRepository();
	});

	it("should implement CRUD operations", async () => {
		// Create
		const created = await repository.create("テストTODO");
		expect(created.title).toBe("テストTODO");

		// Read
		const found = await repository.findById(created.id);
		expect(found).toEqual(created);

		// Update
		const updated = await repository.update(created.id, { completed: true });
		expect(updated.completed).toBe(true);

		// Delete
		const deleted = await repository.delete(created.id);
		expect(deleted.id).toBe(created.id);

		const notFound = await repository.findById(created.id);
		expect(notFound).toBeNull();
	});
});
