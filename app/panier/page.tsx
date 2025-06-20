'use client'

import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PanierPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const router = useRouter()

  const [clientName, setClientName] = useState('')
  const [cardNumber, setCardNumber] = useState('')

  const handleChangeQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    updateQuantity(id, quantity)
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handlePaiement = () => {
    if (cart.length === 0) {
      alert('Le panier est vide.')
      return
    }

    if (!clientName || !cardNumber) {
      alert('Veuillez remplir le nom et le numéro de carte.')
      return
    }

    const commande = {
      _id: Date.now().toString(),
      userId: localStorage.getItem('userId') || 'client-anonyme',
      clientName,
      cardNumber,
      items: cart,
      total,
      status: 'en attente',
    }

    // Sauvegarder la commande dans localStorage
    const commandes = JSON.parse(localStorage.getItem('commandes') || '[]')
    commandes.push(commande)
    localStorage.setItem('commandes', JSON.stringify(commandes))

    // Vider le panier
    localStorage.removeItem('my-cart')
    window.location.reload()

    alert('💳 Paiement avec succès ! Commande enregistrée.')
    router.push('/')
  }

  return (
    <div className="space-y-4 p-4 max-w-2xl mx-auto">
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

          <div className="mt-6 border-t pt-4 space-y-4">
            <h2 className="text-lg font-semibold">💳 Infos de paiement (simulation)</h2>

            <div className="space-y-2">
              <label className="block text-sm">Nom du client</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                placeholder="Jean Rakoto"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm">Numéro de carte</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="text-right mt-4">
              <button
                onClick={handlePaiement}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                ✅ Payer maintenant
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
