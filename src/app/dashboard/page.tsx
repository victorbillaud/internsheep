// import SignOut from "@/components/SignOut";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
// import imageEfrei  from "@/public/efrei-diplome.jpg";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  console.log(user);

  return (
    <div className="h-full w-screen">
      {/* <SignOut /> */}
      {/* <Button>Test</Button> */}

      <div className="w-screen flex">
        <div className="h-full w-1/2  inline-flex items-center justify-center ">
          <div className="flex-col ">
            <div className="mt-28 inline-block align-baseline">
              <h1 className="text-3xl text-black font-bold max-w-96 mt-5 inline-block ">
                Boost your academic journey by declaring your internships!
              </h1>

              <p className="max-w-96 mt-2">
                Simplify your internship declaration with our user-friendly website that no team can
                ignore
              </p>
            </div>

            <Link href="/dashboard/internships/form">
              <Button className="mt-8 flex items-center justify-center mx-auto hover:bg-gray-700">
                Create my Internship!
              </Button>
            </Link>
          </div>
        </div>

        {/* background */}
        <div className="w-1/2" dir="drl">
          <div className="flex mt-4 items-center justify-center rounded-s-[30%] w-[50vw] h-[78vh] bg-gradient-to-br from-blue-200 to-red-300 text-white">
            <div className=" absolute flex mt-4 items-center justify-center rounded w-[40vw] h-[40vh] mr-48">
              <img className="rounded blur-md invert drop-shadow-xl md:filter-none" src="/efrei-diplome.jpg" alt="education" />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full p-2">
        <p className="flex items-center justify-center text-xs">
          Trusted by 9 million + students over 5000 schools
        </p>
      </div>
    </div>
  );
}
