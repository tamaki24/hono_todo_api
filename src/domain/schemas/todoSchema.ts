import { z } from "zod";
import type { TodoCreate, TodoUpdate } from "../../types/Todo.js";

// Todo用スキーマ定義
export const todoSchema = z.object({
	id: z.number(),
	title: z
		.string()
		.min(1, { message: "タイトルは必須です" })
		.max(30, { message: "タイトルは30文字以内です" }),
	completed: z.boolean().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export const updateSchema = z.object({
	title: z
		.string()
		.min(1, { message: "タイトルは必須です" })
		.max(30, { message: "タイトルは30文字以内です" })
		.optional(),
	completed: z.boolean().optional(),
});

export type Todo = z.infer<typeof todoSchema>;

// createデータの型定義
export const todoCreateSchema = todoSchema
	.omit({
		id: true,
		completed: true,
	})
	.strict() satisfies z.Schema<TodoCreate>;

// updateデータの型定義
export const todoUpdateSchema = updateSchema
	.strict()
	// .refineでカスタムバリデーションが実装可能
	.refine((data) => data.title || typeof data.completed === "boolean", {
		message: "変更する値がありません。",
		path: ["title", "completed"], // フィールドの指定
	}) satisfies z.Schema<TodoUpdate>;
