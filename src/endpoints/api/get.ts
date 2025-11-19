import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { generateName } from "../../utils/generateNameUtil";

export class GenerateUsernameRoute extends OpenAPIRoute {
    schema = {
        tags: ["Username"],
        summary: "Generate a random username",
        description: "Generates a username based on alternating consonants and vowels, followed by random digits.",
        parameters: [
            {
                name: "appendTTV",
                in: "query",
                description: "Whether to append '_TTV' to the username",
                required: false,
                schema: { type: "boolean", default: false },
            },
            {
                name: "numDigits",
                in: "query",
                description: "Number of digits to append",
                required: false,
                schema: { type: "integer", minimum: 0, maximum: 10, default: 4 },
            },
            {
                name: "nameLength",
                in: "query",
                description: "Number of letter pairs in the username",
                required: false,
                schema: { type: "integer", minimum: 1, maximum: 6, default: 4 },
            },
        ],
        responses: {
            "200": {
                description: "Username generated successfully",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                username: { type: "string" }
                            }
                        },
                    },
                },
            },
            "400": {
                description: "Invalid request parameters",
            },
            "500": {
                description: "Internal Server Error",
            },
        },
    };

    async handle(c) {
        try {
            const url = new URL(c.req.url);

            // 解析并校验参数
            const schema = z.object({
                appendTTV: z.enum(["true", "false"]).default("false"),
                numDigits: z.string().regex(/^\d+$/).default("4"),
                nameLength: z.string().regex(/^\d+$/).default("4"),
            });

            const parsedParams = schema.safeParse({
                appendTTV: url.searchParams.get("appendTTV") ?? "false",
                numDigits: url.searchParams.get("numDigits") ?? "4",
                nameLength: url.searchParams.get("nameLength") ?? "4",
            });

            if (!parsedParams.success) {
                return c.json(
                    { error: "Invalid request parameters", details: parsedParams.error.format() },
                    400
                );
            }

            // 生成用户名
            const { appendTTV, numDigits, nameLength } = parsedParams.data;
            const username = generateName(parseInt(nameLength, 10), parseInt(numDigits, 10), appendTTV === "true");

            return c.json({ username });
        } catch (error) {
            console.error("Error generating username:", error);
            return c.json({ error: "Internal Server Error" }, 500);
        }
    }
}
