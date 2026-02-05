import Link from "next/link";

interface Product {
  id: number;
  title: string;
  src: string;
  price: string;
  collection: string;
}

export default function Details({ product }: { product: Product }) {
  return (
    <main className="min-h-screen bg-white">
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8 pt-10 pb-18">
        <div className="text-sm text-zinc-500">
          <Link href={"/"} className="hover:text-zinc-900 cursor-pointer">
            Home
          </Link>
          <span className="mx-2 text-zinc-300">/</span>
          <Link
            href={`/${product.collection}`}
            className="hover:text-zinc-900 cursor-pointer"
          >
            {product.collection}
          </Link>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="text-zinc-900 font-medium">{product.title}</span>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12">
          <section className="w-full">
            <div className="relative overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
              <img
                src={product.src}
                alt={product.title}
                className="w-full h-[520px] sm:h-[620px] object-cover"
                draggable={false}
              />
              <div className="absolute left-5 top-5">
                <span className="rounded-full bg-white/85 backdrop-blur px-3 py-1 text-xs font-semibold text-zinc-900 border border-zinc-100">
                  {product.collection}
                </span>
              </div>
            </div>
          </section>
          <section className="w-full lg:sticky lg:top-8 h-fit">
            <div className="rounded-3xl border border-zinc-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
                {product.title}
              </h1>
              <p className="mt-3 text-2xl font-semibold text-zinc-900">
                {product.price}
              </p>
              <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                Clean minimal piece from the {product.collection} collection.
                Premium look, everyday comfort.
              </p>
              <div className="mt-7 flex flex-col gap-3">
                <button className="h-12 rounded-2xl bg-zinc-900 text-white font-semibold tracking-wide hover:bg-black transition shadow-[0_10px_25px_rgba(0,0,0,0.18)]">
                  Add to cart
                </button>
                <button className="h-12 rounded-2xl border border-zinc-200 bg-white text-zinc-900 font-semibold hover:border-zinc-400 transition">
                  Save for later
                </button>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-3">
                  <p className="text-xs font-semibold text-zinc-900">
                    Delivery
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1">1–3 days</p>
                </div>
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-3">
                  <p className="text-xs font-semibold text-zinc-900">Returns</p>
                  <p className="text-[11px] text-zinc-500 mt-1">14 days</p>
                </div>
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-3">
                  <p className="text-xs font-semibold text-zinc-900">Support</p>
                  <p className="text-[11px] text-zinc-500 mt-1">24/7</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-zinc-500">
              Tip: If you want a more oversized fit — choose one size up.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
