import { Container } from "@/components/Container";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function CartPage() {
  return (
    <ProtectedRoute>
      <div className="pt-20 pb-30">
        <Container>
          <h1 className="text-3xl font-semibold">Cart</h1>
          <p className="mt-3 text-gray-600">
            Это защищённая страница. Если ты не залогинен — тебя кидает на
            /login.
          </p>
        </Container>
      </div>
    </ProtectedRoute>
  );
}
