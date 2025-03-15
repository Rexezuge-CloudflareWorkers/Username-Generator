import { fromHono } from "chanfana";
import { Hono } from "hono";
import { HomePageRoute } from "./endpoints/get";
import { GenerateUsernameRoute } from "./endpoints/api/get";

// 启动 Hono 应用
const app = new Hono();

// 配置 OpenAPI
const openapi = fromHono(app, { docs_url: "/docs" });

// 注册 API 端点
app.get("/", HomePageRoute);

openapi.get("/api", GenerateUsernameRoute);

// 导出 Hono 应用
export default app;
