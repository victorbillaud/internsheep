import {useController} from "react-hook-form";
import {FormControl, FormItem, FormLabel, FormMessage} from "./ui/form";
import {Input} from "./ui/input";

type UploadDocsProps = {
  control: any;
  name: string;
};

export default function UploadDocs(props: Readonly<UploadDocsProps>) {
  const {
    field: {onChange, onBlur},
    fieldState: {error}
  } = useController(props);

  const handleFilesChange = (e: any) => {
    const files = Array.from(e.target.files);
    onChange(files);
  };

  return (
    <FormItem>
      <FormLabel id="input-file-upload">Upload your documents</FormLabel>
      <FormControl>
        <Input
          type="file"
          id="input-file-upload"
          name="input-file-upload"
          multiple
          accept=".pdf, .jpg, .jpeg, .png, .txt"
          onChange={handleFilesChange}
          onBlur={onBlur}
        />
      </FormControl>
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
}
