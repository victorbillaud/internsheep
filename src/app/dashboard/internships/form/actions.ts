"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


import { GetObjectCommand, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type InternshipCreateBody = Prisma.Args<typeof prisma.internship, "create">["data"];

interface Document {
  name: string;
  type: string;
  size: string;
  url: string;
}

interface UploadResult {
  success: boolean;
  message: string;
  document?: Document;
}

interface DocumentsResult {
  success: boolean;
  message: string;
  documents?: Document[];
}

export async function sendForm(
  internshipData: Omit<InternshipCreateBody, "user">,
  documentForm: FormData
) {
  const uploadedDocuments = await handleDocumentUpload(documentForm);
  if (!uploadedDocuments.success) {
    redirect(`/dashboard/internships/form?error=uploadfailed`);
  }

  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    const result = await prisma.internship.create({
      data: {
        ...internshipData,
        documents: {
          createMany: {
            data: uploadedDocuments.documents ?? []
          }
        },
        user: {
          connect: {
            id: user?.id as string
          }
        }
      },
      include: {
        documents: true
      }
    });
    console.log("Internship created:", result);
  } catch (error) {
    console.error(error);
    redirect(`/dashboard/internships/form?error=${error}`);
  }
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

export const handleDocumentUpload = async (documentForm: any): Promise<DocumentsResult> => {
  const files = documentForm?.getAll("files");

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

  if (failedUploads.length > 0) {
    return {
      success: false,
      message: "Failed to upload files",
      documents: undefined
    };
  }

  return {
    success: true,
    message: "Files uploaded successfully",
    documents: uploadResults.filter((result) => result.success).map((result) => result.document)
  };
};

async function uploadFile(s3Client: S3, file: File): Promise<UploadResult> {
  const fileName = file.name;
  const fileType = file.type;
  const fileSize = file.size;
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
      expiresIn: 60 * 10 * 12 // 10 minutes
    });
    return {
      success: true,
      message: `File uploaded: ${fileName}`,
      document: {
        name: fileName,
        type: fileType,
        size: fileSize.toString(),
        url: url
      }
    };
  } catch (error) {
    console.error(`Error uploading file ${fileName}:`, error);
    return {success: false, message: `Error uploading file ${fileName}`, document: undefined};
  }
}
