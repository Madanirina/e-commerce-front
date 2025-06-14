'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Product = {
  _id: string
  name: string
  price: number
  description: string
}

export default function VendeurDashboard() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'vendeur') {
      router.push('/')
      return
    }

    setUser(parsedUser)

    fetch('http://localhost:3001/products/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Erreur chargement produits', err))
  }, [router])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">👋 Bienvenue {user?.name}</h1>
      <h2 className="text-xl font-semibold mb-2">Vos produits</h2>

      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => router.push('/vendeur/produit')}
      >
        ➕ Ajouter un produit
      </button>

      <ul className="space-y-4">
        {products.length > 0 ? (
          products.map(product => (
            <li key={product._id} className="border p-4 rounded shadow">
              <h3 className="font-bold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="text-green-600 font-semibold">{product.price} Ar</p>
              <div className="space-x-2 mt-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() =>
                    router.push(`/vendeur/produit/modifier/${product._id}`)
                  }
                >
                  ✏️ Modifier
                </button>
                <button className="text-red-600 hover:underline">
                  🗑️ Supprimer
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </ul>
    </main>
  )
}
