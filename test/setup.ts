// test/setup.ts
import { beforeAll } from "vitest";
import dotenv from "dotenv";

beforeAll(() => {
	// .env.testファイルを読み込む
	dotenv.config({ path: ".env.test" });
});
