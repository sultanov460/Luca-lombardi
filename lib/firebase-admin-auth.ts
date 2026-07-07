import "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";

export const adminAuth = getAuth();
