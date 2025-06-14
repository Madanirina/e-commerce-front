'use client'

import { useCart } from '@/context/CartContext'

export default function PanierPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const handleChangeQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    updateQuantity(id, quantity)
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
                  <p>{item.price} Ar</p>
                  <div className="flex items-center gap-2 mt-2">
                    <label htmlFor={`qte-${item._id}`} className="text-sm">Quantité:</label>
                    <input
                      id={`qte-${item._id}`}
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => handleChangeQuantity(item._id, parseInt(e.target.value))}
                      className="w-16 border rounded px-2 py-1"
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
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
