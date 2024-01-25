"use server";

import {authOptions} from "@/lib/auth";
import {Prisma, PrismaClient} from "@prisma/client";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {S3} from "@aws-sdk/client-s3";
import {PutObjectCommand, GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
const prisma = new PrismaClient();

type InternshipCreateBody = Prisma.Args<typeof prisma.internship, "create">["data"];

interface InternshipData {
  companyName: string;
  mission: string;
  numberWeeks: number;
  remuneration: number;
  rythm: "full-time" | "part-time";
  startDate: string; // date au format ISO
  endDate: string; // date au format ISO
}

interface UploadResult {
  success: boolean;
  message: string;
}

export async function sendForm(
  internshipData: Omit<InternshipCreateBody, "user">,
  documentForm: any
) {
  const uploadResult = await handleDocumentUpload(documentForm);
  if (!uploadResult.success) {
    redirect(`/dashboard/internships/form?error=uploadfailed`);
  }

  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    const result = await prisma.internship.create({
      data: {
        ...internshipData,
        user: {
          connect: {
            id: user?.id as string
          }
        }
      }
    });
    console.log("Internship created:", result);
  } catch (error) {
    console.error("Error creating internship:", error);
    redirect("/dashboard/internships/form?error=Error creating internship");
  }

  redirect("/dashboard/internships");
}

function createS3Client(): S3 {
  return new S3({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ""
    }
  });
}

export const handleDocumentUpload = async (docForm: any): Promise<UploadResult> => {
  const files = docForm?.getAll("files");

  if (!files || files.length === 0) {
    return {
      success: true,
      message: "No files to upload, proceeding without file upload."
    };
  }

  const s3Client = createS3Client();
  const uploadPromises = files.map((file: File) => uploadFile(s3Client, file));
  const uploadResults = await Promise.all(uploadPromises);
  const failedUploads = uploadResults.filter((result) => !result.success);

  if (failedUploads.length === 0) {
    return {success: true, message: "All files uploaded"};
  } else {
    const failedFiles = failedUploads.map((upload) => upload.fileName).join(", ");
    return {
      success: false,
      message: `Failed to upload ${failedUploads.length} files: ${failedFiles}`
    };
  }
};

async function uploadFile(s3Client: S3, file: File): Promise<UploadResult> {
  const fileName = file.name;
  const fileType = file.type;
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const params = {
    Bucket: "internsheep-documents",
    Key: fileName,
    Body: fileBuffer,
    ContentType: fileType
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    const url = await getSignedUrl(s3Client, new GetObjectCommand(params), {
      expiresIn: 60 * 10 // 10 minutes
    });
    console.log(`File uploaded: ${fileName} (${url})`);
    return {success: true, message: `File uploaded: ${fileName}`};
  } catch (error) {
    console.error(`Error uploading file ${fileName}:`, error);
    return {success: false, message: `Error uploading file ${fileName}`};
  }
}
