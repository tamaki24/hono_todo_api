export interface Todo {
	id: number;
	title: string;
	completed: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export type TodoCreate = Pick<Todo, "title">;
// Partialは全てOptionalにするユーティリティ
export type TodoUpdate = Partial<Pick<Todo, "title" | "completed">>;
