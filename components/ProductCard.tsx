// components/ProductCard.tsx
'use client'

import { useCart } from '@/context/CartContext'

export const ProductCard = ({ product }: { product: any }) => {
  const { addToCart } = useCart()

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9YL_gULeR_w6Vus30JxsM0lGuiHFHmJKG5Q&s" alt="Sunset in the mountains"></img>
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="font-bold mt-2">{product.price} Ar</p>
      <button
        onClick={() => addToCart({ ...product, quantity: 1 })}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Ajouter au panier
      </button>
    </div>
  )
}
