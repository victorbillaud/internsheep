import {Input} from "./ui/input";
import {FormControl, FormItem, FormLabel, FormMessage} from "./ui/form";

export default function UploadDocs({field}: {field: File | undefined}) {
  return (
    <FormItem>
      <FormLabel>Upload your documents</FormLabel>
      <FormControl>
        <Input
          type="file"
          id="input-file-upload"
          name="input-file-upload"
          multiple
          accept=".pdf, .jpg, .jpeg, .png, .txt"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
