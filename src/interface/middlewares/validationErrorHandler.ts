import { zValidator } from "@hono/zod-validator";
import type { ZodSchema } from "zod";
import { handleValidationError } from "../../utils/error.js";

export const validateWithZod = (schema: ZodSchema) => {
	return zValidator("json", schema, (result, c) => {
		if (!result.success) {
			const errorMessage = result.error.issues[0].message;
			return handleValidationError(c, errorMessage);
		}
	});
};
