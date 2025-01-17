import { PrismaClient } from "@prisma/client";
import type { ITodoRepository } from "../../../domain/repositories/ITodoRepository.js";
import type { TodoUpdate } from "../../../types/Todo.js";
import type { Todo } from "@prisma/client";

export class TodoRepository implements ITodoRepository {
	private prisma = new PrismaClient();

	async findAll(): Promise<Todo[]> {
		return await this.prisma.todo.findMany();
	}

	async findById(id: number): Promise<Todo | null> {
		return await this.prisma.todo.findUnique({ where: { id } });
	}

	async create(title: string): Promise<Todo> {
		return await this.prisma.todo.create({
			data: { title },
		});
	}

	async update(id: number, data: TodoUpdate): Promise<Todo> {
		return await this.prisma.todo.update({ where: { id }, data });
	}

	async delete(id: number): Promise<Todo> {
		return await this.prisma.todo.delete({ where: { id } });
	}
}
