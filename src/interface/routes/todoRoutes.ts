import { Hono } from "hono";
import { validateWithZod } from "../middlewares/validationErrorHandler.js";
import {
  todoCreateSchema,
  todoUpdateSchema,
} from "../../domain/schemas/todoSchema.js";
import { TodoUseCase } from "../../application/todo/todoUseCase.js";
import { TodoRepository } from "../../infrastructure/prisma/repositories/todoRepository.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const todoRepository = new TodoRepository();
const todoUseCase = new TodoUseCase(todoRepository);

const app = new Hono();

// 認証ミドルウェア
app.use("/*", authMiddleware);

// Todo一覧取得
app.get("/", async (c) => {
  const todos = await todoUseCase.getTodos();
  return c.json(todos);
});

// 単一のTodo取得
app.get("/:id", async (c) => {
  const id = Number.parseInt(c.req.param("id"), 10);
  const todo = await todoUseCase.getTodoById(id);
  if (!todo) return c.json({ error: "Todo not found" }, 404);
  return c.json(todo);
});

// Todo作成
app.post("/", validateWithZod(todoCreateSchema), async (c) => {
  const { title } = c.req.valid("json");
  const newTodo = await todoUseCase.createTodo(title);
  return c.json(newTodo, 201);
});

// Todo更新
app.put("/:id", validateWithZod(todoUpdateSchema), async (c) => {
  const id = Number.parseInt(c.req.param("id"), 10);
  const data = c.req.valid("json");
  const updatedTodo = await todoUseCase.updateTodo(id, data);
  return c.json(updatedTodo);
});

// Todo削除
app.delete("/:id", async (c) => {
  const id = Number.parseInt(c.req.param("id"), 10);
  await todoUseCase.deleteTodo(id);
  return c.json({ message: "Todo deleted successfully" });
});

export default app;
