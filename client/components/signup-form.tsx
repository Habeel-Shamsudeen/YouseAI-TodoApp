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

export default function SignupForm() {
  const { toast } = useToast();
  const [signupInputs, setSignupInputs] = useState({
    email: "",
    name:"",
    password: "",
  });
  const router = useRouter();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    const { email,name, password } = signupInputs;

    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, {
        email,
        name,
        password,
      });

      if (response.data.token) {
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
      console.error("Signup error:", error);
      toast({
        title: "Error",
        description: "Signup failed. Please check try again.",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center min-w-2xl">
      <div className="space-y-6 rounded-xl p-10 py-24">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Account SignUp</h1>
          <p className="text-muted-foreground">
            Signup to start using our Todo application.
          </p>
        </div>
        <form className="space-y-2 flex flex-col gap-2" onSubmit={handleSignup}>
        <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type=""
              placeholder="John Doe"
              required
              onChange={(e: any) => {
                setSignupInputs((c) => ({
                  ...c,
                  name: e.target.value,
                }));
              }}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              required
              onChange={(e: any) => {
                setSignupInputs((c) => ({
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
                setSignupInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }));
              }}
            />
          </div>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
        <div className="text-slate-500 text-center">
          Already have an account
          <Link className="pl-1 underline" href={"/"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
