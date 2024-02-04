import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {

  const session = await getServerSession()
  console.log(session)

  return (
    <div className="flex h-screen bg-white">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="text-stone-600 font-bold text-2xl">
            Internship Home page
          </h1>

          <p className="text-stone-600 text-lg">
            This is the home page for the internship project.
          </p>

          <Link href="/dashboard">
            <p className="text-stone-600 text-lg">Go to protected page</p>
          </Link>

        </div>
      </div>
    </div>
  );
}
