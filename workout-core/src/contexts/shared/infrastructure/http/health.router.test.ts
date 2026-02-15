import { describe, expect, it } from "vitest";
import { healthRouter } from "./health.router.js";

describe("Health Router", () => {
  it("should be defined", () => {
    expect(healthRouter).toBeDefined();
  });

  it("should have health endpoint registered with GET method", () => {
    const routes = healthRouter.stack
      .filter((layer) => layer.route)
      .map((layer) => ({
        path: layer.route?.path,
        methods: Object.keys(layer.route?.methods ?? {}),
      }));

    expect(routes).toContainEqual({
      path: "/health",
      methods: ["get"],
    });
  });
});
