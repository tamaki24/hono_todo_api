import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function teardownTestDatabase() {
	try {
		// テストデータのクリーンアップ
		await prisma.$executeRaw`TRUNCATE TABLE "Todo" CASCADE`;
		await prisma.$disconnect();
	} catch (error) {
		console.error("Test database teardown failed:", error);
		throw error;
	}
}
