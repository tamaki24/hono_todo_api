import type { Todo } from "@prisma/client";
import type { TodoUpdate } from "../../types/Todo.js";

export interface ITodoRepository {
	findAll(): Promise<Todo[]>;
	findById(id: number): Promise<Todo | null>;
	create(title: string): Promise<Todo>;
	update(id: number, data: TodoUpdate): Promise<Todo>;
	delete(id: number): Promise<Todo>;
}
