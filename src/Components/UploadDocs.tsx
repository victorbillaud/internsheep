"use client";

import {useFormState} from "react-dom";
import {handleDocumentUpload} from "@/app/actions";
import {Input} from "@/Components/ui/input";
import {Label} from "@/Components/ui/label";
import {Button} from "./ui/button";

export default function UploadDocs() {
  const [state, formAction] = useFormState(handleDocumentUpload, null);

  return (
    <form action={formAction}>
      <Label htmlFor="input-file-upload">Upload your documents</Label>
      <Input
        type="file"
        id="input-file-upload"
        name="input-file-upload"
        multiple
        accept=".pdf, .jpg, .jpeg, .png, .txt"
      />
      <div>
        <Button type="submit">Upload S3</Button>
        {state?.status === "success" ? (
          <p className="bg-green-300">{state.message}</p>
        ) : (
          <p className="bg-red-600">{state?.message}</p>
        )}
      </div>
    </form>
  );
}
