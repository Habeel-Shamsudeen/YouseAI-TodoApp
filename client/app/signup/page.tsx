'use client'
import Quote from "@/components/Quote";
import Link from "next/link";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import SignupForm from "@/components/signup-form";

export default function SignupHome() {
  const router = useRouter()
    const session = useSession();
    if(session.user){
        router.push('/todo');
    }
  return (
    <div>
      <div className="flex">
      <div className="flex items-center gap-2 p-3 md:bg-slate-100 w-1/2 md:shadow-lg">
        <Link
          href="/"
          className="flex items-center gap-2 "
          prefetch={false}
        >
          <span className="text-xl font-bold hidden sm:block">YouseAI</span>
        </Link>
      </div>
      </div>
      <div className="md:grid grid-cols-2">
        <div className="hidden md:block">
          <Quote />
        </div>
        <div>
          <SignupForm/>
        </div>
      </div>
    </div>
  );
}
