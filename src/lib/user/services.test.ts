import { prismaMock } from "../singleton";
import { adminSession, adminUser, studentSession, studentUser, tutorUser } from "../test-data";
import { createUser, listUsers } from "./services";

test("should create new user ", async () => {
  prismaMock.user.create.mockResolvedValue(studentUser);
  await expect(createUser(adminSession, studentUser)).resolves.toEqual(studentUser);
});

test("list users", async () => {
  prismaMock.user.findMany.mockResolvedValue([adminUser, studentUser]);
  await expect(listUsers(adminSession)).resolves.toEqual([adminUser, studentUser]);
});

test("should fail if user does not have right to create user", async () => {
  prismaMock.user.create.mockImplementation();
  await expect(createUser(studentSession, tutorUser)).rejects.toEqual(
    new Error("Error while creating user")
  );
});
