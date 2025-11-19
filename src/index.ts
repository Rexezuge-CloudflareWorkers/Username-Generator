import { fromHono } from "chanfana";
import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import { GenerateUsernameRoute } from "./endpoints/api/get";
import { cors } from "hono/cors";

// 启动 Hono 应用
const app = new Hono();

// Add CORS middleware
app.use('*', cors());

// 配置 OpenAPI
const openapi = fromHono(app, { docs_url: "/docs" });

// 注册 API 端点
openapi.get("/api", GenerateUsernameRoute);

// Serve static files from app/dist
app.use('/*', serveStatic({ root: './app/dist/' }));

// 导出 Hono 应用
export default openapi;
