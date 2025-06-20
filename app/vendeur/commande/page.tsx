'use client'

import { useEffect, useState } from 'react'

type Commande = {
  _id: string
  clientName: string
  cardNumber?: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  status: string
}

export default function Commandes() {
  const [commandes, setCommandes] = useState<Commande[]>([])

  useEffect(() => {
    const storedCommandes = JSON.parse(localStorage.getItem('commandes') || '[]')
    setCommandes(storedCommandes)
  }, [])

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">📦 Commandes reçues</h1>

      {commandes.length === 0 ? (
        <p className="text-gray-500">Aucune commande pour le moment.</p>
      ) : (
        commandes.map(cmd => (
          <div key={cmd._id} className="border p-4 mb-3 rounded shadow">
            <p><strong>Commande :</strong> {cmd._id}</p>
            <p><strong>Client :</strong> {cmd.clientName || 'Inconnu'}</p>
            <p><strong>Total :</strong> {cmd.total} Ar</p>
            <p><strong>Statut :</strong> {cmd.status}</p>

            <ul className="list-disc pl-5 mt-2">
              {cmd.items.map((item, i) => (
                <li key={i}>
                  {item.quantity} x {item.name} — {item.price} Ar
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </main>
  )
}
