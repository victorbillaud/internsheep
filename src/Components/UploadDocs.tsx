import {useRef} from "react";
import {useController} from "react-hook-form";
import {Input} from "./ui/input";
import {FormControl, FormItem, FormLabel, FormMessage} from "./ui/form";

export default function UploadDocs({control, name}) {
  const {
    field: {onChange, onBlur},
    fieldState: {error}
  } = useController({
    name,
    control
  });

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    onChange(files); // Update react-hook-form with the new files
  };

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
          onChange={handleFilesChange}
          onBlur={onBlur}
        />
      </FormControl>
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
}
