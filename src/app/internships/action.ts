"use server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getInternships() {
    return prisma.internship.findMany()
}

export async function getInternship(id: number) {
    return prisma.internship.findUnique({
        where: { id }
    });
}
