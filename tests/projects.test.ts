import { describe, expect, it } from "vitest";
import { getProject, projects } from "../data/projects";

describe("project content registry", () => {
  it("provides unique, route-safe projects", () => {
    expect(projects.length).toBeGreaterThan(0);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    projects.forEach((project) => expect(project.slug).toMatch(/^[a-z0-9-]+$/));
  });

  it("keeps every detail route content-complete", () => {
    projects.forEach((project) => {
      expect(getProject(project.slug)).toBe(project);
      expect(project.statement.length).toBeGreaterThanOrEqual(2);
      // A work may ship with a single photograph; the gallery is optional.
      expect(project.images.length).toBeGreaterThanOrEqual(1);
      expect(project.images.every((image) => image.alt.length > 12)).toBe(true);
    });
  });

  // Measured data is not published. This guards every field that reaches a
  // page, an OG card or structured data against a dimension or tolerance
  // creeping back in with new content.
  it("publishes no measured engineering data", () => {
    const measurement = /\d\s*(mm|cm|kg|kN|dBA|°)\b/i;
    const dimensions = /\d\s*×\s*\d/;

    projects.forEach((project) => {
      const prose = [
        project.title,
        project.type,
        project.location,
        project.note,
        project.description,
        ...project.statement,
        ...(project.fabricationNotes ?? []),
        ...project.images.map((image) => image.alt),
      ].join(" ");

      expect(prose).not.toMatch(measurement);
      expect(prose).not.toMatch(dimensions);
      expect(prose.toLowerCase()).not.toContain("tolerance");
    });
  });
});
