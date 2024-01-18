"use server";

import {PrismaClient} from "@prisma/client";
import {redirect} from "next/navigation";
import {S3, PutObjectCommand, GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
const prisma = new PrismaClient();

interface InternshipData {
  companyName: string;
  mission: string;
  numberWeeks: number;
  remuneration: number;
  rythm: "full-time" | "part-time";
  startDate: string; // date au format ISO
  endDate: string; // date au format ISO
}

export async function sendForm(internshipData: InternshipData) {
  try {
    const result = await prisma.internship.create({
      data: internshipData
    });
    console.log("Internship created:", result);
  } catch (error) {
    console.error("Error creating internship:", error);
    redirect("/form?error=creatinIntership");
  }

  redirect("/");
}

export const handleDocumentUpload = async (formData: any) => {
  const files = formData.getAll("input-file-upload");
  const successUploads: string[] = [];

  const s3Client = new S3({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ""
    }
  });

  const uploadedFiles = files.map(async (file: any) => {
    const fileName = file?.name;
    const fileType = file?.type;

    const binaryFile = await file?.arrayBuffer();
    const fileBuffer = Buffer.from(binaryFile);

    const params = {
      Bucket: "internsheep-documents",
      Key: fileName,
      Body: fileBuffer,
      ContentType: fileType
    };

    try {
      //await s3Client.send(new PutObjectCommand(params));
      const command = new GetObjectCommand({Bucket: "internsheep-documents", Key: fileName});
      const url = await getSignedUrl(s3Client, command, {expiresIn: 15 * 60});
      console.log(url);
      successUploads.push(fileName);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  });

  await Promise.all(uploadedFiles);

  if (successUploads.length === files.length) {
    return {
      status: "success",
      message: `${successUploads.length} files uploaded successfully`
    };
  } else {
    const failedUploads = files.filter((file: any) => !successUploads.includes(file.name));
    return {
      status: "error",
      message: `Error uploading ${failedUploads.length} files out of ${
        files.length
      } Files: ${failedUploads.map((file: any) => file.name + ", ")}`
    };
  }
};
