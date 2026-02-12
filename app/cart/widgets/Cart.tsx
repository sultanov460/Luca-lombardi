'use client'

import { Container } from "@/components/Container"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addToCart, decreaseQuantity, removeFromCart } from "@/store/slices/cartSlice"

export const Cart = () => {
    const cartItems = useAppSelector(state => state.cart.items)
    const dispatch = useAppDispatch()

    return (
        <div className="pt-20 pb-30">
            <Container>
                <h1 className="text-3xl font-semibold">Cart</h1>
                {cartItems.map(item => (
                    <div key={item.id}>
                        <h1>{item.title}</h1>
                        <p>{item.quantity}</p>
                        <button onClick={() => dispatch(addToCart(item))}>+</button>
                        <button className="py-3 px-12 text-white bg-black" onClick={() => dispatch(decreaseQuantity(item))}>-</button>
                        <button onClick={() => removeFromCart(item)}>remove</button>
                    </div>
                ))}
            </Container>
        </div>
    )
}