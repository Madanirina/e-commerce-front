'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/ProductCard'

type Product = {
  _id: string
  name: string
  description: string
  price: number
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchStaticProducts = async () => {
      const res = await fetch('/data/products.json')
      const staticProducts = await res.json()

      const localProducts = JSON.parse(localStorage.getItem('new-products') || '[]')

      setProducts([...staticProducts, ...localProducts])
    }

    fetchStaticProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    console.log('Ajout au panier:', product)
  }

  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((p: Product) => (
        <ProductCard key={p._id} product={p} onAddToCart={handleAddToCart} />
      ))}
    </main>
  )
}
