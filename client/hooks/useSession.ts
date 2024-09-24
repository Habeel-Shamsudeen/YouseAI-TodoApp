import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { taskState, userState } from "@/recoil/atoms";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

// Helper to extract token from cookies
export const getTokenFromCookies = () => {
  return document.cookie.split("; ").reduce((acc, cookie) => {
    const [name, value] = cookie.split("=");
    return name === "token" ? value : acc; // Return the token if found
  }, "");
};

const useSession = () => {
  const [user, setUser] = useRecoilState(userState);
  const [tasks, setTask] = useRecoilState(taskState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const token = decodeURIComponent(getTokenFromCookies());
      if (!token) {
        setUser(null);
        setTask([]);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BACKEND_URL}/api/auth/session`, {
          withCredentials: true,
          headers:{
            Authorization:`${token}`
          }
        });

        if (response.data.valid) {
          setUser(response.data.user);
          setTask(response.data.tasks);
        } else {
          setUser(null);
          setTask([]);
        }
      } catch (error) {
        console.error("Session check failed", error);
        setUser(null);
        setTask([]);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [setUser, setTask]);

  return { user, tasks, loading };
};

export default useSession;
