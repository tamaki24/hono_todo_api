import type { TodoUpdate } from "../../types/Todo.js";
import type { ITodoRepository } from "../../domain/repositories/ITodoRepository.js";

export class TodoUseCase {
	private todoRepository: ITodoRepository;

	constructor(todoRepository: ITodoRepository) {
		this.todoRepository = todoRepository;
	}

	async getTodos() {
		return await this.todoRepository.findAll();
	}

	async getTodoById(id: number) {
		return await this.todoRepository.findById(id);
	}

	async createTodo(title: string) {
		return await this.todoRepository.create(title);
	}

	async updateTodo(id: number, data: TodoUpdate) {
		return await this.todoRepository.update(id, data);
	}

	async deleteTodo(id: number) {
		return await this.todoRepository.delete(id);
	}
}
