import prisma from "../prisma";
import {
  adminSession,
  adminUser,
  studentSession,
  studentUser,
  tutorSession,
  tutorUser
} from "../test-data";
import { createUser, listUsers } from "./services";

beforeAll(async () => {
  await prisma.user.createMany({
    data: [adminUser, studentUser, tutorUser]
  });
});

afterAll(async () => {
  const deleteUsers = prisma.user.deleteMany();

  await prisma.$transaction([deleteUsers]);

  await prisma.$disconnect();
});

test("should create new user ", async () => {
  const user = await createUser(adminSession, {
    firstname: "Test",
    lastname: "Test",
    email: "test@example.com",
    password: "password",
    role: "STUDENT"
  });

  expect(user.email).toEqual("test@example.com");
  expect(user.firstname).toEqual("Test");
  expect(user.lastname).toEqual("Test");
});

test("list users", async () => {
  const users = await listUsers(adminSession);

  expect(users.length).toBeGreaterThan(0);
});

test("should fail if the user is not authorized to list users", async () => {
  expect(async () => {
    await listUsers(studentSession);
  }).rejects.toThrow("Error while fetching users");

  expect(async () => {
    await listUsers(tutorSession);
  }).rejects.toThrow("Error while fetching users");
});

test("should fail if user does not have right to create user", async () => {
  expect(async () => {
    await createUser(studentSession, {
      firstname: "Test",
      lastname: "Test",
      email: "test@example.com",
      password: "password",
      role: "STUDENT"
    });
  }).rejects.toThrow("Error while creating user");

  expect(async () => {
    await createUser(tutorSession, {
      firstname: "Test",
      lastname: "Test",
      email: "test@example.com",
      password: "password",
      role: "STUDENT"
    });
  }).rejects.toThrow("Error while creating user");
});
