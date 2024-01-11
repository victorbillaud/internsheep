"use server"

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    signIn("credentials", {
        redirect: false,
        email: email,
        password: password
        // @ts-ignore
      }).then(({error}) => {
        if (error) {
          redirect("/login?error=Invalid username or password");
        } else {
          redirect("/protected");
        }
      });

      
}