'use client'
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter()
    const session = useSession();
    if(session.user){
        router.push('/todo');
    }else{
      router.push('/login');
    }
  return (
    <div>
      
    </div>
  );
}
