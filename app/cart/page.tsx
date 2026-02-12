import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Cart } from "./widgets/Cart";

export default function CartPage() {
  return (
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  );
}
