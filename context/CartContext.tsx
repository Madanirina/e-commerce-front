'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CartItem, getCart, addToCart as addItemToCart } from '@/lib/cart'

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    setCart(getCart())
  }, [])

  const updateCart = () => {
    setCart(getCart())
  }

  const addToCart = (item: CartItem) => {
    addItemToCart(item)
    updateCart()
  }

  const removeFromCart = (id: string) => {
    const newCart = getCart().filter(p => p._id !== id)
    localStorage.setItem('my-cart', JSON.stringify(newCart))
    updateCart()
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)!
