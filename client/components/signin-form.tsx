"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { BACKEND_URL } from "@/lib";

export default function SigninForm() {
  const { toast } = useToast();
  const [signinInputs, setSigninInputs] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password } = signinInputs;

    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      // Check if the token exists in the response
      if (response.data.token) {
        // Set the token in the cookies
        Cookies.set("token", response.data.token);

        toast({
          title: "SignIn Successful",
          description: "You are now logged in!",
        });

        router.push("/todo");
      } else {
        toast({
          title: "Invalid Credentials",
          description: "Please Try again",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "Login failed. Please check your credentials.",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center min-w-2xl">
      <div className="space-y-6 rounded-xl p-10 py-24">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Account Log In</h1>
          <p className="text-muted-foreground">
            Login to start using our Todo application.
          </p>
        </div>
        <form className="space-y-2 flex flex-col gap-2" onSubmit={handleSignIn}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              required
              onChange={(e: any) => {
                setSigninInputs((c) => ({
                  ...c,
                  email: e.target.value,
                }));
              }}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) => {
                setSigninInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }));
              }}
            />
          </div>
          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>
        <div className="text-slate-500 text-center">
          Don't have an account?
          <Link className="pl-1 underline" href={"/signup"}>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
