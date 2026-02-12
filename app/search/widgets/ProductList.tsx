'use client'
import Fuse from "fuse.js"
import { useAppSelector } from "@/store/hooks"
import { useMemo } from "react"
import { products } from "@/data/catalog"
import { ProductCard } from "@/widgets/ProductCard"

export const ProductList = () => {
    const query = useAppSelector(state => state.search.query)

    const fuse = useMemo(() => {
        return new Fuse(products, {
            keys: ['title', 'collection'],
            threshold: 0.4
        })
    }, [products])

    const filteredProducts = query ? fuse.search(query).map(r => r.item) : products

    if (!filteredProducts.length) {
        return <div>No products...</div>
    }

    return (
        <div>{filteredProducts.map((p, i) => (
            <ProductCard card={p} key={i} />
        ))}</div>
    )
}