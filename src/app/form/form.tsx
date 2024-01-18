"use client";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { sendForm } from "./actions";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  companyName: z.string().min(1),
  mission: z.string().min(1),
  numberWeeks: z.number().min(1),
  remuneration: z.number().min(1),
  rythm: z.enum(["full-time", "part-time"]),
  startDate: z.date(),
  endDate: z.date(),
})

export default function FormComponent() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  type CustomError = {
    code: string;
    message: string;
  };

  const searchParams = useSearchParams();

  const error = searchParams.get("error") as unknown as CustomError;


  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(formRef.current);

    console.log("formData", formData);

    sendForm();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      mission: "",
      numberWeeks: 0,
      remuneration: 0,
      rythm: "full-time",
      startDate: new Date(),
      endDate: new Date(),
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {

  }

  return (
    <div className="h-screen bg-white">
      <div className="flex flex-col space-y-2 text-center mt-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Add an internship
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter the details of your internship below
        </p>
      </div>

      <div className="flex flex-col max-w-70  mx-auto my-auto ">
        {error && <p className="text-red-500 text-center font-bold mt-2">{error}</p>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-1/2 p-2 mx-auto items-center">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
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
              render={({ field }) => (
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Weeks</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="exemple : 20 weeks  "  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remuneration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="example : 1500€" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the remuneration without taxes.
                  </FormDescription>
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
              <FormDescription>
                Full-time or Part-time
              </FormDescription>
            </FormItem>
            
            <div className="flex flex-row justify-center space-x-20">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
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
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
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
                render={({ field }) => (
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
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
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



            <Button className="flex text-center mx-auto mt-4" type="submit">Submit</Button>
          </form>
        </Form>

      </div>
    </div >
  );
}
