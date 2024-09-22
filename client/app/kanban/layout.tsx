'use client'
import Appbar from "@/components/appbarMain";
import useSession from "@/hooks/useSession";
import { redirect, useRouter } from "next/navigation";


export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const {user,loading} = useSession();
    const router = useRouter()
    if(loading){
      return <div></div>
    }
    if(!user){
      redirect('/')
    }
    return (
      <>
            <div>
                <Appbar user={user}/>
                <div className="p-4 grid gap-6 flex-1 overflow-auto md:p-6">
                    {children}
                </div>
            </div>
      </>
    )
  }