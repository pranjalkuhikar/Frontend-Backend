import request from "supertest";
import app from "../app.js";

describe("App", () => {
  it("should return 404 for non-existent routes", async () => {
    const response = await request(app).get("/non-existent-route");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "error",
      message: "Route not found",
    });
  });

  it("should handle rate limiting", async () => {
    const requests = Array(101).fill(null);
    for (const _ of requests) {
      await request(app).get("/api/test");
    }
    const response = await request(app).get("/api/test");
    expect(response.status).toBe(429);
  });
});
