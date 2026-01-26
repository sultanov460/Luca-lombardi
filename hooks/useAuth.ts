import { firebaseAuth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCookies } from "react-cookie";

const providers = {
  google: new GoogleAuthProvider(),
};

type Provider = keyof typeof providers;

export const useAuth = () => {
  const [, setCookie, removeCookie] = useCookies(["authToken"]);

  const handleLogin = async (provider: Provider) => {
    try {
      const { user } = await signInWithPopup(firebaseAuth, providers[provider]);

      const firebaseToken = await user.getIdToken();

      if (firebaseToken) {
        setCookie("authToken", firebaseToken, {
          path: "/",
          maxAge: 3600, // 1 hour
        });
      }

      console.log("Login successful:", user);
      alert("Login successfull");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const currentUser = firebaseAuth.currentUser;

      if (!currentUser) {
        alert("No user is currently logged in.");
        return;
      }

      await firebaseAuth.signOut();
      removeCookie("authToken", { path: "/" });
      alert("Logout successful.");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return {
    handleGoogleLogin: () => handleLogin("google"),
    handleLogout,
  };
};
