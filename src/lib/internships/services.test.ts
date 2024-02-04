import prisma from "../prisma";
import {
    adminSession,
    adminUser,
    internship,
    internship2,
    studentSession,
    studentUser,
    tutorUser
} from "../test-data";
import { createInternship, listInternships } from "./services";

beforeAll(async () => {
  await prisma.user.createMany({
    data: [adminUser, studentUser, tutorUser]
  });
});

afterAll(async () => {
  const deleteUsers = prisma.user.deleteMany();
  const deleteInternships = prisma.internship.deleteMany();

  await prisma.$transaction([deleteUsers, deleteInternships]);

  await prisma.$disconnect();
});

afterEach(async () => {
  await prisma.$transaction([prisma.internship.deleteMany()]);
});

test("should create new internship", async () => {
  const internshipCreated = await createInternship(internship, studentUser.id);

  expect(internshipCreated.companyName).toEqual(internship.companyName);
  expect(internshipCreated.mission).toEqual(internship.mission);
});

test("list admin internships", async () => {
  await createInternship(internship, studentUser.id);
  await createInternship(internship2, studentUser.id);

  const internships = await listInternships(adminSession);

  expect(internships.length).toBe(2);
});

test("list student internships", async () => {
  await createInternship(internship, studentUser.id);
  await createInternship(internship2, tutorUser.id);

  const internships = await listInternships(studentSession);

  expect(internships.length).toBe(1);
});

test("get internship", async () => {
  const internshipCreated = await createInternship(internship, studentUser.id);

  const internshipFetched = await prisma.internship.findUnique({
    where: {id: internshipCreated.id}
  });

  expect(internshipFetched?.companyName).toEqual(internship.companyName);
  expect(internshipFetched?.mission).toEqual(internship.mission);
});
