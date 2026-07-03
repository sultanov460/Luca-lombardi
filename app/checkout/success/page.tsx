import Link from "next/link";
import { FiCheckCircle, FiArrowRight, FiMail } from "react-icons/fi";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-8 sm:p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <FiCheckCircle className="h-9 w-9 text-green-600" />
        </div>

        <h1 className="mt-6 text-2xl sm:text-3xl font-semibold text-gray-900">
          Оплата прошла успешно
        </h1>
        <p className="mt-3 text-gray-500 leading-relaxed">
          Спасибо за заказ! Мы уже начали его обработку и скоро свяжемся с вами.
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-gray-50 border border-black/5 px-4 py-3 text-sm text-gray-600">
          <FiMail className="h-4 w-4" />
          Чек и детали заказа отправлены на вашу почту
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition"
        >
          Продолжить покупки
          <FiArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
