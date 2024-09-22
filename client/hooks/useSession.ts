import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/recoil/atoms";
import axios from "axios";
import { BACKEND_URL } from "@/lib";

// Helper function to get token from cookies
const getTokenFromCookies = () => {
  return document.cookie.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=');
    if (name === "token") acc = value;
    return acc;
  }, "");
};

const useSession = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const checkSession = async () => {
      const token = getTokenFromCookies();
      if (!token) {
        setUser(null); // No token, clear user state
        return;
      }

      try {
        // Call the Express backend route for session validation
        const response = await axios.get(`${BACKEND_URL}/api/auth/session`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.valid) {
          setUser(response.data.user); // Set user data in Recoil
        } else {
          setUser(null); // If session invalid, clear user
        }
      } catch (error) {
        console.error("Session check failed", error);
        setUser(null); // On error, clear user
      }
    };

    checkSession();
  }, [setUser]);

  return user;
};

export default useSession;
