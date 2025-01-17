import { describe, it, expect } from "vitest";
import {
	todoSchema,
	todoCreateSchema,
	todoUpdateSchema,
} from "../../../src/domain/schemas/todoSchema.js";

describe("Todo Schemas", () => {
	describe("todoSchema", () => {
		it("should validate valid todo data", () => {
			const validTodo = {
				id: 1,
				title: "有効なタイトル",
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			const result = todoSchema.safeParse(validTodo);
			expect(result.success).toBe(true);
		});

		it("should reject invalid title length", () => {
			const invalidTodo = {
				id: 1,
				title: "", // 空文字
				completed: false,
			};
			const result = todoSchema.safeParse(invalidTodo);
			expect(result.success).toBe(false);
		});
	});

	describe("todoCreateSchema", () => {
		it("should only accept title", () => {
			const validData = { title: "テストTODO" };
			const result = todoCreateSchema.safeParse(validData);
			expect(result.success).toBe(true);
		});

		it("should reject if id is provided", () => {
			const invalidData = {
				id: 1,
				title: "テストTODO",
			};
			const result = todoCreateSchema.safeParse(invalidData);
			expect(result.success).toBe(false);
		});
	});

	describe("todoUpdateSchema", () => {
		it("should accept partial updates", () => {
			const validUpdate = { completed: true };
			const result = todoUpdateSchema.safeParse(validUpdate);
			expect(result.success).toBe(true);
		});

		it("should reject empty updates", () => {
			const emptyUpdate = {};
			const result = todoUpdateSchema.safeParse(emptyUpdate);
			expect(result.success).toBe(false);
		});
	});
});
