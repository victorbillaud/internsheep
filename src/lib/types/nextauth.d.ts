export declare module "next-auth" {
  interface User {
    email: string;
    firstname: string;
    lastname: string;
    id: string;
    role: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}
