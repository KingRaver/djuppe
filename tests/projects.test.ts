import { describe, expect, it } from "vitest";
import { getProject, projects } from "../data/projects";

describe("project content registry", () => {
  it("provides seven unique, route-safe projects", () => {
    expect(projects).toHaveLength(7);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    projects.forEach((project) => expect(project.slug).toMatch(/^[a-z0-9-]+$/));
  });

  it("keeps every detail route content-complete", () => {
    projects.forEach((project) => {
      expect(getProject(project.slug)).toBe(project);
      expect(project.statement.length).toBeGreaterThanOrEqual(2);
      expect(project.images.length).toBeGreaterThanOrEqual(3);
      expect(project.images.every((image) => image.alt.length > 12)).toBe(true);
    });
  });
});
