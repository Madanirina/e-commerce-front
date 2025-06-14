'use client'

import { useEffect, useState } from 'react'
import { getCart, removeFromCart, updateQuantity } from '@/lib/cart'

export default function PanierPage() {
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    setCart(getCart())
  }, [])

  const handleRemove = (id: string) => {
    removeFromCart(id)
    setCart(getCart())
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity)
    setCart(getCart())
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Mon panier</h1>

      {cart.length === 0 ? (
        <p>Le panier est vide.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div
              key={item._id}
              className="flex justify-between items-center p-4 border rounded bg-white shadow"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>{item.price} Ar</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={e =>
                    handleQuantityChange(item._id, Number(e.target.value))
                  }
                  min={1}
                  className="w-16 border p-1 rounded text-center"
                />
                <button
                  className="text-red-500 font-semibold"
                  onClick={() => handleRemove(item._id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}

          <div className="text-right font-bold text-lg mt-4">
            Total : {total} Ar
          </div>
        </div>
      )}
    </div>
  )
}
