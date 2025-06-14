import React from 'react'

interface Product {
  _id: string
  name: string
  description: string
  price: number
}

interface Props {
  product: Product
  onAddToCart?: (product: Product) => void
}

export const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
  return (
    <div className="border rounded p-4 shadow bg-white hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-600 my-2">{product.description}</p>
      <p className="text-green-600 font-bold mb-2">{product.price} Ar</p>
      <button
        onClick={() => onAddToCart?.(product)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Ajouter au panier
      </button>
    </div>
  )
}
