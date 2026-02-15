import { app } from "./app.js";
import { envConfig } from "./config/env.config.js";

const { port } = envConfig;

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📋 Health check: http://localhost:${port}/health`);
});
