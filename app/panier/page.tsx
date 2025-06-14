'use client'

import { useCart } from '@/context/CartContext'

export default function PanierPage() {
  const { cart, removeFromCart } = useCart()

  const handleRemove = (id: string) => {
    removeFromCart(id)
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">🛒 Mon Panier</h1>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cart.map(item => (
              <li key={item._id} className="py-4 flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>{item.price} Ar × {item.quantity}</p>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 hover:underline"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
          <div className="font-bold text-right">Total : {total} Ar</div>
        </>
      )}
    </div>
  )
}
