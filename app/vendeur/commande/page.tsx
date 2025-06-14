'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

type Commande = {
  _id: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  status: string
}

export default function Commandes() {
  const [commandes, setCommandes] = useState<Commande[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const sellerId = localStorage.getItem('userId') // à adapter selon ton auth

    axios
      .get(`http://localhost:3000/commandes?sellerId=${sellerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setCommandes(res.data))
      .catch(err => console.error('Erreur chargement commandes', err))
  }, [])

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">📦 Commandes reçues</h1>
      {commandes.map(cmd => (
        <div key={cmd._id} className="border p-4 mb-3 rounded shadow">
          <p><strong>Commande :</strong> {cmd._id}</p>
          <p><strong>Total :</strong> {cmd.total} Ar</p>
          <p><strong>Statut :</strong> {cmd.status}</p>
          <ul className="list-disc pl-5 mt-2">
            {cmd.items.map((item, i) => (
              <li key={i}>{item.quantity} x {item.name} - {item.price} Ar</li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  )
}
