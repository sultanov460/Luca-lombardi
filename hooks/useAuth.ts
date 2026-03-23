import { firebaseAuth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  type User,
} from "firebase/auth";
import { useCookies } from "react-cookie";

const providers = {
  google: new GoogleAuthProvider(),
};

type Provider = keyof typeof providers;

export const useAuth = () => {
  const [, setCookie, removeCookie] = useCookies(["authToken"]);

  const setAuthCookie = async (user: User) => {
    const firebaseToken = await user.getIdToken();

    if (firebaseToken) {
      setCookie("authToken", firebaseToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }
  };

  const handleLogin = async (
    email: string,
    password: string,
  ): Promise<User> => {
    const { user } = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password,
    );

    await setAuthCookie(user);
    return user;
  };

  const handleSignup = async (
    email: string,
    password: string,
  ): Promise<User> => {
    const { user } = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password,
    );

    await setAuthCookie(user);
    return user;
  };

  const handleProviderLogin = async (provider: Provider): Promise<User> => {
    const { user } = await signInWithPopup(firebaseAuth, providers[provider]);

    await setAuthCookie(user);
    return user;
  };

  const handleLogout = async (): Promise<void> => {
    const currentUser = firebaseAuth.currentUser;

    if (!currentUser) {
      throw new Error("No user is currently logged in.");
    }

    await firebaseAuth.signOut();
    removeCookie("authToken", { path: "/" });
  };

  return {
    handleLogin,
    handleSignup,
    handleGoogleLogin: () => handleProviderLogin("google"),
    handleLogout,
  };
};
