import { describe, expect, test, beforeEach } from "bun:test";
import { db } from "./db";
import { Service } from "./service";

beforeEach(() => {
  db.run("DELETE FROM subscribers");
});

describe("createSubscriber", () => {
  test("inserts a new subscriber", async () => {
    const result = await Service.createSubscriber("alice@example.com");
    expect(result.status).toBe(201);
    expect(result.type).toBe("info");
    const rows = db.query("SELECT raw_email, email FROM subscribers").all() as { raw_email:string, email: string }[];
    expect(rows).toHaveLength(1);
    const { email, raw_email } = rows[0] ?? {};
    expect(raw_email).toBe("alice@example.com");
    expect(email).toBe("alice@example.com");
  });

  test("returns 200 for duplicate emails", async () => {
    await Service.createSubscriber("bob@example.com");
    const result = await Service.createSubscriber("bob@example.com");
    expect(result.status).toBe(200);
    expect(result.type).toBe("info");
    expect(result.message).toContain("already");
  });

  test("returns 400 for invalid emails", async () => {
    for (const bad of ["not-an-email", "user@", "user@ example.com", ""]) {
      const result = await Service.createSubscriber(bad);
      expect(result.status).toBe(400);
      expect(result.type).toBe("error");
    }
  });

  test("normalizes email to lowercase and trimmed", async () => {
    await Service.createSubscriber("  Alice@Example.COM  ");
    const rows = db.query("SELECT raw_email, email FROM subscribers").all() as { raw_email:string, email: string }[];
    expect(rows).toHaveLength(1);
    const { email, raw_email } = rows[0] ?? {};
    expect(raw_email).toBe("  Alice@Example.COM  ");
    expect(email).toBe("alice@example.com");
  });
});
