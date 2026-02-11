import { firebaseAuth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, type User } from "firebase/auth";
import { useCookies } from "react-cookie";

const providers = {
  google: new GoogleAuthProvider(),
};

type Provider = keyof typeof providers;

export const useAuth = () => {
  const [, setCookie, removeCookie] = useCookies(["authToken"]);

  const handleLogin = async (provider: Provider): Promise<User> => {
    const { user } = await signInWithPopup(firebaseAuth, providers[provider]);

    // Optional token (can be used for server-side verification later)
    const firebaseToken = await user.getIdToken();

    if (firebaseToken) {
      setCookie("authToken", firebaseToken, {
        path: "/",
        maxAge: 60 * 60, // 1 hour
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }

    return user;
  };

  const handleLogout = async () => {
    const currentUser = firebaseAuth.currentUser;

    if (!currentUser) {
      throw new Error("No user is currently logged in.");
    }

    await firebaseAuth.signOut();
    removeCookie("authToken", { path: "/" });
  };

  return {
    handleGoogleLogin: () => handleLogin("google"),
    handleLogout,
  };
};
