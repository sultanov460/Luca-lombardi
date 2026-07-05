import { db } from "@/lib/firebase-admin";
import { Product } from "@/types/product";

export async function getAllProducts(): Promise<Product[]> {
  const snapshot = await db.collection("products").get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
}

export async function getProductsByCollection(
  collection: string,
): Promise<Product[]> {
  const snapshot = await db
    .collection("products")
    .where("collection", "==", collection)
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const doc = await db.collection("products").doc(id).get();
  if (!doc.exists) return null;

  return { id: doc.id, ...doc.data() } as Product;
}
