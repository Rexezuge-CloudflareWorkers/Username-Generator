import type { Context } from "hono";
import { generateName } from "../utils/generateNameUtil";
import { HTML_TEMPLATE } from "../generated-src/generated";

export function HomePageRoute(cxt: Context): Response {
	const defaultUsername: string = generateName(4, 4, false);
	const html: string = HTML_TEMPLATE.replace("{{USERNAME}}", defaultUsername);
	return cxt.html(html);
}
