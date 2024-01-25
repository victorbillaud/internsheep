import { Internship, Role } from "@prisma/client";
import { Session } from "next-auth";

export const adminUser = {
  name: null,
  email: "admin@example.com",
  image: null,
  firstname: "Admin",
  lastname: "Admin",
  id: "1",
  role: Role.ADMIN,
  password: "password",
  emailVerified: new Date()
};

export const adminSession: Session = {
  user: adminUser,
  expires: ""
};

export const tutorUser = {
  name: null,
  email: "tutor@example.com",
  image: null,
  firstname: "Tutor",
  lastname: "Tutor",
  id: "2",
  role: Role.TUTOR,
  password: "password",
  emailVerified: new Date()
};

export const tutorSession: Session = {
  user: tutorUser,
  expires: ""
};

export const studentUser = {
  name: null,
  email: "student@example.com",
  image: null,
  firstname: "Student",
  lastname: "Student",
  id: "3",
  role: Role.STUDENT,
  password: "password",
  emailVerified: new Date()
};

export const studentSession: Session = {
  user: studentUser,
  expires: ""
};

export const internship: Internship = {
  id: 1,
  companyName: "Company 1",
  mission: "Mission of internship 1",
  startDate: "2021-01-01T00:00:00.000Z",
  endDate: "2021-02-01T00:00:00.000Z",
  rythm: "full-time",
  numberWeeks: 4,
  remuneration: 1000,
  userId: "3"
};
