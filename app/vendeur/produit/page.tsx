'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AjouterProduit() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number>(0)
  const [message, setMessage] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (!storedToken || !user) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(user)
    if (parsedUser.role !== 'vendeur') {
      router.push('/')
      return
    }

    setToken(storedToken)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const product = { name, description, price }

    try {
      const res = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      })

      if (res.ok) {
        setMessage('✅ Produit ajouté avec succès !')
        setTimeout(() => router.push('/vendeur/dashboard'), 1500)
      } else {
        const errorData = await res.json()
        setMessage(`❌ Erreur : ${errorData.message || 'échec'}`)
      }
    } catch (err) {
      setMessage('❌ Erreur réseau.')
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Ajouter un produit</h1>

      {message && <p className="mb-4 text-center text-red-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nom</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Prix (Ar)</label>
          <input
            type="number"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Ajouter
        </button>
      </form>
    </main>
  )
}
