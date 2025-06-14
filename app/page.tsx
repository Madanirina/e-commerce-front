'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(setProducts)
  }, [])

  const handleAddToCart = (product: any) => {
    console.log('Ajout au panier:', product)
  }

  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((p: any) => (
        <ProductCard key={p._id} product={p} onAddToCart={handleAddToCart} />
      ))}
    </main>
  )
}
