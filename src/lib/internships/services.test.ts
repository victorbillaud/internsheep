import { prismaMock } from "../singleton";
import { internship } from "../test-data";
import { createInternship, getInternship, listInternships } from "./services";

test("should create new internship", async () => {
  prismaMock.internship.create.mockResolvedValue(internship);
  await expect(createInternship(internship, internship.userId)).resolves.toEqual(internship);
});

test("list internships", async () => {
  prismaMock.internship.findMany.mockResolvedValue([internship]);
  await expect(listInternships()).resolves.toEqual([internship]);
});

test("get internship", async () => {
  prismaMock.internship.findUnique.mockResolvedValue(internship);
  await expect(getInternship(1)).resolves.toEqual(internship);
});
