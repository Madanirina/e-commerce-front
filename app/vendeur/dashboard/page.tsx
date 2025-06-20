'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Product = {
  _id: string
  name: string
  description: string
  price: number
}

export default function VendeurDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [editProductId, setEditProductId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', description: '', price: 0 })
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    description: '',
    price: 0,
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/data/products.json')
        const staticProducts = await res.json()
  
        const localProducts = JSON.parse(localStorage.getItem('new-products') || '[]')
  
        setProducts([...staticProducts, ...localProducts])
      } catch (err) {
        console.error('Erreur chargement produits :', err)
      }
    }
  
    fetchProducts()
  }, [])

  // Supprimer un produit
  const handleDelete = (id: string) => {
    if (!confirm('Supprimer ce produit ?')) return
  
    // 1. Supprimer du state
    const updated = products.filter(p => p._id !== id)
    setProducts(updated)
  
    // 2. Supprimer du localStorage si le produit y est
    const stored = JSON.parse(localStorage.getItem('new-products') || '[]')
    const filteredStored = stored.filter((p: any) => p._id !== id)
    localStorage.setItem('new-products', JSON.stringify(filteredStored))
  
    // 3. Si c'était en cours d'édition
    if (editProductId === id) setEditProductId(null)
  }
  

  // Démarrer modification produit
  const startEdit = (product: Product) => {
    setEditProductId(product._id)
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
    })
  }

  // Enregistrer modification
  const handleUpdate = () => {
    setProducts(products.map(p =>
      p._id === editProductId
        ? { ...p, ...form }
        : p
    ))
    setEditProductId(null)
    setForm({ name: '', description: '', price: 0 })
  }

  // Ajouter nouveau produit
  const handleAdd = () => { 
    if (!newProductForm.name || !newProductForm.price) {
      alert('Nom et prix requis')
      return
    }
  
    const newProduct: Product = {
      _id: Date.now().toString(),
      ...newProductForm,
    }
  
    // 1. Mise à jour de l'état local
    setProducts([...products, newProduct])
  
    // 2. Stockage dans localStorage
    const existing = JSON.parse(localStorage.getItem('new-products') || '[]')
    localStorage.setItem('new-products', JSON.stringify([...existing, newProduct]))
  
    // 3. Réinitialisation du formulaire
    setNewProductForm({ name: '', description: '', price: 0 })
  }
  

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard Vendeur - Produits</h1>
      <section className="mb-8 border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Ajouter un produit</h2>
        <input
          type="text"
          placeholder="Nom"
          value={newProductForm.name}
          onChange={e =>
            setNewProductForm({ ...newProductForm, name: e.target.value })
          }
          className="border p-2 mb-2 w-full rounded"
        />
        <textarea
          placeholder="Description"
          value={newProductForm.description}
          onChange={e =>
            setNewProductForm({ ...newProductForm, description: e.target.value })
          }
          className="border p-2 mb-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Prix"
          value={newProductForm.price || ''}
          onChange={e =>
            setNewProductForm({
              ...newProductForm,
              price: Number(e.target.value),
            })
          }
          className="border p-2 mb-2 w-full rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter
        </button>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Liste des produits</h2>
        <ul className="space-y-4">
          {products.length === 0 && <p>Aucun produit trouvé.</p>}

          {products.map(product => (
            <li
              key={product._id}
              className="border p-4 rounded shadow space-y-2"
            >
              {editProductId === product._id ? (
                <>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="border p-2 w-full rounded"
                  />
                  <textarea
                    value={form.description}
                    onChange={e =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="border p-2 w-full rounded"
                  />
                  <input
                    type="number"
                    value={form.price}
                    onChange={e =>
                      setForm({ ...form, price: Number(e.target.value) })
                    }
                    className="border p-2 w-full rounded"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      💾 Enregistrer
                    </button>
                    <button
                      onClick={() => setEditProductId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      ❌ Annuler
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-bold">{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="text-green-600 font-semibold">{product.price} Ar</p>
                  <div className="space-x-2">
                    <button
                      onClick={() => startEdit(product)}
                      className="text-blue-600 hover:underline"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:underline"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
      <Link href="/vendeur/commande" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          📦 Voir les commandes
      </Link>
    </main>
  )
}
