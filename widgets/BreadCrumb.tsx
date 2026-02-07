import { Product } from "@/types/product"
import Link from "next/link"

interface BreadCrumbProps {
    product: Product
}

export const BreadCrumb = ({ product }: BreadCrumbProps) => {
    return (
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
    )
}