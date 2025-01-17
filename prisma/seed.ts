import { type Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const todoData: Prisma.TodoCreateInput[] = [...Array(3)].map((_, i) => ({
	title: `SampleTask${i + 1}`,
}));

const main = async () => {
	console.log(todoData);
	const result = await prisma.todo.createMany({
		data: todoData,
		skipDuplicates: true,
	});
	console.log({ result });
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
