"use client";
import UploadDocs from "@/components/UploadDocs";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {cn} from "@/lib/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {format} from "date-fns";
import {Calendar as CalendarIcon} from "lucide-react";
import {useSearchParams} from "next/navigation";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {sendForm} from "./actions";

const formSchema = z.object({
  companyName: z.string().min(1),
  mission: z.string().min(1),
  numberWeeks: z.coerce
    .number()
    .min(1)
    .refine((value) => !isNaN(value), {
      message: "Must be a number"
    }),
  remuneration: z.coerce
    .number()
    .min(1)
    .refine((value) => !isNaN(value), {
      message: "Must be a number"
    }),
  rythm: z.enum(["full-time", "part-time"]),
  files: z.array(z.instanceof(File).optional()),
  startDate: z.date(),
  endDate: z.date()
});

export default function FormComponent() {
  // getting the error and success message from the url
  const searchParams = useSearchParams();

  const error = searchParams.get("error") as unknown as string;
  const success = searchParams.get("success") as unknown as string;

  // initializing the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      mission: "",
      numberWeeks: 0,
      remuneration: 0,
      rythm: "full-time",
      files: [],
      startDate: new Date(),
      endDate: new Date()
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {startDate, endDate, files, ...internshipData} = values;
    const documentsForm = new FormData();

    files.forEach((file) => {
      if (file) {
        documentsForm.append("files", file);
      }
    });

    await sendForm(
      {
        ...internshipData,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0]
      },
      documentsForm
    );
  }

  return (
    <div className="h-screen bg-white">
      <div className="flex flex-col space-y-2 text-center mt-6">
        <h1 className="text-2xl font-semibold tracking-tight">Add an internship</h1>
        <p className="text-sm text-muted-foreground">Enter the details of your internship below</p>
      </div>

      <div className="flex flex-col max-w-70  mx-auto my-auto ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-1/2 p-2 mx-auto items-center"
          >
            <FormField
              control={form.control}
              name="companyName"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input placeholder="example : Google, Apple...." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mission"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Mission</FormLabel>
                  <FormControl>
                    <Input placeholder="example : developper full stack" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberWeeks"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Number of Weeks</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="exemple : 20 weeks  " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remuneration"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="example : 1500€" {...field} />
                  </FormControl>
                  <FormDescription>This is the remuneration without taxes.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem className="flex justify-center flex-col">
              <FormLabel>Rythm</FormLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a rythm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription>Full-time or Part-time</FormDescription>
            </FormItem>
            <UploadDocs control={form.control} name="files" />

            <div className="flex flex-row justify-center space-x-20">
              <FormField
                control={form.control}
                name="startDate"
                render={({field}) => (
                  <FormItem className="flex flex-col w-1/3">
                    <FormLabel>Start date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({field}) => (
                  <FormItem className="flex flex-col w-1/3">
                    <FormLabel>End date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm">
                <p>{error}</p>
              </div>
            )}

            <Button className="flex text-center mx-auto mt-4" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
